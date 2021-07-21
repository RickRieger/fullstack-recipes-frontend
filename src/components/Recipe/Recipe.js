import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export class Recipe extends Component {
  state = {
    search: "",
    diet: [],
    loadArray: ["balanced", "high-fiber", "high-protein", "low-carb"]
  };
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
  handleOnChange = (event) => {
    console.log(event.target.value);
    console.log([...this.state.diet, event.target.value]);
    // this.setState({
    //   diet: [...this.state.diet, event.target.value]
    // });
    // this.setState(
    //   {
    //     diet: [...this.state.diet, event.target.value].join(""),
    //   },
    //   ()=>{console.log(this.state.diet)}
    // );
  };
  handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      let userInputObj = {
        search: this.state.search,
        firstName: this.state.firstName
      };
      let recipes = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=690f49ff&cuisineType=American&diet=high-protein&health=celery-free&mealType=Dinner&dishType=Main%20course&imageSize=REGULAR&app_key=a0257a36cbac29cdb4d5de30af1ae1b6${this.state.diet}
        `
      );
      console.log(recipes);
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
                  size="4"
                  value={this.state.diet}
                  onChange={(e) => {
                    this.handleOnChange(e);
                  }}
                >
                  {this.state.loadArray.map((item, index) => {
                    return <option value={item} key={index}> {item}</option>;
                  })}
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













// import React, { Component } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// export class Recipe extends Component {
//   state = {
//     search: "",
//     diet: []
//   };
//   //   async componentDidMount() {
//   //     try {
//   //       console.log(process.env.REACT_APP_EDAMAM_KEY);
//   //       let recipes = await axios.get(
//   //         `https://api.edamam.com/api/recipes/v2?type=public&q=burgers&app_id=${process.env.REACT_APP_EDAMAM_ID}&app_key=${process.env.REACT_APP_EDAMAM_KEY}`
//   //       );
//   //       return console.log(recipes);
//   //     } catch (e) {
//   //       return e;
//   //   }
//   // }
//   // handleSearchRecipe = async (description) => {
//   //   try {
//   //     let recipes = await axios.get(
//   //       `https://api.edamam.com/api/recipes/v2?type=public&q=burgers&app_id=${REACT_APP_EDAMAM_ID.}&app_key=${REACT_APP_EDAMAM_KEY}`
//   //     );
//   //     return console.log(recipes);
//   //   } catch (e) {
//   //     return e;
//   //   }
//   // };
//   handleOnChange = (event) => {
//     console.log(event.target.value);
//     console.log([...this.state.diet, event.target.value]);
//     this.setState({
//       diet: [...this.state.diet, event.target.value]
//     });
//     // this.setState(
//     //   {
//     //     diet: [...this.state.diet, event.target.value].join(""),
//     //   },
//     //   ()=>{console.log(this.state.diet)}
//     // );
//   };
//   handleOnSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       let userInputObj = {
//         search: this.state.search,
//         firstName: this.state.firstName
//       };
//       let recipes = await axios.get(
//         `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=690f49ff&cuisineType=American&diet=high-protein&health=celery-free&mealType=Dinner&dishType=Main%20course&imageSize=REGULAR&app_key=a0257a36cbac29cdb4d5de30af1ae1b6${this.state.diet}
//         `
//       );
//       console.log(recipes);
//       toast.dark(`FOOD PAB!`, {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined
//       });
//     } catch (e) {
//       console.log(e);
//       toast.error(`${e.response.data.message}`, {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined
//       });
//     }
//   };
//   render() {
//     return (
//       <div className="login_body">
//         <div className="login__container">
//           <div className="container__child signup__form">
//             <h1>Recipe</h1>
//             <br />
//             <form onSubmit={this.handleOnSubmit}>
//               <div className="form-group">
//                 <label>Search recipes</label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="search"
//                   placeholder="search"
//                   id="search"
//                   autoFocus
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Diet:&nbsp;&nbsp;</label>
//                 <select
//                   multiple={true}
//                   style={{ color: "black" }}
//                   id="diet"
//                   name="diet"
//                   size="4"
//                   value={this.state.diet}
//                   onChange={(e) => {
//                     this.handleOnChange(e);
//                   }}
//                 >
//                   <option value="&diet=balanced">balanced</option>
//                   <option value="&diet=high-fiber">high-fiber</option>
//                   <option value="&diet=high-protein">high-protein</option>
//                   <option value="&diet=low-carb">low-carb</option>
//                 </select>
//               </div>
//               <div className="m-t-lg">
//                 <ul className="list-inline">
//                   <li>
//                     <input
//                       className="btn btn--form"
//                       type="submit"
//                       value="Search"
//                     />
//                   </li>
//                 </ul>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// export default Recipe;