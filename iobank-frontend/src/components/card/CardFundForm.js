import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAccountList, getAccounts } from '../../features/account/accountSlice'
import { card,creditCard, getCard, fetchCardStatus, resetCardStatus } from '../../features/card/cardSlice'
import { closeSpinner, openSpinner, showSpinner ,TIMEOUT_DELAY} from '../../features/page/pageSlice'
import Spinner from '../Spinner'

const CardFundForm = ({ setShowFundCardForm }) => {
    const enableSpinner = useSelector(showSpinner)
    const dispatch = useDispatch()
    const accountList = useSelector(fetchAccountList)
    const [account, setAccount] = useState(null)
    const [amount, setAmount] = useState('')
    const status = useSelector(fetchCardStatus)
    const credit = () => {
      dispatch(openSpinner())
      dispatch(creditCard(amount))
      console.log('Retrieving the latest of the card details')
      setTimeout(() => {
        dispatch(getCard())
        dispatch(getAccounts())
        dispatch(closeSpinner())
        setShowFundCardForm(false)
      }, TIMEOUT_DELAY)
    }
  
    useEffect(() => {
      setAccount(accountList.filter(acc => acc.code === "USD")[0])
      if (status === 'SUCCESS') dispatch(resetCardStatus)
      if (status === 'FAILED') console.log('Funding Failed')
    }, [status, dispatch])
  return (
    <section className='flex flex-col p-2 gap-8 sm:w-3/5 xl:w-2/5 sm:p-6 sm:h-2/5 bg-white border rounded-xl absolute right-5  left-5 sm:left-auto  mt-12 z-10'>
      {account && <form className='p-2 w-full flex flex-col justify-between h-full relative gap-2'>
        {enableSpinner && <Spinner />}
        <button className='absolute top-1 right-2' type='button' onClick={() => setShowFundCardForm(false)}><FaTimes /></button>
        <div className='flex flex-col gap-4'>
            <h1 className='text-lg font-bold'>Fund Your Card</h1>
        </div>
        <div className='flex flex-col gap-2'>
        <label htmlFor='from' className='w-full flex justify-between'><span>Select Account </span><span className='text-sm mt-1'>Balance {account.symbol}{account.balance}</span></label>
            
            <select id='currency' className='bg-gray-200 h-full p-2 lg:p-3 rounded-md'>
              <option value={account.code}>{account.code}</option>
            </select>
        </div>
        <div className='flex flex-col gap-1'>
            <label>Amount</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className='border border-blue-500 p-3 rounded-md focus:border-yellow-400' placeholder='Enter amount' />
        </div>
        <button onClick={credit} type="button" className='bg-blue-500 p-2 rounded-xl text-white font-bold mt-2  hover:bg-opacity-90 transition-all'>Fund Card</button>
      </form>}
    </section>
  )
}

export default CardFundForm