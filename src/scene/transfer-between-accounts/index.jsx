import { useState } from "react";
import TransferBetweenAccountsInputSection from "./section/input";
import TransferBetweenAccountsSummarySection from "./section/summary";

const TransferBetweenAccountsScene = () => {
  const [transferBetweenAccountsInfo, setTransferBetweenAccountsInfo] =
    useState();

  const [currentSection, setCurrentSection] = useState(`input`);

  return currentSection == `input` ? (
    <TransferBetweenAccountsInputSection
      setCurrentSection={setCurrentSection}
      setTransferBetweenAccountsInfo={setTransferBetweenAccountsInfo}
      transferBetweenAccountsInfo={transferBetweenAccountsInfo}
    />
  ) : (
    <TransferBetweenAccountsSummarySection
      transferBetweenAccountsInfo={transferBetweenAccountsInfo}
      setCurrentSection={setCurrentSection}
    />
  );
};

export default TransferBetweenAccountsScene;
