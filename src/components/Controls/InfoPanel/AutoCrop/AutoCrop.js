import { useState } from "react";
import question from "../../../../global/icons/question-mark-circle-outline.svg";
import "./styles.scss";

const AutoCrop = () => {
  const [checked, setChecked] = useState(false);
  return (
    <span className="toggle-group">
      <span className="text">Auto Crop</span>
      <label className="switch" onClick={() => setChecked(!checked)}>
        <input type="checkbox" />
        <span className="slider round"></span>
      </label>
      <img src={question} className="question-icon" alt="question" />
    </span>
  );
};

export default AutoCrop;
