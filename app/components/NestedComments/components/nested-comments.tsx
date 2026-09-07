'use client'
import useCommentTree from '../hooks/use-comment-tree'
import './styles.css'
import { useState } from 'react'
import Comment from './comments'

const NestComment = ({
  comments,
  onSubmitComment = () => {},
  onEditComment = () => {},
  onDeleteComment = () => {}
}) => {
  const [comment, setComment] = useState('')
  const {
    comments: commentsData,
    insertComment,
    editComment,
    deleteComment
  } = useCommentTree(comments)

  const handleChange = e => {
    setComment(e.target.value)
  }

  const handleSubmit = () => {
    if (comment) {
      insertComment(undefined, comment)
      setComment('')
    }
  }

  const handleReply = (commentId, content) => {
    //to add a new comment
    // if (comment) handleReply(undefined, comment)
    insertComment(commentId, content)
    onSubmitComment(content)
  }

  const handleEdit = (commentId, content) => {
    editComment(commentId, content)
    onEditComment(content)
  }
  const handleDelete = (commentId, content) => {
    deleteComment(commentId, content)
    onDeleteComment(content)
  }
  return (
    <div className='add-comment'>
      <textarea
        rows={3}
        cols={50}
        placeholder='Add a new comment.......'
        value={comment}
        onChange={handleChange}
        className='comment-textarea'
      />
      <button className='comment-button' onClick={handleSubmit}>
        Add comment
      </button>
      {/* a kind of recursion function in order to call the function of reply again and again */}
      {commentsData.map(comment => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            onSubmit={handleReply}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )
      })}
    </div>
  )
}

export default NestComment
