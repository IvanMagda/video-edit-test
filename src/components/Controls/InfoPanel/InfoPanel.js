import PlayButton from "./PlayButton/PlayButton";
import AutoCrop from "./AutoCrop/AutoCrop";
import Timer from "./Timer/Timer";
import "./styles.scss";
import DownloadButton from "./DownloadButton/DownloadButton";

const InfoPanel = () => {
  return (
    <div className="info-panel">
      <PlayButton />
      <DownloadButton />
      <AutoCrop />
      <Timer />
    </div>
  );
};

export default InfoPanel;
