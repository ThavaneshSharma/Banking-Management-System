import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api/api"


const initialState = {
    transactionList: [],
    status:  'IDLE'
}

export const getTransactions = createAsyncThunk("transactions/fetch", async (pageNumber) => {
    try {
        const headers = {Authorization: `${sessionStorage.getItem('access_token')}`}
        const { data, error } = await api.get(`/transactions?page=${pageNumber}`, headers)
        console.log(data)
        if (error) throw error
        return data
    } catch (error) {
        throw new Error(error.message);
    }
})

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        resetTransactionStatus : (state) =>{
            state.status = 'IDLE'
        }
    },
    extraReducers(builder) {
        builder
           .addCase(getTransactions.pending, (state) => {
                state.status = 'PENDING'
            })
           .addCase(getTransactions.fulfilled, (state, action) => {
                state.transactionList = action.payload.sort((a, b) => {
                    const dateA = new Date(a.initiated)
                    
                    const dateB = new Date(b.initiated)
                    return dateA - dateB
                }) 
                state.status = 'SUCCESS'
            })
           .addCase(getTransactions.rejected, (state, action) => {
                console.error('Error:', action.error.message)
                state.status = 'ERROR'
            })
    }
})

export const { resettransactionStatus } = transactionSlice.actions

export const fetchTransactionsList = state => state.transaction.transactionList
export const fetchTransactionStatus = state => state.transaction.status

export default transactionSlice.reducer