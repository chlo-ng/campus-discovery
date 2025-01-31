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
    const [reload, setReload] = useState(true)
    const [event, setEvent] = useState()
    const [name, setName] = useState('')
    const [capacity, setCapacity] = useState(0)
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
    const [rsvpList, setRSVPList] = useState([]);
    const [activeTab, setActiveTab] = useState("attending");
    const [pageNumber, setPageNumber] = useState(0);
    const [invites, setInvites] = useState([])
    const [invited, setInvited] = useState(false)
    const [invitePopup, setInvitePopup] = useState(false)
    const [invitedUser, setInvitedUser] = useState('')

    if (typeof localStorage !== 'undefined') {
      var isAdmin = localStorage.getItem("role") === "TEACHER"
      var userID = localStorage.getItem("id")
    }
    
    if (reload) {
      fetch("http://localhost:8080/api/events/" + id).then((response) => {
        response.json().then((res) => {
          if (res.id) {
            setEvent(res)
            setCapacity(res["capacity"])
            setName(res["title"])
            var tempDate = new Date(res["date"])
            tempDate.setMinutes(tempDate.getMinutes() + tempDate.getTimezoneOffset())
            setDate(tempDate)
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
            setRSVPList(res["rsvped"])
            const rsvpIds = res.rsvped.map((item: any) => {return item.pk.userId})
            setInvites(res["invites"].filter((invite: any) => {return !rsvpIds.includes(invite.id)}))
            setInvited(res["invites"].map((invite: any) => {return invite.id.toString()}).includes(userID))
            setReload(false)
            setPageNumber(0)
          }
        })
      });
    }

    async function popupSubmitHandler(e: React.ChangeEvent<any>) {
      e.preventDefault()
      if (rsvp !== '') {
        if (rsvp === "YES" && (rsvpList && rsvpList.filter((item) => {return item?.rsvp == "YES"}).length >= capacity)) {
          alert("Event is at full capacity.")
        } else {
          if (hasRsvp) {
            fetch("http://localhost:8080/api/rsvp/" + id + "/" + userID + "/" + rsvp, {
              method: "PUT"}).then(res => {
                setHasRsvp(true)
                setPopup(false)
                setReload(true)
            });
          } else {
            fetch("http://localhost:8080/api/rsvp/" + id + "/" + userID + "/" + rsvp, {
              method: "POST"}).then(res => {
                setHasRsvp(true)
                setPopup(false)
                setReload(true)
            });
          }
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
            setReload(true)
          } else {
            alert("Error when deleting please try again.");
          }
      });
    }

    async function deleteInvite(rsvpUser: Number) {
      fetch("http://localhost:8080/api/events/" + id + "/" + rsvpUser, {
        method: "DELETE"}).then(res => {
          if (res.ok) {
            alert("Invite deleted.")
            setReload(true)
          } else {
            alert("Error when deleting please try again.");
          }
      });
    }

    async function inviteSubmitHandler(e: React.ChangeEvent<any>) {
      e.preventDefault()
      if (invitedUser !== '') {
        fetch("http://localhost:8080/api/users/username/" + invitedUser, {
          method: "GET"}).then(res => {
            if (res.ok) {
              res.json().then(user => {
                fetch("http://localhost:8080/api/events/" + id + "/" + user.id, {
                  method: "POST"}).then(res => {
                    setInvitedUser('')
                    setInvitePopup(false)
                    setReload(true)
                });
              })
            } else {
              alert("This user does not exist.")
            }
        });
      } else {
        alert("Please type in a username.")
      }
    }

    function removeUser(rsvpUser: Number) {

      if (confirm('Are you sure you want to remove this user?')) {
        fetch("http://localhost:8080/api/rsvp/" + id + "/" + rsvpUser, {

        //Will fail to fetch due to id again. 
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json",
        },
        }).then(res => {
          if (res.ok) {
            setReload(true)
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
                  <p className={styles.text}>{location.split(",")[0]}</p>
                </div>
                <div>
                  {(!inviteOnly || invited) && <img className= {styles.icon} src="../bookmark.png" onClick={e => setPopup(true)}></img>}
                  {event && (isAdmin || (userID == event.creator?.id)) &&
                    <img className={styles.icon} src={"/editButton.png"} onClick={e => router.push("/editEvent/" + id)} />
                  }
                </div>
            </div>
            <div className={styles.bottombox}>
                <p className={styles.info}>Event Description:<br></br></p>
                <p className={styles.subtext}>{describe}</p>
                
                <div className={styles.capacityRow}>
                  <p className={`${styles.info} ${styles.capacityText}`}>Capacity:&nbsp;
                  {rsvpList && rsvpList.filter((item) => {
                    return item?.rsvp == "YES"
                  }).length }
                  / 
                  {capacity}
                  </p>
                  {event && inviteOnly && (isAdmin || (userID == event.creator?.id)) &&
                    <button className={`${styles.popupButton} ${styles.inviteButton}`} onClick={e => setInvitePopup(true)}>Invite</button>
                  }
                </div>
                
                <div className={styles.tab}>
                    <button className={activeTab === "attending" ? ` ${styles.tablinks} ${styles.activeButton}` : styles.tablinks} onClick={() => setActiveTab("attending")}
                      style={{width: inviteOnly ? '25%' : '33.3333%'}}> 
                      Attending </button>
                    <button className={activeTab === "not-attending" ? ` ${styles.tablinks} ${styles.activeButton}` : styles.tablinks} onClick={() => setActiveTab("not-attending")}
                      style={{width: inviteOnly ? '25%' : '33.3333%'}}> 
                      Not Attending </button>
                    <button className={activeTab === "undecided" ? ` ${styles.tablinks} ${styles.activeButton}` : styles.tablinks}onClick={() => setActiveTab("undecided")}
                      style={{width: inviteOnly ? '25%' : '33.3333%'}}> 
                      Undecided </button>

                    { event && (inviteOnly == true) &&
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
                            <img className={styles.removeButton} src={"/remove.png"} onClick={() => removeUser(item?.user?.id)}/>
                          }
                          </li>
                      );
                    })}
                  </ul>
                  
                  {/* <ul className={styles.paginationWrapper}> 
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
                  </ul>*/}

                </div>

                <div className={`${styles.tabcontent} ${activeTab === "not-attending" ? styles.activeTab : ''}`}>
                    <ul className={styles.attendeeList}>
                    {rsvpList && rsvpList.map((item) => {
                      return (
                        item?.rsvp == "NO" &&
                        <li className={styles.attendees}>
                          {item?.user?.username}
                          {(isAdmin || (userID == event.creator.id)) &&
                            <img className={styles.removeButton} src={"/remove.png"} onClick={() => removeUser(item?.user?.id)}/>
                          }
                        </li>
                      );
                    })}
                  </ul>
                  
                  {/* <ul className={styles.paginationWrapper}> 
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
                  </ul>*/}

                </div>

                <div className={`${styles.tabcontent} ${activeTab === "undecided" ? styles.activeTab : ''}`}>
                  <ul className={styles.attendeeList}>
                    {rsvpList && rsvpList.map((item) => {
                      return (
                        item?.rsvp == "MAYBE" && <li className={styles.attendees}>
                          {item?.user?.username}
                          {(isAdmin || (userID == event.creator.id)) &&
                            <img className={styles.removeButton} src={"/remove.png"} onClick={() => removeUser(item?.user?.id)}/>
                          }
                          </li>
                      );
                    })}
                  </ul>

                  {/* <ul className={styles.paginationWrapper}> 
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
                  </ul>*/}
                </div>

                { event && (inviteOnly == true) &&
                  <div className={`${styles.tabcontent} ${activeTab === "no-reply" ? styles.activeTab : ''}`}>
                    <ul className={styles.attendeeList}>
                      {invites.map((item: any) => {
                      return (
                        <li className={styles.attendees}>
                          {item.username}
                          {(isAdmin || (userID == event.creator.id)) &&
                            <img className={styles.removeButton} src={"/remove.png"} onClick={() => deleteInvite(item.id)}/>
                          }
                          </li>
                      );
                    })}
                    </ul>

                    {/* <ul className={styles.paginationWrapper}> 
                    {pageNumber > 0 &&
                      <a onClick={e => setPageNumber(pageNumber - 1)}> 
                        <img className={`${styles.backButton}`} src="/triangle.png"/>
                      </a>
                    }

                    {(pageNumber < Math.floor((invites.length - 1)/3)) && 
                      <a onClick={e => setPageNumber(pageNumber + 1)}>
                        <img className={`${styles.nextButton} ${styles.triangleButtonRotate}`} src="/triangle.png"/>
                      </a>
                    }
                    </ul>*/}
                  </div>
                }

            </div>
            {popup && <div className={styles.popup}>
              <div className={styles.popupForm}>
                <img className={styles.popupExitIcon} 
                  src="/cross.png"
                  onClick={() => {
                    setPopup(false)
                  }}/>
                <div className={styles.popupContainer}>
                  <p className={styles.info}>Please select your RSVP.</p>
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

            {invitePopup && <div className={styles.popup}>
              <div className={styles.popupForm}>
                <img className={styles.popupExitIcon} 
                  src="/cross.png"
                  onClick={() => {
                    setInvitePopup(false)
                  }}/>
                <div className={styles.popupContainer}>
                  <p className={styles.info}>Please type the username of the user you wish to invite.</p>
                  <input className={styles.inviteInput} onChange={e => setInvitedUser(e.target.value)}></input>
                  <div className={styles.popupSubmitButtons}>
                    <button className={`${styles.popupSubmitButton} ${styles.popupButton}`} onClick={inviteSubmitHandler}>SUBMIT</button>
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