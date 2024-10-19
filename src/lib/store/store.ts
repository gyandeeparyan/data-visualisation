import { configureStore } from '@reduxjs/toolkit'
import authSlice from "@/lib/store/features/authSlice";
import analyticsSlice from "@/lib/store/features/analyticsSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      analytics: analyticsSlice,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']