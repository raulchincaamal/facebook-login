import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import FacebookButton from '@/components/FacebookButton';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [facebookUserData, setFacebookUserData] =
    useState<IFacebookData | null>(null);
  return (
    <>
      <Head>
        <title>Facebook Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <p>
            User logged:&nbsp;
            <code className={styles.code}>{facebookUserData !== null ? facebookUserData?.name : "No username"}</code>
          </p>
        <FacebookButton
          handleUserData={(userData) => {
            setFacebookUserData(userData);
          }}
          disabled={facebookUserData !== null}
        ></FacebookButton>
      </main>
    </>
  );
}

