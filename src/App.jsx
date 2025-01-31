import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import TaskTable from "./Components/TaskTable/TaskTable";
import ConfirmModal from "./Components/ConfirmModal/ConfirmModal";
import AddTaskModal from "./Components/AddTaskModal/AddTaskModal";
import Loader from "./Components/Loader/Loader";

const API_URL = "https://task-manager-basic-backend-1.onrender.com/https://task-manager-basic-backend-1.onrender.com/";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1000);
  const [modalShow, setModalShow] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [onConfirm, setOnConfirm] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedTask) {
      setTaskName(selectedTask.name);
    } else {
      setTaskName("");
    }
  }, [selectedTask]);

  const addTask = async () => {
    if (!taskName.trim()) return toast.error("Task name cannot be empty!");
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/task`, { taskName });
      if (response.data.success) {
        fetchData();
        setTaskName("");
        handleCloseModal();
        toast.success("Task added successfully!");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        status: status || "",
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await axios.get(`${API_URL}/task?${queryParams}`);

      if (response.data?.result?.docs) {
        setTasks(response.data.result.docs);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setTasks([]);
      toast.error("Failed to fetch tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [status, page, limit]);

  const editTask = async (taskId) => {
    if (!taskName.trim()) return toast.error("Task name cannot be empty!");

    try {
      const response = await axios.put(`${API_URL}/task/${taskId}`, {
        taskName,
      });

      if (response.data.success) {
        fetchData();
        handleCloseModal();
        toast.success("Task updated successfully!");
      }
    } catch (error) {
      console.error("Error editing task:", error);
      toast.error("Failed to update task. Please try again.");
    }
  };

  const updateTaskStatus = async (task) => {
    try {
      const response = await axios.put(`${API_URL}/task/${task.id}`, {
        status: !task.status,
      });

      if (response.data.success) {
        fetchData();
        setConfirmModalShow(false);
        toast.success(
          `Task marked as ${task.status ? "Incomplete" : "Complete"}!`
        );
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status. Please try again.");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(`${API_URL}/task/${taskId}`);
      if (response.data.success) {
        setTasks(tasks.filter((task) => task.id !== taskId));
        toast.success("Task deleted successfully!");
      }
      setConfirmModalShow(false);
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setEdit(task ? true : false);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setEdit(false);
    setTaskName("");
    setModalShow(false);
  };

  const openConfirmModal = (task, actionType) => {
    if (actionType === "delete") {
      setConfirmTitle("Are you sure you want to delete this task?");
      setOnConfirm(() => () => handleDelete(task.id));
    } else if (actionType === "status") {
      setConfirmTitle(
        `Are you sure you want to mark this task as ${
          task.status ? "Incomplete" : "Complete"
        }?`
      );
      setOnConfirm(() => () => updateTaskStatus(task));
    }
    setConfirmModalShow(true);
  };

  const handleCloseConfirmModal = () => {
    setConfirmModalShow(false);
    setOnConfirm(null);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="home bg-animation">
        <Navbar
          setStatus={setStatus}
          fetchData={fetchData}
          handleOpenModal={handleOpenModal}
        />
        <div className="container p-4 h-100 bg-white">
          {loading ? (
            <Loader />
          ) : (
            <TaskTable tasks={tasks} openConfirmModal={openConfirmModal} />
          )}
        </div>
      </div>

      <ConfirmModal
        show={confirmModalShow}
        title={confirmTitle}
        onClose={handleCloseConfirmModal}
        onConfirm={onConfirm}
      />

      <AddTaskModal
        modalShow={modalShow}
        selectedTask={selectedTask}
        taskName={taskName}
        setTaskName={setTaskName}
        handleCloseModal={handleCloseModal}
        addTask={addTask}
        editTask={editTask}
        edit={edit}
      />
    </>
  );
};

export default App;
