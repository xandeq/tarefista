import React from 'react';
import TaskItem from './TaskItem';
import { List, ListItem } from '@mui/material';

const TaskList = ({ tasks, toggleComplete, removeTask }) => {
    try {
        console.log(tasks)

        if (!Array.isArray(tasks)) {
            console.error("Tasks is not an array: ", tasks);
            return <div>Error: Tasks is not an array</div>;
        }

        return (
            <List>
                {tasks.length === 0 ? (
                    <p>No tasks available</p> // Renderiza uma mensagem se não houver tarefas
                ) : (
                    tasks.map((task, index) => (
                        <ListItem key={index}>
                        <TaskItem
                            key={index}
                            task={task}
                            toggleComplete={toggleComplete}
                            removeTask={removeTask}
                        />
                        </ListItem>
                    ))
                )}
            </List>
        );
    } catch (error) {
        console.error(error);
        return <div>Error: {error.message}</div>;
    }
};

export default TaskList;
