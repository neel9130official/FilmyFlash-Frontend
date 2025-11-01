// frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import MovieList from './components/MovieList';
import { setAuthToken, api } from './api';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('ff_token');
    if (t) {
      setAuthToken(t);
      // decode token? or store user info separately
      const userStr = localStorage.getItem('ff_user');
      if (userStr) setUser(JSON.parse(userStr));
    }
  }, []);

  function onLogin(token, user) {
    localStorage.setItem('ff_token', token);
    localStorage.setItem('ff_user', JSON.stringify(user));
    setAuthToken(token);
    setUser(user);
  }

  function onLogout() {
    localStorage.removeItem('ff_token');
    localStorage.removeItem('ff_user');
    setAuthToken(null);
    setUser(null);
  }

  return (
    <div className="app">
      <header>
        <h1>FilmyFlash</h1>
        <div>
          {user ? (
            <>
              <span>Hi, {user.name}</span>
              <button onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <Signup onAuth={onLogin}/>
              <Login onAuth={onLogin}/>
            </>
          )}
        </div>
      </header>

      <main>
        <MovieList user={user}/>
      </main>
    </div>
  );
}
