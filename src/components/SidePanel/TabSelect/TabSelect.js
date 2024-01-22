import classNames from "classnames";
import { SUMMARY, TRANSCRIPT } from "../consts";
import "./styles.scss";

const TabSelect = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="tab-group">
      <span
        className={classNames("tab-category", {
          selected: selectedTab === TRANSCRIPT,
        })}
        onClick={() => setSelectedTab(TRANSCRIPT)}
      >
        Transcript
      </span>
      <span
        className={classNames("tab-category", {
          selected: selectedTab === SUMMARY,
        })}
        onClick={() => setSelectedTab(SUMMARY)}
      >
        Summary
      </span>
    </div>
  );
};

export default TabSelect;
