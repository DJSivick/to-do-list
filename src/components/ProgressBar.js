const ProgressBar = ({progress}) => {

  const colors = [
    'rgb(255, 214, 161)',
    'rgb(255, 150, 100)',
    'rgb(255, 80, 80)'
  ]

  const randomColor = colors[Math.floor(Math.random() * colors.length)]

    return (
      <div className="outer-bar">
        <div 
        className="inner-bar"
        style={{width: `${progress}%`, backgroundColor: randomColor}} 
        ></div>
      </div>
    );
  }
  
  export default ProgressBar;
  