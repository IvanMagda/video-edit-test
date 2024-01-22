import { useContext, useEffect, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import downloadIcon from "../../../../global/icons/download.svg";
import WeeklyMeetingExample from "../../../../resources/Meeteng/WeeklyMeetingExample.mp4";
import intro from "../../../../resources/intro.mp4";
import outro from "../../../../resources/outro.mp4";
import logo from "../../../../resources/logo.png";
import EditorContext from "../../../../pages/Main/context";
import { applyVideoEdit } from "../../../../global/utils";
import "./styles.scss";

const ffmpeg = new FFmpeg();

const DownloadButton = () => {
  const [
    {
      videoSelectStart,
      videoSelectEnd,
      addIntro,
      addOutro,
      logoEnabled,
      logoPosition,
    },
  ] = useContext(EditorContext);
  const videoConfigs = {
    videoSelectStart,
    videoSelectEnd,
    addIntro,
    addOutro,
    logoEnabled,
    logoPosition,
  };

  const [loadedFFmpeg, setLoadedFFmpeg] = useState(false);
  const [progress, setProgress] = useState(0);
  const load = async () => {
    await ffmpeg.load();
    setLoadedFFmpeg(true);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <button
      className="download-button"
      disabled={!loadedFFmpeg}
      onClick={() =>
        applyVideoEdit(
          ffmpeg,
          WeeklyMeetingExample,
          intro,
          outro,
          logo,
          videoConfigs,
          setProgress,
        )
      }
    >
      <img className="icon" src={downloadIcon} alt="download" />
      {progress ? `Processing ${progress}% ...` : "Download"}
      {loadedFFmpeg ? "" : "  Loading codec ..."}
    </button>
  );
};

export default DownloadButton;
