import "./App.css";
import React, { useEffect, useState } from "react";
import "firebase/analytics";
import "firebase/auth";
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Box, Container, Typography } from "@mui/material";
import { TaskProvider } from "./TaskContext";

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskCollection = await getDocs(collection(db, "tasks"));
        const tasksData = taskCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched tasks: ", tasksData); // Log para depuração
        setTasks(tasksData);
      } catch (error) {
        <div>Erro ao buscar tarefas: {error.message}</div>;
      }
    };
    fetchTasks();
  }, []);

  const toggleComplete = async (taskId) => {
    const taskDoc = doc(db, "tasks", taskId);
    const task = tasks.find((t) => t.id === taskId);
    await updateDoc(taskDoc, { completed: !task.completed });
    setTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const removeTask = async (taskId) => {
    const taskDoc = doc(db, "tasks", taskId);
    await deleteDoc(taskDoc);
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  return (
    <TaskProvider>
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Tarefista
          </Typography>
          <AddTask setTasks={setTasks} />
          <TaskList
            tasks={tasks}
            toggleComplete={toggleComplete}
            removeTask={removeTask}
          />
        </Box>
      </Container>
    </TaskProvider>
  );
}

export default App;
