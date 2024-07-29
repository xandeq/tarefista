const admin = require('firebase-admin');
const db = admin.firestore();

exports.getTasks = async (req, res) => {
  try {
    const tasksSnapshot = await db.collection('tasks').get();
    const tasks = tasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send('Error getting tasks');
  }
};

exports.addTask = async (req, res) => {
  try {
    const newTask = {
      text: req.body.text,
      completed: false,
    };
    const taskRef = await db.collection('tasks').add(newTask);
    res.status(201).json({ id: taskRef.id, ...newTask });
  } catch (error) {
    res.status(500).send('Error adding task');
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = req.body;
    await db.collection('tasks').doc(id).update(updatedTask);
    res.status(200).send('Task updated successfully');
  } catch (error) {
    res.status(500).send('Error updating task');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('tasks').doc(id).delete();
    res.status(200).send('Task deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting task');
  }
};
