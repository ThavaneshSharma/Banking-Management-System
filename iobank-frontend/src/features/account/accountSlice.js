import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import ng from '../../img/ng.png';
import us from '../../img/us.png';
import gb from '../../img/gb.png';
import eu from '../../img/eu.png';
import cn from '../../img/cn.png';
import ind from '../../img/in.png';

const initialState = {
  accountList: [],
  recipient:null,
  transactions: [],
  status: 'IDLE',
  rates : null 
};

const token = sessionStorage.getItem('access_token')
export const createAccount = createAsyncThunk("account/createAccount", async (accountData) => {
  try{
    const response = await api.post('/accounts',accountData, {Authorization: token});
    return response.data;
  } catch(error) {
    console.log(`Error Occured ${error.message}`)
  }
})

export const getAccounts = createAsyncThunk(
    'account/getAccounts',async() =>{
        try{
            console.log(`Token Value : ${token}`)
            const response = await api.get('/accounts',{Authorization: token})
            return response.data;
        }catch(error){
            console.log(`Error Occured ${error.message}`);
        }
    }
)
export const getRecipient = createAsyncThunk("accounts/find", async (details) => {
  try{
    const headers = {Authorization: token}
    console.log(details)
    const {data, error} = await api.post(`/accounts/find`, details,  headers)
    if(error) throw error;
    console.log(data)
    return data
  } catch(err) {
    throw new Error(err.message)
  }
})

export const transferFunds = createAsyncThunk("accounts/transfer", async (details) => {
  try{
    const headers = {Authorization: token}
    console.log(`Transfer Details: ${JSON.stringify(details)}`)
    const {data, error} = await api.post('/accounts/transfer', details, headers)
    if(error) throw error;
    return data
  } catch(err) {
    throw new Error(err.message)
  }
 });
 export const getExchangeRate = createAsyncThunk("accounts/getExchangeRate", async () => {
    try{
      const headers = {Authorization: token}
      const {data, error} = await api.get(`/accounts/rates`, headers)
      if(error) throw error;
      console.log(data)
      return data
    } catch(err) {
      throw new Error(err.message)
    }
 })

 export const convertCurrency = createAsyncThunk("acccounts/convertCurrency", async (details) => {
  try{
    const headers = {Authorization: token}
    console.log(`Conversion Details: ${JSON.stringify(details)}`)
    const {data, error} = await api.post('/accounts/convert', details, headers)
    if(error) throw error;
    return data
  } catch(err) {
    throw new Error(err.message)
  }
 })

export const accountSlice = createSlice(
    {
      name: 'account',
      initialState,
      reducers: {
        resetAccountStatus: (state) => {
          state.status = 'IDLE';
        },
        resetRecipient: (state) => {
          state.recipient = null
        }
      },
      extraReducers(builder) {
        builder
          .addCase(createAccount.pending, (state) => {
            state.status = 'PENDING';
          })
          .addCase(createAccount.fulfilled, (state, action) => {
            state.status = 'SUCCESS';
            state.accountList.push(action.payload);
          })
          .addCase(createAccount.rejected, (state, action) => {
            state.status = 'FAILED';
          })
          .addCase(getAccounts.pending, (state)=>{
            state.status = 'PENDING';
          })
          .addCase(getAccounts.fulfilled, (state,action)=>{
            state.status = 'SUCCESS';
            const accountPayload = action.payload
            const newAccountList = accountPayload.map(acc => {
              let flag = us
              if (acc.code === 'USD') flag = us
              if (acc.code === 'NGN') flag = ng
              if (acc.code === 'EUR') flag = eu
              if (acc.code === 'GBP') flag = gb
              if (acc.code === 'INR') flag = ind
              if (acc.code === 'CNY') flag = cn
              return {...acc, flag}
            })
            state.accountList = newAccountList;
          })
          .addCase(getAccounts.rejected, (state,action)=>{
            state.status = 'FAILED';
            state.error = action.payload;
          })
          .addCase(getRecipient.pending, (state) => {
            state.status = 'PENDING';
          })
          .addCase(getRecipient.fulfilled, (state, action) => {
            state.status = 'SUCCESS';
            console.log(`Current State: ${state.status}`)
            state.recipient=action.payload;
          })
          .addCase(getRecipient.rejected, (state, action) => {
            state.status = 'FAILED';
            console.log(`Account holder search failed:`,action.error);
          })
          .addCase(transferFunds.pending, (state) => {
            state.status = 'PENDING';
          })
          .addCase(transferFunds.fulfilled, (state, action) => {
            state.status = 'SUCCESS';
            console.log(`Current State: ${state.status}`)
            state.transactions.push(action.payload)
          })
          .addCase(transferFunds.rejected, (state, action) => {
            state.status = 'FAILED';
            console.log('Account holder search failed:', action.error);
          })
          .addCase(getExchangeRate.pending, (state) => {
            state.status = 'PENDING';
          })
          .addCase(getExchangeRate.fulfilled, (state, action) => {
            state.status = 'SUCCESS';
            console.log(`Exchange Rates: ${JSON.stringify(action.payload)}`)
            state.rates = action.payload
          })
          .addCase(getExchangeRate.rejected, (state, action) => {
            state.status = 'FAILED';
            console.log('Account holder search failed:', action.error);
          })
          .addCase(convertCurrency.pending, (state) => {
            state.status = 'PENDING';
          })
          .addCase(convertCurrency.fulfilled, (state, action) => {
            state.status = 'SUCCESS';
            console.log(`Transaction Details: ${JSON.stringify(action.payload)}`)
            state.transactions.push(action.payload)
          })
          .addCase(convertCurrency.rejected, (state, action) => {
            state.status = 'FAILED';
            console.log('Conversion Between Pairs Failed:', action.error);
          })    
      }
    }
)

export const { resetAccountStatus, resetRecipient } = accountSlice.actions;
export const fetchAccountList = (state) => state.account.accountList;
export const fetchAccountStatus = (state) => state.account.status;
export const fetchRates = (state) => state.account.rates

export default accountSlice.reducer;
export const accounts = state => state.account.accounts