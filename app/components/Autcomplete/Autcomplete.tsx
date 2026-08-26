'use client'
import { useState, useEffect } from 'react'
const AutComplete = () => {
  const [input, setInput] = useState('')
  const [searchResults, setSearchResults] = useState([])

  //show results on blur and focus
  const [showResults, setShowResults] = useState(false)

  //cache results stored in local state variable as of now - key/ value pair
  const [cache, setCache] = useState({})

  //loading state
  const [loading, setLoading] = useState(false)

  //error state
  const [error,setError] = useState('')
  const fetchData = async () => {

    //do not go further for results if we get the data in the cached results , set the search results based on it
    if (cache[input]) {
      console.log('cache returned', input)
      setSearchResults(cache[input])
      return
    }

    //use controller to abort the previous api calls and give a new call and discard the previous results
    const controller = new AbortController()
    try {
        setError('')
      setLoading(true)
      console.log('api call', input)
      const data = await fetch(
        'https://dummyjson.com/recipes/search?q=' + input,
        {
            signal : controller.signal
        }

      )
      const json = await data.json()
      setSearchResults(json?.recipes)
      //setting cache on api call -- updating cache on key value pair
      setCache(prev => ({ ...prev, [input]: json?.recipes }))
    } 
    catch(error){
        setError("Something went wrong")
    }
    finally {
      setLoading(false)
    }
  }

  //call the below function whenever the data needs to be fetched
  useEffect(() => {
    if (!input.trim()) {
      setSearchResults([])
      return
    }
    //fetch data after 300 ms with a slight delay
    const timer = setTimeout(fetchData, 300)

    return () => {
      clearTimeout(timer)
    }
    // fetchData()
  }, [input])

  return (
    <div className='App'>
      <h1>AutoComplete</h1>
      <div>
        <input
          type='text'
          className='search-input'
          value={input}
          onChange={e => setInput(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
        {showResults && searchResults.length !== 0 &&  (
          <div className='result-container'>
            {searchResults.map(r => (
              <span className='result' key={r.id}>
                {r.name}
              </span>
            ))}
          </div>
        )}
        {loading && <p>Loading.......</p>}
        {error && <p>Error while fetching results</p>}
        {!loading && !error && input && searchResults.length === 0 && (
            <div>No Results Found</div>
        )}
      </div>
    </div>
  )
}

export default AutComplete
