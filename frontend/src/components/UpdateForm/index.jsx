import Modal from "react-modal";

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

const UpdateForm = () => {
  const modalIsOpenc = false;
  return (
    <div>
      <Modal
        isOpen={modalIsOpenc}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="model-main-container">
          <button type="button" className="mode-close-btn">
            x
          </button>
          <form className="add-form-card">
            <h1 className="add-form-card-title">Edit Task</h1>
            <div className="add-input-card">
              <label className="add-form-label" htmlFor="">
                Title
              </label>
              <input
                placeholder="Fix Task title..."
                className="add-form-text-input"
                type="text"
              />
            </div>
            <div className="add-input-card">
              <label className="add-form-label" htmlFor="">
                Description
              </label>
              <textarea
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
                <select className="add-form-input-date-optoin" name="" id="">
                  <option value="">Low</option>
                  <option value="">Medium</option>
                  <option value="">High</option>
                </select>
              </div>
            </div>
            <div>
              <label className="add-form-label" htmlFor="">
                Status
              </label>
              <select className="add-form-input-status" name="" id="">
                <option value="">Open</option>
                <option value="">In Progress</option>
                <option value="">Done</option>
              </select>
            </div>
          </form>
          <div className="add-form-btn-card">
            <button className="add-form-cancel-btn" type="button">
              Cancle
            </button>
            <button className="add-form-add-btn" type="button">
              Update Task
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateForm;
