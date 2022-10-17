import type { NextPage } from 'next'
import Head from 'next/head'
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
        <NavBar />
        <div className='welcome container'>
          <div className='welcomeContainer'>
            <h3> Welcome to </h3>
            <h1> Campus Discovery! </h1>
            <p> To use our services, sign in with GT credentials or create an account by clicking on the upper right button. </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
