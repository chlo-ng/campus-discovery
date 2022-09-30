import type { NextPage } from 'next'
import Head from 'next/head'
import { Button } from 'react-bootstrap'
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router"

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <Head>
        <title>Campus Discovery</title>
        <meta name="description" content="CS 2340 Group 7" />
        <link rel="icon" href="/gtLogo.png" />
      </Head>

      <main className={styles.main}>
        <Button 
          variant="primary"
          onClick={() => {
            router.push("/template")
          }}
        >
          click me!
        </Button>
      </main>
    </div>
  )
}

export default Home
