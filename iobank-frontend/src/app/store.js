import {configureStore} from '@reduxjs/toolkit'

import userReducer from '../features/user/userSlice';
import pageReducer from '../features/page/pageSlice';
import accountReducer from '../features/account/accountSlice';
import cardReducer from '../features/card/cardSlice';
import transactionReducer from '../features/transaction/transactionSlice';

export const store = configureStore({
    reducer:{
        user:userReducer,
        page:pageReducer,
        account:accountReducer,
        card:cardReducer,
        transaction:transactionReducer
    },
});

export default store;