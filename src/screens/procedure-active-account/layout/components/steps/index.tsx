import { FC } from "react";
import { stepName } from "../..";
import ActiveAccount from "./layout/active-account";
import AdmissionTest from "./layout/admission-test";
import BasicTraining from "./layout/basic-training";

export interface IStepActiveAccount {
  data: any;
  name: string;
  callback: any;
  permission: string;
  numberOfStep: number;
  showOnlyActiveAccount?: boolean;
}

const StepActiveAccount: FC<IStepActiveAccount> = (props) => {
  const steps = new Map([
    [stepName.step1, <AdmissionTest {...props}/>],
    [stepName.step2, <BasicTraining {...props}/>],
    [stepName.step3, <ActiveAccount {...props}/>]
  ]);
  return steps.get(props.name);
};
export default StepActiveAccount;