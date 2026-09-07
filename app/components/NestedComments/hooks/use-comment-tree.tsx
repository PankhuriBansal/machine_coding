'use client'
import { useState } from 'react'

const useCommentTree = initialComments => {
  const [comments, setComments] = useState(initialComments)

  const insertNode = (tree, commentId, content) => {
    return tree.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, content]
        }
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: insertNode(comment.replies, commentId, content)
        }
      }
      return comment
    })
  }

  const insertComment = (commentId, content) => {
    const newComment = {
      id: Date.now(),
      content,
      votes: 0,
      timeStamp: new Date().toISOString(),
      replies: []
    }
    if (commentId) {
      setComments(prevComments =>
        insertNode(prevComments, commentId, newComment)
      )
    } else {
      setComments(prevComments => [newComment, ...prevComments])
    }
  }

  //function to edit a comment
  const editNode = (tree, commentId, content) => {
    return tree.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          //   replies: [...comment.replies, content]
          content: content,
          timeStamp: new Date().toISOString()
        }
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: editNode(comment.replies, commentId, content)
        }
      }
      return comment
    })
  }

  const editComment = (commentId, content) => {
    setComments(prevComments => editNode(prevComments, commentId, content))
  }

  //    delete logic for the comment
  const deleteNode = (tree, commentId) => {
    return tree.reduce((acc, comment) => {
      if (comment.id === commentId) {
        return acc
        //   ...comment,
        //   //   replies: [...comment.replies, content]
        //   content: content,
        //   timeStamp: new Date().toISOString()
      } else if (comment.replies && comment.replies.length > 0) {
        comment.replies = deleteNode(comment.replies, commentId)
      }
      return [...acc, comment]
    }, [])
  }

  const deleteComment = commentId => {
    setComments(prevComments => deleteNode(prevComments, commentId))
  }
  return {
    comments,
    insertComment,
    editComment,
    deleteComment
  }
}
export default useCommentTree
