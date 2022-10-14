import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from 'next/head'
import React, {useState} from 'react'
import NavBar from "../components/NavBar"
import { validEmail, validPassword } from './Regex.js';

const config: NextPage = () => {
    const router = useRouter()
    const [name,setname]=useState('')
    const [role, setrole]=useState('')
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
          <meta name="description" content="insert page description here" />
          <link rel="icon" href="/gtLogo.png" />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto Slab' />
        </Head>
        <main>
          <NavBar loggedIn={false}/>
          <div className="container">
            <p>config screen</p>
            <form onSubmit={submitHandler}>
              <label>
                  Name:
                  <input type="text" required= {true} name="name" onChange={e=>setname(e.target.value)}/>
              </label>
              <input type="submit" value="Submit" />
            </form>
            <button onClick={e=>setrole("student")}>student</button>
              <button onClick={e=>setrole("organizer")}>organizer</button>
              <button onClick={e=>setrole("teacher")}>teacher</button>
            <p>{name}</p>
            <p>{role}</p>
          </div>
        </main>
      </div>
    )
}
export default config