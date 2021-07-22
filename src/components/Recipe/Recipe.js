import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export class Recipe extends Component {
  state = {
    search: "",
    diet: [],
    health:[]
  };


  handleInputOnChange = (event) => {
     this.setState({
       [event.target.name]:event.target.value
     })
  };


  handleOptionsOnChange = (event) => {
    console.log('the event is:',event);
    console.log('the event.target is:',event.target);
    console.log('the event.target.value is (with strange behavior):',event.target.value);
    console.log('We can now grab the element\'\s(event.target) attributes for example, the target\'\s size is event.target.size:',event.target.size);
    console.log('the target\'\s name is event.target.name:', event.target.name);
    console.log('Whoah there buddy, event.target.selectedOptions grabs an array of objects that are deeply nested in the event:', event.target.selectedOptions)

    //Here's our two variables
    let target = event.target;
    let name = target.name;

    //Array.from creates a new array with a call back function
    let value = Array.from(target.selectedOptions, (option) => option.value);
    console.log('the result from Array.from is:',value);

    //set the state dynamically
    this.setState({
      [name]: value,
    }, ()=>{console.log(this.state)} );
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(this.state);
  

      const diet = this.state.diet.join('');
      const health = this.state.health.join('');


      // let recipes = await axios.get(
      //   `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=690f49ff&cuisineType=American&diet=high-protein&health=celery-free&mealType=Dinner&dishType=Main%20course&imageSize=REGULAR&app_key=a0257a36cbac29cdb4d5de30af1ae1b6${this.state.diet}
      //   `
      // );
      // console.log(recipes);

      toast.dark(`FOOD PAB!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } catch (e) {
      console.log(e);
      toast.error(`${e.response.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  render() {
    return (
      <div className="login_body">
        <div className="login__container">
          <div className="container__child signup__form">
            <h1>Recipe</h1>
            <br />
            <form onSubmit={this.handleOnSubmit}>
              <div className="form-group">
                <label>Search recipes</label>
                <input
                  className="form-control"
                  type="text"
                  name="search"
                  placeholder="search"
                  id="search"
                  onChange={this.handleInputOnChange}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Diet:&nbsp;&nbsp;</label>
                <select
                  multiple={true}
                  style={{ color: "black" }}
                  id="diet"
                  name="diet"
                  size="2"
                  value={this.state.diet}
                  onChange={this.handleOptionsOnChange}
                >
                  <option value="&diet=balanced">balanced</option>
                  <option value="&diet=high-fiber">high-fiber</option>
                  <option value="&diet=high-protein">high-protein</option>
                  <option value="&diet=low-carb">low-carb</option>
                </select>
              </div>
              <div className="form-group">
                <label>Health:&nbsp;&nbsp;</label>
                <select
                  multiple={true}
                  style={{ color: "black" }}
                  id="health"
                  name="health"
                  size="2"
                  value={this.state.health}
                  onChange={this.handleOptionsOnChange}
                >
                  <option value="&health=alcohol-free">alcohol-free</option>
                  <option value="&health=celery-free">celery-free</option>
                  <option value="&health=crustacean-free">crustacean-free</option>
                  <option value="&health=egg-free">egg-free</option>
                  <option value="&health=fish-free">fish-free</option>
                  <option value="&health=fodmap-free">fodmap-free</option>
                  <option value="&health=immuno-supportive">immuno-supportive</option>
                  <option value="&health=keto-friendly">keto-friendly</option>
                  <option value="&health=kidney-friendly">kidney-friendly</option>
                  <option value="&health=kosher">kosher</option>
                  <option value="&health=low-fat-abs">low-fat-abs</option>
                  <option value="&health=low-sugar">low-sugar</option>
                  <option value="&health=lupine-free">lupine-free</option>
                  <option value="&health=mediterranean">mediterranean</option>
                  <option value="&health=mustard-free">mustard-free</option>
                  <option value="&health=no-oil-added">no-oil-added</option>
                  <option value="&health=paleo">paleo</option>
                  <option value="&health=peanut-free">peanut-free</option>
                  <option value="&health=pescatarian">pescatarian</option>
                  <option value="&health=pork-free">pork-free</option>
                  <option value="&health=red-meat-free">red-meat-free</option>
                  <option value="&health=sesame-free">sesame-free</option>
                  <option value="&health=shellfish-free">shellfish-free</option>
                  <option value="&health=soy-free">soy-free</option>
                  <option value="&health=sugar-conscious">sugar-conscious</option>
                  <option value="&health=tree-nut-free">tree-nut-free</option>
                  <option value="&health=vegan">vegan</option>
                  <option value="&health=vegitarian">vegitarian</option>
                  <option value="&health=wheat-free">wheat-free</option>
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
    );
  }
}
export default Recipe;



  //   async componentDidMount() {
  //     try {
  //       console.log(process.env.REACT_APP_EDAMAM_KEY);
  //       let recipes = await axios.get(
  //         `https://api.edamam.com/api/recipes/v2?type=public&q=burgers&app_id=${process.env.REACT_APP_EDAMAM_ID}&app_key=${process.env.REACT_APP_EDAMAM_KEY}`
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