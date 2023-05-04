import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Todo from '@/components/todo/Todo'


export default function Home() {
  return (
    <>
      <Head>
        <title>Todo app</title>
       
      </Head>
      <main >
        <Todo/>
      </main>
    </>
  )
}
