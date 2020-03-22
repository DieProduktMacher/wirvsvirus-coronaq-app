import React, { useEffect } from "react";
import { useAppState } from "../App/State";

export const Question = () => {
  const [state, actions] = useAppState();

  useEffect(() => {
    actions.setStep(2);
  }, [actions]);

  return (
    <div className="question">
      question
      <div>location: {state.location?.formatted_address}</div>
    </div>
  );
};
