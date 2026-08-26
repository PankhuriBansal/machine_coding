'use client'

import { useCallback, useRef, useState } from 'react'
import useBookSearch from './useSearch'

const InfiniteScroller = () => {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const observer = useRef(null)

  const {
    users,
    loading,
    error,
    hasMore,
  } = useBookSearch(query, pageNumber)

  const handleSearch = (e) => {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  const lastUserRef = useCallback(
    (node) => {
      if (loading) return

      if (observer.current) {
        observer.current.disconnect()
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            hasMore &&
            !loading
          ) {
            setPageNumber((prev) => prev + 1)
          }
        }
      )

      if (node) {
        observer.current.observe(node)
      }
    },
    [loading, hasMore]
  )

  return (
    <div>
      <h1>Infinite Scroller</h1>

      <input
        value={query}
        onChange={handleSearch}
        placeholder="Search users"
      />

      {users.map((user, index) => {
        const isLast = index === users.length - 1

        return (
          <div
            key={user.id}
            ref={isLast ? lastUserRef : null}
            style={{
              padding: '20px',
              borderBottom: '1px solid #ddd',
            }}
          >
            <h3>
              {user.firstName} {user.lastName}
            </h3>

            <p>{user.email}</p>
          </div>
        )
      })}

      {loading && <p>Loading...</p>}

      {error && <p>Something went wrong.</p>}

      {!loading && !hasMore && users.length > 0 && (
        <p>No more users.</p>
      )}
    </div>
  )
}

export default InfiniteScroller