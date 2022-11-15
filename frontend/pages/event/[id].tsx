import type { NextPage } from "next"
import React, {useState} from 'react'
import { useEffect } from "react"
import { useRouter } from "next/router"
import Head from 'next/head'
import NavBar from "../../components/NavBar"
import styles from '../../styles/Event.module.css'

const Post: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const [event, setEvent] = useState()
    const [name, setName] = useState('')
    var [date, setDate] = useState(new Date())
    const [time, setTime] = useState(['00', '00'])
    const [location, setLocation] = useState('')
    const [describe, setDescribe] = useState('')
    const [image, setImage] = useState('')
    const [popup, setPopup] = useState(false)
    const [rsvp, setRsvp] = useState('')
    const [hasRsvp, setHasRsvp] = useState(false)
    const [inviteOnly, setInviteOnly] = useState(false)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    if (typeof localStorage !== 'undefined') {
      var isAdmin = localStorage.getItem("role") === "TEACHER"
      var userID = localStorage.getItem("id")
    }
    
    if (time[2] == undefined) {
      fetch("http://localhost:8080/api/events/" + id).then((response) => {
        response.json().then((res) => {
          if (res.id) {
            console.log(res)
            setEvent(res)
            setName(res["title"])
            setDate(new Date(res["date"]))
            setTime(res["startTime"] ? res["startTime"].split(":") : ['00', '00'])
            setDescribe(res["description"])
            setLocation(res["location"])
            setImage(res["image"])
            const hasExistingRsvp = res.rsvped.map((item: any) => {return item.pk.userId.toString()}).includes(userID)
            setHasRsvp(hasExistingRsvp)
            if (hasExistingRsvp) {
              setRsvp(res.rsvped.find((item: any) => (item.user.id == userID)).rsvp)
            }
            setInviteOnly(res["inviteOnly"])
          }
        })
      });
    }

    async function popupSubmitHandler(e: React.ChangeEvent<any>) {
      e.preventDefault()
      if (rsvp !== '') {
        if (hasRsvp) {
          fetch("http://localhost:8080/api/rsvp/" + id + "/" + userID + "/" + rsvp, {
            method: "PUT"}).then(res => {
              setHasRsvp(true)
              setPopup(false)
              router.reload()
          });
        } else {
          fetch("http://localhost:8080/api/rsvp/" + id + "/" + userID + "/" + rsvp, {
            method: "POST"}).then(res => {
              setHasRsvp(true)
              setPopup(false)
              router.reload()
          });
        }
      } else {
        alert("Please select an RSVP response.")
      }
    }

    async function deleteRSVP(e: React.ChangeEvent<any>) {
      e.preventDefault()

      fetch("http://localhost:8080/api/rsvp/" + id + "/" + userID, {
        method: "DELETE"}).then(res => {
          if (res.ok) {
            alert("RSVP deleted.")
            setRsvp('')
            setHasRsvp(false)
            setPopup(false)
            router.reload()
          } else {
            alert("Error when deleting please try again.");
          }
      });
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
                  <p className={styles.text}>{event?.creator?.username}</p>
                  <p className={styles.text}>{date.toLocaleDateString(undefined, options)}</p>
                  <p className={styles.text}>{time[0] > 12 ?
                    parseInt(time[0]) - 12 + ":" + time[1] + " PM" :
                    parseInt(time[0]) + ":" + time[1] + " AM"}</p>
                  <p className={styles.text}>{location}</p>
                </div>
                <div>
                  {!inviteOnly && <img className= {styles.icon} src="../bookmark.png" onClick={e => setPopup(true)}></img>}
                  {event && (isAdmin || (userID == event.creator?.id)) &&
                    <img className={styles.icon} src={"/editButton.png"} onClick={e => router.push("/editEvent/" + id)} />
                  }
                </div>
            </div>
            <div className={styles.bottombox}>
                <p className={styles.info}>Event Description:<br></br></p>
                <p className={styles.subtext}>{describe}</p>
            </div>
            {popup && <div className={styles.popup}>
              <div className={styles.popupForm}>
                <img className={styles.popupExitIcon} 
                  src="/cross.png"
                  onClick={() => {
                    setPopup(false)
                  }}/>
                <div className={styles.popupContainer}>
                  <p className= {styles.info}>Please select your RSVP.</p>
                  <div className={styles.popupButtons}>
                    {["YES", "NO", "MAYBE"].map((item) => {
                      return (
                        <button className={styles.popupButton} 
                        style={{backgroundColor: rsvp === item ? 'var(--gold)' : 'white'}}
                        onClick={() => {
                          setRsvp(item)
                        }}>{item}</button>
                    )})}
                  </div>
                  <div className={styles.popupSubmitButtons}>
                    <button className={`${styles.popupSubmitButton} ${styles.popupButton}`} onClick={popupSubmitHandler}>SUBMIT</button>
                    {hasRsvp && <button className={`${styles.popupDeleteButton} ${styles.popupButton}`} onClick={deleteRSVP}>DELETE</button>}
                  </div>
                </div>
              </div>
            </div>}
          </div>
        </main>
    </div>
  )
}
export default Post