import "./index.css";

import Header from "../Header";
import Sort from "../Sort";
import TaskView from "../TaskView";
import AddForm from "../AddForm";
import UpdateForm from "../UpdateForm";
//import Inslight from "../Inslight";

const TaskMain = () => {
  return (
    <div className="main-container">
      <Header />
      <Sort />
      <TaskView />
      <AddForm />
      <UpdateForm />
    </div>
  );
};

export default TaskMain;
