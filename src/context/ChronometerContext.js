'use client'
import { useState, useRef, createContext, useContext } from "react"

export const ChronometerContext = createContext()

export const ChronometerContextProvider = ({ children }) => {

  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalId = useRef(null)

  const startChronometer = () => {
    if (!isRunning) {
      intervalId.current = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000);
      setIsRunning(true);
    }
  }

  const stopChronometer = () => {
    clearInterval(intervalId.current)
    setIsRunning(false)
  }

  const formatTime = () => {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }


  return (
    <ChronometerContext.Provider value={{ startChronometer, stopChronometer, formatTime, isRunning, setIsRunning }} >
      {children}
    </ChronometerContext.Provider>
  )
}

export const useChronometerContext = () => {
  const context = useContext(ChronometerContext)
  if (!context) {
    console.log("ChronometerContext não encontrado.")
  }
  return context;
} 