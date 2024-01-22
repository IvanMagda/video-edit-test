import CaptionCard from "../CaptionCard/CaptionCard";
import captions from "../../../resources/Meeteng/captions.json";
import "./styles.scss";

const Transcript = () => {
  return <ul>{captions.map(CaptionCard)}</ul>;
};

export default Transcript;
