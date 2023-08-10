import "./styles.css";
import InputSection from "./section/input";
import { useState } from "react";
import SplitBillSummary from "./section/summary";

const SplitBillScene = () => {
  const [splitInfo, setSplitInfo] = useState();

  const [currentSection, setCurrentSection] = useState(`input`);

  return currentSection == `input` ? (
    <InputSection
      setCurrentSection={setCurrentSection}
      setSplitInfo={setSplitInfo}
      splitInfo={splitInfo}
    />
  ) : (
    <SplitBillSummary
      splitInfo={splitInfo}
      setCurrentSection={setCurrentSection}
    />
  );
};

export default SplitBillScene;
