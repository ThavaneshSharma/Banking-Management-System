import { useDispatch, useSelector } from 'react-redux'
import { getAccounts, fetchAccountList } from '../../features/account/accountSlice'
import { useNavigate } from 'react-router-dom'
import SectionContainer from '../../components/SectionContainer'
import React, { useEffect } from 'react'
import Transaction from './Transaction'
import Payment from './Payment'
const Home = () => {
  const accountList = useSelector(fetchAccountList)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const navigateCurrency = (code) => {
    navigate(`/dashboard/accounts?currency=${code}`)
  }
 const AccountItem = ({acc})=> <div onClick={()=>navigateCurrency(acc.code)} className={`bg-gray-100 flex flex-1 sm:min-w-[200px] sm:min-w-[300px] flex-col gap-4 p-6 border border-gray-200
  rounded-lg hover-blue-500 hover:cursor-pointer text-gray-600 flex transform transition duration-500 ease-in-out over:translate-x-2`}>
    <img className='w-full h-full object-cover' src={acc.flag}/>
    <p className='text-sm'>{acc.label}</p>
    <div className='flex flex-1 w-full justify-between'>
      <p>{acc.symbol}{acc.balance.toString().substring(0,8)}</p>
      <p>{acc.code}</p>
    </div>
  </div>
  useEffect(() => {
    dispatch(getAccounts())
  }, [dispatch])
  return (
    <>
      <SectionContainer extraStyle={'overflow-x-auto'} >
        <p className='font-bold text-gray-600'>Accounts & Balances</p>
        <div className='flex flex-col sm:flex-row gap-6 sm:flex-wrap'>
          {
            accountList.map((acc, id) => <AccountItem acc={acc} key={id}/>)
          }
        </div>
      </SectionContainer>
      <Payment />
      <section>
        <Transaction />
      </section>
    </>
  )
}

export default Home