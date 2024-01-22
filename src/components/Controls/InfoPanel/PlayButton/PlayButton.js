import { useContext } from "react";
import playIcon from "../../../../global/icons/play.svg";
import pauseIcon from "../../../../global/icons/pause.svg";
import EditorContext from "../../../../pages/Main/context";
import "./styles.scss";
import { secondsFormat } from "../../../../global/utils";

const PlayButton = () => {
  const [{ play, currentTime }, setContext] = useContext(EditorContext);

  return (
    <button className="play-button" onClick={() => setContext({ play: !play })}>
      <img className="icon" src={play ? pauseIcon : playIcon} alt="play" />
      {secondsFormat(currentTime)}
    </button>
  );
};

export default PlayButton;
