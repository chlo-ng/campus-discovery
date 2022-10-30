import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from 'next/head'
import NavBar from "../components/NavBar"
import styles from "../styles/CreateEvent.module.css"
import React, {useState} from 'react'

const CreateEvent: NextPage = () => {
    const router = useRouter()
    const [name, setName] = useState('');
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [location, setLocation] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')


    async function submitHandler(e: React.ChangeEvent<any>) {
        const id = localStorage.getItem("id")

        var event: any = {
            title: name,
            date: date,
            startTime: time + ":00",
            description: description,
            location: location,
            image: image
        }

        console.log(event)

        fetch("http://localhost:8080/api/events/" + id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        }).then((response) => {
          response.json().then((res) => {
            console.log(res);
            // router.push("/events")
          }).catch(err => alert(console.log(err)))
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
            <form className={styles.form}>
              <p className={styles.heading}>Create an Event</p>
              <div className={styles.question}>
                <p className={styles.label}>Event Name:</p>
                <input className={styles.input} required={true} onChange={e => setName(e.target.value)}></input>
              </div>
              <div className={styles.question}>
                <p className={styles.label}>Date:</p>
                <input className={styles.input} type="date" required={true} onChange={e => setDate(e.target.value)}></input>
              </div>
              <div className={styles.question}>
                <p className={styles.label}>Time:</p>
                <input className={styles.input} type="time" min="00:00" max="23:59" required={true} onChange={e => setTime(e.target.value)}></input>
              </div>
              <div className={styles.question}>
                <p className={styles.label}>Location:</p>
                <input className={styles.input} required={true} onChange={e => setLocation(e.target.value)}></input>
              </div>
              <div className={styles.question}>
                <p className={styles.label}>Image:</p>
                <input className={styles.input} type="url" required={true} onChange={e => setImage(e.target.value)}></input>
              </div>
              <div className={styles.question}>
                <p className={styles.label}>Description:</p>
                <textarea className={styles.description} required={true} onChange={e => setDescription(e.target.value)}></textarea>
              </div>
              <button className={styles.submitButton} type="submit" onClick={submitHandler}>Submit</button>
            </form>
          </div>
        </main>
      </div>
    )
}
export default CreateEvent