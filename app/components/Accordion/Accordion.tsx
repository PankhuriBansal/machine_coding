import { useState } from 'react'

const items = [
  {
    title: 'Item 1',
    content: 'Description for first item'
  },
  {
    title: 'Item 2',
    content: 'Description for second item'
  },
  {
    title: 'Item 3',
    content: 'Description for third item'
  },
  {
    title: 'Item 4',
    content: 'Description for fourth item'
  },
  {
    title: 'Item 5',
    content: 'Description for fifth item'
  },
  {
    title: 'Item 6',
    content: 'Description for sixth item'
  }
]

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const handleToggle = index => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return !items || items?.length == 0 ? (
    'No Items Available'
  ) : (
    <div className='accordion'>
      <h1>ACCORDION</h1>
      {items?.map((item, index) => {
        return (
          <div key={index}>
            <button
              className='accordion-title'
              onClick={() => handleToggle(index)}
            >
              <div className='accordion-item right'>
                <div>{item?.title}</div>
                <div className='right'>{openIndex === index ? 'O' : 'C'}</div>
              </div>
            </button>
            {openIndex === index && (
              <div className='accordion-content'>{item?.content}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
