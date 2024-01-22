import { useState } from "react";
import Transcript from "./Transcript/Transcript";
import Search from "./Search/Search";
import TabSelect from "./TabSelect/TabSelect";
import Summary from "./Summary/Summary";
import { TRANSCRIPT, SUMMARY } from "./consts";
import "./styles.scss";

const SidePanel = () => {
  const [selectedTab, setSelectedTab] = useState(TRANSCRIPT);
  return (
    <div className="side-panel">
      <TabSelect selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <Search />
      {selectedTab === TRANSCRIPT && <Transcript />}
      {selectedTab === SUMMARY && <Summary />}
    </div>
  );
};

export default SidePanel;
