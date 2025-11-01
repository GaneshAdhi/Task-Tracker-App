import "./index.css";

import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";

const TaskView = () => {
  const value = true;
  return (
    <>
      {value ? (
        <ul className="taskview-main-container">
          <li className="taskview-task-card border-low-tag">
            <div className="taskview-task-card-first-card">
              <div className="taskview-task-card-first-card-small-card-first">
                <h1 className="taskview-task-card-first-card-small-card-first-title">
                  Asignment
                </h1>
                <p className="taskview-task-card-first-card-small-card-first-decription">
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
              </div>
              <div className="taskview-task-card-first-card-small-card-second">
                <button className="icon-button icon-edit" type="button">
                  <BiSolidEdit />
                </button>
                <button className="icon-button" type="button">
                  <RiDeleteBin2Line />
                </button>
              </div>
            </div>
            <div className="taskview-task-card-first-card">
              <div className="taskview-task-card-first-card-third">
                <p className="taskview-task-card-first-card-third-tag high-tag">
                  Low
                </p>
                <p className="taskview-task-card-first-card-third-date">
                  Due: <span className="over-due-date">Nov 1,2025</span>
                </p>
              </div>
              <select className="input-card-edit">
                <option>Open</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
            </div>
          </li>
        </ul>
      ) : (
        <p className="no-task-test">
          No tasks found. Try adjusting your filters or adding a new task!
        </p>
      )}
    </>
  );
};

export default TaskView;
