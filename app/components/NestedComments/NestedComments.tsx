import NestComment from './components/nested-comments'
import commentsData from './data/comment.json'

const NestedComments = () => {

  return (
    <div>
      <h1>NestedComments System</h1>
      <NestComment
        comments={commentsData}
        onSubmitComment={(content) => {}}
        onEditComment={(content) => {}}
        onDeleteComment={(commentId) => {}}
        // onUpVote={() => {}}
        // onDownVote={() => {}}
      />
    </div>
  )
}

export default NestedComments
