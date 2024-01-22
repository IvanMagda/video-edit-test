import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { FILM, iconType } from "./types";
import { useEffect, useState } from "react";
import { VideoToFrames } from "../../../../global/utils";
import WeeklyMeetingExample from "../../../../resources/Meeteng/WeeklyMeetingExample.mp4";
import { createBackgroundStyle } from "./utils";
import "./styles.scss";

const MediaSlider = ({ className, type, ...props }) => {
  const [generatedFrames, setGeneratedFrames] = useState([]);
  useEffect(() => {
    async function createFrames() {
      const frames = await VideoToFrames(
        WeeklyMeetingExample,
        10,
        "totalFrames",
      );
      setGeneratedFrames(frames);
    }
    if (type === FILM) {
      createFrames();
    }
  }, [type]);
  return (
    <div className="slider-group">
      {type && <img className="icon" src={iconType[type]} alt="type" />}
      <RangeSlider className={className} {...props} />
      {type && (
        <div
          className={`icon-background ${type}`}
          style={createBackgroundStyle(type, generatedFrames)}
        />
      )}
    </div>
  );
};

export default MediaSlider;
