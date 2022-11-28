import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from 'next/head'
import NavBar from "../components/NavBar"
import styles from "../styles/myEvents.module.css"
import React, {useState} from 'react'

const myEvents: NextPage = () => {
    
    return (
      <div>
        <Head>
          <title>Campus Discovery</title>
          <meta name="description" content="create event" />
          <link rel="icon" href="/gtLogo.png" />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto Slab' />
        </Head>
        <main>
          <NavBar />
          <div className="container">
            <div className={styles.coreContainer}>
              <p className={styles.heading}>My Events</p>
              
            </div>
          </div>
        </main>
      </div>
    )
}
export default myEvents