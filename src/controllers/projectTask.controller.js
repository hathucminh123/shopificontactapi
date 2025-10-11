import {
  listTasksByProject,
  createTask,
  updateTask,
  deleteTask,
  moveTask,
} from "../services/projectTask.service.js";

export const getTasksByProject = async (req, res) => {
  try {
    const tasks = await listTasksByProject(req.params.projectId);
    res.json({ tasks });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const postTask = async (req, res) => {
  try {
    const task = await createTask(req.body);
    res.status(201).json({ task });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const putTask = async (req, res) => {
  try {
    const task = await updateTask(req.params.id, req.body);
    res.json({ task });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const removeTask = async (req, res) => {
  try {
    await deleteTask(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const patchMoveTask = async (req, res) => {
  try {
    const task = await moveTask(req.params.id, req.body);
    res.json({ task });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
