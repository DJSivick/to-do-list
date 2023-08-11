import { useState } from "react";
import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
import Modal from "./Modal";
import DeleteIcon from "./DeleteIcon";
import { API } from './../services/index';

const ListItem = ({task, getData}) => {
    const [showModal, setShowModal] =  useState(false)

    const deleteData = async () => {

      try {
       await API.deleteToDo(task.id).then(
        getData()
       )
      } 
      catch (err) {
        console.error(err)
      }
    }

    return (
      <>
      <div className="list-item"
       onClick={() => setShowModal(true)}  
      >

        <div className="info-container">
        <TickIcon/>
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress}></ProgressBar>
        </div>
        <button className="trash" onClick={deleteData}>
            <DeleteIcon/>
        </button>
      </div>
      {showModal && <Modal mode={"edit"} setShowModal={setShowModal} task={task} getData={getData} />}
      </>
    );
  }
  
  export default ListItem;
  