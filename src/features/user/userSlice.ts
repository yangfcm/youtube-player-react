import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  profile: {
    email: string;
    username: string;
    lastName: string;
    firstName: string;
    avatar: string;
  } | null;
}

const initialState: UserState = {
  id: null,
  profile: null,
};
