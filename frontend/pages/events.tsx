import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from 'next/head'
import NavBar from "../components/NavBar"
import styles from '../styles/Events.module.css'

const Events: NextPage = () => {
    /*
    router is used to navigate from page to page
    use router.push("<url>") to navigate to another page
    use router.replace("<url>") to navigate to another page and remove previous page from history
    use router.replace("<folderName>") to navigate to the index.tsx file in a folder. look at templateFolder for example
    */
    const router = useRouter()

    // return html page you want to render
    return (
      <div>
        <Head>
          <title>Events</title>
          <meta name="description" content="Events page showing list of events" />
          <link rel="icon" href="/gtLogo.png" />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto Slab' />
        </Head>
        <main>
          <NavBar loggedIn={false} />
          <div className="container">
            <div className={styles.eventsContainer}>
              <p className={styles.header}>Trending this week</p>
              <div className={styles.trending}>
                <div className={styles.verticalCenter}>
                  <img className={styles.triangleButton} src="/triangle.png"/>
                </div>
                <div className={styles.trendingBox}>
                  <img className={styles.eventImage} src="/exampleEvent.png"></img>
                  <div className={styles.eventDetails}>
                    <p className={styles.eventTitle}>GT VSA's Moon Fest</p>
                    <p className={styles.eventText}>Thursday, October 13th, 2022</p>
                    <p className={styles.eventText}>6:00 - 9:00PM</p>
                    <p className={styles.eventText}>Tech Green</p>
                  </div>
                </div>
                <div className={styles.verticalCenter}>
                  <img className={`${styles.triangleButton} ${styles.triangleButtonRotate}`} src="/triangle.png"/>
                </div>
              </div>
            </div>
            <div className={styles.eventsContainer}>
              <p className={styles.header}>Browse Events</p>
              <div className={styles.searchBar}>
                <input type="search" placeholder="Start browsing..." aria-label="Search" aria-describedby="search-addon" size={70} />
                <span id="search-addon">
                  <img className={styles.searchIcon} src="/search.png"/>
                </span>
              </div>

            </div>
          </div>
        </main>
    </div>
  )
}
export default Events