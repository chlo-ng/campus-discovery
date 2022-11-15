import type { NextPage } from "next"
import React, {useState} from 'react'
import { useEffect } from "react"
import { useRouter } from "next/router"
import Head from 'next/head'
import NavBar from "../../components/NavBar"
import styles from '../../styles/Events.module.css'
import { NavItem } from "react-bootstrap"

const Post: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const [event, setEvent] = useState()
    const [name, setName] = useState('')
    const [capacity, setCapacity] = useState(0)
    var [date, setDate] = useState(new Date())
    const [time, setTime] = useState(['00', '00'])
    const [location, setLocation] = useState('')
    const [describe, setDescribe] = useState('')
    const [image, setImage] = useState('')
    const [invite, setInvite] = useState(Boolean)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const [rsvpList, setRSVPList] = useState([]);
    const [inviteList, setInviteList] = useState([]);
    const [activeTab, setActiveTab] = useState("attending");
    const [rsvpUser, setrsvpUser] = useState('')
    const [pageNumber, setPageNumber] = useState(0);

    if (typeof localStorage !== 'undefined') {
      var isAdmin = localStorage.getItem("role") === "TEACHER"
      var userID = localStorage.getItem("id")
    }
    
    if (time[2] == undefined) {
      fetch("http://localhost:8080/api/events/" + id).then((response) => {
        response.json().then((res) => {
          console.log(res)
          setEvent(res)
          setCapacity(res["capacity"])
          setName(res["title"])
          setDate(new Date(res["date"]))
          setTime(res["startTime"] ? res["startTime"].split(":") : ['00', '00'])
          setDescribe(res["description"])
          setLocation(res["location"])
          setImage(res["image"])
          setInvite(res["inviteOnly"])
          setRSVPList(res["rsvped"])
          setInviteList(res["invites"])
          setPageNumber(0)
        })
      });
    }

    async function bookmarkHandler(e:React.ChangeEvent<any>) {
        router.push('../config')
    }

    function deleteHandler(rsvpUser: Number) {

      if (confirm('Are you sure you want to remove this user?')) {
        fetch("http://localhost:8080/api/rsvp/" + id + "/" + rsvpUser, {

        //Will fail to fetch due to id again. 
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json",
        },
        }).then(res => {
          if (res.ok) {
            router.reload(); 
          } else {
            alert("Error when deleting please try again.");
          }
        });
      } 
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
                  <img className= {styles.icon} src="../bookmark.png" onClick={bookmarkHandler}></img>
                  {event && (isAdmin || (userID == event.creator?.id)) &&
                    <img className={styles.icon} src={"/editButton.png"} onClick={e => router.push("/editEvent/" + id)} />
                  }
                </div>
            </div>
            <div className={styles.bottombox}>
                <p className={styles.info}>Event Description:<br></br></p>
                <p className={styles.subtext}>{describe}</p>
                
                
                <p className={styles.info}> Capacity: 
                { rsvpList && rsvpList.filter((item) => {
                  return item?.rsvp == "YES"
                }).length }
                 / 
                {capacity}
                </p>
                
                
                <div className={styles.tab}>
                    <button className={activeTab === "attending" ? ` ${styles.tablinks} ${styles.activeButton}` : styles.tablinks} onClick={() => setActiveTab("attending")}> 
                      Attending </button>
                    <button className={activeTab === "not-attending" ? ` ${styles.tablinks} ${styles.activeButton}` : styles.tablinks} onClick={() => setActiveTab("not-attending")}> 
                      Not Attending </button>
                    <button className={activeTab === "undecided" ? ` ${styles.tablinks} ${styles.activeButton}` : styles.tablinks}onClick={() => setActiveTab("undecided")}> 
                      Undecided </button>

                    { event && (invite == true) &&
                      <button className={activeTab === "no-reply" ? ` ${styles.tablinks} ${styles.activeButton}` : styles.tablinks}  onClick={() => setActiveTab("no-reply")}> 
                        No Reply </button>
                    }
                </div>

                <div className={`${styles.tabcontent} ${activeTab === "attending" ? styles.activeTab : ''}`}>
                  <ul className={styles.attendeeList}>
                    {rsvpList && rsvpList.slice(pageNumber * 3, pageNumber*3 + 3)?.map((item) => {
                      return (
                        item?.rsvp == "YES" && 
                        <li className={styles.attendees}>
                          {item?.user?.username}
                          {(isAdmin || (userID == event.creator.id)) &&
                            <img className={styles.removeButton} src={"/remove.png"} onClick={() => deleteHandler(item?.user?.id)}/>
                          }
                          </li>
                      );
                    })}
                  </ul>
                  
                  <ul className={styles.paginationWrapper}> 
                    {pageNumber > 0 &&
                      <a onClick={e => setPageNumber(pageNumber - 1)}> 
                        <img className={`${styles.backButton}`} src="/triangle.png"/>
                      </a>
                    }

                    {(pageNumber < Math.floor((rsvpList && rsvpList.filter((item) => {
                        return item?.rsvp == "YES"
                      }).length - 1)/3)) && 
                      <a onClick={e => setPageNumber(pageNumber + 1)}>
                        <img className={`${styles.nextButton} ${styles.triangleButtonRotate}`} src="/triangle.png"/>
                      </a>
                    }
                  </ul>   

                </div>

                <div className={`${styles.tabcontent} ${activeTab === "not-attending" ? styles.activeTab : ''}`}>
                    <ul className={styles.attendeeList}>
                    {rsvpList && rsvpList.map((item) => {
                      return (
                        item?.rsvp == "NO" && !invite &&
                        <li className={styles.attendees}>
                          {item?.user?.username}
                          <img className={styles.removeButton} src={"/remove.png"} onClick={() => deleteHandler(item?.user?.id)}/>
                        </li>
                      );
                    })}
                  </ul>
                  
                  <ul className={styles.paginationWrapper}> 
                    {pageNumber > 0 &&
                      <a onClick={e => setPageNumber(pageNumber - 1)}> 
                        <img className={`${styles.backButton}`} src="/triangle.png"/>
                      </a>
                    }

                    {(pageNumber < Math.floor((rsvpList && rsvpList.filter((item) => {
                        return item?.rsvp == "NO" && !invite
                      }).length - 1)/3)) && 
                      <a onClick={e => setPageNumber(pageNumber + 1)}>
                        <img className={`${styles.nextButton} ${styles.triangleButtonRotate}`} src="/triangle.png"/>
                      </a>
                    }
                  </ul>   

                </div>

                <div className={`${styles.tabcontent} ${activeTab === "undecided" ? styles.activeTab : ''}`}>
                  <ul className={styles.attendeeList}>
                    {rsvpList && rsvpList.map((item) => {
                      return (
                        item?.rsvp == "MAYBE" && <li className={styles.attendees}>
                          {item?.user?.username}
                          <img className={styles.removeButton} src={"/remove.png"} onClick={() => deleteHandler(item?.user?.id)}/>
                          </li>
                      );
                    })}
                  </ul>

                  <ul className={styles.paginationWrapper}> 
                    {pageNumber > 0 &&
                      <a onClick={e => setPageNumber(pageNumber - 1)}> 
                        <img className={`${styles.backButton}`} src="/triangle.png"/>
                      </a>
                    }

                    {(pageNumber < Math.floor((rsvpList && rsvpList.filter((item) => {
                        return item?.rsvp == "MAYBE"
                      }).length - 1)/3)) && 
                      <a onClick={e => setPageNumber(pageNumber + 1)}>
                        <img className={`${styles.nextButton} ${styles.triangleButtonRotate}`} src="/triangle.png"/>
                      </a>
                    }
                  </ul>   
                </div>

                { event && (invite == true) &&
                  <div className={`${styles.tabcontent} ${activeTab === "no-reply" ? styles.activeTab : ''}`}>
                    <ul className={styles.attendeeList}>
                      {rsvpList && rsvpList.map((item) => {
                      return (
                        item?.rsvp == "NO" && <li className={styles.attendees}>
                          {item?.user?.username}
                          <img className={styles.removeButton} src={"/remove.png"} onClick={() => deleteHandler(item?.user?.id)}/>
                          </li>
                      );
                    })}
                    </ul>

                    <ul className={styles.paginationWrapper}> 
                    {pageNumber > 0 &&
                      <a onClick={e => setPageNumber(pageNumber - 1)}> 
                        <img className={`${styles.backButton}`} src="/triangle.png"/>
                      </a>
                    }

                    {(pageNumber < Math.floor((rsvpList && rsvpList.filter((item) => {
                        return item?.rsvp == "NO"
                      }).length - 1)/3)) && 
                      <a onClick={e => setPageNumber(pageNumber + 1)}>
                        <img className={`${styles.nextButton} ${styles.triangleButtonRotate}`} src="/triangle.png"/>
                      </a>
                    }
                  </ul>
                  </div>
                }

            </div>

          </div>
        </main>
    </div>
  )
}
export default Post