import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, {useState} from 'react'
import { start } from 'repl'
import NavBar from '../components/NavBar'
import styles from '../styles/map.module.css'

declare global {
    interface Window {
        initMap: () => void;
    }
}

const Home: NextPage = () => {
    const router = useRouter()

    const [localStorageLoaded, setLocalStorageLoaded] = useState(true)

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
    const [mapGlobal, setMapGlobal] = useState();

    if (typeof localStorage !== 'undefined' && localStorageLoaded) {
        setLocalStorageLoaded(false)
        setStartDate(localStorage.getItem("startDate") ? localStorage.getItem("startDate") : '')
        setEndDate(localStorage.getItem("endDate") ? localStorage.getItem("endDate") : '')
        setStartTime(localStorage.getItem("startTime") ? localStorage.getItem("startTime") : '')
        setEndTime(localStorage.getItem("endTime") ? localStorage.getItem("endTime") : '')
        setLocation(localStorage.getItem("location") ? localStorage.getItem("location") : '')
        setHost(localStorage.getItem("host") ? localStorage.getItem("host") : '')
    }

    function submitFilter(): void {
        localStorage.setItem("startDate", startDate)
        localStorage.setItem("endDate", endDate)
        localStorage.setItem("startTime", startTime)
        localStorage.setItem("endTime", endTime)
        localStorage.setItem("location", location)
        localStorage.setItem("host", host)

        markers.forEach(markerPair => {
            const eventDetail = markerPair[0]
            const marker = markerPair[1]
            var display = true

            display = startDate != '' && endDate != '' && (Date.parse(eventDetail.date) < Date.parse(startDate) ||
                Date.parse(eventDetail.date) > Date.parse(endDate)) ? false : display
            display = startTime != '' && endTime != '' && (Date.parse('1970-01-01T' + eventDetail.startTime + 'Z') < Date.parse('1970-01-01T' + startTime + ':00Z') ||
                Date.parse('1970-01-01T' + eventDetail.startTime + 'Z') > Date.parse('1970-01-01T' + endTime + ':00Z')) ? false : display
            display = location.trim() != "" && !eventDetail.location.toLowerCase().includes(location.toLowerCase()) ? false : display
            display = host.trim() != "" && eventDetail.creator.username != host ? false : display

            if (display) {
                marker.setMap(mapGlobal)
            } else {
                marker.setMap(null)
            }
        })
    }

    function fetchLatLong(address: string, eventDetail: object, map: google.maps.Map): void {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function(results, status) {
            if (status == 'OK') {
              var marker = new google.maps.Marker({
                  position: results[0].geometry.location
              });
              marker.addListener("click", () => {
                var foundEvent = events.find(event => event.id == eventDetail.id)
                foundEvent.time = foundEvent.startTime.split(":")
                var date = new Date(foundEvent.date)
                date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                foundEvent.stringDate = date.toLocaleDateString(undefined, options)
                setSelectedEvent(foundEvent)
              });

              var display = true
              display = startDate != '' && endDate != '' && (Date.parse(eventDetail.date) < Date.parse(startDate) ||
                  Date.parse(eventDetail.date) > Date.parse(endDate)) ? false : display
              display = startTime != '' && endTime != '' && (Date.parse('1970-01-01T' + eventDetail.startTime + 'Z') < Date.parse('1970-01-01T' + startTime + ':00Z') ||
                  Date.parse('1970-01-01T' + eventDetail.startTime + 'Z') > Date.parse('1970-01-01T' + endTime + ':00Z')) ? false : display
              display = location.trim() != "" && !eventDetail.location.toLowerCase().includes(location.toLowerCase()) ? false : display
              display = host.trim() != "" && eventDetail.creator.username != host ? false : display
  
              console.log(display)
              if (display) {
                  marker.setMap(map)
              } else {
                  marker.setMap(null)
              }

              markers.push([events.find(event => event.id == eventDetail.id), marker])
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });
    }

    function initMap(): void {
        var mapCanvas = document.getElementById("map");
        var map = new google.maps.Map(mapCanvas, {center: new google.maps.LatLng(33.7755642724629, -84.39713258041849), zoom: 16.25, MapTypeId: 'terrian' })
        setMapGlobal(map)
        while (events.length === 0) {}

        events.forEach((event) => {fetchLatLong(event.location, event, map)})
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
                            <input className={styles.input} defaultValue={startDate} id="startDate" type="date" required={true} onChange={e => setStartDate(e.target.value)} />
                        </div>
                        <div className={styles.filterDiv}>
                            <p className={styles.filterText}>End Date: </p>
                            <input className={styles.input} defaultValue={endDate} id="endDate" type="date" required={true} onChange={e => setEndDate(e.target.value)} />
                        </div>
                    </div>

                    <p className={styles.filterTitle}>Time</p>
                    <div>
                        <div className={styles.filterDiv}>
                            <p className={styles.filterText}>Start Time: </p>
                            <input className={styles.input} defaultValue={startTime} id="startTime" type="time" required={true} onChange={e => setStartTime(e.target.value)} />
                        </div>
                        <div className={styles.filterDiv}>
                            <p className={styles.filterText}>End Time: </p>
                            <input className={styles.input} defaultValue={endTime} id="endTime" type="time" required={true} onChange={e => setEndTime(e.target.value)} />
                        </div>
                    </div>

                    <p className={styles.filterTitle}>Location</p>
                    <div className={styles.filterDiv}>
                        <p className={styles.filterText}>Search: </p>
                        <input className={styles.input} defaultValue={location} required={true} onChange={e => setLocation(e.target.value)} />
                    </div>

                    <p className={styles.filterTitle}>Host</p>
                    <div className={styles.filterDiv}>
                        <p className={styles.filterText}>Username: </p>
                        <input className={styles.input} defaultValue={host} required={true} onChange={e => setHost(e.target.value)} />
                    </div>

                    <button className={styles.filterSubmitButton} onClick={() => {setFilterTab(!filterTab); submitFilter()}}>Submit</button>
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
