import { act, renderHook } from '@testing-library/react';
import { useUiStore } from '../../src/hooks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from '../../src/store';

//* Creo un mock del store con el reducer del ui y un estado inicial
const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

/* eslint-disable no-undef */
describe('Pruebas en useUiStore', () => {
  test('Debe de devolver los valores por defecto', () => {
    //* Seteo el estado del mock del store co un nuevo estado
    const mockStore = getMockStore({ isDateModalOpen: false });

    //* Renderizo el hook con el mock del store y su estado para hacer las pruebas
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    //* Hago la asercion de los valores por defecto
    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
    });
  });

  test('openDateModal debe de setear en true el isDateModalOpen', () => {
    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    //* isDateModalOpen es un primitivo, lo cual da una copia por valor, no cambia su valor.
    const { /*isDateModalOpen,*/ openDateModal } = result.current;
    // console.log({result: result.current, isDateModalOpen})

    //* Si la funcion a ejecutar cambia el state de React, hay que envolverla en el act
    act(() => {
      openDateModal();
    });

    expect(result.current.isDateModalOpen).toBeTruthy();
  });

  test('closeDateModal debe de colocar false en isDateModalOpen', () => {
    const mockStore = getMockStore({ isDateModalOpen: true });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    act(() => {
      result.current.closeDateModal();
    });

    expect(result.current.isDateModalOpen).toBeFalsy();
  });
});
