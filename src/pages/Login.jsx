import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../api/client'
import { signIn, getCurrentUser } from 'aws-amplify/auth';
import { useAuth } from '../context/AuthContext';


function Login() {

    const navigate = useNavigate();
    const { setUser } = useAuth();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignIn(e) {
        e.preventDefault();

    try {
      const signInResult = await signIn({ username: email, password });
      console.log('Sign in result:', signInResult);

      if (signInResult.isSignedIn) {
        const user = await getCurrentUser();
        console.log('Logged in user:', user);

        const userId = user.userId;
        console.log('userId for notes:', userId);

        setUser(user);

        alert('Login successful!');
        navigate('/');
      } else {
        alert('Sign in not complete, check nextStep');
      }
    } catch (error) {
      console.log('Error signing in:', error);
      alert(error.message);
    }
    }

    return (
    <>
    <div className='w-full h-full flex justify-center items-center p-12'>
        <div className='bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Login</h1>
            <form onSubmit={handleSignIn}>
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-sm font-medium mb-1'>Email</label>
                    <input type="email" id="email" className='w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-600 text-white' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className='mb-4'>
                    <label htmlFor="password" className='block text-sm font-medium mb-1'>Password</label>
                    <input type="password" id="password" className='w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-600 text-white' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Login</button>
                <button type="button" className='w-full mt-4 bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded' onClick={() => window.location.href = '/register'}>Register</button>
            </form>
        </div>
    </div>
    </>
    )
}

export default Login