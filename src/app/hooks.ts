import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const usePoll = (
  callback: Function,
  config: { interval: number },
  ...deps: unknown[]
) => {
  const { interval } = config;
  useEffect(() => {
    const pollInterval = setInterval(callback, interval);
    return () => clearInterval(pollInterval);
  }, [callback, interval, deps]);
};
