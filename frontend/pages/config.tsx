import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from 'next/head'
import React, {useState} from 'react'
// import styles from 'file' to use styles.className for elements
import styles from '../styles/Template.module.css'
// import components from '../componenets' folder
import ComponentTemplateFunction from "../components/ComponentTemplateFunction"
import ComponentTemplateClass from "../components/ComponentTemplateClass"
import { validEmail, validPassword } from './Regex.js';

const config: NextPage = () => {
    /*
    router is used to navigate from page to page
    use router.push("<url>") to navigate to another page
    use router.replace("<url>") to navigate to another page and remove previous page from history
    use router.replace("<folderName>") to navigate to the index.tsx file in a folder. look at templateFolder for example
    */
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

    // return html page you want to render
    return (
      // className={styles.container} will apply the .container{} css style from the styles file imported up top
      <div className={styles.container}>
        <Head>
          <title>Campus Discovery</title>
          <meta name="description" content="insert page description here" />
          <link rel="icon" href="/gtLogo.png" />
        </Head>
        <main>
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
        </main>
      </div>
    )
}
export default config