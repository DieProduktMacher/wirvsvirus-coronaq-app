import React, { createContext, useContext, useReducer } from "react";
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
    setAddress: async loginData => {},
    removeAddress: async () => {}
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

  const actions = React.useMemo(() => {
    return {
      setAddress: (address: googleMapsGeocodeEntry) => {
        dispatch({ type: "setAddress", address: address });
      },
      removeAddress: () => {
        dispatch({ type: "removeAddress" });
      }
    };
  }, [dispatch]);

  return (
    <Context.Provider value={[state, actions]}>{children}</Context.Provider>
  );
};

export const useContextState = () => {
  return useContext(Context);
};
