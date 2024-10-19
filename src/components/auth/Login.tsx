"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize router instance

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login response:', data); // Debug log

      if (!response.ok) {
        throw new Error(data.message || 'Login request failed');
      }

      if (data.token && data.user) {
        // Store user data and token
        document.cookie = `token=${data.token}; path=/; secure; SameSite=Lax`;
        login(data.user);
        localStorage.setItem('token', data.token);
        
        // Debug logs
        console.log('Token stored:', !!localStorage.getItem('token'));
        console.log('User stored:', !!data.user);

        // Attempt to navigate to the dashboard
        try {
          console.log('Router instance:', router);
          await router.replace('/dashboard'); 

          // Verify navigation success
          if (window.location.pathname !== '/dashboard') {
            console.error('Navigation failed: Still on', window.location.pathname);
            //window.location.href = '/dashboard'; // Fallback to manual redirect
          }
        } catch (navError) {
          console.error('Navigation error:', navError);
          setError('Failed to navigate to dashboard. Please try again.');
          return;
        }
      } else {
        console.error('Invalid response data:', data);
        setError('Login failed: Invalid response data');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
