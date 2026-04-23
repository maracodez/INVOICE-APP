import React from 'react'
import logo from '../../assets/Group 9.png'
import moon from '../../assets/Path.png'

const Sidenav = () => {
  return (
    <div className='bg-[#252945] fixed md:top-0 md:left-0 w-[100px] h-screen rounded-tr-4xl rounded-br-xl'>
        <div className='flex flex-col justify-between gap-[300px]  '>
			<div>
				<img src={logo} alt="" />
			</div>
			<div className='items-center border-b-2 p-12'>
				<img src={moon} alt="" />
			</div>
        </div>
    </div>
  )
}

export default Sidenav