import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import creditCardImage from "../../img/credit_card.png"
import api from "../../api/api"

 const initialState =  {
    card: null,
    transactions: [],
    status: 'IDLE'
};

const token = sessionStorage.getItem('access_token')

export const createCard = createAsyncThunk("card/create", async (amount) => {
    try{
        const headers = {Authorization: token}
        const {data, error} = await api.post(`/card/create?amount=${amount}`, null, headers)
        if(error) throw error;
        console.log(data)
        return data
    } catch(err) {
        throw new Error(err.message)
    }
})
export const creditCard = createAsyncThunk("card/credit", async (amount) => {
    try{
        const headers = {Authorization: token}
        const {data, error} = await api.post(`/card/credit?amount=${amount}`, null, headers)
        if(error) throw error;
        console.log(data)
        return data
    } catch(err) {
        throw new Error(err.message)
    }
})

export const debitCard = createAsyncThunk("card/debit", async (amount) => {
    try{
        const headers = {Authorization: token}
        const {data, error} = await api.post(`/card/debit?amount=${amount}`, null, headers)
        if(error) throw error;
        console.log(data)
        return data
    } catch(err) {
        throw new Error(err.message)
    }
})

export const getCard = createAsyncThunk("card/fetch", async () => {
    try{
        const headers = {Authorization: token}
        const {data, error} = await api.get(`/card`, headers)
        if(error) throw error;
        console.log(data)
        return data
    } catch(err) {
        throw new Error(err.message)
    }
})

/*export const deleteCard = createAsyncThunk("card/delete", async() => {
    try{
        const headers = {Authorization: token}
        const {data, error} = await api.delete(`/card`, headers)
        if(error) throw error;
        console.log(data)
        return data
    } catch(err) {
        throw new Error(err.message)
    }
})*/
export const cardSlice = createSlice(
    {
        name: 'card',
        initialState,
        reducers: {
            resetCardStatus: (state) => {
                state.status = 'IDLE'
            }
        },
        extraReducers (builder) {
            builder
             .addCase(createCard.pending, (state) => {
                state.status = 'PENDING'
            })
            .addCase(createCard.fulfilled, (state, action) => {
                console.log('Card Creation successful')
                console.log(action.payload)
                state.card = {...action.payload, img: creditCardImage}
                state.status = 'SUCCESS'
            })
            .addCase(createCard.rejected, (state) => {
                console.log('Card Creation Failed: ')
                state.status = 'FAILED' 
            })
            .addCase(creditCard.pending, (state) => {
                state.status = 'PENDING'
            })
            .addCase(creditCard.fulfilled, (state, action) => {
                console.log('Card Funding successful')
                console.log(action.payload)
                state.transactions.push(action.payload)
                state.status = 'SUCCESS'
            })
            .addCase(creditCard.rejected, (state) => {
                console.log('Card Funding Failed: ')
                state.status = 'FAILED' 
            })
            .addCase(debitCard.pending, (state) => {
                state.status = 'PENDING'
            })
            .addCase(debitCard.fulfilled, (state, action) => {
                console.log('Card Withdrawal successful')
                console.log(action.payload)
                state.transactions.push(action.payload)
                state.status = 'SUCCESS'
            })
            .addCase(debitCard.rejected, (state) => {
                console.log('Card Funding Failed: ')
                state.status = 'FAILED' 
            })
            .addCase(getCard.pending, (state) => {
                state.status = 'PENDING'
            })
            .addCase(getCard.fulfilled, (state, action) => {
                console.log('Card Fetch successful')
                state.card = {...action.payload, img: creditCardImage}
                state.status = 'SUCCESS'
            })
            .addCase(getCard.rejected, (state) => {
                console.log('Card Fetch Failed: ')
                state.status = 'FAILED'
            })
            /*.addCase(deleteCard.pending, (state) => {
                state.status = 'PENDING'
            })
            .addCase(deleteCard.fulfilled, (state, action) => {
                console.log('Card Deletion successful')
                state.card = null
                state.status = 'SUCCESS'
            })
            .addCase(deleteCard.rejected, (state) => {
                console.log('Card Deletion Failed: ')
                state.status = 'FAILED'
            })*/
        }
    }
)

export const { resetCardStatus } = cardSlice.actions;

export default cardSlice.reducer;

export const fetchCardStatus = (state) => state.card.status
export const card = (state) => state.card.card;