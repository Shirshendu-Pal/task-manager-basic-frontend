import React from "react";

const TaskTable = ({ tasks, openConfirmModal, statusUpdate }) => {
  return (
    <div className="table-responsive border">
      <table className="table table-hover mb-0">
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Task Name</th>
            <th>Task ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task, index) => (
            <tr key={task._id}>
              <td>{index + 1}.</td>
              <td>{task.taskName}</td>
              <td>{task.id}</td>
              <td>
                <button
                  className="btn btn-light"
                  onClick={() => openConfirmModal(task, "status")}
                >
                  {task.status ? "Complete" : "Incomplete"}
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger w-100"
                  onClick={() => openConfirmModal(task, "delete")}
                  style={{ maxWidth: "50px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
