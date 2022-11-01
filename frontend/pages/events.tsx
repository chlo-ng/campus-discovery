import type { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useState, useEffect, useId } from "react"
import Head from 'next/head'
import NavBar from "../components/NavBar"
import styles from '../styles/Events.module.css'
import { eventNames } from "process"

const Events: NextPage = () => {
    const router = useRouter()

    const [events, setEvents] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    if (typeof localStorage !== 'undefined') {
      var isAdmin = localStorage.getItem("role") === "TEACHER"
      var userID = localStorage.getItem("id")
    }

    if (events.length === 0) {
      fetch("http://localhost:8080/api/events/" ).then((resp) => resp.json())
      .then((apiData) => {
          setEvents(apiData);
          setPageNumber(0);
      });
    }

    console.log(events);

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
                  <div className={styles.upperRight}>
                    <img className={styles.editButton} 
                    src="/editV2.png" onClick={() => {
                      const { id } = router.query
                      router.push("editEvent/"+ id)
                    }}/>
                  </div>
                </div>
                <div className={styles.verticalCenter}>
                  <img className={`${styles.triangleButton} ${styles.triangleButtonRotate}`} src="/triangle.png"/>
                </div>
              </div>
            </div>
            <div className={styles.eventsContainer}>
              <p className={styles.header}>Browse Events</p>
              <div className={styles.searchBar}>
                <input type="search" placeholder="Start browsing..." aria-label="Search" aria-describedby="search-addon" size={70} />
                <span id="search-addon">
                  <img className={styles.searchIcon} src="/search.png"/>
                </span>
              </div> 

              <ul className={styles.eventList}>
              {events.slice(pageNumber * 10, pageNumber*10 + 10)?.map((item) => {
                var time = item.startTime.split(":")
                var date = new Date(item.date)
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                return (
                     <li className={styles.eventBox}>
                        <img className={styles.eventImage} src={item.image} onClick={e => router.push("/event/" + item.id)} />
                        <div className={styles.eventDetails} onClick={e => router.push("/event/" + item.id)}>
                          <p className={styles.eventTitle}>{item.title}</p>
                          <p className={styles.eventText}>{item.creator.username}</p>
                          <p className={styles.eventText}>{date.toLocaleDateString(undefined, options)}</p>
                          <p className={styles.eventText}>{time[0] > 12 ?
                            parseInt(time[0]) - 12 + ":" + time[1] + " PM" :
                            parseInt(time[0]) + ":" + time[1] + " AM"}</p>
                          <p className={styles.eventText}>{item.location}</p>
                        </div>

                        {(isAdmin || (userID == item.creator.id)) &&
                          <img className={styles.editButton} src={"/editButton.png"} onClick={e => router.push("/editEvent/" + item.id)} />
                        }
                    </li>
                  );
                })}
              </ul>

              {}
              <ul className={styles.paginationWrapper}> 
                {pageNumber > 0 &&
                  <a onClick={e => setPageNumber(pageNumber - 1)}> 
                    <img className={`${styles.backButton}`} src="/triangle.png"/>
                  </a>
                }

                {(pageNumber < Math.floor((events.length - 1)/10)) && 
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