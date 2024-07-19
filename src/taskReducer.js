export const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, { id: action.id, text: action.text, completed: false }];
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.id ? { ...task, completed: !task.completed } : task
      );
    case "REMOVE_TASK":
      return state.filter((task) => task.id !== action.id);
    case "SET_TASKS":
      return action.tasks;
    default:
      return state;
  }
};
