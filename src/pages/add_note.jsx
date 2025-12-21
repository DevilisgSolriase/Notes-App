import { useState, useRef } from 'react'
import './App.css'
import './style.css'
import './index.css'

function add_note() {

  return (
    <>
    <div className='font-serif text-gray-300'>
      <header className="bg-gray-900 min-h-[80px] flex items-center justify-center text-white shadow-white-lg z-50 px-4">
          <div className="text-3xl font-bold mb-2 flex-none">
            Notes App
          </div>
          <div className='h-full px-4 items-center justify-center flex-grow flex'>
            <div className='max-w-[620px] h-[40px] bg-white rounded-[20px] flex-grow items-center px-2'>
              <input
                type="text"
                placeholder="Search your notes..."
                className="w-full h-full rounded-[20px] px-4 text-black outline-none"
              />
            </div>
          </div>
          <div className="text-3xl font-bold mb-2 flex-none">
            Notes App
          </div>
        </header>

        <main className="h-screen flex items-center justify-center">

        </main>
      </div>
    </>
  )
}

export default add_note