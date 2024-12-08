import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import Loader from './Loader';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
const CoinChart = () => {
    const [chartData , setChartData] =useState([])
    const {id} = useParams()
    const purl = 'https://api.coingecko.com/api/v3';
    const CoinChartData = async() =>{
       try{
        const {data} =  await axios.get(`${purl}/coins/${id}/market_chart?vs_currency=inr&days=365`);
        setChartData(data.prices)
        console.log(data.prices)
       }
       catch(error){
console.log(error)
       }
    }
    useEffect(()=>{
        CoinChartData()
    },[])
  return (
    <div>CoinChart</div>
  )
}

export default CoinChart