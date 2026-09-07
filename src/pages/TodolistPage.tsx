import TaskCard from "../components/TaskCard";
import TodoModal from "../components/Modal";
import { type TaskCardProps } from "../libs/Todolist";
import { useEffect, useState } from "react";

const defaultTasks: TaskCardProps[] = [];

const STORAGE_KEY = "lab13.tasks";

// อ่านค่าเก่าจาก localStorage (เก็บได้แค่ string จึงต้อง JSON.parse กลับเป็น array)
function loadTasks(): TaskCardProps[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultTasks;
  } catch {
    return defaultTasks; // เผื่อข้อมูลใน localStorage เสีย
  }
}

function App() {
  const [tasks, setTasks] = useState<TaskCardProps[]>(loadTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = (newTask: TaskCardProps) => {
    setTasks([...tasks, newTask]);
    // console.log("TODO handleAdd", newTask);
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    // console.log("TODO deleteTask", taskId);
  };

  const toggleDoneTask = (taskId: string) => {
    setTasks(
      tasks.map((t) => (t.id == taskId ? { ...t, isDone: !t.isDone } : t)),
    );
    // console.log("TODO toggleDoneTask", taskId);
  };

  return (
    <div className="col-12 m-2 p-0">
      <div className="container text-center">
        <h2>Todo List</h2>
        <div className="container text-center px-4">
          <div className="row gx-3 px-3 rounded bg-warning bg-opacity-25">
            <div className="col">
              <div className="p-2 text-primary">All : {tasks.length}</div>
            </div>
            <div className="col">
              <div className="text-success p-2">
                Done : {tasks.filter((t) => t.isDone == true).length}
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
            type="button"
            className="btn btn-primary my-3"
            data-bs-toggle="modal"
            data-bs-target="#todoModal"
          >
            Add
          </button>
        </div>

        <TodoModal onAdd={handleAdd} />
        <>
          {tasks.map((task) => (
            <TaskCard
              id={task.id}
              title={task.title}
              description={task.description}
              deleteTaskFunc={deleteTask}
              toggleDoneTaskFunc={toggleDoneTask}
              isDone={task.isDone}
              key={task.id}
            />
          ))}
        </>
      </div>
    </div>
  );
}

export default App;
