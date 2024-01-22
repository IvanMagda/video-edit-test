import Avatar from "react-avatar";
import { useContext } from "react";
import moment from "moment";
import classNames from "classnames";
import EditorContext from "../../../pages/Main/context";
import "./styles.scss";

const formatTime = (time) => time.substring(3, 8);

const CaptionCard = ({ id, text, start, end, speaker }) => {
  const [{ audioSelectStart, audioSelectEnd }] = useContext(EditorContext);
  const startSeconds = moment.duration(start).asSeconds();
  const endSeconds = moment.duration(end).asSeconds();
  const isVisible =
    startSeconds >= audioSelectStart && endSeconds <= audioSelectEnd;

  return (
    <li
      key={id}
      className={classNames("caption-card", {
        fadeIn: isVisible,
        fadeOut: !isVisible,
      })}
    >
      <Avatar
        name={speaker}
        round
        size="20"
        className="avatar"
        textSizeRatio={2}
      />
      <span>
        <div className="title">
          <span className="name">{speaker}</span>
          <span className="time">{formatTime(start)}</span>
        </div>
        <div>{text}</div>
      </span>
    </li>
  );
};

export default CaptionCard;
