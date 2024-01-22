import moment from "moment";
import mergeImages from "merge-base64";
import { fetchFile } from "@ffmpeg/util";

export const secondsFormat = (seconds) =>
  moment.utc(seconds * 1000).format("mm:ss");

function getVideoFrame(video, context, canvas, time) {
  return new Promise((resolve) => {
    let eventCallback = () => {
      video.removeEventListener("seeked", eventCallback);
      storeFrame(video, context, canvas, resolve);
    };
    video.addEventListener("seeked", eventCallback);
    video.currentTime = time;
  });
}

function storeFrame(video, context, canvas, resolve) {
  context.drawImage(video, 0, 0, video.videoWidth / 10, video.videoHeight / 10);
  resolve(canvas.toDataURL().split(";base64,")[1]);
}

export const VideoToFrames = (videoUrl, amount, type = "fps") => {
  return new Promise((resolve) => {
    let frames = [];
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    let duration;

    let video = document.createElement("video");
    video.preload = "auto";
    video.addEventListener("loadeddata", async function () {
      canvas.width = video.videoWidth / 10;
      canvas.height = video.videoHeight / 10;
      duration = video.duration;

      let totalFrames = amount;
      if (type === "fps") {
        totalFrames = duration * amount;
      }
      for (let time = 0; time < duration; time += duration / totalFrames) {
        frames.push(await getVideoFrame(video, context, canvas, time));
      }
      const combinedFrames = await mergeImages(frames);
      resolve(combinedFrames);
    });
    video.src = videoUrl;
    video.load();
  });
};

export const applyVideoEdit = async (
  ffmpeg,
  video,
  intro,
  outro,
  logo,
  config,
  setProgress,
) => {
  const {
    videoSelectStart,
    videoSelectEnd,
    addIntro,
    addOutro,
    logoEnabled,
    logoPosition,
  } = config;
  let lastOutputFileName = "";
  ffmpeg.on("progress", (e) => {
    setProgress(Math.round(e.progress * 100));
  });
  await ffmpeg.writeFile("video.mp4", await fetchFile(video));

  await ffmpeg.exec([
    "-i",
    "video.mp4",
    "-ss",
    videoSelectStart.toString(),
    "-to",
    videoSelectEnd.toString(),
    "-c",
    "copy",
    "output.mp4",
  ]);
  lastOutputFileName = "output.mp4";

  if (logoEnabled) {
    const logoOverlayPosition = {
      "top-left": "5:5",
      "top-right": "550:5",
    }[logoPosition];
    await ffmpeg.writeFile("logo.png", await fetchFile(logo));
    await ffmpeg.exec([
      "-i",
      lastOutputFileName,
      "-i",
      "logo.png",
      "-filter_complex",
      `overlay=${logoOverlayPosition}:enable='between(t,0,${videoSelectEnd - videoSelectStart})'`,
      "-preset",
      "fast",
      "-c:a",
      "copy",
      "output2.mp4",
    ]);
    lastOutputFileName = "output2.mp4";
  }

  if (addIntro) {
    await ffmpeg.writeFile("intro.mp4", await fetchFile(intro));
    await ffmpeg.writeFile(
      "mylist.txt",
      `file /intro.mp4
    file /${lastOutputFileName}`,
    );
    await ffmpeg.exec([
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      "mylist.txt",
      "-b:v",
      "10M",
      "-c",
      "copy",
      "output3.mp4",
    ]);
    lastOutputFileName = "output3.mp4";
  }

  if (addOutro) {
    await ffmpeg.writeFile("outro.mp4", await fetchFile(outro));
    await ffmpeg.writeFile(
      "mylist.txt",
      `file /${lastOutputFileName}
    file /outro.mp4`,
    );
    await ffmpeg.exec([
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      "mylist.txt",
      "-c",
      "copy",
      "output4.mp4",
    ]);
    lastOutputFileName = "output4.mp4";
  }

  const data = await ffmpeg.readFile(lastOutputFileName);
  const url = URL.createObjectURL(new Blob([data.buffer]));

  setProgress(0);

  function downloadURL(url, name = null) {
    const a = document.createElement("a");
    a.href = url;
    a.download = name ?? "";
    a.click();
  }

  downloadURL(url, "video.mp4");
};
