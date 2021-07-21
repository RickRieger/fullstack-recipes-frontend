import React, { Component } from 'react';

export class Recipe extends Component {
  state = {
    number: [],
  };
  
  handleOnChange = (event) => {
    console.log(event.target.value);
    let target = event.target;
    let name = target.name;
    //here
    let value = Array.from(target.selectedOptions, (option) => option.value);

    console.log(value);
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <select
          name="selectedOptions"
          id=""
          value={this.state.number}
          onChange={this.handleOnChange}
          multiple
        >
          <option value="&1">1</option>
          <option value="&2">2</option>
          <option value="&3">3</option>
          <option value="&4">4</option>
        </select>
      </div>
    );
  }
}

export default Recipe;