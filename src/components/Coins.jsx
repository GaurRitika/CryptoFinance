import React from 'react'
import { useState, useEffect } from 'react'
import Loader from './Loader'
import axios from 'axios'
import Header from './Header'

import { Link } from 'react-router-dom'
const Coins = () => {
    const [loading, setLoading]=useState(true)
    const [coins , setCoins] = useState([])
    const [currency , setCurrency] = useState('usd')
    const currencySymbol = currency === 'inr' ? '₹' : '$'
     const nurl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`
    useEffect(() => {
        const getCoinsData = async()=> {
                const {data} = await axios.get(nurl)
                console.log(data);
                setLoading(false)
                setCoins(data);
            }
            getCoinsData()
        },[])
    
  return (
   <>
   {
    loading ? <Loader/> : <>
    <Header/>
    <div className = 'btns'>
        <button onClick={()=>setCurrency('inr')}>inr</button>
        <button onClick={()=>setCurrency('usd')}>usd</button>
    </div>
    {
      coins.map((coindata , i)=>{
        return(
          <CoinCart coindata = {coindata}  i ={i} currencySymbol={currencySymbol} id={coindata.id}/>
        )
      })
    }
    </>
   }
   </>
  )
}


const CoinCart = ({coindata,i,currencySymbol,id}) => {
  const profit = coindata.price_change_percentage_24h>0
  return(
   <Link to={`/coins/${id}`} style={{color:"white", textDecoration:'none'}} >
    <div key={i} className='ex-cards'>
          <div className="image">
            <img height={"80px"} src={coindata.image} alt="" />
          </div>
          <div className="name">
              {coindata.name}
          </div>
          <div className="price">
              {currencySymbol} {coindata.current_price.toFixed(0)}
          </div>
          <div style={profit? {color:"green"} : {color:"red"}} className="rank">
               {profit ?"+" + coindata.price_change_percentage_24h: coindata.price_change_percentage_24h.toFixed(2)}
          </div>
       </div>
   </Link>
  )
}
export default Coins