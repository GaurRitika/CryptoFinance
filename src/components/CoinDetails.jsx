import React from 'react'
import {useEffect , useState} from 'react'
import Loader from './Loader'
import axios from 'axios'
import './coinDetail.css'
import {useParams} from 'react-router-dom'
import {BiSolidUpArrow , BiSolidDownArrow} from 'react-icons/bi'
import {IoPulseOutline} from 'react-icons/io5'
import CoinChart from './CoinChart'

const CoinDetails = () => {
  
const [coin , setCoin] = useState([])
const [loading , setLoading] = useState(true)
const profit = coin.market_data?.price_change_percentage_24h>0
const [currency , setCurrency] = useState('inr')
 const currencySymbol = currency === 'inr' ? '₹' : '$'

  const {id} = useParams()
  const murl = 'https://api.coingecko.com/api/v3/coins/';
  useEffect(()=>{
    const getCoin = async() => {
      try{
const {data} = await axios.get(`${murl}${id}`)
console.log(data)
setCoin(data)
setLoading(false)
      } catch (error){
console.log(error)
setLoading(false)
      }
    }
    getCoin()
  },[id])
  return (
   <>
   {
    loading ? <Loader/> : <>


<div className='coin-detail'>
  <div className='coin-info'>
  <div className = 'btn'>
        <button onClick={()=>setCurrency('inr')}>inr</button>
        <button onClick={()=>setCurrency('usd')}>usd</button>
    </div>
    <div className='time'>
      {coin.last_updated}
    </div>
    <div className='coin-image'>
      <img height={'150px'} src={coin.image.large}/>
    </div>
    <div className='coin-name'>{coin.name}</div>
<div className='coin-price'>{currencySymbol}{coin.market_data.current_price[currency]}</div>
<div className='coin-profit'>{profit? <BiSolidUpArrow color = 'green'/> : <BiSolidDownArrow color = 'red'/>}
{coin.market_data.price_change_percentage_24h}%
</div>
<div className='market-rank'>
  <IoPulseOutline color = 'orange'/>
  #{coin.market_cap_rank}
</div>
<div className='coin-desc'>
 <p> {coin.description['en'].split('.')[0]}</p>
</div>
  </div>
  <CoinChart/>
</div>


    </>
   }
   </>
  )
}

export default CoinDetails