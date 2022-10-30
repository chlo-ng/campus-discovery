import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from 'next/head'
import React, {useState} from 'react'
import NavBar from "../components/NavBar"
import styles from '../styles/EditEvents.module.css'

const EditEvent: NextPage = () => {
    const router = useRouter()
    const [title, setTitle] = useState("http://localhost:8080/api/users/")
    const [description, SetDescrition] = useState('')

    async function submitHandler(e: React.ChangeEvent<any>) {
        e.preventDefault()
        if (title.trim() !== "" && description.trim() !== "") {
          var data: any = {
            title: title,
            description: description
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
            <div className={styles.editeventsContainer}>
              <p className={styles.header}>Trending this week</p>
              <div className={styles.trending}>
                <div className={styles.verticalCenter}>
                  <img className={styles.triangleButton} src="/triangle.png"/>
                </div>
                <div className={styles.trendingBox}>
                  <img className={styles.eventImage} src="/moonfest.png"></img>
                  <div className={styles.eventDetails}>
                    <p className={styles.eventTitle}>GT VSA's Moon Fest</p>
                    <p className={styles.eventText}>Thursday, October 13th, 2022</p>
                    <p className={styles.eventText}>6:00 - 9:00PM</p>
                    <p className={styles.eventText}>Tech Green</p>
                  </div>
                  <div className={styles.upperRight}>
                    <img className={styles.editButton} 
                    src="/editV2.png" onClick={() => {
                    router.push("editevent")
                    }}/>
                  </div>
                </div>
                <div className={styles.verticalCenter}>
                  <img className={`${styles.triangleButton} ${styles.triangleButtonRotate}`} src="/triangle.png"/>
                </div>
              </div>
            </div>
            <button type="submit" className={styles.submitButton} onClick={submitHandler}>Sign In</button>
          </div>
        </main>
    </div>
  )
}
export default EditEvent