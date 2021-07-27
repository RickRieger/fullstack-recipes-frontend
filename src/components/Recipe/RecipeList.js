import React from "react";
import { Card, Button } from "react-bootstrap";
function RecipeList(props) {
  function loadCard() {
    return props.recipes.slice(0, 3).map((item, index) => {
      return (
        <Card key={index}>
          <Card.Title className="card-title">{item.recipe.label}</Card.Title>
          <Card.Img variant="top" src={item.recipe.image} />
          <Card.Body>
            <br />
            <div className="ingredients-title">Ingredients</div>
            <hr />
            <div
              className="ingredients-container"
              style={{ textAlign: "center" }}
            >
              <ul>
                {item.recipe.ingredients.map((ingredient, index) => {
                  return <li key={index}>{ingredient.text}</li>;
                })}
              </ul>
            </div>
            <div className="button-container">
              <Button
                onClick={() => {
                  props.handleAddToFavorites(item);
                }}
              >
                Save recipe for later
              </Button>
              <Button
                onClick={() => {
                  props.handleAddToShoppingList(item);
                }}
              >
                Add ingredients to shopping list
              </Button>
            </div>
          </Card.Body>
        </Card>
      );
    });
  }
  return props.loading ? (
    <div style={{ textAlign: "center", marginTop: "50px" }}>...Loading</div>
  ) : (
    loadCard()
  );
}
export default RecipeList;

// import React, { Component } from 'react'
// import {Card, Button} from 'react-bootstrap';
// export class RecipeList extends Component {
//   componentDidMount = ()=>{
//     console.log(this.props);
//   }
//   render() {
//     return (
//       <>
// <Card >
// <Card.Title className="card-title">Chicken Casserole</Card.Title>
//   <Card.Img variant="top" src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMGNhc3Nlcm9sZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" />
//   <Card.Body>
//   <br />
//   <div className="ingredients-title">Ingredients</div>

//   <hr />

//     <div className="ingredients-container">

//     <ul>
//         <li>ingrediant</li>
//         <li>ingrediant</li>
//         <li>ingrediant</li>
//         <li>ingrediant</li>
//         <li>ingrediant</li>
//         <li>ingrediant</li>
//         <li>ingrediant</li>
//       </ul>
//     </div>

//     <div className="button-container">
//     <Button >Text to a friend</Button>
//     <Button >Add to shopping list</Button>
//     <Button >Add to favorites</Button>
//     </div>

//   </Card.Body>
// </Card>

//       </>
//     )
//   }
// }

// export default RecipeList
