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
    async function submitHandler(e: React.ChangeEvent<any>) {
      e.preventDefault()
      console.log(name)
      if (validEmail.test(name)) {
        alert("invalid name")
     }
     if (validPassword.test(name)) {
        alert("no space in name");
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
          <p>config</p>
          <ComponentTemplateFunction
            exampleStringProp="example"
            exampleBooleanProp={true}
          />
          <form onSubmit={submitHandler}>
            <label>
                Name:
                <input type="text" name="name"/>
            </label>
            <input type="submit" value="Submit" onChange={e=>setname(e.target.value)}/>
          </form>
          <button>student</button>
            <button>organizer</button>
            <button>teacher</button>
          <ComponentTemplateClass 
            exampleStringProp="component template class prop"
          />
        </main>
      </div>
    )
}
export default config