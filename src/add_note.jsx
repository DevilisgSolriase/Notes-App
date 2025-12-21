import { useState, useRef } from 'react'
import './App.css'
import './style.css'
import './index.css'

function add_note() {
  const [count, setCount] = useState(0)
  const [showShadow, setShowShadow] = useState(true);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowShadow(scrollTop + clientHeight < scrollHeight);
  };


  return (
    <>
    </>
  )
}

export default add_note;