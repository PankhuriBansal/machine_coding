import { useState, useEffect } from 'react'
import './carousel.css'

const Carousel = () => {
  const [imagesData, setImagesData] = useState([])
  const [current, setCurrent] = useState(0)
  const fetchProductImages = async () => {
    const res = await fetch('https://dummyjson.com/products')
    const data = await res.json()
    setImagesData(data.products)
    console.log(data.products, 'data from products api')
  }

  useEffect(() => {
    fetchProductImages()
  }, [])

  useEffect(() => {
    if (imagesData.length === 0) return
    const timer = setInterval(() => {
      setCurrent(prev => {
        if (prev === imagesData.length - 1) {
          return 0
        } else {
          return prev + 1
        }
      })
    }, 3000)
    return () => clearInterval(timer)
  }, [imagesData.length])

  const handleNext = () => {
    setCurrent(current + 1)
  }

  const handlePrev = () => {
    setCurrent(current - 1)
  }

  console.log(current, 'value of current')
  return (
    <div className='carousel-component'>
      <h1>Carousel Component</h1>
      <div className='carousel-container'>
        {imagesData?.map((image, index) => (
          <div
            className={`carousel-card ${
              current === index ? 'highlighted' : 'inactive'
            }`}
          >
            <img className='carousel-image' src={image?.images[0]} />
            <span className='carousel-title'>{image.title}</span>
          </div>
        ))}
      </div>
      <button disabled={current <= 0} onClick={handlePrev}>
        Prev
      </button>
      <button disabled={current === imagesData.length - 1} onClick={handleNext}>
        Next
      </button>
    </div>
  )
}

export default Carousel
