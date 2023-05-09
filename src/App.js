import './App.css';
import { useState } from 'react';

function App() {
  const [villes, setVilles] = useState([]);

  const handleInput = (event) => {
    const cp = event.target.value;
    if (cp.length === 5) {
      const url = `https://geo.api.gouv.fr/communes?codePostal=${cp}&fields=nom,code,codesPostaux,codeDepartement,codeRegion,population&format=json&geometry=centre`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const villesData = data.map((ville) => {
            return {
              nom: ville.nom,
              codePostal: ville.codesPostaux[0],
              codeDepartement: ville.codeDepartement,
              codeRegion: ville.codeRegion,
              population: ville.population,
            };
          });
          setVilles(villesData);
        });
    }
  };

  return (
    <div className="App">   
      <header className="App-header">
        <h1>API de code postal</h1>
        <form> 
            <label htmlFor="cp">Code postal</label>
            <div className="Input">
            <input 
              type="number"
              maxLength="5"
              id="cp"
              className="form-control"
              name="cp"
              onInput={handleInput}
            />
            </div>
        </form>
        <ul>
          {villes.map((ville) => (
            <li key={ville.codePostal}>
              <strong>{ville.nom} </strong> ({ville.codePostal}) - {ville.population} habitants
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

//AG.

export default App;