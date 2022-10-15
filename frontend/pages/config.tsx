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
            <form>
              <label>
              <p className = {astyle.text}>Create an Account</p>
              <p className = {astyle.atext}>Select Role:</p>
              
                <button className= {astyle.roleButtons} onClick={e => setrole("student")}>Student</button>
                <button className= {astyle.roleButtons} onClick={e => setrole("alumini")}>Alumini</button>
                <button className= {astyle.roleButtons} onClick={e => setrole("teacher")}>Teacher</button>
             
                  <p className={astyle.name}>Your Name: {name}</p>
                  <p className={astyle.name}>Your Role: {role}</p>
                  <p className={astyle.name}>Name:</p>
                  <input className= {astyle.input} size = {38} type="text" required= {true} name="name" onChange={e => setname(e.target.value)}/>
                  <p className={astyle.name}>Email:</p>
                  <input className= {astyle.input} size = {38} required= {true}></input>
                  <p className={astyle.name}>Password:</p>
                  <input className= {astyle.input} size = {38} required= {true}></input>
                  <p className={astyle.name}>Confirm Password:</p>
                  <input className= {astyle.input} size = {38} required= {true}></input>
              </label>
              <input type="submit" value="Sign Up" className= {astyle.submitButton} onClick = {nameHandler}/>
            </form>
            
            </div>
          </div>
        </main>
      </div>
    )
}
export default config