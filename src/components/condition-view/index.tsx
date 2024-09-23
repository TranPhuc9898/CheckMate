import React from "react";

interface IConditionView {
  condition: boolean;
  viewTrue?: any;
  viewFalse?: any;
}

const ConditionView: React.FunctionComponent<IConditionView> = ({ condition, viewTrue, viewFalse }) => {
  if (condition) {
    return viewTrue ? viewTrue : null;
  }
  return viewFalse ? viewFalse : null;
};

export default ConditionView;
