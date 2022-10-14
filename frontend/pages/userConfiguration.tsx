import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from 'next/head'

const UserConfiguration: NextPage = () => {
    const router = useRouter()
    return (
      <div>
        <Head>
            <title>Campus Discovery</title>
            <meta name="description" content="user configuration page" />
            <link rel="icon" href="/gtLogo.png" />
            <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto' />
            <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto Slab' />
        </Head>
        <main>
            <p>user configuration</p>
        </main>
      </div>
    )
}
export default UserConfiguration