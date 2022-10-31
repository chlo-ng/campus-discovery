import type { NextPage } from "next"
import React, {useState} from 'react'
import { useEffect } from "react"
import { useRouter } from "next/router"
import Head from 'next/head'
import NavBar from "../../components/NavBar"
import styles from '../../styles/Events.module.css'

const Post = () => {
    const router = useRouter()
    const { id } = router.query
    const [event, setEvent] = useState()
    const [name, setName] = useState('')
    var [date, setDate] = useState(new Date())
    const [time, setTime] = useState([])
    const [location, setLocation] = useState('')
    const [describe, setDescribe] = useState('')
    const [image, setImage] = useState('')
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    if (typeof localStorage !== 'undefined') {
      var isAdmin = localStorage.getItem("role") === "TEACHER"
      var userID = localStorage.getItem("id")
    }
    
    fetch("http://localhost:8080/api/events/" + id).then((response) => {
      response.json().then((res) => {
        setEvent(res)
        setName(res["title"])
        setDate(new Date(res["date"]))
        setTime(res["startTime"] ? res["startTime"].split(":") : ['00', '00', '00'])
        setDescribe(res["description"])
        setLocation(res["location"])
        setImage(res["image"])
      })
    });

    async function bookmarkHandler(e:React.ChangeEvent<any>) {
        router.push('../config')
    }

    return (
      <div>
        <Head>
          <title>Events</title>
          <link rel="icon" href="/gtLogo.png" />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto Slab' />
        </Head>
        <main>
          <NavBar />
          <div className="container">
            <div className={styles.topbox} >
                <img className={styles.image} src={image}></img>
                <div className={styles.topboxDetails}>
                  <h2 className={styles.topname}>{name}</h2> 
                  <p className={styles.text}>{date.toLocaleDateString(undefined, options)}</p>
                  <p className={styles.text}>{time[0] > 12 ?
                    parseInt(time[0]) - 12 + ":" + time[1] + " PM" :
                    parseInt(time[0]) + ":" + time[1] + " AM"}</p>
                  <p className={styles.text}>{location}</p>
                </div>
                <div>
                  <img className= {styles.icon} src="../bookmark.png" onClick={bookmarkHandler}></img>
                  {(isAdmin || (userID == event?.creator.id)) &&
                    <img className={styles.icon} src={"/editButton.png"} onClick={e => router.push("/editEvent/" + id)} />
                  }
                </div>
            </div>
            <div className={styles.bottombox}>
                <p className={styles.info}>Event Description:<br></br></p>
                <p className={styles.subtext}>{describe}</p>
            </div>
          </div>
        </main>
    </div>
  )
}
export default Post