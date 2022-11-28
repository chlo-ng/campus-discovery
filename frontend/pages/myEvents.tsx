import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from 'next/head'
import NavBar from "../components/NavBar"
import styles from "../styles/myEvents.module.css"
import React, {useState} from 'react'
import { eventNames } from "process"

const myEvents: NextPage = () => {

    var userID = null
    if (typeof localStorage !== 'undefined') {
      userID = localStorage.getItem("id")
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
              <div>
                {events.map((event: any) => {
                  return (<p style={{color: events.filter(eventSearch => Date.parse(event.date + "T" + event.startTime + "Z") == Date.parse(eventSearch.date + "T" + eventSearch.startTime + "Z"))
                      .length > 1 ? 'red' : 'black'}}>{event.title}</p>)
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
}
export default myEvents