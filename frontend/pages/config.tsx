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
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('')
    
    async function submitHandler(e: React.ChangeEvent<any>) {
      e.preventDefault()
      if (["STUDENT", "ALUMNI", "TEACHER"].includes(role) && name.trim() !== "") {
        var data: any = {
          username: username,
          password: password,
          type: role
        }
        fetch("http://localhost:8080/api/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((response) => {
          response.json().then((res) => {
            localStorage.setItem("id", res["id"]);
            router.push("events");
          })
        });
      } else if (!["STUDENT", "ALUMNI", "TEACHER"].includes(role)) {
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
          <NavBar />
          <div className={`${styles.container} container`}>
            <div className={styles.center}>
              <form>
                <p className = {styles.text}>Create an Account</p>
                <p className = {styles.atext}>Select Role:</p>
                
                <button type="button" className={role === 'STUDENT' ? `${styles.roleButtons} ${styles.selected}` : styles.roleButtons} onClick={e => setRole("STUDENT")}>Student</button>
                <button type="button" className={role === 'ALUMNI' ? `${styles.roleButtons} ${styles.selected}` : styles.roleButtons} onClick={e => setRole("ALUMNI")}>Alumni</button>
                <button type="button" className={role === 'TEACHER' ? `${styles.roleButtons} ${styles.selected}` : styles.roleButtons} onClick={e => setRole("TEACHER")}>Teacher</button>
            
                <p className={styles.name}>Name:</p>
                <input className={styles.input} size={38} type="text" required={true} name="name" onChange={e => setName(e.target.value)}/>
                <p className={styles.name}>Email:</p>
                <input className={styles.input} size={38} required={true} onChange={e => setUsername(e.target.value)}></input>
                <p className={styles.name}>Password:</p>
                <input className={styles.input} size={38} required={true} onChange={e => setPassword(e.target.value)}></input>
                <p className={styles.name}>Confirm Password:</p>
                <input className={styles.input} size={38} required={true} onChange={e => setConfirmPassword(e.target.value)}></input>
                <button type="submit" className={styles.submitButton} onClick={submitHandler}>Sign Up</button>
              </form>
            </div>
          </div>
        </main>
      </div>
    )
}
export default config