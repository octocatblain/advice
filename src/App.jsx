import './App.css'
import React, { useState, useEffect } from 'react'
import { MdFormatQuote } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { BsXCircle } from "react-icons/bs"




function App() {

  const [advice, setAdvice] = useState('');
  const [id, setId] = useState(0);

  const [info, setInfo] = useState('');

  const fetchAdvice = async () => {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      setId(data.slip.id);
      setAdvice(data.slip.advice);

    } catch (error) {
      console.error('Error fetching advice:', error);
    }
  }

  useEffect(() => {
    fetchAdvice();
  }, []);

  const toggleInfo = () => {
    setInfo(!info);

  }

  return (
    <div className='w-full h-dvh flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500 '>
      <div className="card w-[350px] h-[350px] rounded shadow-lg p-12  border border-slate-700 bg-black/[0.5] flex flex-col gap-4 justify-between">
        <div className="flex flex-col gap-0 ">
          <div className="flex flex-row items-center self-start">
            <MdFormatQuote className="text-6xl text-emerald-500" />
            <p className="text-lg text-white font-semibold"> Advice #{id}</p>
          </div>
          <hr className='bg-black h-[1px] border-none ' />
          <h1 className="text-white  text-xl pt-4">{advice}</h1>
        </div>
        <button className="bg-emerald-300/[.5] border rounded font-bold hover:bg-slate-900 hover:text-white border-black p-2" onClick={fetchAdvice}>
          <span>Get advice</span>
        </button>
      </div>

      {
        info && (
          <div className="info absolute bottom-[.5rem] right-[2.75rem] md:bottom-[2.5rem] md:right-[2.5rem] flex flex-col items-center justify-center">
            <div className="card w-[300px] md:w-[350px] h-[150px] md:h-[200px] rounded shadow-lg p-4   bg-black/[0.7] flex flex-col gap-1 md:gap-4 justify-between">
              <h1 className="text-white md:text-lg text-base  uppercase font-semibold ">About this project</h1>
              <p className="text-white text-sm md:text-base">This project was built using React and Tailwind CSS. It fetches random advice from the <a href="https://api.adviceslip.com/" target="_blank" rel="noreferrer" className="text-emerald-500 font-bold">Advice Slip JSON API</a>.</p>
              <hr className='bg-white h-[1px] border-none ' />
              <p className=" text-center text-white text-xs">Created by <a href="https://github.com/octocatblain" target="_blank" rel="noreferrer" className="text-emerald-500 font-light italic">@octocatblain</a></p>
            </div>
            <BsXCircle className="font-bold hover:text-red-500 text-white text-lg md:text-2xl absolute top-2 right-2 " onClick={toggleInfo} />
          </div>
        )
      }

      <FaRegLightbulb className="text-xl text-yellow-400 absolute bottom-4 right-4" onClick={toggleInfo} />


    </div>
  )
}

export default App
