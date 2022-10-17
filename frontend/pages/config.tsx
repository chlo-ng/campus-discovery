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
    const [verified, setVerified] = useState('')
    
    async function nameHandler(e: React.ChangeEvent<any>) {
      e.preventDefault()
      if (role == "student" || role == "alumini" || role == "teacher") {
        verifyName(name)
        submitHandler(e)
        if (verified == 'true'){
          router.push("events")
        }
      } 
      else {
        alert("please select role")
      }
    }

    async function submitHandler(e: React.ChangeEvent<any>) {
      if (role == "student" || role == "alumini" || role == "teacher") {
        setVerified('true')
      } 
      else {
        setVerified('false');
        alert("please select role")
      }
    }

    const verifyName = (e: string) => {
        if (e.trim() == "") {
          console.log(e)
          alert("invalid name")
        } else {
          setName(e);
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
              <label>
              <p className = {styles.text}>Create an Account</p>
              <p className = {styles.atext}>Select Role:</p>
              
                <button className={role === 'student' ? `${styles.roleButtons} ${styles.selected}` : styles.roleButtons} onClick={e => setRole("student")}>Student</button>
                <button className={role === 'alumni' ? `${styles.roleButtons} ${styles.selected}` : styles.roleButtons} onClick={e => setRole("alumni")}>Alumini</button>
                <button className={role === 'teacher' ? `${styles.roleButtons} ${styles.selected}` : styles.roleButtons} onClick={e => setRole("teacher")}>Teacher</button>
             
                  <p className={styles.name}>Name:</p>
                  <input className= {styles.input} size = {38} type="text" required= {true} name="name" onChange={e => setName(e.target.value)}/>
                  <p className={styles.name}>Email:</p>
                  <input className= {styles.input} size = {38} required= {true}></input>
                  <p className={styles.name}>Password:</p>
                  <input className= {styles.input} size = {38} required= {true}></input>
                  <p className={styles.name}>Confirm Password:</p>
                  <input className= {styles.input} size = {38} required= {true}></input>
              </label>
              <input type="submit" value="Sign Up" className= {styles.submitButton} onClick = {nameHandler}/>
            </form>
            
            </div>
          </div>
        </main>
      </div>
    )
}
export default config