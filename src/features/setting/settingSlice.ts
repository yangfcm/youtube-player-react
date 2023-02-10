import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RootState } from "../../app/store";
import { fetchRegionsAPI, fetchVideoCategoriesAPI } from "./settingAPI";
import { CategoriesResponse, RegionsResponse, SettingState } from "./types";

const initialState: SettingState = {
  openSidebar: false,
  darkTheme: false,
};

export const fetchRegions = createAsyncThunk(
  "setting/fetchRegions",
  async () => {
    return await fetchRegionsAPI();
  }
);
export const fetchCategories = createAsyncThunk(
  "setting/fetchCategories",
  async (regionCode: string) => {
    return await fetchVideoCategoriesAPI(regionCode);
  }
);

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
  extraReducers: (builder) => {
    const fetchRegionsStart = () => {};
    const fetchRegionsSuccess = () => {};
    const fetchRegionsFail = () => {};
    const fetchCategoriesStart = () => {};
    const fetchCategoriesSuccess = (
      state: SettingState,
      { payload }: { payload: AxiosResponse<CategoriesResponse> }
    ) => {
      state.categories = payload.data;
    };
    const fetchCategoriesFail = () => {};

    builder
      .addCase(fetchRegions.pending, fetchRegionsStart)
      .addCase(fetchRegions.fulfilled, fetchRegionsSuccess)
      .addCase(fetchRegions.rejected, fetchRegionsFail)
      .addCase(fetchCategories.pending, fetchCategoriesStart)
      .addCase(fetchCategories.fulfilled, fetchCategoriesSuccess)
      .addCase(fetchCategories.rejected, fetchCategoriesFail);
  },
});

export const { setOpenSidebar, setDarkTheme } = settingSlice.actions;

export const selOpenSidebar = (state: RootState) => state.setting.openSidebar;

export const settingReducer = settingSlice.reducer;
