import MediaSlider from "./MediaSlider/MediaSlider";
import { FILM, AUDIO } from "./MediaSlider/types";
import { useContext } from "react";
import EditorContext from "../../../pages/Main/context";
import "./styles.scss";

const EditGroup = () => {
  const [{ duration, currentTime }, setContext] = useContext(EditorContext);

  const handleAudioRangeInput = ([audioSelectStart, audioSelectEnd]) =>
    setContext({ audioSelectStart, audioSelectEnd });

  const handleVideoRangeInput = ([videoSelectStart, videoSelectEnd]) =>
    setContext({ videoSelectStart, videoSelectEnd });

  return (
    <div className="edit-group">
      <MediaSlider
        className="media-slider"
        type={FILM}
        max={duration}
        onInput={handleVideoRangeInput}
      />
      <MediaSlider
        className="media-slider"
        type={AUDIO}
        max={duration}
        onInput={handleAudioRangeInput}
      />
      <MediaSlider
        className="media-global"
        thumbsDisabled={[true]}
        rangeSlideDisabled
        value={[0, currentTime]}
        onInput={([, selectedTime]) =>
          setContext({ targetTime: selectedTime, currentTime: selectedTime })
        }
        max={duration}
        defaultValue={[0]}
      />

      <button className="add-button">+ Add Media</button>
    </div>
  );
};

export default EditGroup;
