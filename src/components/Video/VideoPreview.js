import { useContext, useEffect, useRef } from "react";
import WeeklyMeetingExample from "../../resources/Meeteng/WeeklyMeetingExample.mp4";
import EditorContext from "../../pages/Main/context";
import "./styles.scss";
import { useDebounce } from "../../global/hooks";

const VideoPreview = () => {
  const videoRef = useRef();
  const [{ play, targetTime }, setContext] = useContext(EditorContext);
  const debouncedTargetTime = useDebounce(targetTime, 250);

  useEffect(() => {
    if (!play) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }, [play]);

  useEffect(() => {
    if (videoRef) {
      videoRef.current.currentTime = debouncedTargetTime.toString();
    }
  }, [debouncedTargetTime]);

  const handleLoadedMetadata = (event) => {
    if (event.currentTarget) {
      setContext({ duration: videoRef.current.duration });
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef) {
      setContext({ currentTime: videoRef.current.currentTime });
    }
  };

  return (
    <div className="video-container">
      <video
        className="video-preview"
        width="750"
        src={WeeklyMeetingExample}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        ref={videoRef}
      />
    </div>
  );
};

export default VideoPreview;
