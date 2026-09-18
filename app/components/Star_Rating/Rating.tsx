import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import './starRating.css'

export const YellowStarImg =
  'https://th.bing.com/th/id/OIP.lHZFZlB8dLfwYM5qnn_6QQAAAA?w=171&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3'

const Rating = ({
    maxStars = 8
}) => {
  const starsArr = new Array(maxStars).fill(<FaStar />)
  const [selectedStar, setSelectedStar] = useState(null)
  const handleStarClick = (id) => {
        setSelectedStar(id === selectedStar ? null : id)
  }
  return (
    <div className='star-component'>
      <h1>Star Rating Component</h1>
      <div className='stars'>
        {starsArr?.map((star, index) => (
          <span className='star' onClick={() => handleStarClick(index)}>
            {/* {index <= selectedStar ? <img src={YellowStarImg} 
            width = "16"
            height = "16"
            /> : star} */}
            <FaStar 
            color = {
                index <= selectedStar ? "gold" :  "gray"
            }
            />
          </span>
        ))}
      </div>
    </div>
  )
}

export default Rating
