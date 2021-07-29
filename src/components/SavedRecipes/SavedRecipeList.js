import React from 'react';
import { Card, Button } from 'react-bootstrap';
function RecipeList(props) {
  // console.log(props);
  function loadCard() {

    return props.recipes.slice(0, 4).map((item, index) => {
      return (
        <Card key={index} className="card_saved">
          <Card.Title className="card-title">{item.label}</Card.Title>
          <Card.Img variant="top" src={item.image} />
          <Card.Body>
            <br />
            <div className="ingredients-title">Ingredients</div>
            <hr />
            <div
              className="ingredients-container"
              style={{ textAlign: 'center' }}
            >
              <ul>
                {item.ingredients.map((ingredient, index) => {
                  return <li key={index}>{ingredient}</li>;
                })}
              </ul>
            </div>
            <div className="button-container">
              <Button
                 onClick={() => {
                  props.handleTextClick(item)
                }}
              >
                Text Recipe
              </Button>
              <Button
                onClick={() => {
                  window.open(item.directionsUrl);
                }}
              >
                URL/Directions
              </Button>
              <Button
                onClick={() => {
                  props.handleDeleteClick(item._id)
                }}
              >
                Delete Recipe
              </Button>
            </div>
          </Card.Body>
        </Card>
      );
    });
  }
  return props.loading ? (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>...Loading</div>
  ) : (
    loadCard()
  );
}
export default RecipeList;

