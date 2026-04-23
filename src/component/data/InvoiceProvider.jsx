import React, { createContext, useContext, useState, useEffect } from 'react'
import { db } from '../../db'

const InvoiceContext = createContext();


export const InvoiceProvider = ({ children }) => {
    const [invoices, setInvoices] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    // Load invoices from IndexedDB
    const loadInvoices = async () => {
        try {
            const allInvoices = await db.invoices.toArray();
            setInvoices(allInvoices);
        } catch (error) {
            console.error("Failed to load invoices:", error);
        }
    };

    // Initial load and Theme sync
    useEffect(() => {
        loadInvoices();
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    // CRUD Actions
    const addInvoice = async (invoiceData) => {
        // Generate the unique ID (e.g., RT3080) before saving
        const randomLetters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const randomNumbers = Math.floor(1000 + Math.random() * 9000);
        const invoiceId = `${randomLetters}${randomNumbers}`;

        await db.invoices.add({ 
            ...invoiceData, 
            invoiceId, 
            createdAt: new Date().toISOString() 
        });
        await loadInvoices();
    };

    const updateInvoice = async (id, updatedData) => {
        await db.invoices.update(id, updatedData);
        await loadInvoices();
    };

    const deleteInvoice = async (id) => {
        await db.invoices.delete(id);
        await loadInvoices();
    };

    const markAsPaid = async (id) => {
        await db.invoices.update(id, { status: "paid" });
        await loadInvoices();
    };

    return (
        <InvoiceContext.Provider value={{
            invoices, 
            filterStatus, 
            setFilterStatus, 
            addInvoice, 
            updateInvoice, 
            deleteInvoice, 
            markAsPaid, 
            isDarkMode, 
            setIsDarkMode
        }}>
            {children} 
        </InvoiceContext.Provider>
    )
}

export const useInvoices = () => useContext(InvoiceContext)