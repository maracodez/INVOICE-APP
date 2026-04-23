import React, { useState } from 'react'
import Sidenav from './pages/sidenav'
import Edit from './pages/Edit'
import { useNavigate, useParams } from 'react-router-dom'
import { useInvoices } from './data/InvoiceProvider'
//import { invoice } from '../data/invoice'

const View = () => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    //const location = useLocation();
    const { id } = useParams(); 
    const { invoices, deleteInvoice, markAsPaid } = useInvoices();

    // This ensures that when you edit and save, this variable updates instantly.
    const currentInvoice = invoices.find(inv => inv.id === Number(id)) || invoices.find(inv => inv.invoiceId === id);

    

    if (!currentInvoice) return (
        <div className='ml-[7%] p-20'>
            <p>Invoice not found</p>
            <button onClick={() => navigate('/')} className='text-[#7c5dfa]'>Go Back Home</button>
        </div>
    );

    const handleDelete = async () => {
        await deleteInvoice(currentInvoice.id);
        navigate('/');
    };

  return (
    <div>
        <Sidenav /> 
        <div className='ml-[7%] bg-[#f8f8f8] px-[80px] py-[110px] min-h-screen'>
            <div className='flex gap-6 font-semibold cursor-pointer' onClick={() => navigate('/') }>
                <p>&larr;</p>
                <button>Go Back</button>
            </div>
            <header className='flex justify-between mt-6 gap-6 mb-6 px-8 rounded-xl bg-white'>
                <div className='flex justify-between items-center gap-6'>
                    <p className='text-[#888eb0] font-semibold'>Status</p>
                    <p className={`rounded-lg p-4 font-bold capitalize 
                        ${currentInvoice.status === 'paid' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                        {currentInvoice.status || 'pending'}
                    </p>
                </div> 
                <div className='flex justify-between mt-6 gap-6 mb-6'>
                    <button 
                        className='bg-[#f8f8f8] text-[#888eb0] rounded-full h-[40px] w-[90px] text-center gap-6 cursor-pointer font-semibold' 
                        onClick={() => setOpen(true)}
                    >Edit</button>
                    <button     
                        onClick={handleDelete}
                        className='bg-[#ec5757] hover:bg-[#ff6666] text-white rounded-full h-[40px] w-[90px] text-center gap-6 cursor-pointer font-semibold'
                    >Delete</button>
                    {currentInvoice.status !== 'paid' && (
                        <button 
                            onClick={() => markAsPaid(currentInvoice.id)}
                            className='bg-[#7c5dfa] text-white rounded-full h-[40px] w-[90px] text-center gap-6 cursor-pointer font-semibold'
                        >Mark as Paid</button>
                    )}
                </div>
            </header>

            <Edit 
                open={open} 
                setOpen={setOpen}
                invoiceToEdit={currentInvoice}
            />

            <main className=' mt-6 px-12 py-16 rounded-xl bg-white'>
                <section className='flex justify-between'>
                    <div>
                        <h2 className='font-bold text-xl'><span className='text-[#888eb0]'>#</span>{currentInvoice.invoiceId}</h2>
                        <p className='text-[#888eb0]'>{currentInvoice.description}</p>   
                    </div>
                   <div>
                        <p>{currentInvoice.street}</p>
                        <p>{currentInvoice.city}</p>
                        <p>{currentInvoice.postCode}</p>
                        <p>{currentInvoice.country}</p>
                   </div>
                </section>

                <section className='flex justify-between mt-8'>
                    <div>
                        <p>Invoice Date</p>
                        <p>{currentInvoice.date}</p>
                        <div className='mt-8'>
                            <p>Payment Due</p>
                            <p>{currentInvoice.date}</p>
                        </div>
                    </div>
                    <div>
                        <p>Bill To</p>
                        <p>{currentInvoice.name}</p>
                        <div className='text-[#888eb0] mt-2'>
                            <p>{currentInvoice.street}</p>
                            <p>{currentInvoice.city}</p>
                            <p>{currentInvoice.postCode}</p>
                            <p>{currentInvoice.country}</p>
                        </div>
                    </div>
                    <div>
                        <p>Send To</p>
                        <p>{currentInvoice.clientEmail}</p>
                    </div>
                </section>

                {/* Items Section (Simplified for display) */}
                <section className='flex justify-between mt-8 bg-[#f8f8f8] py-14 px-8 rounded-tr-xl rounded-tl-xl'>
                    <div>
                        <h2>Item Name</h2>
                        <p>QTY.</p>
                        <p>Price</p>
                        <p>Total</p>
                    </div>
                    <div>
                        <div className='flex justify-between font-bold mb-4'>
                             <p className='w-1/2'>{currentInvoice.description || 'Services'}</p>
                             <p>1</p>
                             <p>£ {currentInvoice.price}</p>
                             <p>£ {currentInvoice.price}</p>
                         </div>
                    </div>
                </section>
                <div className='flex justify-between bg-[#141625] text-[#f8f8f8] py-12 px-8  rounded-br-xl rounded-bl-xl'> 
                    <p>Amount Due</p>
                    <p className='text-3xl text-white font-bold'>£ {Number(currentInvoice.price).toLocaleString()}</p>
                </div>
            </main>
        </div>
    </div>
  )
}

export default View
