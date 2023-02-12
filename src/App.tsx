import { useState } from 'react'
import { Header } from "./components/Header"
import { Todo } from './components/Todo';

import styles from './App.module.css'
import './global.css';

function App() {  
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header/>

      <div className={styles.wrapper}>
        <Todo/>
      </div>
    </div>
  )
}

export default App
