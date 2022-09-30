import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from 'next/head';

const UserConfiguration: NextPage = () => {
    const router = useRouter();
    return (<div>
      <Head>
        <title>Campus Discovery</title>
        <meta name="description" content="user configuration page" />
        <link rel="icon" href="/gtLogo.png" />
      </Head>
      <p>user configuration</p>
    </div>);
};
export default UserConfiguration;