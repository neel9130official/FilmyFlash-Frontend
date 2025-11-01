import React, { useState } from 'react';
import { api } from '../api';

export default function Signup({ onAuth }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', password:'' });

  async function submit(e) {
    e.preventDefault();
    try {
      const { data } = await api.signup(form);
      onAuth(data.token, data.user);
      setOpen(false);
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    }
  }

  return open ? (
    <form onSubmit={submit} style={{ display:'inline-block' }}>
      <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/>
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/>
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required/>
      <button type="submit">Sign up</button>
      <button type="button" onClick={()=>setOpen(false)}>Cancel</button>
    </form>
  ) : <button onClick={()=>setOpen(true)}>Sign up</button>;
}
