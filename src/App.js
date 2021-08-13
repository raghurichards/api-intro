import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [countries, setcountries] = useState([]);
  const [singleCountry, setsingleCountry] = useState("");
  const [cities, setCities] = useState(null);
  const [singleCity, setsingleCity] = useState("");
  const [submit, setsubmit] = useState(false)

  const fetchCountries = async () => {
    try {
      const country = await axios.get("https://countriesnow.space/api/v0.1/countries");
      setcountries(country.data.data);
      
    } catch (error) {
      
      console.log(error);
    }
  };

  const fetchCities = (country) => {
    setsubmit(false);
    setsingleCity(null);
    
    setsingleCountry(country);
    const findCities = countries.find((c) => c.country === country);
    setCities(findCities.cities);
  }; 

  const submitHandle = () => {
    if (singleCountry && singleCity) {
        setsubmit(true)
    }

  }

  useEffect(() => {
    fetchCountries();
    
  }, []); 
  
  return (
    <div className="App"> 
      <div className="App-header"> 
        <h>Select Your Hometown</h>
        <div>
          {countries && (
            <select onChange={ (e) => fetchCities(e.target.value)} value={singleCountry}>
              <option disabled selected hidden>
                Select Country
              </option>
              {countries.map((country) => (
                <option key={'$ {country.country}'} value={country.country}> 
                  {country.country}
                </option >
              ))} 
           </select> )}

          {cities && (
            <select onChange={(e) => setsingleCity(e.target.value)} 
            value={singleCity}>
            <option disabled selected hidden>
              Select City
            </option>
            {cities.map((city) => (
              <option value={city} key={city}>
                {city}
              </option>
            ))}
            
          </select>)}

          <button onClick={submitHandle}>Go</button>
        </div>
          {submit && (           
            <h3>Your country is {singleCountry} and Your city is{singleCity} </h3>
          )}
      </div>
    </div>
  );
}

export default App;
