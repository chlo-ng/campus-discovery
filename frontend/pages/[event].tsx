import type { NextPage } from "next"
import React, {useState} from 'react'
import { useEffect } from "react"
import { useRouter } from "next/router"
import Head from 'next/head'
import NavBar from "../components/NavBar"
import styles from '../styles/Events.module.css'

const Post = () => {
    const router = useRouter()
    const { event } = router.query
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [location, setLocation] = useState('')
    const [describe, setDescribe] = useState('')
    const [image, setImage] = useState('bookmark.png')
    
    fetch("http://localhost:8080/api/events/" + event).then((response) => {
          response.json().then((res) => {
            setName(res["title"])
            setDate(res["date"])
            setTime(res["startTime"])
            setDescribe(res["description"])
            setLocation(res["location"])
          })
        });

    async function bookmarkHandler(e:React.ChangeEvent<any>) {
        router.push('config')
    }

    return (
      <div>
        <Head>
          <title>Events</title>
          
          
        </Head>
        <main>
          <NavBar />
          <div className="container">
            <div className={styles.topbox}>
                <img className={styles.image} src = "/exampleEvent.png"></img>
                <h2 className= {styles.topname}>{name}<br></br><p className = {styles.text}>{date}<br></br>{time} PM<br></br>{location}</p></h2> 
                
                <img className= {styles.icon} src = {image} onClick={bookmarkHandler}></img>
          </div>
            <div className={styles.bottombox}>
                <img className={styles.line} src = "/line.jpg"></img>
                <p className={styles.info}>Event Description: <br></br></p>
                <p className={styles.subtext}>{describe}</p>
                <p className={styles.info}>RSVP: Check-in at event site</p>

            </div>
          </div>
        </main>
    </div>
  )
}
export default Post