import { Provider } from 'react-redux';
import { act, renderHook, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../src/store';
import { initialState, notAuthenticatedState } from './../fixtures/authStates';
import { useAuthStore } from '../../src/hooks';
import { testUserCredentials } from '../fixtures/testUser';
import calendarApi from '../../src/api/calendarApi';

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

/* eslint-disable no-undef */
describe('Pruebas en usAuthStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Debe de devolver los valores por defecto', () => {
    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    expect(result.current).toEqual({
      errorMessage: undefined,
      status: 'checking',
      user: {},
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function),
    });
  });

  test('El startLogin debe de realizar el login correctamente', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    //* El startLogin es una peticion contra el backend y es asíncrona
    await act(async () => {
      await result.current.startLogin({ ...testUserCredentials });
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test User', uid: '65ef3d335d3b2e4fc466b552' },
    });

    expect(localStorage.getItem('token')).toEqual(expect.any(String));
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
  });

  test('El startLogin debe de fallar la autenticacion', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.startLogin({ email: 'algo@google.com', password: '123456789' });
    });

    const { errorMessage, status, user } = result.current;

    expect(localStorage.getItem('token')).toBeNull();
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'Credenciales incorrectas',
      status: 'not-authenticated',
      user: {},
    });

    await waitFor(() => expect(result.current.errorMessage).toBeUndefined());
  });

  test('El startRegister debe de crear un usuario', async () => {
    const newUser = {
      email: 'algo@google.com',
      password: '123456789',
      name: 'Test User 2',
    };

    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    //* Hago un mock del resultado de la peticion post
    const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
      data: {
        ok: true,
        uid: '12312341',
        name: 'Test User',
        token: 'token-123-ABC',
      },
    });

    await act(async () => {
      await result.current.startRegister(newUser);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test User', uid: '12312341' },
    });

    //* Destruye el espia para evitar que otras peticiones post devuelvan el mockValue
    spy.mockRestore();
  });

  test('El startRegister debe de fallar la creacion', async() => {
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.startRegister(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: "Un usuario existe con ese correo",
      status: "not-authenticated",
      user: {},
    });
  });
  
  test('El checkAuthToken debe de fallar si no hay token', async() => {
    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'not-authenticated',
      user: {},
    });
  });
  
  test('El checkAuthToken debe de autenticar el usuario si hay un token', async() => {
    const { data } = await calendarApi.post('/auth', testUserCredentials);
    localStorage.setItem('token', data.token);

    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;
    
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test User', uid: '65ef3d335d3b2e4fc466b552' }
    });
  });
  
});
