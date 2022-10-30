import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from 'next/head'
import React, {useState} from 'react'
import NavBar from "../components/NavBar"
import styles from '../styles/EditEvents.module.css'

const EditEvent: NextPage = () => {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [location, setLocation] = useState('')

    async function submitHandler(e: React.ChangeEvent<any>) {
        e.preventDefault()
        if (title.trim() !== "" && description.trim() !== "") {
          var data: any = {
            title: title,
            description: description,
            date: date,
            time: time,
            location: location
          }
          console.log(data);
          fetch("http://localhost:8080/api/users/{id}", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then((response) => {
            response.json().then((res) => {
              console.log(res);
              router.push("events");
            })
          })
        } else if (title.trim() == "" && description.trim() == "") {
          alert("Please provide a non-empty title and description.")
        }
      }
      async function deleteHandler(e: React.ChangeEvent<any>) {
        e.preventDefault()
        fetch("http://localhost:8080/api/users/{id}", {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        }).then((response) => {
        response.json().then((res) => {
            router.push("events");
        })
        })  
      }

    return (
      <div>
        <Head>
          <title>Edit Event</title>
          <meta name="description" content="Edit event selected" />
          <link rel="icon" href="/gtLogo.png" />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto Slab' />
        </Head>
        <main>
          <NavBar />
          <div className="container">
          <div className={styles.eventsContainer}>
              <div className={styles.contentBox}>
                <div className={styles.editBox}>
                  <img className={styles.eventImage} src="/moonfest.png"></img>
                  <div className={styles.eventDetails}>
                     <p className = {styles.text}>Account Login</p>
                    <p className={styles.name}>Username/Email:</p>
                    <input className={styles.input} size={38} required={true} onChange={e => setUsername(e.target.value)}></input>
                    <p className={styles.name}>Password:</p>
                    <input type='password' className={styles.input} size={38} required={true} onChange={e => setPassword(e.target.value)}></input>
                  </div>
                </div>
              </div>
              <hr
                style={{

                    color: 'black',
                    background: 'black',
                    height: '5px',
                    width: '80%',
                }}
                />
              <div className={styles.contentBox}>
                <div className={styles.editBox}>
                <form>
                    <p className={styles.description}>Event Description:</p>
                    <textarea className={styles.inputDescription} required={true} onChange={e => SetDescrition(e.target.value)}></textarea>
                </form>
                </div>
              </div>
            </div>
            <button type="submit" className={styles.submitButton} onClick={submitHandler}>Save Changes</button>
            <button type="submit" className={styles.submitButton} onClick={deleteHandler}>Delete Event</button>
          </div>
        </main>
    </div>
  )
}
export default EditEvent