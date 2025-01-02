// 3
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import exampleApi from "../services/ExampleService"; //ได้จากไฟล์ index ใน  ExampleService

export const store = configureStore({
  reducer: {
    [exampleApi.reducerPath]: exampleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exampleApi.middleware),
});

setupListeners(store.dispatch);
