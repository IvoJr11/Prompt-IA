
// Importa el modelo Task y el arreglo en memoria donde se almacenan las tareas
const { Task, tasks } = require('../models/task');


// Devuelve todas las tareas almacenadas en el arreglo
const getAllTasks = (req, res) => {
  res.json(tasks);
};


// Busca y retorna una tarea por su ID. Si el ID no es válido o no existe, responde con el error adecuado
const getTaskById = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'El parámetro id debe ser un número válido' });
  }
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
  res.json(task);
};


// Crea una nueva tarea con los datos recibidos en el body y la agrega al arreglo
const createTask = (req, res) => {
  const { title, description, completed } = req.body;
  // Validación de campos obligatorios
  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ message: 'El campo title es obligatorio y debe ser un string no vacío' });
  }
  if (typeof description !== 'string' || description.trim() === '') {
    return res.status(400).json({ message: 'El campo description es obligatorio y debe ser un string no vacío' });
  }
  // Genera un ID incremental para la nueva tarea
  const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
  // Convierte completed a booleano si es string
  let completedValue = completed;
  if (typeof completedValue === 'string') {
    completedValue = completedValue.toLowerCase() === 'true';
  } else if (typeof completedValue !== 'boolean') {
    completedValue = false;
  }
  const task = new Task(id, title, description, completedValue);
  tasks.push(task);
  res.status(201).json(task);
};


// Actualiza los campos de una tarea existente según el ID recibido
const updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'El parámetro id debe ser un número válido' });
  }
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
  const { title, description, completed } = req.body;
  // Validación opcional de campos si se envían
  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ message: 'El campo title debe ser un string no vacío' });
    }
    task.title = title;
  }
  if (description !== undefined) {
    if (typeof description !== 'string' || description.trim() === '') {
      return res.status(400).json({ message: 'El campo description debe ser un string no vacío' });
    }
    task.description = description;
  }
  if (completed !== undefined) {
    if (typeof completed === 'string') {
      task.completed = completed.toLowerCase() === 'true';
    } else {
      task.completed = Boolean(completed);
    }
  }
  res.json(task);
};


// Elimina una tarea del arreglo según el ID recibido
const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'El parámetro id debe ser un número válido' });
  }
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ message: 'Tarea no encontrada' });
  const deleted = tasks.splice(index, 1);
  res.json(deleted[0]);
};

// Exporta las funciones CRUD para ser usadas en las rutas
module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
