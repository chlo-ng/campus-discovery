import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, {useState} from 'react'
import NavBar from '../components/NavBar'
import styles from '../styles/map.module.css'

declare global {
    interface Window {
        initMap: () => void;
    }
}

const Home: NextPage = () => {
    const router = useRouter()

    const [dateChange, setDateChange] = useState(false)
    const [timeChange, setTimeChange] = useState(false)
    const [locationChange, setLocationChange] = useState(false)
    const [hostChange, setHostChange] = useState(false)

    const [events, setEvents] = useState([])
    const [filterTab, setFilterTab] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [location, setLocation] = useState('')
    const [host, setHost] = useState('')
    const [selectedEvent, setSelectedEvent] = useState({})
    const [markers, setMarkers] = useState([])

    function fetchLatLong(address: string, id: number, map: google.maps.Map): void {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function(results, status) {
            if (status == 'OK') {
              var marker = new google.maps.Marker({
                  position: results[0].geometry.location
              });
              marker.setMap(map)
              marker.addListener("click", () => {
                var foundEvent = events.find(event => event.id == id)
                foundEvent.time = foundEvent.startTime.split(":")
                var date = new Date(foundEvent.date)
                date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                foundEvent.stringDate = date.toLocaleDateString(undefined, options)
                setSelectedEvent(foundEvent)
              });
              markers.push([id, marker])
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });
    }

    function initMap(): void {
        var mapCanvas = document.getElementById("map");
        var map = new google.maps.Map(mapCanvas, {center: new google.maps.LatLng(33.7755642724629, -84.39713258041849), zoom: 16.25, MapTypeId: 'terrian' })
        
        while (events.length === 0) {}

        events.forEach((event) => {fetchLatLong(event.location, event.id, map)})

        console.log(markers)
    }

    if (typeof window !== "undefined") {
        window.initMap = initMap;
    }

    if (events.length === 0) {
        fetch("http://localhost:8080/api/events/").then((resp) => resp.json())
        .then((apiData) => {
            setEvents(apiData);
        });
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
                            <input className={styles.input} id="startDate" type="date" required={true} onChange={e => {setStartDate(e.target.value); setDateChange(true)}} />
                        </div>
                        <div className={styles.filterDiv}>
                            <p className={styles.filterText}>End Date: </p>
                            <input className={styles.input} id="endDate" type="date" required={true} onChange={e => {setEndDate(e.target.value); setDateChange(true)}} />
                        </div>
                    </div>

                    <p className={styles.filterTitle}>Time</p>
                    <div>
                        <div className={styles.filterDiv}>
                            <p className={styles.filterText}>Start Time: </p>
                            <input className={styles.input} id="startTime" type="time" required={true} onChange={e => {setStartTime(e.target.value); setTimeChange(true)}} />
                        </div>
                        <div className={styles.filterDiv}>
                            <p className={styles.filterText}>End Time: </p>
                            <input className={styles.input} id="endTime" type="time" required={true} onChange={e => {setEndTime(e.target.value); setTimeChange(true)}} />
                        </div>
                    </div>

                    <p className={styles.filterTitle}>Location</p>
                    <div className={styles.filterDiv}>
                        <p className={styles.filterText}>Search: </p>
                        <input className={styles.input} required={true} onChange={e => {setLocation(e.target.value); setLocationChange(true)}} />
                    </div>

                    <p className={styles.filterTitle}>Host</p>
                    <div className={styles.filterDiv}>
                        <p className={styles.filterText}>Username: </p>
                        <input className={styles.input} required={true} onChange={e => {setHost(e.target.value); setHostChange(true)}} />
                    </div>
                </div>}

                {selectedEvent.id && <div className={styles.selectedEvent}>
                    <p className={styles.eventTitle} onClick={() => {router.push("/event/" + selectedEvent.id)}}>{selectedEvent.title}</p>
                    <p className={styles.eventText}>{selectedEvent.creator.username}</p>
                    <p className={styles.eventText}>{selectedEvent.stringDate}</p>
                    <p className={styles.eventText}>{selectedEvent.time[0] > 12 ?
                            parseInt(selectedEvent.time[0]) - 12 + ":" + selectedEvent.time[1] + " PM" :
                            parseInt(selectedEvent.time[0]) + ":" + selectedEvent.time[1] + " AM"}</p>
                    <p className={styles.eventText}>{selectedEvent.location}</p>
                </div>}
            </div>
        </div>
      </main>
    </div>
    )
}

export default Home
