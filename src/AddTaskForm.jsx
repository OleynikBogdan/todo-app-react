const AddTaskForm = ({ task, setTask, addTask }) => {
  return (
    <div>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
    </div>
  );
};

export default AddTaskForm;
