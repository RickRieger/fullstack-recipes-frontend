import React, { Component } from 'react'
import GroceryList from './GroceryList';
import Button from '../common/Button';
import Axios from "../utils/Axios";
import './Grocery.css';
export class Grocery extends Component {

  state = {
    groceryList: [],
    groceryInput: '',
    error: null,
    errorMessage: '',
    canEdit: false,
    editInput: '',
  };

  async componentDidMount(){
    try{
         let allGroceryItems = await Axios.get("/api/grocery/get-all-grocery-items")

         this.setState({
          groceryList: allGroceryItems.data.payload.grocery
        }, ()=>{console.log(this.state);});

    }catch(e){
      console.log(e);
    }
  }
  handleTodoOnChange = (event) => {
    this.setState({
      groceryInput: event.target.value,
      error: null,
      errorMessage: '',
    });
  };
  handleOnSubmit = async () => {
    if (this.state.groceryInput.length === 0) {
      this.setState({
        error: true,
        errorMessage: 'Input field can not be empty!',
      });
    } else {
      let checkIfGroceryItemAlreadyExists = this.state.groceryList.findIndex(
        (item) =>
          item.grocery.toLocaleLowerCase() ===
          this.state.groceryInput.toLocaleLowerCase()
      );
      if (checkIfGroceryItemAlreadyExists > -1) {
        this.setState({
          error: true,
          errorMessage: 'Grocery item already exists',
        });
      } else {
        try {
          let createdGroceryItem = await Axios.post(
            `/api/grocery/create-grocery-item`,
            {
              grocery: this.state.groceryInput,
            }
          );
          console.log(createdGroceryItem);
          let newArray = [
            ...this.state.groceryList,
            createdGroceryItem.data.payload,
          ];
          this.setState({
            groceryList: newArray,
            groceryInput: '',
          });
        } catch (e) {
          console.log(e);
        }
        this.setState({
          error: false,
        });
      }
    }
  };
  handleDeleteByID = async (_id) => {
    console.log('clicked');
    console.log(_id);
    try {
      let deletedGroceryItem = await Axios.delete(
        `/api/grocery/delete-grocery-by-id/${_id}`
      );
      let filteredArray = this.state.groceryList.filter(
        (item) => item._id !== deletedGroceryItem.data.payload._id
      );
      console.log(filteredArray);
      console.log(deletedGroceryItem);
      this.setState({
        groceryList: filteredArray,
      });
    } catch (e) {
      console.log(e);
    }
  };
  handleDoneByID = async (_id, purchased) => {
    console.log(_id, purchased);
    try {
      console.log('working');
      let groceryIsPurchasedUpdated = await Axios.put(
        `/api/grocery/update-purchased-by-id/${_id}`,
        {
          purchased: !purchased,
        }
      );
      let updatedArray = this.state.groceryList.map((item) => {
        if (item._id === groceryIsPurchasedUpdated.data.payload._id) {
          item.purchased = groceryIsPurchasedUpdated.data.payload.purchased;
        }
        return item;
      });
      this.setState({
        groceryList: updatedArray,
      });
    } catch (e) {
      console.log(e);
    }
  };
  handleEditByID1 = (_id, passedEditInput) => {
    this.setState({
      canEdit: true,
      editInput: passedEditInput,
      editId: _id,
    });
    console.log(this.state);
    console.log(_id);
    console.log(passedEditInput);
  };
  handleEditByID2 = async () => {
    try {
      let editedGroceryItem = await Axios.put(
        `/api/grocery/update-grocery-by-id/${this.state.editId}`,
        {
          grocery: this.state.editInput,
        }
      );
      let updatedGroceryArray = this.state.groceryList.map((item) => {
        if (item._id === this.state.editId) {
          item.grocery = editedGroceryItem.data.payload.grocery;
        }
        return item;
      });
      this.setState({
        groceryList: updatedGroceryArray,
        canEdit: false,
        editInput: '',
        editId: '',
      });
    } catch (e) {
      console.log(e);
    }
    console.log(this.state);
  };
  handleInputOnChange = (event) => {
    this.setState({
      groceryInput: event.target.value,
      error: null,
    });
    console.log(this.state.groceryInput);
  };
  handleEditOnChange = (event) => {
    this.setState({
      editInput: event.target.value,
      error: null,
    });
  };
  sortByDate = async (sortOrder) => {
  
    try {
      let sortedGroceryItems = await Axios.get(
        `/api/grocery/get-grocery-by-sort?sort=${sortOrder}`
      );
      this.setState({
        groceryList: sortedGroceryItems.data.payload,
      });
    } catch (e) {
      console.log(e);
    }
  
  };
  sortByPurchased = async (isPurchased) => {
    try {
      let isPurchasedGroceryArray = await Axios.get(
        `/api/grocery/get-grocery-by-purchased?isPurchased=${isPurchased}`
      );
      this.setState({
        groceryList: isPurchasedGroceryArray.data.payload,
      });
    } catch (e) {
      console.log(e);
    }
  };
  render() {

    return (
      <div
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.5)), url(banner.png)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow:'hidden',
        backgroundAttachment: 'fixed',
        width:'100vw',
        height: '100vh'
        // overflowY: 'scroll'
      }}>
 
        <div id="container">
          <div id="app">
            <div className="top-container">
            <div id="header">
              <h1>Shopping List</h1>
            </div>
            <div id="input_field">
              {this.state.canEdit ? (
                <input
                  className="form-control"
                  type="text"
                  value={this.state.editInput}
                  onChange={this.handleEditOnChange}
                  maxLength="26"
                  name="editInput"
                />
              ) : (
                <input
                  className="form-control"
                  type="text"
                  value={this.state.groceryInput}
                  onChange={this.handleInputOnChange}
                  maxLength="26"
                  placeholder="grocery item..."
                  name="input"
                  autoFocus
                />
              )}
              {this.state.canEdit ? (
                <Button
                  className="btn"
                  handleClickFunction={() => this.handleEditByID2()}
                  buttonName="edit"
                />
              ) : (
                <Button
                  className="btn"
                  handleClickFunction={() => this.handleOnSubmit()}
                  buttonName="submit"
                />
              )}
            </div>
            <div id="input_field2">
              <Button
                className="btn"
                handleClickFunction={() => this.sortByDate('desc')}
                buttonName="newest-to-oldest"
              />
              <Button
                className="btn"
                handleClickFunction={() => this.sortByDate('asc')}
                buttonName="oldest-to-newest"
              />
              <Button
                className="btn"
                handleClickFunction={() => this.sortByPurchased('true')}
                buttonName="purchased"
              />
              <Button
                className="btn"
                handleClickFunction={() => this.sortByPurchased('false')}
                buttonName=" not-purchased"
              />
            </div>
            </div>
            <div className="bottom-container">
            <span style={{ color: 'red' }}>
              {this.state.error && this.state.errorMessage}
            </span>
            <div id="task-field">
              <div id="task-list">
                {this.state.groceryList.map((item, index) => {
                  return (
                    <GroceryList
                      key={item._id}
                      item={item.grocery}
                      purchased={item.purchased}
                      handleDeleteByID={this.handleDeleteByID}
                      handleCheckboxChecked={this.handleCheckboxChecked}
                      handleDoneByID={this.handleDoneByID}
                      handleEditByID1={this.handleEditByID1}
                      inputID={item._id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    )
  }
}

export default Grocery
