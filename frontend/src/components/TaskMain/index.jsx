import "./index.css";

import Header from "../Header";
import Sort from "../Sort";
import TaskView from "../TaskView";
import AddForm from "../AddForm";
//import Inslight from "../Inslight";

const TaskMain = () => {
  return (
    <div className="main-container">
      <Header />
      <Sort />
      <TaskView />
      <AddForm />
    </div>
  );
};

export default TaskMain;
