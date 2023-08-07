// @ts-nocheck
import ListHeader from "./components/ListHeader";
import React, { useState, useEffect } from 'react';
import ListItem from "./components/ListItem";
//import Auth from './components/Auth'
//import { useCookies } from 'react-cookie';
import 'react-datepicker/dist/react-datepicker.css'
import NewTasks from "./components/NewTasks";
import InProgressTasks from "./components/InProgressTasks";
import CompletedTasks from "./components/CompletedTasks";
import { Statuses } from "./constants";
import {API} from "./services/index"


const App = () => {
  //const [cookies] = useCookies(null)
  const [tasks , setTasks] = useState()
  //const authToken = cookies.AuthToken
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
    <div className="app">
      {/* {!authToken && <Auth/>} */}
      {
      <>
       <ListHeader listName={'Holiday tick List'} getData={getData}/>
       <p className="user-email">Welcome back {userEmail}</p>
       <div className="">
        <NewTasks>
        {newTasks?.map((task) => 
        <ListItem key={task.id} task={task} getData={getData}></ListItem>)}
        </NewTasks>
        <InProgressTasks>
        {inProgressTasks?.map((task) => 
        <ListItem key={task.id} task={task} getData={getData}></ListItem>)}
        </InProgressTasks>
        <CompletedTasks>
        {completedTasks?.sort((taskA, taskB) => taskA.dueDate > taskB.dueDate).map((task) => 
        <ListItem key={task.id} task={task} getData={getData}></ListItem>)}
        </CompletedTasks>
        </div>
      </>
      }
      <p className="copyright">© Devy Devster LLC</p>
    </div>
  );
}

export default App;
