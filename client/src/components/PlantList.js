import React, { Component } from "react";
import axios from "axios";



export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants

  state = {
    plants: [],
    searchInput: '',
  }

  componentDidMount(){
    axios.get('http://localhost:3333/plants')
    .then(res => {
      console.log(res)
      this.setState({plants: res.data.plantsData})
    })
    .catch(err => {
      console.log(err)
    })
  }

// const filteredList = this.state.plants.filter(plant => {
//     return plant.name.toLowerCase().includes(this.state.searchInput.toLowerCase())
//   })

  updatedFilter = () => {this.setState({plants: this.state.plants.filter(plant=> {
    return plant.name.toLowerCase().includes(this.state.searchInput.toLowerCase())
  })})}
 
  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
     
      <main className="plant-list">
         <div className="search-bar">
          <input value={this.state.searchInput} placeholder="search for a plant" onChange={(e) => {
          this.setState({searchInput: e.target.value})}}  />
           <button onClick={this.updatedFilter} className="plant-button">Search</button>
        </div>
       

        {this.state.plants.map((plant) => (
          <div className="plant-card" key={plant.id}>
            <img className="plant-image" src={plant.img} alt={plant.name} />
            <div className="plant-details">
              <h2 className="plant-name">{plant.name}</h2>
              <p className="plant-scientific-name">{plant.scientificName}</p>
              <p>{plant.description}</p>
              <div className="plant-bottom-row">
                <p>${plant.price}</p>
                <p>☀️ {plant.light}</p>
                <p>💦 {plant.watering}x/month</p>
              </div>
              <button
                className="plant-button"
                onClick={() => this.props.addToCart(plant)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }
}
