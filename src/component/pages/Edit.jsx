import React, { useState, useEffect } from 'react';
import { useInvoices } from '../data/InvoiceProvider';

export default function Edit({ open, setOpen, invoiceToEdit }) {
    const { updateInvoice } = useInvoices();

    const [formData, setFormData] = useState({
        name: '',
        date: '',
        price: '',
        clientEmail: '',
        street: '',
        city: '',
        postCode: '',
        country: '',
        description: '',
        status: ''
    });

    useEffect(() => {
        if (invoiceToEdit) {
            setFormData({
                name: invoiceToEdit.name || '',
                date: invoiceToEdit.date || '',
                price: invoiceToEdit.price || '',
                clientEmail: invoiceToEdit.clientEmail || '',
                street: invoiceToEdit.street || '',
                city: invoiceToEdit.city || '',
                postCode: invoiceToEdit.postCode || '',
                country: invoiceToEdit.country || '',
                description: invoiceToEdit.description || '',
                status: invoiceToEdit.status || 'pending'
            });
        }
    }, [invoiceToEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        
        // Call the update function using the database ID
        await updateInvoice(invoiceToEdit.id, formData);
        
        setOpen(false);
    };

    
    return (
        <div className='ml-64'>
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className='fixed inset-0 bg-black/40 z-40 '
                />
            )}

            <div
                className={`fixed top-0 left-0 h-full w-[40%] bg-white shadow-lg z-50 transform transition-transform duration-300 px-[20px] py-[10px] rounded-tr-4xl rounded-br-xl ${open ? "translate-x-0" : "-translate-x-full"} overflow-y-auto`}
            >
                 <header className='flex justify-between'>
                    <h2 className='text-3xl font-bold'>
                        Edit
                        <span className='text-[#7e88c3]'>#</span>{invoiceToEdit?.invoiceId}
                    </h2>
                    <button
                        onClick={() => setOpen(false)}
                        className='text-red-500 font-bold text-2xl cursor-pointer'
                    >x</button>
                </header>
                <main className='mt-8'>
                    <form onSubmit={handleSaveChanges}>
                        <h1 className='font-bold text-xl text-[#7e88c3] mb-6'>Bill Form</h1>
                        <label className='text-[#888eb0] font-semibold block mb-2'>Street Address</label>
                        <input
                            name="street"
                            value={formData.street}
                            onChange={handleInputChange}
                            type="text" 
                            placeholder='19 union Terrace'
                            className='outline-none px-6 py-4 rounded-lg border border-[#888eb0] w-full'
                        />
                        <div className='flex mt-6 gap-12 mb-6'>
                            <div>
                                <label className='text-[#888eb0] font-semibold mb-2'> City</label>
                                <input 
                                    type="text" 
                                    placeholder='London'
                                    className='outline-none px-6 py-4 rounded-lg border border-[#888eb0] w-full'
                                />
                            </div>
                            <div>
                                <label className='text-[#888eb0] font-semibold mb-2'> Post Code</label>
                                <input 
                                    type="text" 
                                    placeholder='E1 3EZ'
                                    className='outline-none px-6 py-4 rounded-lg border border-[#888eb0] w-full'
                                />
                            </div>
                            <div>
                                <label className='text-[#888eb0] font-semibold mb-2'> Country</label>
                                <input 
                                    type="text"   
                                    placeholder='United Kingdom'
                                    className='outline-none px-6 py-4 rounded-lg border border-[#888eb0] w-full'
                                />
                            </div>
                            
                        </div>
                        <h2 className='font-bold text-xl text-[#7e88c3] mb-6'>Bill To</h2>
                        <label className='text-[#888eb0] font-semibold block mb-2'>Clients's Name</label>
                        <input 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            type="text" 
                            placeholder='Alex Grim'
                            className='outline-none px-6 py-4 rounded-lg border border-[#888eb0] w-full' 
                        />
                        <label className='text-[#888eb0] font-semibold block mb-2'>Clients's Email</label>
                        <input 
                            type="text" 
                            placeholder='alexgrim@gmail.com' 
                            className='outline-none px-6 py-4 rounded-lg border border-[#888eb0] w-full'
                        />
                        <label className='text-[#888eb0] font-semibold block mb-2'>Street Address</label>
                        <input 
                            type="text" 
                            placeholder='84 Church Way' 
                            className='outline-none px-6 py-4 rounded-lg border border-[#888eb0] w-full'
                        />
                        <div className='flex mt-6 gap-12 mb-6'>
                            <div>
                                <label className='text-[#888eb0] font-semibold mb-2'> City</label>
                                <input 
                                    type="text" 
                                    className='outline-none px-6 py-4 rounded-lg border border-[#888eb0] w-full'
                                    placeholder='Brodford'
                                />
                            </div>
                            <div>
                                <label className='text-[#888eb0] font-semibold mb-2'> Post Code</label>
                                <input 
                                    type="text" 
                                    placeholder='BDI 9PB'
                                    className='outline-none px-6 py-4 rounded-lg border border-[#888eb0] w-full'
                                />
                            </div>
                            <div>
                                <label className='text-[#888eb0] font-semibold mb-2'> Country</label>
                                <input 
                                    type="text" 
                                    placeholder='United Kingdom'
                                    className='outline-none px-6 py-4 rounded-lg border border-[#888eb0] w-full'
                                />
                            </div>
                        </div>
                        <div className='flex mt-6 gap-12 mb-6'> 
                            <div>
                                <label className='text-[#888eb0] font-semibold mb-2'>Invoice Date</label>
                                <input 
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    type="date"
                                    placeholder='20 Aug 2021' 
                                    className='outline-none px-6 py-4 rounded-lg border border-[#888eb0] w-full'
                                />
                            </div>
                            <div>
                                <label className='text-[#888eb0] font-semibold mb-2'>Payment Terms</label>
                                <select className='outline-none px-6 py-4 rounded-lg border border-[#888eb0] w-full'>  
                                    <option value="">Next 30 days</option>
                                    <option value="">Next 1 Day</option>
                                    <option value="">Next 7 Days</option>
                                    <option value="">Next 14 Days</option>
                                    <option value="">Next 21 Days</option>
                                </select>
                            </div>
                        </div>
                        <label className='text-[#888eb0] font-semibold mb-2'>Project Description</label>
                        <input 
                            type="text" 
                            placeholder='Graphic Design' 
                            required
                            className='outline-none px-6 py-4 rounded-lg border border-[#888eb0] w-full'
                        />
                        <h1 className='font-bold text-xl text-[#888eb0] mb-2 mt-4'>Item List</h1>
                        <div className='flex mt-6 gap-6 mb-6'>
                            <div className=''>
                                <label className='text-[#888eb0] font-semibold mb-2'>Items Name</label>
                                <input type="text" placeholder='Bonner Design' className='outline-none px-4 py-4  rounded-lg border border-[#888eb0] w-full mb-4'/>
                                <input type="text" placeholder='Bonner Design' className='outline-none px-6 py-4 rounded-lg border border-[#888eb0] w-full'/>
                            </div>
                           <div>
                                <label className='text-[#888eb0] font-semibold mb-2 block'>Qty</label>
                                <input type="number" placeholder='1' className='outline-none px-4 py-4 rounded-lg border border-[#888eb0] w-[60%] mb-4'/>
                                <input type="number" placeholder='2' className='outline-none px-4 py-4  rounded-lg border border-[#888eb0] w-[60%]'/>
                           </div>
                            <div>
                                <label className='text-[#888eb0] font-semibold mb-2'>Price</label>
                                <input type="text" placeholder='165.00' className='outline-none px-6 py-4 rounded-lg border border-[#888eb0] w-full mb-4'/>
                                <input type="text" placeholder='200.00' className='outline-none px-6 py-4 rounded-lg border border-[#888eb0] w-full'/>
                            </div>
                            <div>
                                <label className='text-[#888eb0] font-semibold mb-2'>Total</label>
                                <input 
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    type="number" 
                                    className='dark:bg-[#1e2139] dark:border-none dark:text-white outline-none px-4 py-3 rounded-md border border-[#dfe3fa] w-full'
                                />
                                <p></p>
                                <p></p>
                            </div>
                           <div>

                           </div>
                        </div>

                        <button className='bg-[#f8f8f8] font-bold text-xl text-[#888eb0] mb-2 mt-4 [60px] w-[130px] rounded-full text-center cursor-pointer'><span>+</span> Add New Item</button>

                        <div className='flex justify-right mt-6 gap-6 mb-6  items-right'>
                            <button 
                                type="button"
                                onClick={() => setOpen(false)} 
                                className='bg-[#f8f8f8] text-[#888eb0 rounded-full h-[40px] w-[100px] text-center font-semibold gap-6 cursor-pointer'
                            >
                                Cancel
                            </button>
                            <button 
                                type='submit' 
                                className='bg-[#7c5dfa] text-white rounded-full h-[40px] w-[90px] text-center gap-6 cursor-pointer'
                            >Save changes</button>             
                        </div>
                    </form>
                </main>
            </div>
        </div>
    )
}