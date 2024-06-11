import { useEffect, useState } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export function useStore() {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier) => {
    const newState = actions[actionIdentifier](globalState);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    listeners.push(setState);
    return () => {
      listeners = listeners.filter((li) => li !== setState);
    };
  }, []);

  return [globalState, dispatch];
}

export default useStore;

export function initStore(userActions, initialState) {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
}