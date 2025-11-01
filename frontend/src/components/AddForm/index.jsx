import { useEffect, useState } from "react";

import Modal from "react-modal";

Modal.setAppElement("#root");

import axios from "axios";

import "./index.css";

const customStyles = {
  content: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100vh",
    width: "100vw",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const AddForm = () => {
  const [addModelOpen, setAddModel] = useState(false);
  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addDate, setAddDate] = useState("");
  const [addPriority, setAddPriority] = useState("Low");
  const [addTask, setAddTask] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "Low",
    status: "Open",
  });

  const resetForm = () => {
    setAddDate("");
    setAddTitle("");
    setAddDescription("");
    setAddPriority("Low");
  };

  useEffect(() => {
    if (!addTask || !addTask.title || !addTask.due_date) return;

    const url = "http://localhost:3000/api/tasks";

    axios.post(url, addTask);
    resetForm();
  }, [addTask]);

  const onHandleModel = () => {
    setAddModel((pre) => !pre);
  };

  const onHandleTitle = (e) => {
    setAddTitle(e.target.value);
  };

  const onHandleDescription = (e) => {
    setAddDescription(e.target.value);
  };

  const onHandleDate = (e) => {
    setAddDate(e.target.value);
  };

  const onHandlePriority = (e) => {
    setAddPriority(e.target.value);
  };

  const onHandleData = () => {
    if (addTitle && addDescription && addDate && addPriority) {
      const taskObj = {
        title: addTitle,
        description: addDescription,
        due_date: addDate,
        priority: addPriority,
        status: "Open",
      };

      setAddTask(taskObj);
    } else {
      alert("Please Check input field!");
    }
  };

  return (
    <div>
      <button onClick={onHandleModel} className="from-add-btn" type="button">
        +
      </button>
      <Modal isOpen={addModelOpen} style={customStyles}>
        <div className="model-main-container">
          <button
            onClick={onHandleModel}
            type="button"
            className="mode-close-btn"
          >
            x
          </button>
          <form className="add-form-card">
            <h1 className="add-form-card-title">Add New Task</h1>
            <div className="add-input-card">
              <label className="add-form-label" htmlFor="">
                Title
              </label>
              <input
                onChange={onHandleTitle}
                value={addTitle}
                className="add-form-text-input"
                type="text"
              />
            </div>
            <div className="add-input-card">
              <label className="add-form-label" htmlFor="">
                Description
              </label>
              <textarea
                onChange={onHandleDescription}
                value={addDescription}
                className="add-from-textarea"
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="add-from-date-option-card">
              <div className="add-form-date-input-card">
                <label className="add-form-label" htmlFor="">
                  Due Date
                </label>
                <input
                  onChange={onHandleDate}
                  value={addDate}
                  className="add-form-input-date-optoin"
                  type="date"
                  name=""
                  id=""
                />
              </div>
              <div className="add-form-date-input-card">
                <label className="add-form-label" htmlFor="">
                  Priority
                </label>
                <select
                  onChange={onHandlePriority}
                  value={addPriority}
                  className="add-form-input-date-optoin"
                  name=""
                  id=""
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </form>
          <div className="add-form-btn-card">
            <button
              onClick={onHandleModel}
              className="add-form-cancel-btn"
              type="button"
            >
              Cancle
            </button>
            <button
              onClick={onHandleData}
              className="add-form-add-btn"
              type="button"
            >
              Add Task
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddForm;
