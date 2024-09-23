import * as React from "react";

import { useAppSelector } from "hooks/redux-store";

import ConditionUpgradePremium from "../components/conditions";
import RegulationPremium from "../components/regulations";

interface IInstructionTrainingPremium {
  dataQuiz?: any;
  onStart?: () => void;
}

const InstructionTrainingPremium = (props: IInstructionTrainingPremium) => {
  const { user } = useAppSelector((state) => state.app);
  // Nếu là premium thì Hiển thị Quy định hoạt động
  if (user?.isPremiumTasker) {
    return <RegulationPremium />;
  }
  // Đối với Tasker thường thì hiển thị điều kiện để trở thành tasker Premium
  return <ConditionUpgradePremium {...props} />;
};
export default InstructionTrainingPremium;
