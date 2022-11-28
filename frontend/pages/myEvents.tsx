import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from 'next/head'
import NavBar from "../components/NavBar"
import styles from "../styles/myEvents.module.css"
import React, {useState} from 'react'
import { eventNames } from "process"

const myEvents: NextPage = () => {

    var userID = null
    var isAdmin = null
    if (typeof localStorage !== 'undefined') {
      userID = localStorage.getItem("id")
      isAdmin = localStorage.getItem("role") === "TEACHER"
    }

    const [events, setEvents] = useState([])

    if (events.length == 0 && userID !== null) {
      fetch("http://localhost:8080/api/users/" + userID + "/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((response) => {
        response.json().then((res) => {
          setEvents(res.rsvp
            .filter(rsvp => rsvp.rsvp == "YES")
            .sort((a: any, b: any) => {
              return Date.parse(a.event.date + "T" + a.event.startTime + "Z") - Date.parse(b.event.date + "T" + b.event.startTime + "Z")
            })
            .map(event => event.event))
        }).catch(err => alert("Couldn't get user's events."))
      })
    }
    
    return (
      <div>
        <Head>
          <title>Campus Discovery</title>
          <meta name="description" content="create event" />
          <link rel="icon" href="/gtLogo.png" />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto Slab' />
        </Head>
        <main>
          <NavBar />
          <div className="container">
            <div className={styles.coreContainer}>
              <p className={styles.heading}>My Events</p>
              <div className={styles.events}>
                {events.map((event: any) => {
                  console.log(event)
                  var time = event.startTime.split(":")
                  var date = new Date(event.date)
                  date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
                  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                  var color = events.filter(eventSearch => Date.parse(event.date + "T" + event.startTime + "Z") == Date.parse(eventSearch.date + "T" + eventSearch.startTime + "Z"))
                      .length > 1 ? 'red' : 'black'
                  return (<div className={styles.event}>
                    <img className={styles.eventImage} src={event.image} onClick={() => router.push("/event/" + event.id)} />
                    <div className={styles.eventDetails} onClick={() => router.push("/event/" + event.id)}>
                      <p className={styles.eventTitle}>{event.title}</p>
                      <p className={styles.eventText}>{event.creator.username}</p>
                      <p className={styles.eventText} style={{color: color}}>{date.toLocaleDateString(undefined, options)}</p>
                      <p className={styles.eventText} style={{color: color}}>{time[0] > 12 ?
                        parseInt(time[0]) - 12 + ":" + time[1] + " PM" :
                        parseInt(time[0]) + ":" + time[1] + " AM"}</p>
                      <p className={styles.eventText}>{event.location.split(",")[0]}</p>
                    </div>

                    {(isAdmin || (userID == event.creator.id)) &&
                      <img className={styles.editButton} src={"/editButton.png"} onClick={() => router.push("/editEvent/" + event.id)} />
                    }
                  </div>)
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
}
export default myEvents