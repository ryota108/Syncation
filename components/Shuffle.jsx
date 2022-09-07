import React from 'react'

function Shuffle() {
  const cards = [1,3,5,3,5,3,10,3]

  return (
    <div className="card_wrapper">
      {cards.map((card,index)=>{return <div className='card' style={{animationDelay:`${index}s`}}><p style={{animationDelay:`${index}s`}}>{card}min</p></div>})}
    </div>
  )
}

export default Shuffle