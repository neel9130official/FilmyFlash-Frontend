import React, { useState } from 'react';
import { api } from '../api';

export default function Login({ onAuth }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ email:'', password:'' });

  async function submit(e){
    e.preventDefault();
    try {
      const { data } = await api.login(form);
      onAuth(data.token, data.user);
      setOpen(false);
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  }

  return open ? (
    <form onSubmit={submit} style={{ display:'inline-block' }}>
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/>
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required/>
      <button type="submit">Login</button>
      <button type="button" onClick={()=>setOpen(false)}>Cancel</button>
    </form>
  ) : <button onClick={()=>setOpen(true)}>Login</button>;
}
