import { useEffect, useState } from 'react';
import '../../src/App.css';
import  react from "../../src/assets/react.svg";
const CricketScore =() => {
    const [data,setData]=useState([]);
    const [inputData,setInputData] = useState();
    const [search,setSearch] = useState('');
    const getData = async ()=>{
        try{
            const response =await fetch("https://api.cricapi.com/v1/cricScore?apikey=980aa175-791a-4c92-8417-923e3988e212")
            const data=await response.json();
            setData(data.data)
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getData()
    },[]
)
    const handleInput=(e)=>{
        console.log(e.target.value);        
        setInputData(e.target.value);
    }
    const handleButton = () =>{
        setSearch(inputData);
    }

    return(
    <div className='main-contianer'>
        <div className='searchBar'>
            <input type="text" placeholder="Search Match, Series" onChange={handleInput}/>
            <button onClick={handleButton}>Search</button>
        </div>
        <div className="heading">
            <img src={react}></img>
            <p>Live Cricket Score</p>
        </div>
        <div className="contianer">
            {data ? data.map( curVal=>{
                console.log(curVal)
                if(curVal.status != "Match not started"){
                    if(curVal.series.includes(search) || curVal.t1.includes(search)|| curVal.t2.includes(search)){
                        return(
                            <div className='card'> 
                            <h3>{curVal.series}</h3>
                            <h3>{curVal.matchType}</h3>
                            <div className='img'>
                                <div>
                                    <img src={curVal.t1img}/>
                                    <p> {curVal.t1}</p>
                                    <p> {curVal.t1s}</p>
                                </div>
                                <div>
                                    <img src={curVal.t2img}/>
                                    <p> {curVal.t2}</p>
                                    <p> {curVal.t2s}</p>
                                </div>
                            </div>
                            <p className='status'>Status: {curVal.status}</p>
                            </div>
                        )
                    }
                    if(search ==''){
                        return(
                            <div className='card'> 
                            <h3>{curVal.series}</h3>
                            <h3>{curVal.matchType}</h3>
                            <div className='img'>
                                <div>
                                    <img src={curVal.t1img}/>
                                    <p> {curVal.t1s}</p>
                                </div>
                                <div>
                                    <img src={curVal.t2img}/>
                                    <p> {curVal.t2s}</p>
                                </div>
                            </div>
                            <p className='status'>Status: {curVal.status}</p>
                            </div>
                        )
                    }
                }
                   
            })
            :<p>Data not found!</p>
            }
        </div>
      </div>
    );
  }
export default CricketScore;