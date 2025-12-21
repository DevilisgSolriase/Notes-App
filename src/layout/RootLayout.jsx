export default function RootLayout({ children }) {
  return (
    <div className="font-serif text-gray-300 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 min-h-[80px] flex items-center text-white z-50 px-4">
        <div className="text-3xl font-bold flex-none">Notes App</div>

        <div className="flex-grow flex justify-center px-4">
          <div className="max-w-[620px] h-[40px] bg-white rounded-[20px] flex items-center px-2 w-full">
            <input
              type="text"
              placeholder="Search your notes..."
              className="w-full h-full rounded-[20px] px-4 text-black outline-none"
            />
          </div>
        </div>

        <div className="text-3xl font-bold flex-none">Notes App</div>
      </header>

      {/* Page content */}
      <div className="flex-1">{children}</div>
    </div>
  )
}
