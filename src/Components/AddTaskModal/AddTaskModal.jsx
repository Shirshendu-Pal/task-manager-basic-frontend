import React from "react";

const AddTaskModal = ({
  modalShow,
  selectedTask,
  taskName,
  setTaskName,
  handleCloseModal,
  addTask,
  editTask,
  edit,
}) => {
  return (
    <div className={`modal ${modalShow ? "d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {selectedTask ? "Edit Task" : "Add Task"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="add_task" className="form-label">
                Task Name
              </label>
              <input
                type="text"
                className="form-control"
                id="add_task"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={edit ? () => editTask(selectedTask?._id) : addTask}
            >
              {edit ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
