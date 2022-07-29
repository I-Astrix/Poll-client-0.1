import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion'

const Poll = () => {
    const [totalVotes, setTotalVotes] = useState(0);

    const [games, setGames] = useState([
        {game: 'Grand Theft Auto 5', votes: 16},
        {game: 'Metal Gear', votes: 1},
        {game: 'Watch Dogs 2', votes: 1},
        {game: 'Valorant', votes: 2}
    ]);
    
    const [hidden, setHidden] = useState(false);


    const handleClick = (game)=>{
        setHidden(true)
        setGames(prev=>{
            return prev.map(item =>{
                return item.game === game ? {...item, votes: item.votes + 1} : item
            })
        })
    }

    useEffect(()=>{
        const total = games.reduce((a,b)=>{
            return a + b.votes
        }, 0);
        setTotalVotes(total);
    }, [games]);





  return (
    <div className='h-screen w-full flex justify-center items-center grad'>
        <div className="main border max-w-md w-full p-5 rounded-lg bg-white">
            <div className="title my-5">
                <h1 className='text-4xl font-semibold'>Game you like the most</h1>
            </div>
            <div className="poll-box flex flex-col my-3 gap-2">

                {games?.map(game=>{
                    return (
                        <div key={game?.game} onClick={()=> handleClick(game?.game)} className="poll w-full border h-14 rounded-lg relative overflow-hidden">
                        <motion.div initial={{width: 0}} transition={{duration: 1}} animate={{width: hidden ? `${(game?.votes / totalVotes)* 100}%` : 0}}  exit={{width: 0}} className={`progres green h-full absolute`}></motion.div>
                        <div id="option" className={`${!hidden ? 'justify-center' : 'justify-between'} top-4 absolute w-full flex px-2`}>
                            <p className={`select-none`}>{game?.game}</p>
                            <span className=''>{hidden && <CountUp end={(game?.votes / totalVotes)*100} duration={1} suffix="%"/>}</span>
                        </div>   
                    </div>            
                    )
                })}
            </div>
            <div className="results my-5">
                    <h1 className='text-xl font-normal text-[#55a630]'>{totalVotes} Votes</h1>
            </div>
        </div>
    </div>
  )
}

export default Poll