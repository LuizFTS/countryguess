'use client'
import { useEffect, useState, useRef } from 'react'
import { countries } from '@/images/countries'
import { useChronometerContext } from '@/context/ChronometerContext'

export default function Home() {
  const [name, setName] = useState("")
  const [rightGuesses, setRightGuesses] = useState([]);

  const countryContainer = useRef()

  // Chronometer context
  const { startChronometer, stopChronometer, formatTime, isRunning, setIsRunning } = useChronometerContext()

  const handleGuessCountry = (e) => {
    setName(e.target.value)
    const anwser = e.target.value.toLowerCase().trim()

    if (!isRunning && e.target.value.length > 0) {
      startChronometer()
    }


    if (rightGuesses.find(item => {
      if (item.name === anwser) {
        return item.name;
      }
    }) !== undefined) {
      return;
    }

    countries.find(item => {
      if (item.name === anwser) {
        setRightGuesses(prevState => {
          return [...prevState, { name: item.name, id: item.id }]
        })
        setName("")
        console.log({ name: item.name, id: item.id })
        let guessedCountrySVG = [...countryContainer.current.children].filter(i => {
          if (parseInt(i.id) === item.id) {
            return i
          }
        })
        guessedCountrySVG[0].classList = "fill-green-400 hover:fill-green-700 transition"

        return item;
      }
    }
    )
  }

  // GPT Test zoom
  const [zoomScale, setZoomScale] = useState(1);

  const handleScroll = (event) => {
    const scrollDirection = Math.sign(event.deltaY);
    const newZoomScale = zoomScale + scrollDirection * 0.1; // Adjust the zoom increment/decrement as desired

    // Limit the zoom scale within a certain range (e.g., 0.5 to 3)
    const clampedZoomScale = Math.min(Math.max(newZoomScale, 0.5), 1.4);
    setZoomScale(clampedZoomScale);
  };

  // Stop chronometer when winning
  useEffect(() => {
    if (rightGuesses.length === countries.length) {
      stopChronometer()
    }
  }, [rightGuesses, stopChronometer])

  return (
    <main className='flex min-h-screen'>

      <div className='flex flex-col w-1/3 mx-4 pt-4'>
        <div className='flex justify-between w-[300px]'>
          <p className='capitalize'>Países: {rightGuesses.length}/{countries.length}</p>
          <p>{formatTime()}</p>
        </div>
        <input type="text" value={name} onChange={(e) => handleGuessCountry(e)} autoFocus className='guessInput w-[300px] border-zinc-500 border-solid border-x border-y px-2 py-1 rounded active:outline-none' placeholder='Digite o nome de um país...' />

        {rightGuesses.length > 0 ? (
          <ul className='mt-4'>
            {rightGuesses.map(item => (
              <li key={item.id} className='capitalize'>{item.name}</li>
            ))}
          </ul>
        ) : (
          <p>Tente adivinhar o nome dos países!</p>
        )}

      </div>
      <div className='flex w-2/3 items-center justify-center' onWheel={handleScroll} >

        <svg height="521" viewBox="0 0 135 221" style={{ transform: `scale(${zoomScale})` }}>
          <g ref={countryContainer}>
            {countries.map(country => (
              <path
                className='fill-orange-200 hover:fill-orange-300 transition cursor-pointer'
                id={country.id}
                d={country.d}
                key={country.id}
                stroke="#9C9C9C"
                strokeWidth="0.3"
                strokeLinejoin="round" />
            ))}
          </g>
        </svg>
      </div>


    </main>
  )
}
