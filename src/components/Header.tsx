import { Rocket } from 'phosphor-react'
import styles from "./Header.module.css"

export function Header (){
    return(
        <header className={styles.header}>
            <Rocket  weight="bold" className={styles.rocket} />
            {/* <div><span>to</span><span>do</span></div> */}
            <span>to<label>do</label></span>
        </header>
    )
}