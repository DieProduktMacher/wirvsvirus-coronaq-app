import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useMemo
} from "react";
import { googleMapsGeocodeEntry } from "../models/map";
import { stepsCount } from "./Routes";

interface State {
  location: googleMapsGeocodeEntry | null;
  progress: number;
  question: string | null;
}

const initialState: State = {
  location: null,
  progress: 0,
  question: null
};

type Action =
  | { type: "setLocation"; location: googleMapsGeocodeEntry }
  | { type: "resetLocation" }
  | { type: "setStep"; step: number }
  | { type: "setQuestion"; question: string };

interface actions {
  setLocation: (location: googleMapsGeocodeEntry) => void;
  resetLocation: () => void;
  setStep: (step: number) => void;
  setQuestion: (question: string) => void;
}

const StateContext = createContext<[State, actions]>([
  initialState,
  {
    setLocation: location => {},
    resetLocation: () => {},
    setStep: step => {},
    setQuestion: string => {}
  }
]);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setLocation":
      return {
        ...state,
        location: action.location
      };
    case "resetLocation":
      return {
        ...state,
        location: null
      };
    case "setStep":
      return {
        ...state,
        progress: Math.ceil((100 * action.step) / stepsCount)
      };
    case "setQuestion":
      return {
        ...state,
        question: action.question
      };
    default:
      return state;
  }
};

export const StateProvider: React.ComponentType = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setloading] = useState(true);

  const actions = useMemo(() => {
    return {
      setLocation: (location: googleMapsGeocodeEntry) => {
        localStorage.setItem("location", JSON.stringify(location));
        dispatch({ type: "setLocation", location: location });
      },
      resetLocation: () => {
        localStorage.removeItem("location");
        dispatch({ type: "resetLocation" });
      },
      setStep: (step: number) => {
        dispatch({ type: "setStep", step });
      },
      setQuestion: (question: string) => {
        localStorage.setItem("question", JSON.stringify(question));
        dispatch({ type: "setQuestion", question });
      }
    };
  }, [dispatch]);

  // get inital login status
  useEffect(() => {
    (async () => {
      const location = localStorage.getItem("location");
      if (location && location !== "undefined") {
        dispatch({
          type: "setLocation",
          location: JSON.parse(location)
        });
      }

      const question = localStorage.getItem("question");
      if (question && question !== "undefined") {
        dispatch({
          type: "setQuestion",
          question: JSON.parse(question)
        });
      }

      setloading(false);
    })();
  }, [dispatch]);

  return (
    <StateContext.Provider value={[state, actions]}>
      {loading ? null : children}
    </StateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(StateContext);
};
