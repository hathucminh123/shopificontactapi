import ProjectTask from "../models/projectTask.model.js";
import User from "../models/users.model.js";

export const listTasksByProject = async (projectId) => {
  return ProjectTask.findAll({
    where: { project_id: projectId },
    order: [["status", "ASC"], ["order_index", "ASC"], ["id", "ASC"]],
    include: [{ model: User, as: "assignee", attributes: ["id", "name", "email"] }],
  });
};

export const createTask = async (payload) => {
  // nếu không truyền order_index, đẩy về cuối cột
  if (payload.order_index == null) {
    const count = await ProjectTask.count({ where: { project_id: payload.project_id, status: payload.status || "todo" } });
    payload.order_index = count;
  }
  return ProjectTask.create(payload);
};

export const updateTask = async (id, updates) => {
  const task = await ProjectTask.findByPk(id);
  if (!task) throw new Error("Task not found");
  await task.update(updates);
  return task;
};

export const deleteTask = async (id) => {
  const task = await ProjectTask.findByPk(id);
  if (!task) throw new Error("Task not found");
  await task.destroy();
  return true;
};

/**
 * Kéo thả (thay cột + sắp xếp lại)
 * body: { status, order_index, project_id }
 */
export const moveTask = async (id, { status, order_index, project_id }) => {
  const task = await ProjectTask.findByPk(id);
  if (!task) throw new Error("Task not found");

  const sameColumnTasks = await ProjectTask.findAll({
    where: { project_id, status },
    order: [["order_index", "ASC"]],
  });

  // chèn vào vị trí mới
  sameColumnTasks.splice(order_index, 0, task);
  // gán lại order_index tuần tự
  await Promise.all(
    sameColumnTasks.map((t, idx) =>
      t.update({ status, order_index: idx })
    )
  );
  return await ProjectTask.findByPk(id, { include: [{ model: User, as: "assignee" }] });
};
