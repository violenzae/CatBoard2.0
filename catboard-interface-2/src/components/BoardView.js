import React, {useState} from 'react';
import BoardList from './BoardList';
import BoardForm from "./BoardForm";
import PostView from './PostView';
// import Board from "./Board"

function BoardView(){

// hook toggles between board list and board form
const [currentlyVisible, setVisibleComponent] = useState("List");
const [selectedBoard, setBoard] = useState(null);

  async function AddBoard(newBoard){
    await fetch(`http://localhost:5000/api/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBoard)
    });
  }

  // function setting 'currentlyVisibleCOmponent' based on state
  const setVisible =  () => {
    if(selectedBoard != null) {
      return {
        component: <PostView />,
        buttontext: ""
      }
     } else {
    if(currentlyVisible === "List") {
      return {
       component: <BoardList  />,
       buttontext: "AddBoard"
      } 
    } else {
      return {
        component: <BoardForm onSubmitForm={handleSetVisibleComponent} onAddingBoard={AddBoard} />,
        buttontext: "Back"
       } 
    }
  }
    
  const handleSetVisibleComponent = () => {
    if (currentlyVisible === "List") {
      setVisibleComponent("Form")
    } else if (currentlyVisible === "Form") {
      setVisibleComponent("List")
    }
  }


    const currentlyVisibleComponent = setVisible()
    return(
      <React.Fragment>
        {currentlyVisibleComponent.component}
        <button onClick={handleSetVisibleComponent}>{currentlyVisibleComponent.buttontext}</button>
      </React.Fragment>
    );
  }
}
export default BoardView;
