import "./Poll.css";

const Progress = ({ votePercent }) => {
  return (
    <div className="progress-container">
      <div
        className='progress-bar'
        style={{
          width: `${votePercent}%`
        }}
      ></div>
    </div>
  )
}

export default Progress
