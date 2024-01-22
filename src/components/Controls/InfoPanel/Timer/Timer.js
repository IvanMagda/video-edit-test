import "./styles.scss";
import { useContext } from "react";
import EditorContext from "../../../../pages/Main/context";
import { secondsFormat } from "../../../../global/utils";

const Timer = () => {
  const [{ videoSelectStart, videoSelectEnd }] = useContext(EditorContext);
  return (
    <span className="timer">
      <span className="timer-text">Start:</span>
      <input
        className="timer-input"
        value={secondsFormat(videoSelectStart)}
        disabled
      />
      <span className="timer-text"> - End:</span>
      <input
        className="timer-input"
        value={secondsFormat(videoSelectEnd)}
        disabled
      />
    </span>
  );
};

export default Timer;
