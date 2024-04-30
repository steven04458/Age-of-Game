import { useState } from 'react'
import './block-jeux.css'
import ImgDemineur from '../../../../../resources/demineur-img.webp'
import { Link } from 'react-router-dom'

function BlockJeux() {

  return (
    <>
        <div className='blockJeux'>
            <div className='imgBlock'>
              <img src={ImgDemineur} alt="" />
            </div>
            <Link to={"/Demineur"}><h2>Démineur</h2></Link>
        </div>
    </>
  )
}

export default BlockJeux