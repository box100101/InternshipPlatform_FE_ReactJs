import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import registerSlice from "./slices/main/register/registerSlice";
import notificationSlice from "./slices/notifications/notificationSlice";
import userSlice from "./slices/Admin/user/userSlice";
import companySlice from "./slices/Admin/company/companySlice";
import universitySlice from "./slices/Admin/university/unversitySlice";
import majorSlice from "./slices/Admin/major/majorSlice";

const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
    notification: notificationSlice.reducer,
    user: userSlice.reducer,
    company: companySlice.reducer,
    university: universitySlice.reducer,
    major: majorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
