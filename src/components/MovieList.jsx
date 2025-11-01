import React, { useEffect, useState } from 'react';
import { api } from '../api';
import SeatSelector from './SeatSelector';

export default function MovieList({ user }) {
  const [movies, setMovies] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(()=> {
    api.getMovies().then(res=>setMovies(res.data.movies)).catch(e=>console.error(e));
  }, []);

  if (selectedShow) {
    return <SeatSelector show={selectedShow} user={user} goBack={()=>setSelectedShow(null)} />;
  }

  return (
    <div>
      {movies.map(m => (
        <div key={m.id} className="movie-card">
          <div style={{width:120}}>
            <img src={m.poster_url || 'https://via.placeholder.com/120x160'} alt={m.title} style={{width:120}}/>
          </div>
          <div>
            <h3>{m.title}</h3>
            <p>{m.description}</p>
            <div>
              {m.shows && m.shows.map(s => (
                <div key={s.id}>
                  <button onClick={()=>setSelectedShow({...s, movieTitle: m.title})}>
                    {s.theater_name} — {new Date(s.show_time).toLocaleString()} — ₹{s.price}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
