import http from "../http-common";
import TasksData from "../types/tasks";

const getAll = () => {
console.log(http.get("/grupa/"))
  return http.get("/grupa/");
};

const get = (id: any) => {
  return http.get<TasksData>(`/tasks/${id}`);
};

const create = (data: TasksData) => {
  return http.post<TasksData>("/tasks", data);
};

const update = (id: any, data: TasksData) => {
  return http.put<any>(`/tasks/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/tasks/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/tasks`);
};

const findByTitle = (title: string) => {
  return http.get<Array<TasksData>>(`/tasks?title=${title}`);
};

const TasksService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default TasksService;