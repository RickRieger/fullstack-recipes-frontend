import React from "react";
import { Card, Button } from "react-bootstrap";
function RecipeList(props) {
  
  function loadCard() {
    return props.recipes.slice(props.prevNum, props.nextNum).map((item, index) => {
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
                Save recipe 
              </Button>
              <Button
                onClick={() => {
                  props.handleAddToShoppingList(item);
                }}
              >
                Add to shopping list
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

