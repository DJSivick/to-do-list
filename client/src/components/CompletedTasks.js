const CompletedTasks = ({children}) => {
  
    return (
      <><h3>Completed</h3><div className="modal">
        {children}
      </div></>
    );
  }
  
  export default CompletedTasks;