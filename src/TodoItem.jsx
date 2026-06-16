const TodoItem = ({ item, toggleTask, deleteTask }) => {
  return (
    <li
      style={{
        textDecoration: item.complete ? "line-through" : "none",
        opacity: item.complete ? 0.5 : 1,
      }}
    >
      <input
        type="checkbox"
        checked={item.complete}
        onChange={() => toggleTask(item.id)}
      />

      {item.text}
      <button onClick={() => deleteTask(item.id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
