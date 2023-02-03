import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface SettingState {
  openSidebar: boolean;
  darkTheme: boolean;
}

const initialState: SettingState = {
  openSidebar: false,
  darkTheme: false,
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.openSidebar = action.payload;
    },
    setDarkTheme: (state, action: PayloadAction<boolean>) => {
      state.darkTheme = action.payload;
    },
  },
});

export const { setOpenSidebar, setDarkTheme } = settingSlice.actions;

export const selOpenSidebar = (state: RootState) => state.setting.openSidebar;

export const settingReducer = settingSlice.reducer;
