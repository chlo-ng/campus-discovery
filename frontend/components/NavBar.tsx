import * as React from 'react'
import styles from '../styles/NavBar.module.css'
import { useRouter } from "next/router"

type Props = {
  loggedIn: boolean
}

type State = {
  expanded: boolean
}

class NavBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  render() {
    return (
      <div className={styles.navBarContainer}>
        <div className={styles.navBar}>
          <img className={styles.logo} src="/gtLogoLong.png" />
          <img className={styles.icon}
            src="/user.png" 
            onClick={() => {
              this.setState({expanded: true})
          }}/>
        </div>
        {this.state.expanded && <div className={styles.sideBar}>
          <div className={styles.sideBarTop}>
            <img className={styles.icon} 
              src="/cross.png"
              onClick={() => {
                this.setState({expanded: false})
              }}/>
          </div>
          <nav className={styles.sideBarNav}>
            {!this.props.loggedIn && <ul>
              <li><a>Login</a></li>
              <li><a onClick={() => {console.log("hi")}}>Create Account</a></li>
            </ul>}
            {this.props.loggedIn && <ul>
              <li><a>Manage Account</a></li>
              <li><a>My Events</a></li>
              <li><a>Log Out</a></li>
            </ul>}
          </nav>
        </div>}
      </div>
    )
  }
}

export default NavBar