import type { NextPage } from 'next'
import Head from 'next/head'
import { Button } from 'react-bootstrap'
// change import to custom file when creating welcome screen
import { useRouter } from 'next/router'
import NavBar from '../components/NavBar'

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>Campus Discovery</title>
        <meta name="description" content="CS 2340 Group 7" />
        <link rel="icon" href="/gtLogo.png" />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto Slab' />
      </Head>

      <main>
        <NavBar loggedIn={false}/>
      </main>
    </div>
  )
}

export default Home
