import { useEffect, useRef, useState } from 'react'
import { apiFetch } from '../api/client'

function Login() {

  const [showShadow, setShowShadow] = useState(true)
  const scrollRef = useRef(null)

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    setShowShadow(scrollTop + clientHeight < scrollHeight)
  }

  useEffect(() => {
    apiFetch('/test').catch(() => {})
  }, [])

    return (
    <>
    <div className='w-full h-full flex justify-center items-center p-12'>
        <div className='bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Login</h1>
            <form>
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-sm font-medium mb-1'>Email</label>
                    <input type="email" id="email" className='w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-600 text-white' />
                </div>
                <div className='mb-4'>
                    <label htmlFor="password" className='block text-sm font-medium mb-1'>Password</label>
                    <input type="password" id="password" className='w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-600 text-white' />
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