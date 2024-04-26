import { useState } from 'react'
import './miniJeux.css'

function Minijeux() {

  return (
    <>
        <div className='BarreLeft column-center'>
          <div className='CompteUser column-center'>
            <img src={UserCicrle} alt="" />
            User
            <div className="separator"></div>
          </div>
          <div className='column-center'>
            <div className="separator"></div>
            score : 0
          </div>
        </div>
    </>
  )
}

export default Minijeux
