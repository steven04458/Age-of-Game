import { useState } from 'react'
import './Barre-nav.css'
// import LogoSetting from '../../assets/Setting_line.svg'
import UserCicrle from '../../assets/User_cicrle.svg'

function BarreNav() {

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

export default BarreNav
