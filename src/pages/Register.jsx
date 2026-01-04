import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp, confirmSignUp } from 'aws-amplify/auth';

function Register() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState('register');
    const [code, setCode] = useState('');


    async function handleSignUp(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const { user } = await signUp({
            username: email,
            password,
            options: {
                userAttributes: { email }
            }
        });
        console.log('Sign up success', user);
        alert('Registration successful! Please check your email for confirmation.');
        setStep('confirm');
    } catch (error) {
        console.log('Error signing up:', error);
        alert(error.message || 'Error during registration');
        }
    }

    const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code
      });
      alert('Account confirmed! You can now log in.');
      window.location.href = '/login';
    } catch (error) {
      console.log('Confirmation error:', error);
      alert(error.message || 'Failed to confirm account');
    }
  }


    return(
    <>
    <div className='w-full h-full flex justify-center items-center p-12'>
        <div className='bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md'>
            {step === 'register' && (
                <>
            <h1 className='text-2xl font-bold mb-4'>Register</h1>
            <form onSubmit={handleSignUp}>
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-sm font-medium mb-1'>Email</label>
                    <input type="email" id="email" className='w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-600 text-white' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className='mb-4'>
                    <label htmlFor="password" className='block text-sm font-medium mb-1'>Password</label>
                    <input type="password" id="password" className='w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-600 text-white' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className='mb-4'>
                    <label htmlFor="confirmPassword" className='block text-sm font-medium mb-1'>Confirm Password</label>
                    <input type="password" id="confirmPassword" className='w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-600 text-white' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                </div>
                <button type="submit" className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold mt-1 py-2 px-4 rounded'>Register</button>
            </form>
            </>
            )}
        {step === 'confirm' && (
          <>
            <h1 className='text-2xl font-bold mb-4'>Verify Your Account</h1>
            <form onSubmit={handleConfirm}>
              <div className='mb-4'>
                <label htmlFor="code" className='block text-sm font-medium mb-1'>Verification Code</label>
                <input type="text" id="code" className='w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-600 text-white' value={code} onChange={(e) => setCode(e.target.value)} required/>
              </div>
              <button type="submit" className='w-full bg-green-500 hover:bg-green-700 text-white font-bold mt-1 py-2 px-4 rounded'>Confirm</button>
            </form>
          </>
        )}
        </div>
    </div>    
    </>
    )
}


export default Register