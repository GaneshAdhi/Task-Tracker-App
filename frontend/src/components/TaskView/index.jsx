import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { format, startOfToday } from "date-fns";

import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";

const TaskView = () => {
  const [getTaskList, setTasklist] = useState(null);
  const [status, setStatus] = useState("Open");

  useEffect(() => {
    const getData = async () => {
      const url = `http://localhost:3000/api/tasks`;
      const response = await axios.get(url);

      const taskdataList = response.data.map((each) => ({
        title: each.tile,
        id: each.id,
        description: each.description,
        dueDate: each.due_date,
        priority: each.priority,
        status: each.status,
        createdAt: each.created_at,
      }));

      setTasklist(taskdataList);
    };
    getData();
  }, []);

  return (
    <>
      {getTaskList !== null ? (
        <ul className="taskview-main-container">
          {getTaskList.map((eachTask) => {
            const { id, title, description, priority, status, dueDate } =
              eachTask;

            const today = startOfToday();
            const todayFormat = format(today, "MMM d, yyyy");

            const formattedDate = format(dueDate, "MMM d, yyyy");
            const dateTextColor =
              todayFormat === formattedDate ? "over-due-date" : "";

            let borderTagColor = "";
            let textTagColor = "";

            switch (priority) {
              case "Low":
                borderTagColor = "border-low-tag";
                textTagColor = "low-tag";
                break;
              case "Medium":
                borderTagColor = "border-medium-tag";
                textTagColor = "medium-tag";
                break;
              case "High":
                borderTagColor = "border-high-tag";
                textTagColor = "high-tag";
                break;
              default:
                null;
                break;
            }

            return (
              <li key={id} className={`taskview-task-card ${borderTagColor}`}>
                <div className="taskview-task-card-first-card">
                  <div className="taskview-task-card-first-card-small-card-first">
                    <h1 className="taskview-task-card-first-card-small-card-first-title">
                      {title}
                    </h1>
                    <p className="taskview-task-card-first-card-small-card-first-decription">
                      {description}
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
                    <p
                      className={`taskview-task-card-first-card-third-tag ${textTagColor}`}
                    >
                      {priority}
                    </p>
                    <p className="taskview-task-card-first-card-third-date">
                      Due:
                      <span className={dateTextColor}> {formattedDate}</span>
                    </p>
                  </div>
                  <div className="update-select-card">
                    <select value={status} className="input-card-edit">
                      <option value="Open">Open</option>
                      <option value="In Progres">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                    <select value={priority} className="input-card-edit status">
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
              </li>
            );
          })}
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
