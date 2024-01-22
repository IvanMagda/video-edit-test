import { useState } from "react";
import VideoPreview from "../../components/Video/VideoPreview";
import Controls from "../../components/Controls/Controls";
import Captions from "../../components/SidePanel/SidePanel";
import EditorContext from "./context";
import "./styles.scss";

const Main = () => {
  const [context, setContext] = useState({
    play: false,
    currentTime: 0,
    audioSelectStart: 25,
    audioSelectEnd: 75,
    videoSelectStart: 25,
    videoSelectEnd: 75,
    targetTime: 0,
  });

  return (
    <div className="main">
      <EditorContext.Provider
        value={[context, (update) => setContext({ ...context, ...update })]}
      >
        <div className="left-column">
          <VideoPreview />
          <Controls />
        </div>
        <div className="right-column">
          <Captions />
        </div>
      </EditorContext.Provider>
    </div>
  );
};

export default Main;
