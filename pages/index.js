import styled from 'styled-components'
import Head from 'next/head'
import GratitudeApp from "../components/GratitudeApp"

import useSWR from 'swr'
const fetcher = (url) => fetch(url).then((res) => res.json())
export default function Home() {
  //Fetch data from AP
  //Get data from API using swr and Add a gratitude for each of the items in the array
  const { data, error } = useSWR('/api', fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <>
    <Head>
      <title> Gratitude Journal </title>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet"/>
    </Head>
    <GratitudeApp entries={data}/>

  </>
}
