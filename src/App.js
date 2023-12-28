import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.api-ninjas.com/v1/celebrity?name=${searchTerm}`,
          {
            headers: {
              'X-Api-Key' : 'INSERT API KEY'
            }
          }
        );
        const data = await res.json();
        searchResults(data);
      }catch (error) {
        setError(error);
      }
      setIsLoading(false)
    }
    if(searchTerm.length > 0){
      fetchData();
    }
  }, [searchTerm])

  return (
    <div className="App">
      <form>
        <label> Search for a celebrity networth:</label>
        <input 
        type='text'
        id='search'
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
        ></input>
      </form>
      {isLoading ? (
        <p>One moment please...</p>
      ) : (
        searchResults.map(result => {
          <div key='result.id'>
            <h2>{result.name}</h2>
            <h3>Net woth: {result.net_worth}</h3>
          </div>
        })
      )}
    </div>
  );
}

export default App;
