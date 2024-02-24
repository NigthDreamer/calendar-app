import { useCalendarStore } from '../../hooks';

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected, isNewNote } = useCalendarStore();

  console.log(isNewNote);

  const handleDelete = () => {
    startDeletingEvent();
  };

  return (
    <button
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
