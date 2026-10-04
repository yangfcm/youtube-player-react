import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RootState } from "../../app/store";
import {
  DEFAULT_COUNTRY_CODE,
  ALLOWED_COUNTRY_CODES,
} from "../../settings/constant";
import { fetchLocationAPI, fetchVideoCategoriesAPI } from "./settingAPI";
import { CategoriesResponse, LocationResponse, SettingState } from "./types";

const initialState: SettingState = {
  openSidebar: false,
  darkTheme: false,
};

export const fetchLocation = createAsyncThunk(
  "setting/fetchLocation",
  async () => {
    return await fetchLocationAPI();
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
    const fetchLocationStart = () => {};
    const fetchLocationSuccess = (
      state: SettingState,
      { payload }: { payload: AxiosResponse<LocationResponse> }
    ) => {
      const { countryCode } = payload.data;
      state.location = ALLOWED_COUNTRY_CODES.includes(countryCode)
        ? payload.data.countryCode
        : DEFAULT_COUNTRY_CODE;
    };
    const fetchLocationFail = (state: SettingState) => {
      state.location = DEFAULT_COUNTRY_CODE;
    };
    const fetchCategoriesStart = () => {};
    const fetchCategoriesSuccess = (
      state: SettingState,
      { payload }: { payload: AxiosResponse<CategoriesResponse> }
    ) => {
      state.categories = payload.data;
    };
    const fetchCategoriesFail = () => {};

    builder
      .addCase(fetchLocation.pending, fetchLocationStart)
      .addCase(fetchLocation.fulfilled, fetchLocationSuccess)
      .addCase(fetchLocation.rejected, fetchLocationFail)
      .addCase(fetchCategories.pending, fetchCategoriesStart)
      .addCase(fetchCategories.fulfilled, fetchCategoriesSuccess)
      .addCase(fetchCategories.rejected, fetchCategoriesFail);
  },
});

export const { setOpenSidebar, setDarkTheme } = settingSlice.actions;

export const selOpenSidebar = (state: RootState) => state.setting.openSidebar;

export const settingReducer = settingSlice.reducer;
