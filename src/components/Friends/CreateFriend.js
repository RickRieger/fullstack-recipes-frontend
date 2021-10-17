import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Friends from './Friends';
import Axios from '../utils/Axios';
import './Friends.css';
export class CreateFriend extends Component {
  state = {
    friendFirstName: '',
    friendLastName: '',
    friendMobileNumber: '',
    friendArray: [],
  };
  componentDidMount() {
    this.handleGetAllFriends();
  }
  handleOnFriendChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleFriendSubmit = async (event) => {
    event.preventDefault();
    try {
      let createdFriend = await Axios.post('/friend/create-friend', {
        firstName: this.state.friendFirstName,
        lastName: this.state.friendLastName,
        mobileNumber: this.state.friendMobileNumber,
      });
      this.setState({
        friendFirstName: '',
        friendLastName: '',
        friendMobileNumber: '',
        friendArray: [...this.state.friendArray, createdFriend.data],
      });
      toast.success('Friend Created!');
    } catch (e) {
      console.log(e);
      // toast.error(e.response.data.payload);
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

  handleUpdatedFriendData = (updatedFriend) => {
    console.log(updatedFriend);
    let updatedFriendArray = this.state.friendArray.map((friend) => {
      if (friend._id === updatedFriend._id) {
        friend = updatedFriend;
      }
      return friend;
    });

    this.setState({
      friendArray: updatedFriendArray,
    });
  };

  handleDeleteByFriend = (user) => {
    let newArray = this.state.friendArray.filter(
      (friend) => friend._id !== user._id
    );
    this.setState({
      friendArray: newArray,
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
          // overflowY: 'scroll'
        }}
      >
        <div className='update-container'>
          <Friends
            friendArray={this.state.friendArray}
            handleUpdatedFriendData={this.handleUpdatedFriendData}
            handleDeleteByFriend={this.handleDeleteByFriend}
          />
          <form id='friends-form' onSubmit={this.handleFriendSubmit}>
            <h3>Create Friend</h3>
            <div className='input-div'>
              <input
                className='form-control-friends'
                placeholder='first name'
                onChange={this.handleOnFriendChange}
                name='friendFirstName'
                value={this.state.friendFirstName}
                autoFocus
              />
            </div>
            <div className='input-div'>
              <input
                className='form-control-friends'
                placeholder='last name'
                onChange={this.handleOnFriendChange}
                name='friendLastName'
                value={this.state.friendLastName}
              />
            </div>
            <div>
              <input
                className='form-control-friends'
                placeholder='mobile number'
                onChange={this.handleOnFriendChange}
                name='friendMobileNumber'
                value={this.state.friendMobileNumber}
              />
            </div>
            <div>
              <button className='btn'>Create Friend</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default CreateFriend;
