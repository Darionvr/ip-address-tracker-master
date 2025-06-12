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
  const [inputValue, setInputValue] = useState("")

  const getIpify = async(ip) =>{
    const APIkey = import.meta.env.VITE_IPIFY_API_KEY
     const url = ip
      ? `https://geo.ipify.org/api/v2/country,city?apiKey=${APIkey}&ipAddress=${ip}`
      : `https://geo.ipify.org/api/v2/country,city?apiKey=${APIkey}`;
    const consulta = await fetch(url)
    const result = await consulta.json()
    setipData(result)
    setPosition({ lat: result.location.lat, lng: result.location.lng })
    setInputValue(result.ip)
  }

useEffect(() => {
  getIpify();
},[])

const handleSubmit = (e) =>{
e.preventDefault()
getIpify(inputValue)

}
  return (
    <>

    <div className="background"></div>
    <main> 
      <h1> IP Address Tracker</h1>
      <form  onSubmit={handleSubmit}>
        <input type="text" 
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Insert an IP"
        />
        <button type='submit'> &gt; </button>
      </form>
      
      <section className='container'>
        <article>
          <h2>ip address</h2>
          <span className='data'> {ipData.ip}</span>
        </article>


        <article>
          <h2>location</h2>
          <span className='data'>{ipData.location?.region}, {ipData.location?.city}</span>
        </article>


        <article>
          <h2>timezone</h2>
          <span className='data'>{ipData.location?.timezone}</span>
        </article>


        <article>
          <h2>isp</h2>
          <span className='data'>{ipData.isp}</span>
        </article>
      </section>
</main>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <div className='map'>
          <Map zoom={15} center={position} mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
          options={{disableDefaultUI: true}}>
            <AdvancedMarker position={position} >
            </AdvancedMarker>
          </Map>
        </div>
      </APIProvider>

    </>
  )
}

export default App
