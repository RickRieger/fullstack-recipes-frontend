import React, { Component } from 'react';
export class GroceryList extends Component {
  render() {
    const { item, inputID, purchased } = this.props;
    const { handleDeleteByID, handleDoneByID, handleEditByID1, } = this.props;

    return (
      <div className="task-row">
        <div className="class-row">
          <p
            className={`${purchased ? 'complete' : ''}`}
            onClick={() => {
              handleDoneByID(inputID, purchased);
            }}
          >
            {item}
          </p>
        </div>
        <div className="class-row">
          <i
            className="fas fa-edit"
            id="edit0"
            onClick={() => {
              handleEditByID1(inputID, item);
            }}
          ></i>
          <i
            className="fas fa-trash-alt"
            id="delete0"
            onClick={() => {
              handleDeleteByID(inputID);
            }}
          ></i>
        </div>
      </div>
    );
  }
}

export default GroceryList;
