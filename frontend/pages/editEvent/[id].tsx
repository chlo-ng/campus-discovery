import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from 'next/head'
import React, {useState} from 'react'
import NavBar from "../../components/NavBar"
import styles from '../../styles/EditEvents.module.css'

const EditEvent: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [location, setLocation] = useState('')
    const [image, setImage] = useState('')

    fetch("http://localhost:8080/api/events/" + id).then((response) => {
      response.json().then((res) => {
        setTitle(res["title"])
        setDate(res["date"])
        setTime(res["startTime"])
        setDescription(res["description"])
        setLocation(res["location"])
        setImage(res["image"])
        //Should populate fields with id contents initially. 
      })
    });
    async function submitHandler(e: React.ChangeEvent<any>) {
        e.preventDefault()
        if (title.trim() !== "" && date.trim() !== "" && time.trim()!=""&& description.trim() != "" && location.trim() != "") {
          //Error might be due to id's not existing for each event. 
          if (confirm('Are you sure you want to update this event?')){
            var data: any = {
              title: title,
              description: description,
              date: date,
              time: time + ":00",
              location: location,
              image: image
            }
            console.log(data);
            fetch("http://localhost:8080/api/events/" + id, {
              //Will fail to fetch at the moment due to id's not existing for each event.
              method: "PUT",
              headers: { 
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }).then((response) => {
              response.json().then((res) => {
                console.log('Task complete');
                console.log(res);
                router.push("../events");
              })
            })
          } else {
            console.log('Update event cancelled');
          }
        } else{
          alert("Please complete all fields.")
        }
        
      }
      async function deleteHandler(e: React.ChangeEvent<any>) {
        e.preventDefault()
        if (confirm('Are you sure you want to delete this event?')){
          fetch("http://localhost:8080/api/" + id, {
            //Will fail to fetch due to id again. Cancel button works though.
          method: "DELETE",
          headers: { 
              "Content-Type": "application/json",
          },
          }).then((response) => {
          response.json().then((res) => {
              router.push("../events");
          })
          })  
        } 

      }
      
      async function returnHandler(e: React.ChangeEvent<any>) {
        router.push("../events"); 
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
          <div className={styles.editEventsContainer}>
              <div className={styles.contentBox} style={{borderBottom: "1px solid black"}}>
                <div className={styles.editBox}>
                  {/* <div className="image-upload">
                    <label for="myInput">
                      <img className={styles.eventImage} src="/moonfest.png" ></img>
                    </label>
                    <br></br>
                    <input id="myInput" type = "image" onChange={(e)=>{setImage(e.target.files[0])}} type="file"/>
                  </div> */}
                  <img className={styles.eventImage} src={image} />
                  <div className={styles.editBox}>
                          {/* <p className={styles.header}>Event:</p>
                          <p className={styles.name}>Date:</p>
                          <p className={styles.name}>Time:</p>
                          <p className={styles.name}>Location:</p> */}

                    <div className={styles.eventDetails}>
                        <label className={styles.name}>Event Name:
                        </label>
                        <label className={styles.name}>Date:  
                        </label>
                        <label className={styles.name}>Time:  
                        </label>
                        <label className={styles.name}>Location:  
                        </label>
                    </div>

                    <form className={styles.eventForm}>
                      <input className={styles.input} defaultValue={title} size={19} required={true} onChange={e => setTitle(e.target.value)}></input>
                      <input className={styles.input} defaultValue={date} size={64} required={true} onChange={e => setDate(e.target.value)} type = "date"></input>
                      <input className={styles.input} defaultValue={time} size={64} required={true} onChange={e => setTime(e.target.value)} type = "time"></input>
                      <input className={styles.input}  defaultValue={location} size={64} required={true} onChange={e => setLocation(e.target.value)}></input>
                    </form>

                  </div>
                    {/* Just in case we want it later */}
                    {/* <div className={styles.iconBar}>
                        <img className={styles.editUpperIcon} src="/editV2.png"/>
                        <img className={styles.editMiddleIcon} src="/calendarIcon.png"/>
                        <img className={styles.editIcon} src="/clockIcon.png"/>
                        <img className={styles.editIcon} src="/locationIcon.png"/>
                    </div> */}
                  </div>
              </div>
              <div className={styles.contentBox}>
                <div className={styles.editBox}>
                <form>
                    <label className={styles.name}>Event Description:</label>
                    <textarea className={styles.inputDescription} defaultValue = {description} required={true} onChange={e => setDescription(e.target.value)}></textarea>
                </form>
                </div>
                  <button type="submit" className={styles.submitButton} onClick={submitHandler}>Save Changes</button>
                  <button type="submit" className={styles.submitButton} onClick={deleteHandler}>Delete Event</button>
                  <button type="submit" className={styles.submitButton} onClick={returnHandler}>Back</button>
              </div>

            </div>
          </div>
        </main>
    </div>
  )
}
export default EditEvent