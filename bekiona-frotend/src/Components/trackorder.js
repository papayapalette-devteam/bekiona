import React, { useEffect, useState } from 'react'
import axios from 'axios';
import api from '../Components/api'
import Header from './Header';

function Trackorder() {

    // React: Make API call to your backend
    const[tracking_id,settracking_id]=useState("77834674492")

    const trackOrder = async () => {
    const res = await api.post(`track-order/${tracking_id}`);

    console.log("Tracking Info:", res);
  };
useEffect(()=>
{
    trackOrder()
},[])
  
  return (
    <div>
      <Header/>

            <h2>track your order</h2>
      
    </div>
  )
}

export default Trackorder
