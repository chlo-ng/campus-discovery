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
    const [capacity, setCapacity] = useState('')
    const [inviteOnly, setInviteOnly] = useState(false)
    const [image, setImage] = useState('')

    if (title == '') {
      fetch("http://localhost:8080/api/events/" + id).then((response) => {
        response.json().then((res) => {
          if (res.id) {
            setTitle(res["title"])
            setDate(res["date"])
            setTime(res["startTime"])
            setDescription(res["description"])
            setCapacity(res["capacity"])
            setInviteOnly(Boolean(res["inviteOnly"]))
            setLocation(res["location"])
            setImage(res["image"])
          }
          //Should populate fields with id contents initially. 
        })
      });
    }
    
    // async function submitHandler(e: React.ChangeEvent<any>) {
    //     e.preventDefault()
    //     if (title.trim() !== "" && date.trim() !== "" && time.trim()!=""&& description.trim() != "" && location.trim() != "") {
    //       //Error might be due to id's not existing for each event. 
    //       if (confirm('Are you sure you want to update this event?')){
    //         var data: any = {
    //           title: title,
    //           description: description,
    //           date: date,
    //           time: time + ":00",
    //           location: location,
    //           image: image
    //         }
    //         console.log(data);
    //         fetch("http://localhost:8080/api/events/" + id, {
    //           //Will fail to fetch at the moment due to id's not existing for each event.
    //           method: "PUT",
    //           headers: { 
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify(data),
    //         }).then((response) => {
    //           response.json().then((res) => {
    //             console.log('Task complete');
    //             console.log(res);
    //             router.push("../events");
    //           })
    //         })
    //       } else {
    //         console.log('Update event cancelled');
    //       }
    //     } else{
    //       alert("Please complete all fields.")
    //     }
    //   }
      async function submitHandler(e: React.ChangeEvent<any>) {
        e.preventDefault()

        const userID = localStorage.getItem("id")

        var event: any = {
            title: title,
            date: date,
            startTime: time.split(":").length == 3 ? time : time + ":00",
            description: description,
            location: location,
            capacity: capacity,
            image: image,
            inviteOnly: inviteOnly
        }

        var dateElement = document.getElementById("date")
        var timeElement = document.getElementById("time")
        var imageElement = document.getElementById("image")

        if (title.trim() === "") {
            alert("Please enter a title")
        } else if (!dateElement.checkValidity()) {
            alert("Please enter a date")
        } else if (!timeElement.checkValidity()) {
            alert("Please enter a time")
        } else if (location.trim() === "") {
            alert("Please enter a location")
        } else if (capacity == "" ) {
            alert("Please enter a valid capacity")
        } else if (!imageElement.checkValidity()) {
          alert("Please enter a valid image link")
      } else  {
            fetch("http://localhost:8080/api/events/" + id +"/" + userID, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
            }).then(res => {
              if (res.ok) {
                alert("Event updated successfully");
                router.push("../events"); 
              } else {
                alert("Error when updating please try again.");
              }
            });
        }
    }
      async function deleteHandler(e: React.ChangeEvent<any>) {
        e.preventDefault()
        if (confirm('Are you sure you want to delete this event?')){
          fetch("http://localhost:8080/api/events/" + id, {
          method: "DELETE",
          headers: { 
              "Content-Type": "application/json",
          },
          }).then(res => {
            if (res.ok) {
              router.push("../events"); 
            } else {
              alert("Error when deleting please try again.");
            }
          });
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
                  <img className={styles.eventImage} src={image} />
                  <div className={styles.editBox}>

                    <div className={styles.eventDetails}>
                        <label className={styles.name}>Event Name:
                        </label>
                        <label className={styles.name}>Date:  
                        </label>
                        <label className={styles.name}>Time:  
                        </label>
                        <label className={styles.name}>Location:  
                        </label>
                        <label className={styles.name}>Capacity:  
                        </label>
                        <label className={styles.name}>Image:  
                        </label>
                        <label className={styles.name}>Invite Only:  
                        </label>
                    </div>

                    <form className={styles.eventForm}>
                      <input className={styles.input} defaultValue={title} size={19} required={true} onChange={e => setTitle(e.target.value)}/>
                      <input className={styles.dateandTimeInput}  id = "date"  type = "date" defaultValue={date} size={64} required={true} onChange={e => setDate(e.target.value)}></input>
                      <input className={styles.dateandTimeInput} id = "time" defaultValue={time} size={64} type = "time" required={true} onChange={e => setTime(e.target.value)}></input>
                      <input className={styles.input}  defaultValue={location} size={64} required={true} onChange={e => setLocation(e.target.value)}/>
                      <input className={styles.input}  id="capacity" type = "number" defaultValue={capacity} size={64}  required={true} onChange={e => setCapacity(e.target.value)}/>
                      <input className={styles.input}  id="image" defaultValue={image} size={64} type = "url" required={true} onChange={e => setImage(e.target.value)}/>
                      {title != '' && <input className={styles.inviteCheckbox}  id="inviteOnly" defaultChecked={inviteOnly} type = "checkbox" required={true} onChange={e => setInviteOnly(!inviteOnly)}/>}

                    </form>

                  </div>
                  </div>
              </div>
              <div className={styles.contentBox}>
                <div className={styles.editBox}>
                  <form>
                      <label className={styles.name}>Event Description:</label>
                      <textarea className={styles.inputDescription} defaultValue = {description} required={true} onChange={e => setDescription(e.target.value)}></textarea>
                  </form>
                </div>
                <div>
                  <button type="submit" className={styles.submitButton} onClick={submitHandler}>Save Changes</button>
                  <button type="submit" className={styles.submitButton} onClick={deleteHandler}>Delete Event</button>
                  <button type="submit" className={styles.submitButton} onClick={returnHandler}>Back</button>
                </div>
              </div>

            </div>
          </div>
        </main>
    </div>
  )
}
export default EditEvent