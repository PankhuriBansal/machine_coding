'use client'
import { useState } from 'react'
const Comment = ({
  comment,
  onSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {}
}) => {
  const [expand, setExpand] = useState(false)
  const [replyContent, setReplyContent] = useState('')

  //edit state and edit function
  const [editMode, setEditMode] = useState(false)
  const [editedContent,setEditedContent] = useState(comment.content)
  const toggleEditFunction = () => {
    setEditMode(!editMode)
    setEditedContent(comment.content)
  }

  const handleChange = e => {
    if(editMode){
        setEditedContent(e.target.value)
    }
    else{
    setReplyContent(e.target.value)
    }
  }
  const toggleExpand = () => {
    setExpand(!expand)
  }

  const handleReplySubmit = () => {
    if (replyContent) {
      onSubmit(comment.id, replyContent)
      setReplyContent('')
    }
  }

  const handleEditsubmit = () => {
    onEdit(comment.id,editedContent)
    setEditMode(false)
  }

  const handleDeletesubmit = () => {
    onDelete(comment.id,editedContent)
    // set(false)
  }

  return (
    <div className='comment'>
      {!editMode  ?<>
        <p className='comment-content'>{comment.content}</p>
        <p className='comment-info'>Votes: {comment.votes}</p>
        <p className='comment-info'>
          {/* {new Date(comment.timestamp).toLocaleString()} */}
        </p>
      </> : (
        <div>
            <div className='add-comment'>
            <textarea
              rows={3}
              cols={50}
              placeholder='Add a new comment.......'
              value={editedContent}
              onChange={handleChange}
              className='comment-textarea'
            />
            <button className='comment-button' onClick={handleEditsubmit}>
              Save Edit 
            </button>
              <button className='comment-button' onClick={toggleEditFunction}>
              Cancel Edit
            </button>
          </div>
        </div>
      )}

      <div className='comment-actions'>
        <button className='comment-button' onClick={toggleExpand}>
          {expand ? 'Hide Replies' : 'Reply'}
        </button>
        <button className='comment-button' onClick={toggleEditFunction}>
          Edit
        </button>
        <button className='comment-button' onClick={handleDeletesubmit}>Delete</button>
      </div>
      {expand && (
        <div className='comment-replies'>
          <div className='add-comment'>
            <textarea
              rows={3}
              cols={50}
              placeholder='Add a new comment.......'
              value={replyContent}
              onChange={handleChange}
              className='comment-textarea'
            />
            <button className='comment-button' onClick={handleReplySubmit}>
              Add comment
            </button>
          </div>

          {/* inside reply expanded component we need to recall the comment component to make it a recursive call  */}
          {comment.replies.map(reply => {
            return (
              <Comment
                key={reply.id}
                comment={reply}
                onSubmit={onSubmit}
                onEdit = {onEdit}
                onDelete = {onDelete}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Comment
