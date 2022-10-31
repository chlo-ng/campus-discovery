import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from 'next/head'
import React, {useState} from 'react'
import NavBar from "../components/NavBar"
import styles from '../styles/config.module.css'

const config: NextPage = () => {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    async function submitHandler(e: React.ChangeEvent<any>) {
      e.preventDefault()
      if (username.trim() !== "" && password.trim() !== "") {
        var data: any = {
          username: username,
          password: password
        }
        console.log(data);
        fetch("http://localhost:8080/api/users/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((response) => {
          response.json().then((res) => {
            console.log(res);
            localStorage.setItem("id", res["id"]);
            router.push("events");
          }).catch(err => alert("Invalid login credentials. Please try again."))
        })
      } else if (username.trim() == "") {
        alert("Please provide a non-empty username and password.")
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
                <p className = {styles.text}>Account Login</p>
                <p className={styles.name}>Username/Email:</p>
                <input className={styles.input} size={38} required={true} onChange={e => setUsername(e.target.value)}></input>
                <p className={styles.name}>Password:</p>
                <input type='password' className={styles.input} size={38} required={true} onChange={e => setPassword(e.target.value)}></input>
                <button type="submit" className={styles.submitButton} onClick={submitHandler}>Sign In</button>
              </form>
            </div>
          </div>
        </main>
      </div>
    )
}
export default config