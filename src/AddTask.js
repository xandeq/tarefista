import "./App.css";
import React, { useState } from "react";
import "firebase/analytics";
import "firebase/auth";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { Button, TextField } from "@mui/material";
import { Box, Container, Typography } from "@mui/material";

const firebaseConfig = {
  apiKey: "AIzaSyC3tzna3npRAunU6vHulIXTX6-ALOYNMRg",
  authDomain: "tarefista.firebaseapp.com",
  projectId: "tarefista",
  storageBucket: "tarefista.appspot.com",
  messagingSenderId: "104050667822",
  appId: "1:104050667822:web:515935d732fc3aaf228abf",
  measurementId: "G-QJPPMWLBZY",
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function AddTask({ setTasks }) {
  const [newTask, setNewTask] = useState("");
  console.log("newTask: ", newTask);
  const addTask = async () => {
    try {
      if (newTask.trim() === "") {
        alert("Task cannot be empty");
        return;
      }
      const newTaskRef = await db
        .collection("tasks")
        .add({ text: newTask, completed: false });
      console.log("Tarefa adicionada com sucesso: ", newTaskRef.id);
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: newTaskRef.id, text: newTask, completed: false },
      ]);
      setNewTask("");
    } catch (error) {
      console.error("Erro ao adicionar tarefa: ", error);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
      <TextField
        label="Nova Tarefa"
        variant="outlined"
        fullWidth
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={addTask}>
        Adicionar Tarefa
      </Button>
    </Box>
    // <div>
    //   <input
    //     type="text"
    //     value={newTask}
    //     onChange={(e) => setNewTask(e.target.value)}
    //   />
    //   <button onClick={addTask}>Adicionar Tarefa</button>
    // </div>
  );
}

export default AddTask;
