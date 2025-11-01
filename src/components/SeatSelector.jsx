import React, { useEffect, useState } from 'react';
import { api } from '../api';
import Checkout from './Checkout';

export default function SeatSelector({ show, user, goBack }) {
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(()=> {
    api.getSeats(show.id).then(res=>setSeats(res.data.seats)).catch(e=>console.error(e));
  }, [show]);

  function toggle(seat) {
    if (seat.is_booked) return;
    if (selected.includes(seat.seat_label)) setSelected(selected.filter(s=>s!==seat.seat_label));
    else setSelected([...selected, seat.seat_label]);
  }

  if (showCheckout) {
    return <Checkout show={show} seats={selected} user={user} onBack={()=>setShowCheckout(false)} />;
  }

  return (
    <div>
      <button onClick={goBack}>Back to movies</button>
      <h2>{show.movieTitle} — {show.theater_name}</h2>
      <div>
        {seats.map(s => (
          <div key={s.seat_label} onClick={()=>toggle(s)} className={
            `seat ${s.is_booked ? 'booked':''} ${selected.includes(s.seat_label) ? 'selected':''}`
          }>{s.seat_label}</div>
        ))}
      </div>
      <div>
        <p>Selected: {selected.join(', ') || 'None'}</p>
        <p>Total: ₹{(selected.length * show.price).toFixed(2)}</p>
        <button disabled={!selected.length || !user} onClick={()=>setShowCheckout(true)}>Proceed to Pay</button>
        {!user && <p>Please login/signup to book seats.</p>}
      </div>
    </div>
  );
}
