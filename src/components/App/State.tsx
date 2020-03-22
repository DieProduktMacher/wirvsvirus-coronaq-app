import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useMemo
} from "react";
import { googleMapsGeocodeEntry } from "../models/map";

const NUMBER_OF_STEPS = 5;

interface State {
  address: googleMapsGeocodeEntry | null;
  progress: number;
}

const initialState: State = {
  address: null,
  progress: 0
};

type Action =
  | { type: "setLocation"; address: googleMapsGeocodeEntry }
  | { type: "resetLocation" }
  | { type: "setStep"; step: number };

interface actions {
  setLocation: (address: googleMapsGeocodeEntry) => void;
  resetLocation: () => void;
  setStep: (step: number) => void;
}

const StateContext = createContext<[State, actions]>([
  initialState,
  {
    setLocation: address => {},
    resetLocation: () => {},
    setStep: step => {}
  }
]);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setLocation":
      return {
        ...state,
        address: action.address
      };
    case "resetLocation":
      return {
        ...state,
        address: null
      };
    case "setStep":
      return {
        ...state,
        progress: Math.ceil((100 * action.step) / NUMBER_OF_STEPS)
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
      setLocation: (address: googleMapsGeocodeEntry) => {
        localStorage.setItem("address", JSON.stringify(address));
        dispatch({ type: "setLocation", address: address });
      },
      resetLocation: () => {
        localStorage.removeItem("address");
        dispatch({ type: "resetLocation" });
      },
      setStep: (step: number) => {
        dispatch({ type: "setStep", step });
      }
    };
  }, [dispatch]);

  // get inital login status
  useEffect(() => {
    (async () => {
      const address = localStorage.getItem("address");
      if (address && address !== "undefined") {
        dispatch({
          type: "setLocation",
          address: JSON.parse(address)
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
