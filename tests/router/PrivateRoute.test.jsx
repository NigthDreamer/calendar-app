import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { PrivateRoute } from '../../src/router/PrivateRoute';
import { LoginPage } from '../../src/auth';
import { CalendarPage } from '../../src/calendar';

/* eslint-disable no-undef */
jest.mock('../../src/hooks/useAuthStore');

/**
 * Hago un mock del componente CalendarPage para evitar tener que renderizar
 * el componente completo, lo que implica mockear el store, todos los hooks que
 * use, inicializar el estado de los slices... etc.
 */
jest.mock('../../src/calendar', () => ({
  CalendarPage: () => <h1>CalendarPage</h1>
}));

describe('Pruebas en <AppRouter/>', () => {
  const mockCheckAuthToken = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {
    useAuthStore.mockReturnValue({
      status: 'checking',
      checkAuthToken: mockCheckAuthToken,
    });

    render(<PrivateRoute/>);

    expect(screen.getByText('Cargando...')).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  test('Debe de mostrar el login en caso de no estar autenticado', () => {
    useAuthStore.mockReturnValue({
      status: 'not-authenticated',
      checkAuthToken: mockCheckAuthToken,
    });

    /**
     * Hay que definir las rutas que vamos a probar en el MemoryRouter. En este caso
     * la ruta calendar representara una ruta privada y auth/login la ruta publica.
     * Al navegar a calendar, al ser una ruta privada y como nuestro status es 
     * 'not-authenticated', nos redireccionará a auth/login
     */
    const {container} = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <h1>Ruta Privada</h1>
              </PrivateRoute>
            }
          />
          <Route path="auth/login" element={<LoginPage/>} />
        </Routes>
      </MemoryRouter>
    );

    screen.debug();
    expect(screen.getByText('Ingreso')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  
  test('Debe de mostrar el calendario si estamos autenticados', () => {
    useAuthStore.mockReturnValue({
      status: 'authenticated',
      checkAuthToken: mockCheckAuthToken,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                {/* Este componente esta mockeado */}
                <CalendarPage/> 
              </PrivateRoute>
            }
          />
          <Route path="auth/login" element={<LoginPage/>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('CalendarPage')).toBeTruthy();
  });
});
