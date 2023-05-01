import styled from 'styled-components'
import Head from 'next/head'
import GratitudeApp from "../components/GratitudeApp"
import useSWR, { SWRConfig } from "swr"
import { createClient } from '@supabase/supabase-js'

const fetcher = url => fetch(url).then(r => r.json())

export default function Home({ fallback }) {
  const { data, error, mutate } = useSWR("/api", fetcher);

  return <SWRConfig value={{ fallback }} >
    <Head>
      <title> Gratitude Journal </title>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet"/>
    </Head>
    <GratitudeApp data={data} mutate={mutate} error={error}/>
  </SWRConfig>
}

export async function getStaticProps() {
  const supabaseUrl = 'https://xbgjgrctcwtygsrygvpe.supabase.co'
  const supabaseKey = process.env.SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

  let { data, error } = await supabase.from('gratitudes').select('*')

  return {
    props : { data }
  }

}
