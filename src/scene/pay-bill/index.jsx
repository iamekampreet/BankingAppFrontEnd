import { useState } from "react";
import PayBillInputSection from "./section/input";
import PayBillSummarySection from "./section/summary";

const PayBillScene = () => {
  const [payBillInfo, setPayBillInfo] = useState();

  const [currentSection, setCurrentSection] = useState(`input`);

  return currentSection == `input` ? (
    <PayBillInputSection
      setCurrentSection={setCurrentSection}
      setPayBillInfo={setPayBillInfo}
      payBillInfo={payBillInfo}
    />
  ) : (
    <PayBillSummarySection
      payBillInfo={payBillInfo}
      setCurrentSection={setCurrentSection}
    />
  );
};

export default PayBillScene;
