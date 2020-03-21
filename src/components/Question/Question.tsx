import React, { useEffect } from "react";
import { useContextState } from "../App/Context";

export const Question = () => {
  const [state, actions] = useContextState();

  useEffect(() => {
    actions.setStep(2);
  }, [actions]);

  return (
    <div className="question">
      question
      <div>address: {state.address?.formatted_address}</div>
    </div>
  );
};
