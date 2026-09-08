import './styles.css'
import { useState } from 'react'
import json from './data.json'

// component to render the list of the file structure
const List = ({ list, addNodeToList, deleteNodeFromList }) => {
  const [isExpanded, setIsExpanded] = useState({})
  return (
    <div className='container'>
      {list?.map(node => (
        <div key={node.id}>
          {node.isFolder && (
            <span
              onClick={() =>
                setIsExpanded(prev => ({
                  ...prev,
                  [node?.name]: !prev[node?.name]
                }))
              }
            >
              {isExpanded?.[node.name] ? '-' : '+'}
            </span>
          )}
          <span>{node.name}</span>
          {node.isFolder && (
            <div className='buttons-div'>
              <span
                // write logic to add node to a list
                onClick={() => addNodeToList(node.id)}
              >
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbmFUnhBCPCREyozNMCZMl-jbvJb7Xz6pfvrXRBVj5PDpbZD3xOv5WXe-n&s=10'
                  className='add-file-icon'
                />
              </span>
            </div>
          )}
          <span onClick={() => deleteNodeFromList(node.id)}>
            <img
              src='https://cdn-icons-png.flaticon.com/256/3405/3405244.png'
              className='delete-file-btn'
            />
          </span>
          {/* // if node also have child components call the list component again */}
          {isExpanded?.[node.name] && node.children && (
            <List
              list={node.children}
              addNodeToList={addNodeToList}
              deleteNodeFromList={deleteNodeFromList}
            />
          )}
        </div>
      ))}
    </div>
  )
}

const App = () => {
  const [data, setData] = useState(json)

  // write logic to add node to the list -- pure tree traversal
  const addNodeToList = parentId => {
    // return updated tree , need to add object to the child of which i want to push the children or file into
    // to do recursion in the tree , update tree function will return a new tree with the updated tree value

    const name = prompt('Enter Name') //to add name to the object

    const updateTree = list => {
      // return a new list with the updated added value of my object
      return list.map(node => {
        // loop through the data to find the parent id, when found parent id push an object into it
        if (node.id === parentId) {
          //copy all content off the object, and add one more child
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: Date.now().toString(),
                name: name,
                isFolder: true,
                children: []
              }
            ]
          }
        }
        //another case of recursion, if node.children is present , call same funciton once again
        if (node.children) {
          return {
            ...node,
            children: updateTree(node.children)
          }
        }
        return node
      })
    }
    //update tree function will return a new tree with the updated tree value
    setData(prev => updateTree(prev))
  }

  // pass id of the node i need to delete
  const deleteNodeFromList = itemId => {
    const updateTree = list => {
      // filter things when go to each data
      return (
        list
          .filter(node => node.id !== itemId)
          // map the above return in order to handle the recursion
          .map(node => {
            if (node.children) {
              // call same function for children as well
              return {
                ...node, //copy node
                children: updateTree(node.children)
              }
            }
            return node
          })
      )
    }
    //udate tree with previous data
    setData(prev => updateTree(prev))
  }

  return (
    <div className='App'>
      <h1>File Explorer/VS Code Structure</h1>
      {/* file and folder view */}
      <List
        list={data}
        addNodeToList={addNodeToList}
        deleteNodeFromList={deleteNodeFromList}
      />
    </div>
  )
}

export default App
