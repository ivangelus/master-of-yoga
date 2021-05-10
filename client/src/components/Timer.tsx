import React, { useState, useEffect } from 'react'
import './Timer.css'

const Timer = () => {

  const [timer, setTimer] = useState(60)

   useEffect(() => {
    const interval = setInterval(() => {
      if(timer > 0){
        setTimer(timer => timer - 1)
      }
    }, 1000)
    return () => {
      console.log('unmount')
      clearInterval(interval);
    }
  },[])

  return (
    <div>
    <p className="webcam__timer">
      Time left: {timer}
    </p>
    </div>
  )
}

export default Timer;