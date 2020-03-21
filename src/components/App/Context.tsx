import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState
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
  | { type: "setAddress"; address: googleMapsGeocodeEntry }
  | { type: "removeAddress" }
  | { type: "setStep"; step: number };

interface actions {
  setAddress: (address: googleMapsGeocodeEntry) => void;
  removeAddress: () => void;
  setStep: (step: number) => void;
}

const Context = createContext<[State, actions]>([
  initialState,
  {
    setAddress: address => {},
    removeAddress: () => {},
    setStep: step => {}
  }
]);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setAddress":
      return {
        ...state,
        address: action.address
      };
    case "removeAddress":
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

export const ContextProvider: React.ComponentType = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setloading] = useState(true);

  const actions = React.useMemo(() => {
    return {
      setAddress: (address: googleMapsGeocodeEntry) => {
        localStorage.setItem("address", JSON.stringify(address));
        dispatch({ type: "setAddress", address: address });
      },
      removeAddress: () => {
        localStorage.removeItem("address");
        dispatch({ type: "removeAddress" });
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
          type: "setAddress",
          address: JSON.parse(address)
        });
      }

      setloading(false);
    })();
  }, [dispatch]);

  return (
    <Context.Provider value={[state, actions]}>
      {loading ? null : children}
    </Context.Provider>
  );
};

export const useContextState = () => {
  return useContext(Context);
};
