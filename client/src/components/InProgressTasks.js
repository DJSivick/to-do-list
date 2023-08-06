const InProgressTasks = ({children}) => {
  
    return (
        <><h3>In Progress</h3><div className="modal">
            {children}
        </div></>
    );
  }
  
  export default InProgressTasks;