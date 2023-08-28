import './App.css';
import React from 'react';
import SingleQuery from './SingleQuery';

function Query() {

  return (
    <div className="App-header">
        
        <SingleQuery description={'What director has done movies of the most genres?'} query={'mostGenresForDirectors'} columns={['director_name', 'genre_count']}/>
        <SingleQuery description={'What movie had the most efficient per-minute grossing (grossing/runtime)?'} query={'bestMinuteGrossing'} columns={['title', 'per_min_grossing']}/>
        <SingleQuery description={'What is the most popular genre for the top 1000?'} query={'popularGenre'} columns={['genre_name', 'movies_count']}/>
        <SingleQuery description={'Which crew members were in the most movies in the top 1000?'} query={'frequentActors'} columns={['actor_name', 'movie_count']}/>
        <SingleQuery description={'What movie in the top 1000 had the highest profit (gross - budget)?'} query={'highestProfit'} columns={['title', 'profit_m']}/>
        <SingleQuery description={'Were any movies in the top 1000 total flops (budget > gross)?'} query={'flops'} columns={['title', 'profit_m']}/>
    </div>
  );
}

export default Query;
