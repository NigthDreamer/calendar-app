/* eslint-disable no-undef */
import { onCloseDateModal, onOpenDateModal, uiSlice } from '../../../src/store/ui/uiSlice';

describe('Pruebas en el uiSlice', () => {
  test('Debe de devolver el estado por defecto', () => {
    expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false });
  });

  test('Debe de cambiar el isDateModalOpen correctamente', () => {
    let state = uiSlice.getInitialState();

    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
