import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from '../../../src/store/calendar/calendarSlice';
import {
  calendarWithActiveEventsState,
  calendarWithEventsState,
  events,
  initialState,
} from '../../fixtures/calendarStates';

/* eslint-disable no-undef */
describe('Pruebas en calendarSlice', () => {
  test('Debe de devolver el estado por defecto ', () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test('onSetActiveEvent debe de activar el evento', () => {
    const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));
    expect(state.activeEvent).toEqual(events[0]);
  });

  test('onAddNewEvent debe de agregar el evento', () => {
    const newEvent = {
      id: '3',
      start: new Date('2020-10-21 13:00:00'),
      end: new Date('2020-10-21 15:00:00'),
      title: 'Cumpleaños de Fernando!!',
      notes: 'Alguna nota!!',
    };

    const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));

    expect(state.events).toContain(newEvent);
  });

  test('onUpdateEvent debe de actualizar el evento', () => {
    const updatedEvent = {
      id: '1',
      start: new Date('2020-10-21 13:00:00'),
      end: new Date('2020-10-21 15:00:00'),
      title: 'Cumpleaños de Fernando actualizado',
      notes: 'Alguna nota actualizada',
    };

    const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent));

    expect(state.events).toContain(updatedEvent);
  });

  test('onDeleteEvent debe de borrar el evento', () => {
    const deleteEvent = {
      id: '1',
      start: new Date('2020-10-21 13:00:00'),
      end: new Date('2020-10-21 15:00:00'),
      title: 'Cumpleaños de Fernando actualizado',
      notes: 'Alguna nota actualizada',
    };

    const state = calendarSlice.reducer(calendarWithActiveEventsState, onDeleteEvent(deleteEvent));

    expect(state.events).not.toContain(events[0]);
  });

  test('onLoadEvents debe de establecer los eventos', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));

    expect(state.isLoadingEvents).toBeFalsy();
    expect(state.events).toEqual(events);

    calendarSlice.reducer(state, onLoadEvents(events));
    expect(state.events.length).toBe(events.length);
  });

  test('onLogoutCalendar debe de limpiar el estado', () => {
    const state = calendarSlice.reducer(calendarWithActiveEventsState, onLogoutCalendar());

    expect(state).toEqual(initialState);
  });
});
