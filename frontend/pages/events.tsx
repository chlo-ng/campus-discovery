import type { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useState, useEffect, useId } from "react"
import Head from 'next/head'
import NavBar from "../components/NavBar"
import styles from '../styles/Events.module.css'
import { eventNames } from "process"

const Events: NextPage = () => {
    const router = useRouter()

    const [localStorageLoaded, setLocalStorageLoaded] = useState(true)

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [location, setLocation] = useState('')
    const [host, setHost] = useState('')

    const [events, setEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);

    // const [totalPages, setTotalPages] = useState(1);    
    const [pageNumber, setPageNumber] = useState(0);
    const pages = [];

    if (typeof localStorage !== 'undefined' && localStorageLoaded) {
      setLocalStorageLoaded(false)
      setStartDate(localStorage.getItem("startDate") ? localStorage.getItem("startDate") : '')
      setEndDate(localStorage.getItem("endDate") ? localStorage.getItem("endDate") : '')
      setStartTime(localStorage.getItem("startTime") ? localStorage.getItem("startTime") : '')
      setEndTime(localStorage.getItem("endTime") ? localStorage.getItem("endTime") : '')
      setLocation(localStorage.getItem("location") ? localStorage.getItem("location") : '')
      setHost(localStorage.getItem("host") ? localStorage.getItem("host") : '')
      var isAdmin = localStorage.getItem("role") === "TEACHER"
      var userID = localStorage.getItem("id")
      setEvents(allEvents.filter((eventDetail: any) => {
        var display = true
        display = startDate != '' && endDate != '' && (Date.parse(eventDetail.date) < Date.parse(startDate) ||
            Date.parse(eventDetail.date) > Date.parse(endDate)) ? false : display
        display = startTime != '' && endTime != '' && (Date.parse('1970-01-01T' + eventDetail.startTime + 'Z') < Date.parse('1970-01-01T' + startTime + ':00Z') ||
            Date.parse('1970-01-01T' + eventDetail.startTime + 'Z') > Date.parse('1970-01-01T' + endTime + ':00Z')) ? false : display
        display = location.trim() != "" && !eventDetail.location.toLowerCase().includes(location.toLowerCase()) ? false : display
        display = host.trim() != "" && eventDetail.creator.username != host ? false : display
        return display
      }));
    }

    if (events.length === 0) {
      fetch("http://localhost:8080/api/events/").then((resp) => resp.json())
      .then((apiData) => {
          setAllEvents(apiData);
          setEvents(apiData.filter((eventDetail: any) => {
            var display = true
            display = startDate != '' && endDate != '' && (Date.parse(eventDetail.date) < Date.parse(startDate) ||
                Date.parse(eventDetail.date) > Date.parse(endDate)) ? false : display
            display = startTime != '' && endTime != '' && (Date.parse('1970-01-01T' + eventDetail.startTime + 'Z') < Date.parse('1970-01-01T' + startTime + ':00Z') ||
                Date.parse('1970-01-01T' + eventDetail.startTime + 'Z') > Date.parse('1970-01-01T' + endTime + ':00Z')) ? false : display
            display = location.trim() != "" && !eventDetail.location.toLowerCase().includes(location.toLowerCase()) ? false : display
            display = host.trim() != "" && eventDetail.creator.username != host ? false : display
            return display
          }));
      });
    }

    function submitFilter(): void {
      localStorage.setItem("startDate", startDate)
      localStorage.setItem("endDate", endDate)
      localStorage.setItem("startTime", startTime)
      localStorage.setItem("endTime", endTime)
      localStorage.setItem("location", location)
      localStorage.setItem("host", host)

      setEvents(allEvents.filter((eventDetail: any) => {
        var display = true
        display = startDate != '' && endDate != '' && (Date.parse(eventDetail.date) < Date.parse(startDate) ||
            Date.parse(eventDetail.date) > Date.parse(endDate)) ? false : display
        display = startTime != '' && endTime != '' && (Date.parse('1970-01-01T' + eventDetail.startTime + 'Z') < Date.parse('1970-01-01T' + startTime + ':00Z') ||
            Date.parse('1970-01-01T' + eventDetail.startTime + 'Z') > Date.parse('1970-01-01T' + endTime + ':00Z')) ? false : display
        display = location.trim() != "" && !eventDetail.location.toLowerCase().includes(location.toLowerCase()) ? false : display
        display = host.trim() != "" && eventDetail.creator.username != host ? false : display
        return display
      }))
    } 

    // init totalPages
    let totalPages = events.length;

    // init pages
    for (var i = 0; i <= (totalPages - 1) / 10; i++) {
      pages[i] = i + 1;
    }
    
    return (
      <div>
        <Head>
          <title>Events</title>
          <meta name="description" content="Events page showing list of events" />
          <link rel="icon" href="/gtLogo.png" />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto Slab' />
        </Head>
        <main>
          <NavBar />
          <div className="container">
            <div className={styles.eventsContainer}>
              <p className={styles.header}>Trending this week</p>
              <div className={styles.trending}>
                <div className={styles.verticalCenter}>
                  <img className={styles.triangleButton} src="/triangle.png"/>
                </div>
                <div className={styles.trendingBox}>
                  <img className={styles.eventImage} src="/moonfest.png"></img>
                  <div className={styles.eventDetails}>
                    <p className={styles.eventTitle}>GT VSA's Moon Fest</p>
                    <p className={styles.eventText}>GT VSA</p>
                    <p className={styles.eventText}>Thursday, October 13, 2022</p>
                    <p className={styles.eventText}>6:00 PM</p>
                    <p className={styles.eventText}>Tech Green</p>
                  </div>
                </div>
                <div className={styles.verticalCenter}>
                  <img className={`${styles.triangleButton} ${styles.triangleButtonRotate}`} src="/triangle.png"/>
                </div>
              </div>
            </div>
            <div className={styles.eventsContainer}>
              <p className={styles.header}>Browse Events</p>
              <div className={styles.filterListContainer}>
                <div className={styles.filterList}>
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

                  <button className={styles.filterSubmitButton} onClick={() => submitFilter()}>Submit</button>
                </div>
              </div>

              <ul className={styles.eventList}>
              {events.slice(pageNumber * 10, pageNumber*10 + 10)?.map((item) => {
                var time = item.startTime.split(":")
                var date = new Date(item.date)
                date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                return (
                     <li className={styles.eventBox}>
                        <img className={styles.eventImage} src={item.image} onClick={() => router.push("/event/" + item.id)} />
                        <div className={styles.eventDetails} onClick={() => router.push("/event/" + item.id)}>
                          <p className={styles.eventTitle}>{item.title}</p>
                          <p className={styles.eventText}>{item.creator.username}</p>
                          <p className={styles.eventText}>{date.toLocaleDateString(undefined, options)}</p>
                          <p className={styles.eventText}>{time[0] > 12 ?
                            parseInt(time[0]) - 12 + ":" + time[1] + " PM" :
                            parseInt(time[0]) + ":" + time[1] + " AM"}</p>
                          <p className={styles.eventText}>{item.location}</p>
                        </div>

                        {(isAdmin || (userID == item.creator.id)) &&
                          <img className={styles.editButton} src={"/editButton.png"} onClick={() => router.push("/editEvent/" + item.id)} />
                        }
                    </li>
                  );
                })}
              </ul>

              <ul className={styles.paginationWrapper}>

                {pageNumber > 0 &&
                  <a onClick={e => setPageNumber(pageNumber - 1)}> 
                    <img className={`${styles.backButton}`} src="/triangle.png"/>
                  </a>
                }

                {pages.map(page => {
                  return(
                    <a onClick={e => setPageNumber(page - 1)}>
                      {page}
                    </a>
                  )
                  })
                }

                {pageNumber < Math.floor((totalPages - 1)/10) && 
                  <a onClick={e => setPageNumber(pageNumber + 1)}>
                    <img className={`${styles.nextButton} ${styles.triangleButtonRotate}`} src="/triangle.png"/>
                  </a>
                }
              </ul>   
            </div>

          </div>
        </main>
    </div>
  )
}
export default Events