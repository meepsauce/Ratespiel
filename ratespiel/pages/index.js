
import Link from "next/link"
import styles from '../styles/Home.module.css'
import React from 'react';
import { db } from '../lib/db';


export async function getServerSideProps(context) {
  return {
    props: {
      dbOn: db.startTime,
      apiOn: true,
      recent: db.recent
    }
  }
}

function formatTime(millis) {
  var time = (Date.now() - millis) / 60000;
  var min = Math.floor(time);
  var sec = (time - Math.floor(time)) * 60;
  return `${min} min ${sec} sec`;
}

function RecentList(props) {
  var recent = props.recent;
  if(recent) {
    while(recent.length < 15) {
      recent.pop();
    }
    this.state.data.map((item,i) => {
      <div>
        <span>{item.name} - By: {item.creator} - {item.questions.length} questions</span>
        <hr></hr>
      </div>
    })
  }
  else {
    recent = "No recent sets available :(";
  }
  return <div className={styles.card}>
  <h2>Recently made sets:</h2>
    {recent}
  </div>
}

export default function Home(props) {
  
  return <div className={styles.centered}>
      <div className={styles.card}>
        <h1 className={styles.big}>Ratespiel</h1>
        <h5>Quizlet but worse</h5>
        <hr></hr>
        <h5>Database: { props.dbOn ? <span>&#9989;</span> : <span>&#10060;</span> } </h5>
        <h5>API: { props.apiOn ? <span>&#9989;</span> : <span>&#10060;</span> } </h5>
        <h4>{ props.dbOn ? <h5>Uptime: {formatTime(props.dbOn)}</h5> : null }</h4>
        <hr></hr>
        <h1>Hey so</h1>
        <h2>Content is supposed to be here</h2>
        <h3>But for now you can do these things:</h3>
        <Link href="/editor">
          <button>Create a new set (no account required)</button>
        </Link>
      </div>
      <br></br>
      <RecentList></RecentList>

     
    </div>
}
