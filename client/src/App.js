// @ts-nocheck
import ListHeader from "./components/ListHeader";
import React, { useState, useEffect } from 'react';
import ListItem from "./components/ListItem";


const App = () => {
  const userEmail = 'devin@test.com'
  const [tasks , setTasks] = useState()

  const getData = async () =>{
    try{
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
      const json = await response.json()
      setTasks(json)
    }
    catch (err){
      console.error(err)
    }
  }

  useEffect(() => getData ,[]);


//Sort by date
// @ts-ignore
const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      <ListHeader listName={'Holiday tick List'} getData={getData}/>
        {sortedTasks?.map((task) => 
      <ListItem key={task.id} task={task} getData={getData}></ListItem>
      )}
    </div>
  );
}

export default App;
