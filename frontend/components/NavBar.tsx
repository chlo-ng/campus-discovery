import { useRouter } from 'next/router'
import * as React from 'react'
import styles from '../styles/NavBar.module.css'

interface AppProps {
}

export default function NavBar({
}: AppProps) {
  const router = useRouter()
  const [expanded, setExpanded] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  
  if (typeof window !== "undefined") {
    if (loggedIn !== (localStorage.getItem("id") !== null)) {
      setLoggedIn(localStorage.getItem("id") !== null)
    }
  }

  return (
    <div className={styles.navBarContainer}>
      <div className={styles.navBar}>
        <img className={styles.logos}
          src="/gtLogoLong.png"
          onClick={() => {
            router.push("/")
          }} />
        <img className={styles.icon}
          src="/user.png" 
          onClick={() => {
            setExpanded(true)
        }}/>
      </div>
      {expanded && <div className={styles.sideBar}>
        <div className={styles.sideBarTop}>
          <img className={styles.icon} 
            src="/cross.png"
            onClick={() => {
              setExpanded(false)
            }}/>
        </div>
        <nav className={styles.sideBarNav}>
          {!loggedIn && <ul>
            <li><a onClick={() => {router.push("login")}}>Login</a></li>
            <li><a onClick={() => {router.push("config")}}>Create Account</a></li>
          </ul>}
          {loggedIn && <ul>
            <li><a>Manage Account</a></li>
            <li><a>My Events</a></li>
            <li><a onClick={() => {
              localStorage.removeItem("id")
              router.push("/")
            }}>Log Out</a></li>
          </ul>}
        </nav>
      </div>}
    </div>
  )
}