import React, { useState } from 'react'
import Sidenav from './pages/sidenav'
//import { invoice } from './data/invoice'
import Create from './pages/create'
import { Link } from 'react-router-dom'
import { useInvoices } from './data/InvoiceProvider'

const Home = () => {
	const [open, setOpen] = useState(false)
	const { invoices, filterStatus, setFilteStatus } = useInvoices();

	const filteredInvoices = invoices.filter(inv => 
		filterStatus === 'all' ? true : inv.status.toLowerCase() === filterStatus.toLowerCase()
	)

  return (
    <div>
      <Sidenav />
	  <div className='ml-[7%] bg-[#f8f8f8] px-[80px] py-[110px] min-h-screen'>
			<header className='flex justify-between'>
				<div>
					<h2 className='text-6xl font-semibold'>Invovices</h2>
					<p>There are {filteredInvoices.length} total invoice</p>
				</div>
				
				<select 
					className='outline-none h-[58px] w-[150px] font-semibold'
					value={filterStatus}
					onChange={(e) => setFilteStatus(e.target.value)}
				>
					<option value="all">Select by Status </option>
					<option value="paid">Paid</option>
					<option value="draft">Draft</option>
					<option value="pending">Pending</option>
				</select>

				<div 
					className='bg-[#7c5dfa] text-white rounded-full h-[60px] w-[153px] flex items-center justifty-center gap-6 cursor-pointer' 
					onClick={() => setOpen(true)}
				>
					<p className='bg-white text-[#7c5dfa] font-semibold text-[2rem] rounded-full ml-5 px-3 items-center'>+</p>
					<button className='text-lg font-semibold cursor-pointer' >					
						New Invoice
					</button>
				</div>
			</header>

			<Create open={open} setOpen={setOpen}/>

			<main className='mt-12'>
				{filteredInvoices.length > 0 ? filteredInvoices.map((inv) => (
					<Link
						key={inv.id}
						to='/View'
						state={{ index: inv }}
					>
						<div 
							
							className='bg-white mb-6 flex justify-between items-center p-12 rounded-xl'
						>		
							<h3 className='font-bold text-lg'>{inv.invoiceId}</h3>
							<p className='text-[#888eb0]'>{inv.date}</p>
							<p className='text-[#888eb0]'>{inv.name}</p>
							<p className='font-bold text-lg'>{inv.price}</p>
							
							<div className={`
								w-[104px] py-3 rounded-md font-bold capitalize flex items-center justify-center gap-2
								${inv.status === 'paid' ? 'bg-green-100/10 text-green-500' : 
									inv.status === 'pending' ? 'bg-orange-100/10 text-orange-500' : 
									'bg-gray-100/10 text-gray-500'}
							`}>
								<span className={`h-2 w-2 rounded-full ${
									inv.status === 'paid' ? 'bg-green-500' : 
									inv.status === 'pending' ? 'bg-orange-500' : 'bg-gray-500'
								}`}></span>
								{inv.status}
							</div>
							<p></p>
						</div>
					</Link>
				)) : <p>No invoices found</p>};
			</main>
	  </div>
    </div>
  )
}

export default Home