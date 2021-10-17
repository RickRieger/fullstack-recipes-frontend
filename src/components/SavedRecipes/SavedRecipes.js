import React, { Component } from 'react';
import SavedRecipeList from './SavedRecipeList';
import Axios from '../utils/Axios';
import { toast } from 'react-toastify';
import './SavedRecipes.css';
export class SavedRecipes extends Component {
  state = {
    savedRecipes: [],
    showSavedRecipes: true,
    friendArray: [],
    selectedRecipe: {},
    selectedFriendFirstName: '',
    selectedFriendLastName: '',
    selectedFriendID: '',
    selectedFriendMobileNumber: '',
    label: '',
    ingredients: '',
    recipeUrl: '',
    originalMessage: '',
    friendMessage: '',
  };

  componentDidMount = async () => {
    this.handleGetAllFriends();
    try {
      const savedRecipes = await Axios.get('/recipe/get-all-recipes');
      this.setState({
        savedRecipes: savedRecipes.data.recipes,
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleGetAllFriends = async () => {
    try {
      let getAllFriends = await Axios.get('/friend/get-all-friends');
      this.setState({
        friendArray: getAllFriends.data.friends,
      });
    } catch (e) {
      console.log(e);
      // toast.error(e.response.data.payload);
    }
  };

  handleDeleteClick = async (id) => {
    try {
      let deletedRecipe = await Axios.delete(
        `/recipe//delete-recipe-by-id/${id}`
      );
      console.log(deletedRecipe);
      let filteredArray = this.state.savedRecipes.filter(
        (item) => item._id !== deletedRecipe.data.payload._id
      );
      console.log(filteredArray);
      this.setState({
        savedRecipes: filteredArray,
      });

      toast.success(`Recipe deleted!`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      toast.error(e.response.data.payload);
    }
  };

  handleTextClick = (recipe) => {
    let label = recipe.label;
    let ingredients = recipe.ingredients.join();
    let recipeUrl = recipe.directionsUrl;

    this.setState({
      showSavedRecipes: false,
      label: label,
      ingredients: ingredients,
      recipeUrl: recipeUrl,
    });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.selectedFriendMobileNumber);

    try {
      let message = this.state.friendMessage;

      await Axios.post('/twilio/send-sms', {
        to: this.state.selectedFriendMobileNumber,
        message: message,
      });

      toast.success(`Text message sent!`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.setState({
        showSavedRecipes: true,
      });
    } catch (e) {
      console.log(e.response);
    }
  };
  handleSelectChange = (event) => {
    let selectedUser = JSON.parse(event.target.value);
    console.log(selectedUser.mobileNumber);
    this.setState(
      {
        selectedFriendFirstName: selectedUser.firstName,
        selectedFriendLastName: selectedUser.lastName,
        selectedFriendID: selectedUser._id,
        selectedFriendMobileNumber: selectedUser.mobileNumber,
        originalMessage: `Hey ${selectedUser.firstName}, check this recipe out called ${this.state.label}.
      The ingredients are ${this.state.ingredients}.
      Here is a link to the complete instructions: ${this.state.recipeUrl} `,
        friendMessage: `Hey ${selectedUser.firstName}, check this recipe out called ${this.state.label}.
      The ingredients are ${this.state.ingredients}.
      Here is a link to the complete instructions: ${this.state.recipeUrl} `,
      },
      () => {
        console.log(this.state);
      }
    );
  };
  handleTextAreaEvent = (event) => {
    console.log(event);
    this.setState({
      friendMessage: event.target.value,
    });
  };

  render() {
    return (
      <div
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.5)), url(banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
          backgroundAttachment: 'fixed',
          width: '100vw',
          height: '100vh',
        }}
      >
        {this.state.showSavedRecipes ? (
          <div className='saved-recipe-container'>
            <SavedRecipeList
              recipes={this.state.savedRecipes}
              handleDeleteClick={this.handleDeleteClick}
              handleTextClick={this.handleTextClick}
            />
          </div>
        ) : (
          <div className='saved-recipe-form-container'>
            <form onSubmit={this.handleFormSubmit} className='text-form'>
              <label>Choose a friend:</label>
              <select
                onChange={this.handleSelectChange}
                name='friend'
                id='friend'
              >
                <option default>Please select friend</option>
                {this.state.friendArray.map((friend, index) => {
                  return (
                    <option key={friend._id} value={JSON.stringify(friend)}>
                      {friend.firstName} {friend.lastName}
                    </option>
                  );
                })}
              </select>
              <textarea
                col='50'
                rows='20'
                defaultValue={this.state.originalMessage}
                onChange={(event) => {
                  this.handleTextAreaEvent(event);
                }}
              />
              <br />
              <button className='btn'>Submit</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default SavedRecipes;
