import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const API_KEY = 'Q6Qo8BlhbsRxnL4pG0cwTRZ91mtfK5iiHBKo8vLi'
  const [asteroids, setAsteroids] = useState([]);
  const [asteroidsRange, setAsteroidsRange] = useState([])
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // let mappedData = []
  //https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=20&api_key=Q6Qo8BlhbsRxnL4pG0cwTRZ91mtfK5iiHBKo8vLi
  //`https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=20&api_key=${API_KEY}`

  useEffect(() => {
      
  }, [asteroids, asteroidsRange])

  function handleSubmit(e) {
    // alert('The value is: ' + this.input.value);
    console.log(startDate);
    console.log(endDate);
    e.preventDefault();
  }

  function handleOnChange(e) {
      if(e.target.id === 'start'){
          setStartDate(e.target.value)
          console.log(startDate)
      }
      else{
          setEndDate(e.target.value)
      }
  }

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
  function mapDataToAsteroidsRange(data){
      // data = JSON.parse(data);
      console.log(data)
      const mappedRange = [];
    //   data.forEach(element => {
    //     element.forEach(asterRange => {
    //         mappedRange.push({
    //           id: asterRange.id,
    //           name: asterRange.name,
    //           magnitude: asterRange.absolute_magnitude_h
    //       })
    //     })
    // });
      for( var key in data){
        console.log(typeof(key))
          data[key].forEach(asterRange => {
             mappedRange.push({
               date: key,
               id: asterRange.id,
               name: asterRange.name,
               magnitude: asterRange.absolute_magnitude_h
           })
        })
      }
    return mappedRange
  }
  const apiURL = `https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=20&api_key=${API_KEY}`;
  const apiURLRange1 = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&detailed=true&api_key=${API_KEY}`;
  const apiURLRange2 = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&detailed=true&api_key=${API_KEY}`;
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
  const fetchDataRange = async (e) => {
        e.preventDefault()
        let response = {}
        if(endDate === ''){
            response = await axios.get(apiURLRange1)  
        }
        else{
            response = await axios.get(apiURLRange2)
        }
        console.log(response.data.near_earth_objects)
        console.log(typeof(response.data.near_earth_objects)); 
        // await setAsteroids(response.data.near_earth_objects) 
        await setAsteroidsRange(mapDataToAsteroidsRange(response.data.near_earth_objects))
        // console.log(response.data.near_earth_objects);
        // mappedData = await mapDataToAsteroids(response.data.near_earth_objects);
        // console.log(mappedData)
        console.log(asteroidsRange[0])
    }


  return (
    <div className="App">

        <div className="container list-of-asteroids">
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
        <div className="container list-using-range">
              <div className="row mt-5">
                  <form onSubmit={fetchDataRange}>
                    <div className="row">
                        <div className="col-md-5">
                        <div className="form-group">        
                              <label for="start"> Start date:</label>
                              <hr/>
                              <input type="date" id="start" name="range-start" value = {startDate} onChange = {handleOnChange}></input>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="form-group">        
                              <label for="end"> End date:</label>
                              <hr/>
                              <input type="date" id="end" value = {endDate} name="range-end" onChange = {handleOnChange}></input>
                        </div>
                      </div>
                      <div className="col-md-2">
                              <button type="submit" class="btn btn-info">Submit</button>
                      </div>
                    </div>
                  </form>
              </div>
              <div className="row">
                <hr/>
                {asteroidsRange &&
                  asteroidsRange.map(aster => {
                    return (
                      <div className="col-md-4">
                          <div className="card" style={{width: '18rem'}}>
                            <div className ="card-header">
                              {aster.date}
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
