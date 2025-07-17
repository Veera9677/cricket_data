import { useEffect, useState } from 'react';
import '../../src/App.css';
import react from "../../src/assets/react.svg";

const CricketScore = () => {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState('');
  const [search, setSearch] = useState('');

  const getData = async () => {
    try {
      const response = await fetch("https://api.cricapi.com/v1/cricScore?apikey=980aa175-791a-4c92-8417-923e3988e212");
      const data = await response.json();
      setData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  const handleButton = () => {
    setSearch(inputData.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleButton();
  };

  const handleClear = () => {
    setInputData('');
    setSearch('');
  };

  // Filtered data logic
  const filteredData = data
    ? data.filter(curVal =>
        curVal.status !== "Match not started" &&
        (
          !search ||
          curVal.series.toLowerCase().includes(search.toLowerCase()) ||
          curVal.t1.toLowerCase().includes(search.toLowerCase()) ||
          curVal.t2.toLowerCase().includes(search.toLowerCase())
        )
      )
    : [];

  return (
    <div className='main-container'>
      <div className='searchBar'>
        <input
          type="text"
          placeholder="Search Match, Series"
          value={inputData}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleButton}>Search</button>
        {search && (
          <button className="clear-btn" onClick={handleClear}>Clear</button>
        )}
      </div>
      <div className="heading">
        <img src={react} alt="React Logo" />
        <p>Live Cricket Score</p>
      </div>
      <div className="container">
        {filteredData.length > 0 ? (
          filteredData.map((curVal, idx) => (
            <div className='card' key={curVal.id || idx}>
              <h3>{curVal.series}</h3>
              <h4 className="match-type">{curVal.matchType}</h4>
              <div className='teams-row'>
                <div className="team">
                  <img
                    src={curVal.t1img || 'https://via.placeholder.com/40'}
                    alt={curVal.t1}
                  />
                  <p className="team-name">{curVal.t1}</p>
                  <p className="team-score">{curVal.t1s}</p>
                </div>
                <div className="team">
                  <img
                    src={curVal.t2img || 'https://via.placeholder.com/40'}
                    alt={curVal.t2}
                  />
                  <p className="team-name">{curVal.t2}</p>
                  <p className="team-score">{curVal.t2s}</p>
                </div>
              </div>
              <p className='status'>
                Status: {curVal.status}
              </p>
            </div>
          ))
        ) : (
          <p className="no-matches">No matches found!</p>
        )}
      </div>
    </div>
  );
};

export default CricketScore;