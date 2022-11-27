import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, {useState} from 'react'
import NavBar from '../components/NavBar'
import styles from '../styles/map.module.css'
import { Wrapper, Status } from "@googlemaps/react-wrapper"

declare global {
    interface Window {
        initMap: () => void;
    }
}

const Home: NextPage = () => {
    const router = useRouter()

    const [events, setEvents] = useState([])
    const [filterTab, setFilterTab] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [host, setHost] = useState('')

    function initMap(): void {
        var mapCanvas = document.getElementById("map");
        var map = new google.maps.Map(mapCanvas, {center: new google.maps.LatLng(33.7755642724629, -84.39713258041849), zoom: 16.25, MapTypeId: 'terrian' })
    }

    if (typeof window !== "undefined") {
        window.initMap = initMap;
    }

    return (
    <div>
      <Head>
        <title>Campus Discovery</title>
        <meta name="description" content="CS 2340 Group 7" />
        <link rel="icon" href="/gtLogo.png" />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto Slab' />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBS0al4nwlBsz5w4RflXdYf5imYuXozR2g&callback=initMap" defer></script>
      </Head>
    
      <main>
        <NavBar />
        <div className='container'>
            <div id="map" style={{ width: "100%", height: "100%" }}></div>

            <div className={styles.filter}>
                <button className={styles.filterButton} onClick={() => {setFilterTab(!filterTab)}}>Filter</button>
                {filterTab && <div className={styles.filterList}>
                    <p className={styles.filterTitle}>Date</p>
                    <div>
                        <div className={styles.filterDiv}>
                            <p className={styles.filterText}>Start Date: </p>
                            <input className={styles.input} id="startDate" type="date" required={true} onChange={e => setStartDate(e.target.value)} />
                        </div>
                        <div className={styles.filterDiv}>
                            <p className={styles.filterText}>End Date: </p>
                            <input className={styles.input} id="endDate" type="date" required={true} onChange={e => setEndDate(e.target.value)} />
                        </div>
                    </div>

                    <p className={styles.filterTitle}>Time</p>
                    <div>
                        <div className={styles.filterDiv}>
                            <p className={styles.filterText}>Start Time: </p>
                            <input className={styles.input} id="startTime" type="time" required={true} onChange={e => setStartTime(e.target.value)} />
                        </div>
                        <div className={styles.filterDiv}>
                            <p className={styles.filterText}>End Time: </p>
                            <input className={styles.input} id="endTime" type="time" required={true} onChange={e => setEndTime(e.target.value)} />
                        </div>
                    </div>

                    <p className={styles.filterTitle}>Location</p>

                    <p className={styles.filterTitle}>Host</p>
                    <div className={styles.filterDiv}>
                        <p className={styles.filterText}>Username: </p>
                        <input className={styles.input} required={true} onChange={e => setHost(e.target.value)} />
                    </div>
                </div>}
            </div>
        </div>
      </main>
    </div>
    )
}

export default Home
