import React, { Component } from 'react'
import axios from 'axios';



export class Recipe extends Component {


//   async componentDidMount() {
//     try {
//       console.log(process.env.REACT_APP_EDAMAM_KEY);
//       // let recipes = await axios.get(
//       //   `https://api.edamam.com/api/recipes/v2?type=public&q=burgers&app_id=${process.env.REACT_APP_EDAMAM_ID}&app_key=${process.env.REACT_APP_EDAMAM_KEY}`
//       );
//       return console.log(recipes);
//     } catch (e) {
//       return e;
//   }
// }


  // handleSearchRecipe = async (description) => {
  //   try {
  //     let recipes = await axios.get(
  //       `https://api.edamam.com/api/recipes/v2?type=public&q=burgers&app_id=${REACT_APP_EDAMAM_ID.}&app_key=${REACT_APP_EDAMAM_KEY}`
  //     );
  //     return console.log(recipes);
  //   } catch (e) {
  //     return e;
  //   }
  // };


  render() {
    return (
     
      <div className="login_body">
        <div className="login__container">
          <div className="container__child signup__form">
            <h1>Recipe</h1>
            <br />
            <form >
              <div className="form-group">
                <label>What do you want to make?</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="email"
                  id="email"
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
              <label >Diet:&nbsp;&nbsp;</label>
              <select style={{color: "black"}} id="cars" name="cars">
                <option value="volvo">balanced</option>
                <option value="saab">high-fiber</option>
                <option value="fiat">high-protien</option>
                <option value="audi">low-carb</option>
              </select>
              </div>

              <div className="m-t-lg">
                <ul className="list-inline">
                  <li>
                    <input
                      className="btn btn--form"
                      type="submit"
                      value="Search"

                    />
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Recipe
