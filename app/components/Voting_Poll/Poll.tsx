import './Poll.css'
import { useState } from 'react'
import Progress from "./Progress"

const Poll = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'React JS', count: 0, percent: 0 },
    { id: 2, name: 'Vanilla JS', count: 0, percent: 0 },
    { id: 3, name: 'Next JS', count: 0, percent: 0 },
    { id: 4, name: 'Angular JS', count: 0, percent: 0 }
  ])
  const [voteCount, setVoteCount] = useState(0)

  const handleVoteCount = id => {
    const newVoteCount = voteCount + 1
    setVoteCount(newVoteCount)
    let updatedCategories = categories?.map(category => {
      const updatedCount =
        category.id === id ? category.count + 1 : category.count
      return {
        ...category,
        count: updatedCount,
        percent: ((updatedCount / newVoteCount) * 100)
      }
    })
    setCategories(updatedCategories)
  }

  return (
    <div className='voting-poll-component'>
      <h1>Voting Poll</h1>
      <div className='voting-poll-buttons'>
        {categories?.map((card, index) => (
          <div className="voting-option">
            <button
              className='voting-button'
              onClick={() => handleVoteCount(card.id)}
            >
              {card?.name}
            </button>
            <span>{card?.count}</span>
            <span>{card?.percent}%</span>
            <Progress votePercent = {card?.percent}/>
          </div>
        ))}
      </div>
      <span>Total Vote Counts: {voteCount}</span>
    </div>
  )
}

export default Poll
