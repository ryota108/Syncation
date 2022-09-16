import React from 'react'

function Shuffle() {
  const cards = [5,3]

  return (
    <div className="card_wrapper">
      {cards.map((card,index)=>{return <div className='card' style={{animationDelay:`${ 3 + index}s`}}><p style={{animationDelay:`${ 3 + index}s`}}>{card}min</p></div>})}
    </div>
  )
}

export default Shuffle