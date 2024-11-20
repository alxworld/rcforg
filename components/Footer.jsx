'use client'

import { useState } from 'react'

export default function Footer() {
  const [count, setCount] = useState(0)

  return (
    <footer className="bg-white/50 z-10 backdrop-blur">
      <div className="max-w-4xl mx-auto text-center py-2 text-sm text-gray-400 flex">
        <p></p>
        <p>
          &copy; {new Date().getFullYear()} AlexWorld. You visited this website {count} times.<button onClick={() => setCount(prev => prev + 1)}>ClickMe</button>
        </p>
      </div>
    </footer>
  )
}
