import { Box, Button, Checkbox, Typography } from "@mui/material";
import React from "react";

const TaskItem = ({ task, toggleComplete, removeTask }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <Checkbox
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Typography
        sx={{
          textDecoration: task.completed ? 'line-through' : 'none',
          flexGrow: 1
        }}
      >
        {task.text}
      </Typography>
      <Button variant="contained" color="secondary" onClick={() => removeTask(task.id)}>
        Remover
      </Button>
    </Box>
  );
};

export default TaskItem;
