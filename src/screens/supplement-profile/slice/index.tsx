import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";


interface ImageState {
  identityFrontImage: any;
  identityBackImage: any;
  curriculumFrontImage: any;
  curriculumBackImage: any;
  householdFrontImage: any;
  householdBackImage: any;
  certificateFrontImage: any;
  certificateBackImage: any;
}

const initialState: ImageState = {
  identityFrontImage: null,
  identityBackImage: null,
  curriculumFrontImage: null,
  curriculumBackImage: null,
  householdFrontImage: null,
  householdBackImage: null,
  certificateFrontImage: null,
  certificateBackImage: null,
};

export const UploadImageSlice = createSlice({
  name: "UploadImageSlice",
  initialState: initialState,
  reducers: {
    setIdentityFrontImage: (state, action) => {
      state.identityFrontImage = action.payload;
    },
    setIdentityBackImage: (state, action) => {
      state.identityBackImage = action.payload;
    },
    setCurriculumFrontImage: (state, action) => {
      state.curriculumFrontImage = action.payload;
    },
    setCurriculumBackImage: (state, action) => {
      state.curriculumBackImage = action.payload;
    },
    setHouseholdFrontImage: (state, action) => {
      state.householdFrontImage = action.payload;
    },
    setHouseholdBackImage: (state, action) => {
      state.householdBackImage = action.payload;
    },
    setCertificateFrontImage: (state, action) => {
      state.certificateFrontImage = action.payload;
    },
    setCertificateBackImage: (state, action) => {
      state.certificateBackImage = action.payload;
    },
    resetState: () => initialState,
  },
});

export default UploadImageSlice.reducer;

export const {
  setCertificateBackImage,
  setCertificateFrontImage,
  setIdentityFrontImage,
  setIdentityBackImage,
  setCurriculumFrontImage,
  setCurriculumBackImage,
  setHouseholdFrontImage,
  setHouseholdBackImage,
  resetState
} = UploadImageSlice.actions;

