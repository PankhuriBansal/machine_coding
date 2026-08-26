'use client'
import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import {PAGE_SIZE} from "./constant"

const Pagination = () => {
  const [apiData, setApiData] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const fetchData = async () => {
    const response = await fetch('https://dummyjson.com/products?limit=500')
    const data = await response.json()
    setApiData(data?.products)
  }

  const totalProducts = apiData.length
  const noOfpages = Math.ceil(totalProducts / PAGE_SIZE)

  const handlePageChange = n => {
    setCurrentPage(n)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const start = currentPage * PAGE_SIZE
  const end = start + PAGE_SIZE

  const goToNextPage = () => {
    setCurrentPage(prev => prev + 1)
  }

  const goToPreviousPage = () => {
    setCurrentPage(prev => prev - 1)
  }

  return !apiData.length ? (
    <h1>No Products found</h1>
  ) : (
    <div className='pagination'>
      <h1>PAGINATION</h1>

      <div className='products-container'>
        {apiData?.slice(start, end).map(item => (
          <ProductCard
            key={item.id}
            image={item?.thumbnail}
            title={item?.title}
          />
        ))}
      </div>
      <div className='pageNumber-container'>
        <button
          disabled={currentPage === 0}
          className='pageNumbers'
          onClick={() => goToPreviousPage()}
        >
          ⬅️
        </button>
        {[...Array(noOfpages).keys()].map(n => (
          <button
            className={`pageNumbers' ${n === currentPage ? "active-page" : ""}`}
            key={n}
            onClick={() => handlePageChange(n)}
          >
            {n}
          </button>
        ))}
        <button
          disabled={currentPage === noOfpages - 1}
          className='pageNumbers'
          onClick={() => goToNextPage()}
        >
          ➡️
        </button>
      </div>
    </div>
  )
}

export default Pagination
