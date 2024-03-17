import { useCalendarStore } from '../../hooks';

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected, isNewNote } = useCalendarStore();

  const handleDelete = () => {
    startDeletingEvent();
  };

  return (
    <button
      aria-label="btn-delete"
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      style={{
        display: hasEventSelected && !isNewNote ? '' : 'none',
      }}
    >
      <i className="fas fa-trash-alt" />
    </button>
  );
};
