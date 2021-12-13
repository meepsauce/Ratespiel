import styles from '../styles/Home.module.css'
import React from 'react';


export default function Docs(props) {
    return <div className={styles.centered}>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/>
        <div className={styles.card}>
            <h1>API Usage</h1>
            <h3 className={styles.red}>*not done </h3>
            <hr></hr>
            <h3>Base URL: <span className={styles.code}>/api</span></h3>
            <hr></hr>
            <h2>GET: /alive</h2>
            <h4>Returns: </h4>
            <p className={styles.code}>
            &#123;<br></br>
                    "status": true || false,<br></br>
                    "time": [uptime of backend server, in milliseconds]<br></br>
            &#125;
            </p>
            <hr></hr>
            <h2>GET: /recent</h2>
            <h4>Returns: </h4>
            <p className={styles.code}>
            [<br></br>
                    
            ]
            </p>
            <hr></hr>
            <h2>POST: /find</h2>
            <h3>Arguments: <span className={styles.code}>&#123; id: setId &#125;</span></h3>
            <h4>Returns: </h4>
            <p className={styles.code}>
            [<br></br>
                    
            ]
            </p>
            <hr></hr>
            <h2>POST: /insert</h2>
            <h3>Arguments: <span className={styles.code}></span></h3>
            <h4>Returns: </h4>
            <p className={styles.code}>
            [<br></br>
                    
            ]
            </p>
        </div>
        <br/><br/><br/><br/><br/>
    </div>
    
}