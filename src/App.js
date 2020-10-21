import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const API_KEY = 'Q6Qo8BlhbsRxnL4pG0cwTRZ91mtfK5iiHBKo8vLi'
  const [asteroids, setAsteroids] = useState([])
  let mappedData = []
  //https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=20&api_key=Q6Qo8BlhbsRxnL4pG0cwTRZ91mtfK5iiHBKo8vLi
  //`https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=20&api_key=${API_KEY}`

  useEffect(() => {
      
  }, [asteroids])

  function mapDataToAsteroids(data){
    const mapped = [];
    data.forEach(element => {
        mapped.push({
            id: element.id,
            name: element.name,
            magnitude: element.absolute_magnitude_h
        })
    });
      
    return mapped
  }
  const apiURL = 'https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=20&api_key=Q6Qo8BlhbsRxnL4pG0cwTRZ91mtfK5iiHBKo8vLi';

  const fetchData = async () => {
        const response = await axios.get(apiURL)
        // await setAsteroids(response.data.near_earth_objects) 
        await setAsteroids(mapDataToAsteroids(response.data.near_earth_objects))
        // console.log(asteroids)
        // console.log(response.data.near_earth_objects);
        // mappedData = await mapDataToAsteroids(response.data.near_earth_objects);
        // console.log(mappedData)
        console.log(asteroids[0])
    }


  return (
    <div className="App">

        <div className="container">
          <div className="row mt-3 mb-3">
            <button className="btn btn-success" onClick={fetchData}>
              Fetch Data - List of Asteroids
            </button>
          </div>
          <div className="row">
              <hr/>
                {asteroids &&
                  asteroids.map(aster => {
                    return (
                      <div className="col-md-4">
                          <div className="card" style={{width: '18rem'}}>
                            <div className ="card-header">
                              Featured
                            </div>
                            <ul className ="list-group list-group-flush">
                              <li className ="list-group-item">Asteroid ID : {aster.id}</li>
                              <li className ="list-group-item">Asteroid Name : {aster.name}</li>
                            </ul>
                            <hr/>
                          </div>
                      </div>
                    );
                  })}
          </div>
        </div>
    
    </div>
  );
}

export default App;
