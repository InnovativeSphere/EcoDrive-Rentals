import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // adjust the path if needed
import rentalReducer from "./rentalSlice";
import complaintReducer from "./complaintSlice";

// Create the store
export const store = configureStore({
  reducer: {
    user: userReducer,
    rentals: rentalReducer,
    complaints : complaintReducer
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // useful if JWT tokens or Dates are stored
    }),
});

// Infer types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
