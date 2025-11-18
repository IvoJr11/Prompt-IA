// Modelo de Tarea (Task)
class Task {
  constructor(id, title, description, completed = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
  }
}

// Simulación de base de datos en memoria
const tasks = [];

module.exports = { Task, tasks };