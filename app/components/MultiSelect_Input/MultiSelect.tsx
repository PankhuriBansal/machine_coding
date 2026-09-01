import { useState, useEffect, useRef } from 'react'
import Pill from './Pill'

const MultiSelect = () => {
  const inputRef = useRef(null)

  const [searchTerm, setSearchTerm] = useState('')

  const [searchSuggestions, setSearchSuggestions] = useState([])

  const [selectedUsers, setSelectedUsers] = useState([])

  const [selectedUsersSet, setSelectedUsersSet] = useState(new Set())

  const fetchUsers = () => {
    if (searchTerm.trim() === '') {
      setSearchSuggestions([])
      return
    }
    // const response = await
    // const data = response.json()

    fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
      .then(res => res.json())
      .then(data => setSearchSuggestions(data))
      .catch(err => {
        console.error(err)
      })
  }

  const handleSelectUser = user => {
    setSelectedUsers([...selectedUsers, user])
    setSelectedUsersSet(new Set([...selectedUsersSet, user.email]))
    setSearchTerm('')
    setSearchSuggestions([])
    inputRef.current.focus()
  }

  const handleRemovePill = user => {
    const updatedUsers = selectedUsers.filter(
      selectedUser => selectedUser.id !== user.id
    )
    setSelectedUsers(updatedUsers)

    const updatedEmails = new Set(selectedUsersSet)
    updatedEmails.delete(user.email)
    setSelectedUsersSet(updatedEmails)
  }

  const handleKeyDown = e => {
    if (
      e.key === 'Backspace' &&
      e.target.value === '' &&
      selectedUsers.length > 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1]
      handleRemovePill(lastUser)
    }
  }

  useEffect(() => {
    const timer =
     setTimeout(() => {
        fetchUsers()
     },300)

     return () => {
        clearTimeout(timer)
     }
  }, [searchTerm])

  return (
    <div className='user-search-container'>
      {/* <h1>MultiSelect</h1> */}
      <div className='user-search-input'>
        {/* pills component */}

        {selectedUsers?.map(user => {
          return (
            <Pill
              key={user.email}
              image={user.image}
              text={`${user.firstName} ${user.lastName}`}
              onClick={() => handleRemovePill(user)}
            />
          )
        })}
        <div>
          <input
            ref={inputRef}
            type='text'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder='Search for a user'
            onKeyDown={handleKeyDown}
          />
          {/* search suggestions */}
          <ul className='suggestions-list'>
            {searchSuggestions?.users?.map((user, index) => {
              return !selectedUsersSet.has(user.email) ? (
                <li key={user.email} onClick={() => handleSelectUser(user)}>
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <span>{`${user.firstName} ${user.lastName}`}</span>
                </li>
              ) : (
                <></>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MultiSelect
