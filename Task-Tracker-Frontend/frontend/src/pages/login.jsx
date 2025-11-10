import {useState, useContext} from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';


export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', form);
            login(response.data.token);
            alert('Login successful!');
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
}