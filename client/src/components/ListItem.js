import { useState } from "react";
import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
import Modal from "./Modal";

const ListItem = ({task, getData}) => {
    const [showModal, setShowModal] =  useState(false)

    const deleteData = async () => {

      try {
        const resp =  await fetch(`http://localhost:8000/todos/${task.id}`, {
          method: "DELETE"
        }) 

        if(resp.status === 200){
            console.log("Delete Worked")
            getData()
        }
      } 
      catch (err) {
        console.error(err)
      }
    }

    return (
      <div className="list-item">
        
        <div className="info-container">
        <TickIcon></TickIcon>
        <p className="task-title">{task.title}</p>
        <ProgressBar></ProgressBar>
        </div>

        <div className="button-container">
          <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
          <button className="delete" onClick={deleteData}>DELETE</button>
        </div>

      {showModal && <Modal mode={"edit"} setShowModal={setShowModal} task={task} getData={getData} />}
      </div>
    );
  }
  
  export default ListItem;
  