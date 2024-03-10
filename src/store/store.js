import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './ui'; //Si se importa dese ./ da fallo
import { calendarSlice } from './calendar';
import { authSlice } from './auth';

export const store = configureStore({
  reducer: {
    ui:       uiSlice.reducer,
    calendar: calendarSlice.reducer,
    auth:     authSlice.reducer,
  },
  //* Para evitar que redux revise si las fechas se pueden serializar
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
