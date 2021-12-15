import React, { Component, useEffect } from 'react';
import axios from 'axios';
import Axios from '../utils/Axios';
import { toast } from 'react-toastify';
import RecipeList from './RecipeList';
import './Recipe.css';
export class Recipe extends Component {
  state = {
    search: '',
    diet: [],
    health: [],
    cuisineType: '',
    mealType: '',
    dishType: '',
    maxCalories: '',
    recipes: [],
    loading: false,
    prevBtnDisabled: true,
    nextBtnDisabled: true,
    numOfRecipes: 0,
    prevNum: 0,
    nextNum: 3,
    displaySearchForm: true,
  };
  componentDidMount() {
    if (window.innerWidth < 1001) {
      this.setState({ nextNum: 1 });
    } else {
      this.setState({ nextNum: 3 });
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1001) {
        this.setState({ nextNum: 1 });
      } else {
        this.setState({ nextNum: 3 });
      }
    });
  }

  handleInputOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleOptionsOnChange = (event) => {
    //Here's our two variables
    let target = event.target;
    let name = target.name;

    //Array.from creates a new array with a call back function
    let value = Array.from(target.selectedOptions, (option) => option.value);

    //set the state dynamically
    this.setState({
      [name]: value,
    });
  };
  handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      let result = await this.handleSearchRecipes();

      this.setState(
        {
          recipes: result.data.hits,
          numOfRecipes: result.data.hits.length,
        },
        () => {
          this.setState({
            loading: false,
          });
        }
      );

      if (this.state.numOfRecipes > 3) {
        this.setState({
          nextBtnDisabled: false,
        });
      }

      if (result.data.count === 0 || this.state.numOfRecipes === 0) {
        return toast.dark(`Please search something else!`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      this.setState({
        displaySearchForm: false,
      });
      toast.success(`Recipes found!`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      console.log(e);
      toast.error(`${e.response.data.message}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  handleSearchRecipes = async () => {
    this.setState({
      loading: true,
    });
    const search = this.state.search;
    const diet = this.state.diet.join('');
    const health = this.state.health.join('');
    const cuisineType = this.state.cuisineType;
    const mealType = this.state.mealType;
    const dishType = this.state.dishType;
    const maxCalories = this.state.maxCalories;

    try {
      let result = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${search}${diet}${health}${cuisineType}${mealType}${dishType}${maxCalories}&app_id=${process.env.REACT_APP_EDAMAM_ID}&app_key=${process.env.REACT_APP_EDAMAM_KEY}&random=true`
      );
      return result;
    } catch (e) {
      console.log(e);
    }
  };
  handleAddToShoppingList = async (item) => {

    try {
      const ingredients = Array.from(item.recipe.ingredients, (item) => {
        return item.text;
      });


      await Axios.post('/grocery/create-grocery-item', ingredients);
      toast.success(`Ingredients saved!`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      console.log(e);
    }
  };
  handleAddToFavorites = async (item) => {
    const label = item.recipe.label;
    const image = item.recipe.image;
    const ingredients = Array.from(item.recipe.ingredients, (item) => {
      return item.text;
    });
    const directionsUrl = item.recipe.url;

    const savedRecipe = {
      label: label,
      image: image,
      ingredients: ingredients,
      directionsUrl: directionsUrl,
    };
    try {
      await Axios.post('/recipe/create-recipe', savedRecipe);
      toast.success(`Recipe saved!`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleNewSearch = () => {
    window.location.reload(false);
  };

  handlePrevPage = () => {
    let prevNum = this.state.prevNum - 3;
    let nextNum = this.state.nextNum - 3;
    this.setState({
      prevNum: prevNum,
      nextNum: nextNum,
    });
    if (this.state.prevNum < 5) {
      this.setState({
        prevBtnDisabled: true,
      });
    }

    this.setState({
      nextBtnDisabled: false,
    });
  };

  handleNextPage = () => {
    let prevNum = this.state.prevNum + 3;
    let nextNum = this.state.nextNum + 3;
    this.setState({
      prevNum: prevNum,
      nextNum: nextNum,
    });
    if (nextNum >= this.state.numOfRecipes) {
      this.setState({
        nextBtnDisabled: true,
      });
    }

    this.setState({
      prevBtnDisabled: false,
    });
  };

  render() {
    return (
      <div className='recipe_body'>
        <div id='recipe-container-search'>
          {this.state.displaySearchForm ? (
            ''
          ) : (
            <div className='card-section'>
              <RecipeList
                prevNum={this.state.prevNum}
                nextNum={this.state.nextNum}
                recipes={this.state.recipes}
                loading={this.state.loading}
                handleTextToFriend={this.handleTextToFriend}
                handleAddToShoppingList={this.handleAddToShoppingList}
                handleAddToFavorites={this.handleAddToFavorites}
              />
            </div>
          )}

          {this.state.displaySearchForm ? (
            <div className='recipe__form'>
              <h1>Recipe search</h1>
              <div className='logo-container'>
                <img src='transparent.png' alt='edamam logo' />
              </div>
              <br />
              <br />
              <form onSubmit={this.handleOnSubmit}>
                <div className='form-group'>
                  <label>Search:&nbsp;&nbsp;</label>
                  <input
                    className='form-control'
                    type='text'
                    name='search'
                    style={{ color: 'black' }}
                    placeholder='search'
                    id='search'
                    onChange={this.handleInputOnChange}
                    required
                    autoFocus
                  />
                </div>

                <br />
                <div className='form-group'>
                  <label>Diet:&nbsp;&nbsp;</label>
                  <select
                    multiple={true}
                    style={{ color: 'black' }}
                    id='diet'
                    name='diet'
                    size='3'
                    value={this.state.diet}
                    onChange={this.handleOptionsOnChange}
                  >
                    <option value=''>No selection</option>
                    <option value='&diet=balanced'>balanced</option>
                    <option value='&diet=high-fiber'>high-fiber</option>
                    <option value='&diet=high-protein'>high-protein</option>
                    <option value='&diet=low-carb'>low-carb</option>
                  </select>
                </div>

                <div className='form-group'>
                  <label>Health:&nbsp;&nbsp;</label>
                  <select
                    multiple={true}
                    style={{ color: 'black' }}
                    id='health'
                    name='health'
                    size='3'
                    value={this.state.health}
                    onChange={this.handleOptionsOnChange}
                  >
                    <option value=''>No selection</option>
                    <option value='&health=alcohol-free'>alcohol-free</option>
                    <option value='&health=celery-free'>celery-free</option>
                    <option value='&health=crustacean-free'>
                      crustacean-free
                    </option>
                    <option value='&health=egg-free'>egg-free</option>
                    <option value='&health=fish-free'>fish-free</option>
                    <option value='&health=fodmap-free'>fodmap-free</option>
                    <option value='&health=immuno-supportive'>
                      immuno-supportive
                    </option>
                    <option value='&health=keto-friendly'>keto-friendly</option>
                    <option value='&health=kidney-friendly'>
                      kidney-friendly
                    </option>
                    <option value='&health=kosher'>kosher</option>
                    <option value='&health=low-fat-abs'>low-fat-abs</option>
                    <option value='&health=low-sugar'>low-sugar</option>
                    <option value='&health=lupine-free'>lupine-free</option>
                    <option value='&health=mediterranean'>mediterranean</option>
                    <option value='&health=mustard-free'>mustard-free</option>
                    <option value='&health=no-oil-added'>no-oil-added</option>
                    <option value='&health=paleo'>paleo</option>
                    <option value='&health=peanut-free'>peanut-free</option>
                    <option value='&health=pescatarian'>pescatarian</option>
                    <option value='&health=pork-free'>pork-free</option>
                    <option value='&health=red-meat-free'>red-meat-free</option>
                    <option value='&health=sesame-free'>sesame-free</option>
                    <option value='&health=shellfish-free'>
                      shellfish-free
                    </option>
                    <option value='&health=soy-free'>soy-free</option>
                    <option value='&health=sugar-conscious'>
                      sugar-conscious
                    </option>
                    <option value='&health=tree-nut-free'>tree-nut-free</option>
                    <option value='&health=vegan'>vegan</option>
                    <option value='&health=vegitarian'>vegitarian</option>
                    <option value='&health=wheat-free'>wheat-free</option>
                  </select>
                </div>

                <div className='form-group'>
                  <div>
                    <label>Cuisine:&nbsp;&nbsp;</label>
                    <div style={{ color: 'black', fontSize: '16px' }}></div>
                  </div>
                  <select
                    style={{ color: 'black' }}
                    id='cuisineType'
                    name='cuisineType'
                    size='3'
                    value={this.state.cuisineType}
                    onChange={this.handleInputOnChange}
                    multiple={false}
                  >
                    <option value=''>No selection</option>
                    <option value='&cuisineType=American'>American</option>
                    <option value='&cuisineType=Asian'>Asian</option>
                    <option value='&cuisineType=British'>British</option>
                    <option value='&cuisineType=Caribbean'>Caribbean</option>
                    <option value='&cuisineType=Central European'>
                      Central European
                    </option>
                    <option value='&cuisineType=Chinese'>Chinese</option>
                    <option value='&cuisineType=French'>French</option>
                    <option value='&cuisineType=Indian'>Indian</option>
                    <option value='&cuisineType=Italian'>Italian</option>
                    <option value='&cuisineType=Japanese'>Japanese</option>
                    <option value='&cuisineType=Italian'>Italian</option>
                    <option value='&cuisineType=Kosher'>Kosher</option>
                    <option value='&cuisineType=Mediterranean'>
                      Mediterranean
                    </option>
                    <option value='&cuisineType=Mexican'>Mexican</option>
                    <option value='&cuisineType=Middle Eastern'>
                      Middle Eastern
                    </option>
                    <option value='&cuisineType=Nordic'>Nordic</option>
                    <option value='&cuisineType=South American'>
                      South American
                    </option>
                    <option value='&cuisineType=South East Asian'>
                      South East Asian
                    </option>
                    <option value='&cuisineType=Nordic'>Nordic</option>
                  </select>
                </div>
                <div className='form-group'>
                  <div>
                    <label>Meal:&nbsp;&nbsp;</label>
                    <div style={{ color: 'black', fontSize: '16px' }}></div>
                  </div>
                  <select
                    style={{ color: 'black' }}
                    id='mealType'
                    name='mealType'
                    size='3'
                    value={this.state.mealType}
                    onChange={this.handleInputOnChange}
                    multiple={false}
                  >
                    <option value='No selection'>No selection</option>
                    <option value='&mealType=Breakfast'>Breakfast</option>
                    <option value='&mealType=Lunch'>Lunch</option>
                    <option value='&mealType=Snack'>Snack</option>
                    <option value='&mealType=Teatime'>Teatime</option>
                    <option value='&mealType=Dinner'>Dinner</option>
                  </select>
                </div>
                <div className='form-group'>
                  <div>
                    <label>Dish:&nbsp;&nbsp;</label>
                    <div style={{ color: 'black', fontSize: '16px' }}></div>
                  </div>
                  <select
                    style={{ color: 'black' }}
                    id='dishType'
                    name='dishType'
                    size='3'
                    value={this.state.dishType}
                    onChange={this.handleInputOnChange}
                    // multiple={false}
                  >
                    <option value=''>No selection</option>
                    <option value='&dishType=Biscuits and Cookies'>
                      Biscuits and Cookies
                    </option>
                    <option value='&dishType=Bread'>Bread</option>
                    <option value='&dishType=Cereals'>Cereals</option>
                    <option value='&dishType=Condiments and sauces'>
                      Condiments and sauces
                    </option>
                    <option value='&dishType=Desserts'>Desserts</option>
                    <option value='&dishType=Drinks'>Drinks</option>
                    <option value='&dishType=Main Course'>Main Course</option>
                    <option value='&dishType=Pancake'>Pancake</option>
                    <option value='&dishType=Preps'>Preps</option>
                    <option value='&dishType=Preserve'>Preserve</option>
                    <option value='&dishType=Salad'>Salad</option>
                    <option value='&dishType=Sandwiches'>Sandwiches</option>
                    <option value='&dishType=Side dish'>Side dish</option>
                    <option value='&dishType=Soup'>Soup</option>
                    <option value='&dishType=Starter'>Starter</option>
                    <option value='&dishType=Sweets'>Sweets</option>
                  </select>
                </div>
                <div className='form-group'>
                  <div>
                    <label>Maxcalories:&nbsp;&nbsp;</label>
                    <div style={{ color: 'black', fontSize: '16px' }}></div>
                  </div>
                  <select
                    style={{ color: 'black' }}
                    id='maxCalories'
                    name='maxCalories'
                    size='3'
                    value={this.state.calories}
                    onChange={this.handleInputOnChange}
                    multiple={false}
                  >
                    <option value=''>No selection</option>
                    <option value='&calories=10'>10</option>
                    <option value='&calories=30'>30</option>
                    <option value='&calories=100'>100</option>
                    <option value='&calories=300'>300</option>
                    <option value='&calories=600'>600</option>
                    <option value='&calories=700'>700</option>
                    <option value='&calories=800'>800</option>
                    <option value='&calories=900'>900</option>
                    <option value='&calories=1000'>1000</option>
                    <option value='&calories=1200'>1200</option>
                    <option value='&calories=1400'>1400</option>
                    <option value='&calories=1600'>1600</option>
                    <option value='&calories=1800'>1800</option>
                    <option value='&calories=2000'>2000</option>
                    <option value='&calories=2200'>2200</option>
                    <option value='&calories=2400'>2400</option>
                    <option value='&calories=2600'>2600</option>
                    <option value='&calories=2800'>2800</option>
                    <option value='&calories=3000'>3000</option>
                  </select>
                </div>
                <div className='m-t-lg'>
                  <ul className='list-inline'>
                    <li>
                      <input
                        className='btn btn--form'
                        type='submit'
                        value='Search'
                      />
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          ) : (
            ''
          )}
        </div>
        {!this.state.displaySearchForm ? (
          <div className='paginate-buttons '>
            <button
              className='btn--form--recipe'
              disabled={this.state.prevBtnDisabled}
              onClick={this.handlePrevPage}
            >
              Prev
            </button>
            <button
              className='btn--form--recipe new-search-button'
              onClick={() => {
                window.location.reload(false);
              }}
            >
              NewSearch
            </button>
            <button
              disabled={this.state.nextBtnDisabled}
              className='btn--form--recipe'
              onClick={this.handleNextPage}
            >
              Next
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
export default Recipe;
