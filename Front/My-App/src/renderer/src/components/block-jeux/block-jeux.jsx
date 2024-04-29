import { useState } from 'react'
import './block-jeux.css'
import ImgDemineur from '../../../../../resources/demineur-img.webp'

function BlockJeux() {

  return (
    <>
        <div className='blockJeux'>
            <div className='imgBlock'>
              <img src={ImgDemineur} alt="" />
            </div>
            <h2>Démineur</h2>
        </div>
    </>
  )
}

export default BlockJeux