import React, { useState, useEffect } from 'react';
import ListItem from "./components/ListItem";
import 'react-datepicker/dist/react-datepicker.css'
import NewTasks from "./components/NewTasks";
import InProgressTasks from "./components/InProgressTasks";
import CompletedTasks from "./components/CompletedTasks";
import { Statuses } from "./constants";
import {API} from "./services/index"
import Header from "./components/NavBar";


const App = () => {
  const [tasks , setTasks] = useState(null)
  const userEmail = "devin@test.com"

  const getData = async () =>{
    try{
      API.getToDo(userEmail).then((resp) => {
        setTasks(resp)
      })
    }
    catch (err){
      console.error(err)
    }
  }

  useEffect(() => {
      getData() 
  },[]);



const newTasks = tasks?.filter((task) => {
  return task.status === Statuses.New;
});

const inProgressTasks = tasks?.filter((task) => {
  return task.status === Statuses.InProgress;
});

const completedTasks = tasks?.filter((task) => {
  return task.status === Statuses.Completed;
});

  return (
      <>
      <Header />
      <NewTasks>
        {newTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}></ListItem>)}
      </NewTasks>
      <InProgressTasks>
        {inProgressTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}></ListItem>)}
      </InProgressTasks>
      <CompletedTasks>
        {completedTasks?.sort((taskA, taskB) => taskA.dueDate > taskB.dueDate).map((task) => <ListItem key={task.id} task={task} getData={getData}></ListItem>)}
      </CompletedTasks>
    <p className="copyright">© Devy Devster LLC</p></>
  );
}

export default App;
