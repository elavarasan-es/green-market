import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./RootReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useReduxSelector : TypedUseSelectorHook<RootState> = useSelector;
export default store;