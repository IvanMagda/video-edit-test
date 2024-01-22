import { useContext, useEffect, useState } from "react";
import CheckBox from "./CheckBox/CheckBox";
import EditorContext from "../../../pages/Main/context";
import { LOGO_TOP_LEFT, LOGO_TOP_RIGHT } from "./utils";
import "./styles.scss";

const Properties = () => {
  const [logoEnabled, setLogoEnabled] = useState(false);
  const [logoPosition, setLogoPosition] = useState(LOGO_TOP_LEFT);
  const [, setContext] = useContext(EditorContext);

  useEffect(() => {
    setContext({ logoPosition });
  }, [logoEnabled, logoPosition]);

  return (
    <span className="properties">
      <span className="text">Properties: </span>
      <CheckBox label="Subtitles" />
      <CheckBox
        label="Add Intro"
        onClick={(e) => setContext({ addIntro: e.target.checked })}
      />
      <CheckBox
        label="Add Outro"
        onClick={(e) => setContext({ addOutro: e.target.checked })}
      />
      <CheckBox
        label="Add Logo on"
        onClick={(e) => {
          setLogoEnabled(e.target.checked);
          setContext({ logoEnabled: e.target.checked });
        }}
      />
      <select
        className="logo-select"
        disabled={!logoEnabled}
        onChange={(e) => setLogoPosition(e.target.value)}
      >
        <option value={LOGO_TOP_LEFT}>Top left</option>
        <option value={LOGO_TOP_RIGHT}>Top right</option>
      </select>
    </span>
  );
};

export default Properties;
