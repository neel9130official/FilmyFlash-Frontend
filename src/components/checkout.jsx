import React from 'react';
import { api } from '../api';

export default function Checkout({ show, seats, user, onBack }) {
  const amount = seats.length * show.price;

  async function startPayment() {
    try {
      // 1) Create order on server
      const { data } = await api.createOrder({ amount, currency: 'INR' });
      const order = data.order;

      // 2) Open Razorpay Checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_key', // replace with your key or set env var
        amount: order.amount,
        currency: order.currency,
        name: 'FilmyFlash',
        description: `${show.movieTitle} - ${show.theater_name}`,
        order_id: order.id,
        handler: async function (response) {
          // response.razorpay_payment_id etc
          // 3) Tell backend to create booking (server will verify seats and mark them booked)
          try {
            const res = await api.createBooking({
              show_id: show.id,
              seats,
              amount,
              payment_id: response.razorpay_payment_id
            });
            alert('Booking confirmed! Booking id: ' + res.data.bookingId);
            window.location.reload();
          } catch (err) {
            alert('Could not finalize booking: ' + (err.response?.data?.error || err.message));
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email
        },
        notes: {
          seats: seats.join(',')
        },
        theme: {
          color: '#F37254'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Payment failed to start: ' + (err.response?.data?.error || err.message));
    }
  }

  return (
    <div>
      <h3>Checkout</h3>
      <p>Show: {show.movieTitle} — {show.theater_name}</p>
      <p>Seats: {seats.join(', ')}</p>
      <p>Amount: ₹{amount.toFixed(2)}</p>
      <button onClick={startPayment}>Pay with Razorpay</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
}
