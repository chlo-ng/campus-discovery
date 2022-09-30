import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from 'next/head'
// import styles from 'file' to use styles.className for elements
import styles from '../styles/template.css'
// import components from '../componenets' folder
import ComponentTemplateFunction from "../components/ComponentTemplateFunction"
import ComponentTemplateClass from "../components/ComponentTemplateClass"

const Template: NextPage = () => {
    /*
    router is used to navigate from page to page
    use router.push("<url>") to navigate to another page
    use router.replace("<url>") to navigate to another page and remove previous page from history
    use router.replace("<folderName>") to navigate to the index.tsx file in a folder. look at templateFolder for example
    */
    const router = useRouter()

    // return html page you want to render
    return (
      // className={styles.container} will apply the .container{} css style from the styles file imported up top
      <div className={styles.container}>
        <Head>
          <title>Campus Discovery</title>
          <meta name="description" content="insert page description here" />
          <link rel="icon" href="/gtLogo.png" />
        </Head>
        <main>
          <p>template</p>
          <ComponentTemplateFunction
            exampleStringProp="example"
            exampleBooleanProp={true}
          />
          <ComponentTemplateClass 
            exampleStringProp="component template class prop"
          />
        </main>
      </div>
    )
}
export default Template