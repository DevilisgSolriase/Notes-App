import { useEffect, useRef, useState } from 'react'
import { apiFetch } from '../api/client' // adjust path if needed

function Home() {
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
    <main className="flex h-full">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 h-full shadow-xl p-4 py-12 overflow-y-scroll hide-scrollbar">
        <div className="w-full h-[140px] bg-gray-900 rounded-xl p-6 mb-4 flex items-center justify-center hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-shadow">
          <h1 className="text-4xl font-bold">+</h1>
        </div>
      </div>

      {/* Content */}
      <div className="w-4/5 bg-gray-800 h-full p-12">
        <div className="w-full h-[100px] bg-gray-900 rounded-xl p-6 mb-6 flex justify-center items-center">
          <h1 className="text-3xl">Title</h1>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="w-full max-h-[450px] bg-gray-900 rounded-xl px-6 pt-6 mb-6 overflow-y-scroll hide-scrollbar relative"
        >
          <p className="leading-7"></p>

          {showShadow && (
            <div className="pointer-events-none sticky bottom-0 w-full h-12 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-xl shadow-lg">
            Edit
          </button>
          <button className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-xl shadow-lg">
            Delete
          </button>
        </div>
      </div>
    </main>
  )
}

export default Home