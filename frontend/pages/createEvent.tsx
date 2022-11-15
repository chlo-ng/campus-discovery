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
    const [inviteOnly, setInviteOnly] = useState(false)
    const [capacity, setCapacity] = useState('')



    async function submitHandler(e: React.ChangeEvent<any>) {
        e.preventDefault()

        const id = localStorage.getItem("id")

        var event: any = {
            title: name,
            date: date,
            startTime: time + ":00",
            description: description,
            location: location,
            image: image,
            capacity: capacity,
            inviteOnly: inviteOnly
        }

        var dateElement = document.getElementById("date")
        var timeElement = document.getElementById("time")
        var imageElement = document.getElementById("image")
        var nameError = document.getElementById("nameError")
        var dateError = document.getElementById("dateError")
        var timeError = document.getElementById("timeError")
        var locationError = document.getElementById("locationError")
        var capacityError = document.getElementById("capacityError")
        var imageError = document.getElementById("imageError")

        var validInput = true

        if (name.trim() === "" && nameError) {
            nameError.innerHTML = "Please add the name of your event."
            validInput = false
        } else if (nameError) {
            nameError.innerHTML = ""
        }

        if (dateElement && !dateElement.checkValidity() && dateError) {
            dateError.innerHTML = "Please input a valid date."
            validInput = false
        } else if (dateError) {
            dateError.innerHTML = ""
        }

        if (timeElement && !timeElement.checkValidity() && timeError) {
            timeError.innerHTML = "Please input a valid time."
            validInput = false
        } else if (timeError) {
            timeError.innerHTML = ""
        }

        if (location.trim() === "" && locationError) {
            locationError.innerHTML = "Please add the location of your event."
            validInput = false
        } else if (locationError) {
            locationError.innerHTML = ""
        }

        if (capacity == "" && capacityError) {
            capacityError.innerHTML = "Please add the capacity of your event."
            validInput = false
        } else if (capacityError) {
            capacityError.innerHTML = ""
        }
        
        if (imageElement && !imageElement.checkValidity() && imageError) {
            imageError.innerHTML = "Please input a valid image url."
            validInput = false
        } else if (imageError) {
            imageError.innerHTML = ""
        }

        if (validInput) {
            fetch("http://localhost:8080/api/events/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
            }).then((response) => {
            response.json().then((res) => {
                router.push("/events")
            }).catch(err => alert(console.log(err)))
            })
        }
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
                <div className={styles.inputContainer}>
                  <input className={styles.input} required={true} onChange={e => setName(e.target.value)} />
                  <p className={styles.inputError} id="nameError"></p>
                </div>
              </div>
              <div className={styles.question}>
                <p className={styles.label}>Date:</p>
                <div className={styles.inputContainer}>
                  <input className={styles.input} id="date" type="date" required={true} onChange={e => setDate(e.target.value)} />
                  <p className={styles.inputError} id="dateError"></p>
                </div>
              </div>
              <div className={styles.question}>
                <p className={styles.label}>Time:</p>
                <div className={styles.inputContainer}>
                  <input className={styles.input} id="time" type="time" min="00:00" max="23:59" required={true} onChange={e => setTime(e.target.value)} />
                  <p className={styles.inputError} id="timeError"></p>
                </div>
              </div>
              <div className={styles.question}>
                <p className={styles.label}>Location:</p>
                <div className={styles.inputContainer}>
                  <input className={styles.input} required={true} onChange={e => setLocation(e.target.value)} />
                  <p className={styles.inputError} id="locationError"></p>
                </div>
              </div>
              <div className={styles.question}>
                <p className={styles.label}>Image:</p>
                <div className={styles.inputContainer}>
                  <input className={styles.input} id="image" type="url" required={true} onChange={e => setImage(e.target.value)} />
                  <p className={styles.inputError} id="imageError"></p>
                </div>
              </div>
              <div className={styles.question}>
                <p className={styles.label}>Capacity:</p>
                <div className={styles.inputContainer}>
                  <input className={styles.input} type="number" required={true} onChange={e => setCapacity(e.target.value)} />
                  <p className={styles.inputError} id="capacityError"></p>
                </div>
              </div>
              <div className={styles.question}>
                <p className={styles.label}>Description:</p>
                <textarea className={styles.description} required={true} onChange={e => setDescription(e.target.value)} />
              </div>
              <div className={styles.question}>
                <p className={styles.label}>Invite Only:</p>
                <div className={styles.inputContainer}>
                <input className={styles.inviteCheckbox}  id="inviteOnly" type="checkbox" required={true} onChange={e => setInviteOnly(!inviteOnly)}/>
                </div>
              </div>
              <button className={styles.submitButton} type="submit" onClick={submitHandler}>Submit</button>
            </form>
          </div>
        </main>
      </div>
    )
}
export default CreateEvent