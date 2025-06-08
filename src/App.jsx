import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'
import {
  APIProvider,
  Map,
  AdvancedMarker

} from '@vis.gl/react-google-maps';

function App() {
  const [ipData, setipData] = useState([])
  const [position, setPosition] = useState({ lat: 53, lng: 10 });;

  const getIpify = async() =>{
    const APIkey = import.meta.env.VITE_IPIFY_API_KEY
    const consulta = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${APIkey}`)
    const result = await consulta.json()
    setipData(result)
    setPosition({ lat: result.location.lat, lng: result.location.lng })
  }

useEffect(() => {
  getIpify();
},[])
  return (
    <>
      <h1> IP Address Tracker</h1>
      <input type="text" />
      <section>
        <article>
          <h2>ip address</h2>
          <span> {ipData.ip}</span>
        </article>


        <article>
          <h2>location</h2>
          <span>{ipData.location?.region}, {ipData.location?.city}</span>
        </article>


        <article>
          <h2>timezone</h2>
          <span>{ipData.location?.timezone}</span>
        </article>


        <article>
          <h2>isp</h2>
          <span>{ipData.isp}</span>
        </article>
      </section>

      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <div style={{ height: "400px" }}>
          <Map zoom={9} center={position} mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}>
            <AdvancedMarker position={position} >
            </AdvancedMarker>
          </Map>
        </div>
      </APIProvider>

    </>
  )
}

export default App
