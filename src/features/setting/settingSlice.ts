import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface SettingState {
  openSidebar: boolean;
}

const initialState: SettingState = {
  openSidebar: false,
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.openSidebar = action.payload;
    },
  },
});

export const { setOpenSidebar } = settingSlice.actions;

export const selOpenSidebar = (state: RootState) => state.setting.openSidebar;

export const settingReducer = settingSlice.reducer;
