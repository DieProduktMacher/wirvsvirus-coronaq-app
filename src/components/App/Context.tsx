import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState
} from "react";
import { googleMapsGeocodeEntry } from "../models/map";

interface State {
  address: googleMapsGeocodeEntry | null;
}

const initialState: State = {
  address: null
};

type Action =
  | { type: "setAddress"; address: googleMapsGeocodeEntry }
  | { type: "removeAddress" };

interface actions {
  setAddress: (address: googleMapsGeocodeEntry) => void;
  removeAddress: () => void;
}

const Context = createContext<[State, actions]>([
  initialState,
  {
    setAddress: address => {},
    removeAddress: () => {}
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
      }
    };
  }, [dispatch]);

  // get inital login status
  useEffect(() => {
    (async () => {
      const address = localStorage.getItem("address");
      if (address && !address === undefined) {
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
