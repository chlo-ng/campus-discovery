import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from 'next/head'
import React, {useState} from 'react'
import NavBar from "../components/NavBar"
import styles from '../styles/NavBar.module.css'
import astyle from '../styles/config.module.css'
import { validEmail, validPassword } from './Regex.js';

const config: NextPage = () => {
    const router = useRouter()
    const [name, setname] = useState('')
    const [role, setrole] = useState('')
    async function submitHandler(e: React.ChangeEvent<any>) {
      e.preventDefault()
      if (role == "student" || role == "organizer" || role == "teacher") {
        verifyName(name)
      }
      else {
        alert("please select role")
      }
    }

    const verifyName = (e: string) => {
        if (e.trim() == "") {
          console.log(e)
          alert("invalid name")
        } else {
          setname(e);
        }
    }

    return (
      <div>
        <Head>
          <title>Campus Discovery</title>
          <meta name="description" content="create account" />
          <link rel="icon" href="/gtLogo.png" />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto Slab' />
        </Head>
        <main>
          <NavBar loggedIn={false}/>
          <div className={styles.logo}>
            <div className={astyle.center}>
            <form onSubmit={submitHandler}>
              <label>
              <p className = {astyle.text}>Create an Account</p>
              <p>Select Role:</p>
              <div>
              <button className= {astyle.buttons} onClick={e => setrole("student")}>student</button>
              <button className= {astyle.buttons} onClick={e => setrole("organizer")}>organizer</button>
              <button className= {astyle.buttons} onClick={e => setrole("teacher")}>teacher</button>
              </div>
              <p>{name} <br></br> {role}</p>
                  <p className={astyle.name}>Name:</p>
                  <input className= {astyle.input} type="text" required= {true} name="name" onChange={e => setname(e.target.value)}/>
                  <p className={astyle.name}>Email:</p>
                  <input className= {astyle.input} required= {true}></input>
                  <p className={astyle.name}>Password:</p>
                  <input className= {astyle.input} required= {true}></input>
                  <p className={astyle.name}>Confirm Password:</p>
                  <input className= {astyle.input} required= {true}></input>
              </label>
              <input type="submit" value="Sign Up" className= {astyle.button}/>
            </form>
            
            
            </div>
          </div>
        </main>
      </div>
    )
}
export default config