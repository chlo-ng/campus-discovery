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
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
                    <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                  </svg>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                    <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className={styles.eventsContainer}>
              <p className={styles.header}>Browse Events</p>
              <div className={styles.searchBar}>
                <input type="search" className="form-control rounded" placeholder="Start browsing..." aria-label="Search" aria-describedby="search-addon" size={70} />
                <span className={styles.searchIcon} id="search-addon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                </span>
              </div>

            </div>
          </div>
        </main>
    </div>
  )
}
export default Events