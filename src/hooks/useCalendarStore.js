import { useSelector, useDispatch } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    if (calendarEvent.id) {
      // Actualizando
      try {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
      } catch (error) {
        console.error(error);
        Swal.fire('Error al actualizar', error.response.data.msg, 'error');
      }
    } else {
      // Creando
      try {
        const { data } = await calendarApi.post('/events', calendarEvent);
        dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
      } catch (error) {
        console.error(error);
        Swal.fire('Error al crear', error.response.data.msg, 'error');
      }
    }
  };

  const startDeletingEvent = async() => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.error(error);
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDateEvents(data.eventos);

      dispatch(onLoadEvents(events));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    //* Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    isNewNote: !!activeEvent && !activeEvent.id,

    //* Métodos
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
