import {
  authSlice,
  onClearErrorMessage,
  onLogin,
  onLogout,
} from '../../../src/store/auth/authSlice';
import { authenticatedState, initialState } from '../../fixtures/authStates';
import { testUserCredentials } from './../../fixtures/testUser';

/* eslint-disable no-undef */
describe('Pruebas en authSlice', () => {
  test('Debe de devolver el estado incial', () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test('Debe de realizar un login', () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));

    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });

  test('Debe de realizar el logout', () => {
    const state = authSlice.reducer(authenticatedState, onLogout());

    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined,
    });
  });

  test('Debe de realizar el logout con error', () => {
    const errorMessage = 'Credenciales no válidas';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: errorMessage,
    });
  });

  test('Debe de borrar el mensage de error', () => {
    const errorMessage = 'Credenciales no válidas';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    const newState = authSlice.reducer(state, onClearErrorMessage());

    expect(newState.errorMessage).toBe(undefined);
  });
});
