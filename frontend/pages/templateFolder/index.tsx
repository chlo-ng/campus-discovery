import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from 'next/head'

const TemplateFolder: NextPage = () => {
    // using router.push("templateFolder") would render this page
    const router = useRouter()

    return (
      <div>
        <Head>
          <title>Campus Discovery</title>
          <meta name="description" content="insert page description here" />
          <link rel="icon" href="/gtLogo.png" />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto Slab' />
        </Head>
        <p>template folder</p>
      </div>
    )
}
export default TemplateFolder