import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from 'next/head'
import React, {useState} from 'react'
import NavBar from "../components/NavBar"
import styles from '../styles/config.module.css'
import { validEmail, validPassword } from './Regex.js';

const config: NextPage = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    
    async function submitHandler(e: React.ChangeEvent<any>) {
      e.preventDefault()
      if (["student", "alumni", "teacher"].includes(role) && name.trim() !== "") {
        router.push("events")
      } else if (!["student", "alumni", "teacher"].includes(role)) {
        alert("Please select a role.")
      } else {
        alert("Please use a valid name.")
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
          <div className={`${styles.container} container`}>
            <div className={styles.center}>
              <form>
                <p className = {styles.text}>Create an Account</p>
                <p className = {styles.atext}>Select Role:</p>
                
                <button type="button" className={role === 'student' ? `${styles.roleButtons} ${styles.selected}` : styles.roleButtons} onClick={e => setRole("student")}>Student</button>
                <button type="button" className={role === 'alumni' ? `${styles.roleButtons} ${styles.selected}` : styles.roleButtons} onClick={e => setRole("alumni")}>Alumini</button>
                <button type="button" className={role === 'teacher' ? `${styles.roleButtons} ${styles.selected}` : styles.roleButtons} onClick={e => setRole("teacher")}>Teacher</button>
            
                <p className={styles.name}>Name:</p>
                <input className={styles.input} size={38} type="text" required= {true} name="name" onChange={e => setName(e.target.value)}/>
                <p className={styles.name}>Email:</p>
                <input className={styles.input} size={38} required={true}></input>
                <p className={styles.name}>Password:</p>
                <input className={styles.input} size={38} required={true}></input>
                <p className={styles.name}>Confirm Password:</p>
                <input className={styles.input} size={38} required={true}></input>
                <button type="submit" className={styles.submitButton} onClick={submitHandler}>Sign Up</button>
              </form>
            </div>
          </div>
        </main>
      </div>
    )
}
export default config