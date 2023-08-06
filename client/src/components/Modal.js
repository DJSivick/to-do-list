import { useState } from "react"
import { useCookies } from "react-cookie"
import DatePicker from "react-datepicker";
import { Statuses } from "../constants";
import {API} from "../services/index";
const {v4 : uuidv4} = require('uuid') 


const Modal = ({mode, setShowModal, task, getData}) => {
    const [cookies] = useCookies(null)
    const editMode = mode === "edit" ? true : false

    const user = {
      id: editMode ? task.id : uuidv4(),
      user_email: editMode ? task.user_email : cookies.Email,
      title: editMode ? task.title : "",
      progress: editMode ? task.progress : 0,
      date: editMode ? new Date(task.date) : new Date(),
      description: editMode ? task.description : "",
      status: editMode ? task.status : Statuses.New
    } 
    
    const [data, setData] = useState(user);

    const handleChange = (e) =>{
        const {name, value} = e.target

        setData(data => ({ 
          ...data,
          [name] : value
        }))
    }

    const handleDateChange = (newDate) => {
      setData(data =>({
          ...data,
          date: newDate
      }))
    }

    //Revisit this
    const postData = async (e) => {
      setData((data) => ({
        ...data,
        id: uuidv4()
      }))

      e.preventDefault()
      try {

        API.createToDo(data).then((resp) => {
          setShowModal(false);
          getData()
        })

        // const resp = await fetch(`http://localhost:8000/todos`, {
        //   method: "POST",
        //   headers: {'Content-Type': 'application/json'},
        //   body: JSON.stringify(data)
        // })

        // if(resp.status === 200){
        //   console.log("Create Worked")
        //   setShowModal(false)
        //   getData()
        // }
      } 
      catch (err) {
        console.error(err)
      }
    }

    const editData = async (e) => {
      e.preventDefault()
      try {
        API.updateToDo(task.id, data).then((res) => {
          setShowModal(false)
          getData()
        })

        // const resp =  await fetch(`http://localhost:8000/todos/${task.id}`, {
        //   method: "PUT",
        //   headers: {'Content-Type': 'application/json'},
        //   body: JSON.stringify(data)
        // }) 

        // if(resp.status === 200){
        //     console.log("Edit Worked")
        //     setShowModal(false)
        //     getData()
        // }
      } 
      catch (err) {
        console.error(err)
      }
    }

    const statusTing = {
      1 : "New",
      2 : "In Progress",
      3 : "Completed"
    }

    return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3>Lets {mode}</h3>
            <button className="cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
          <br/>
          <form>
            <label className="input-label">Title</label>
            <input
            required
            maxLength={30}
            placeholder="Your Task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}/>
            <br/>
              <label className="input-label">Description</label>
              <input name="description" type='text' placeholder="Add Description" value={data.description} onChange={handleChange}/>
            <br/>
              <label className="input-label">Status</label>
              <select name="status" value={data.status} placeholder="Select Status" onChange={handleChange}>
                <option value={Statuses.New}>{statusTing[Statuses.New]}</option>
                <option value={Statuses.InProgress}>{statusTing[Statuses.InProgress]}</option>
                <option value={Statuses.Completed}>{statusTing[Statuses.Completed]}</option>
              </select>
            <br/>
              <label className="input-label">Due Date</label>
              <DatePicker name="date" selected={data.date} onChange={handleDateChange}/>
            <br/>
              <label htmlFor="range">Drag to select your current progress: {data.progress}%</label>
              <input
              required
              type="range"
              id="range"
              min="0"
              max="100"
              name="progress"
              value={data.progress}
              onChange={handleChange}
            />
            <input className={mode} type='submit' 
            onClick={editMode ? editData : postData}/>
          </form>
        </div>
      </div>
    );
  }
  
  export default Modal;
  