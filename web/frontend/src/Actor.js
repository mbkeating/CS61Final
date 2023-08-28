import './App.css';
import React, {useState, useEffect} from 'react';

function Actor() {
  const [actors, setActors] = useState([])

  const [selectedActorId, setSelectedActorId] = useState(-1)

  const [movies, setMovies] = useState([])

  const [searchText, setSearchText] = useState('')

  const getActors = async () => {
    try {
      let res = await fetch(`http://localhost:3010/actors?actorName=${searchText}`)

      let actors = await res.json()
      
      let newActors = actors.map((actor) => { return {name: actor.actor_name, id:actor.actor_id}})

      setActors(newActors)
    } catch (error) {
      console.log(error)
    }
  }

  const selectActor = async (id) => {
    setSelectedActorId(id)

    try {
      let res = await fetch(`http://localhost:3010/movies?actorId=${id}`)

      let movies = await res.json()

      setMovies(movies.map((movie) => {return movie.title}))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getActors()
  });

  return (
    <div className="App-header">
        
        <input style={{backgroundColor: '#C4E3F6', width: '80%', height: '50px', fontSize: '30px'}} type="text" placeholder="search actor name" onChange={(t) => setSearchText(t.target.value)} value={searchText}/>

        {actors.map((actor, index) => (
          <div style={{backgroundColor: '#C4E3F6', width: '80%', margin: 10, borderRadius: 5, alignItems: 'center'}} key={index} onClick={() => selectActor(actor.id)}>
            <p style={{color: 'black'}}>{actor.name}</p>
            {(actor.id === selectedActorId) ? 
              <ul>
                {movies.map((movie, idx) => 
                  <li key={idx}>
                    <p 
                      style={{color: 'black'}}>{movie}
                    </p>
                  </li>)}
              </ul> 
            : <div />}
          </div>
        ))}
    </div>
  );
}

export default Actor;
