import './App.css';
import React, {useState, useEffect} from 'react';

function SingleQuery(props) {

    const [result, setResult] = useState([])

    const getResult = async () => {
        let res = await fetch(`http://localhost:3010/${props.query}`)

        let queryResult = await res.json()

        setResult(queryResult.map((result) => {return result[props.columns[0]] + ', ' + result[props.columns[1]]}))
    }

    useEffect(() => {
        getResult()
      }, []);

    return (
        <div style={{width: '90%', margin: '20px', backgroundColor: '#C4E3F6', borderRadius: 10}}>
            <p style={{color: 'black'}}>{props.description}</p>

            <ul>
                <li>
                    <p style={{color: 'black'}}>{props.columns.join(', ')}</p>
                </li>
                {result.map((result, idx) => 
                  <li key={idx}>
                    <p 
                      style={{color: 'black'}}>{result}
                    </p>
                  </li>)}
              </ul> 
        </div>
    );
}

export default SingleQuery;