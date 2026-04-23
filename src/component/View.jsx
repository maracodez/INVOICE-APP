import React, { useState } from 'react'
import Sidenav from './pages/sidenav'
import Edit from './pages/Edit'
import { useNavigate } from 'react-router-dom'
//import { invoice } from '../data/invoice'

const View = () => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();

  return (
    <div>
        <Sidenav /> 
        <div className='ml-[7%] bg-[#f8f8f8] px-[80px] py-[110px] max-h-full'>
            <div className='flex gap-6 font-semibold cursor-pointer' onClick={() => navigate('/') }>
                <p>&larr;</p>
                <button>Go Back</button>
            </div>
            <header className='flex justify-between mt-6 gap-6 mb-6 px-8 rounded-xl bg-white'>
                <div className='flex justify-between items-center gap-6'>
                    <p className='text-[#888eb0] font-semibold'>Status</p>
                    <p className='bg-orange-50 rounded-lg text-orange-600 p-4 font-bold capitalize'>pending</p>
                </div> 
                <div className='flex justify-between mt-6 gap-6 mb-6'>
                    <button 
                        className='bg-[#f8f8f8] text-[#888eb0] rounded-full h-[40px] w-[90px] text-center gap-6 cursor-pointer font-semibold' 
                        onClick={() => setOpen(true)}
                    >Edit</button>
                    <button className='bg-[#ec5757] hover:bg-[#ff6666] text-white rounded-full h-[40px] w-[90px] text-center gap-6 cursor-pointer font-semibold'>Delete</button>
                    <button className='bg-[#7c5dfa] text-white rounded-full h-[40px] w-[90px] text-center gap-6 cursor-pointer font-semibold'>Mark as Paid</button>
                </div>
            </header>

            <Edit 
                open={open} 
                setOpen={setOpen}
                invoiceToEdit={currentInvoice}
            />
        </div>
    </div>
  )
}

export default View
