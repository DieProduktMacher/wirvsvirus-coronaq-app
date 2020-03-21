import React from "react";
import { useContextState } from "../App/Context";

export const Question = () => {
  const [state] = useContextState();

  return (
    <div className="question">
      question
      <div>address: {state.address?.formatted_address}</div>
    </div>
  );
};
