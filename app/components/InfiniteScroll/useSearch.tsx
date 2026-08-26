import { useEffect, useState } from 'react'
import axios from 'axios'

const PAGE_SIZE = 10

const useBookSearch = (query, pageNumber) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)

    let cancel

    const skip = (pageNumber - 1) * PAGE_SIZE

    axios({
      method: 'GET',
      url: 'https://dummyjson.com/users/search',
      params: {
        q: query,
        limit: PAGE_SIZE,
        skip: skip,
      },
      cancelToken: new axios.CancelToken((c) => {
        cancel = c
      }),
    })
      .then((res) => {
        const newUsers = res.data.users

        setUsers((prevUsers) => {
          // If this is a new search, replace old results
          if (pageNumber === 1) {
            return newUsers
          }

          // If loading next page, append results
          return [...prevUsers, ...newUsers]
        })

        // Check if more data is available
        setHasMore(
          skip + newUsers.length < res.data.total
        )

        setLoading(false)
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          return
        }

        setError(true)
        setLoading(false)
      })

    return () => {
      if (cancel) {
        cancel()
      }
    }
  }, [query, pageNumber])

  return {
    users,
    loading,
    error,
    hasMore,
  }
}

export default useBookSearch