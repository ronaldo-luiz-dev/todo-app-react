import { ChangeEvent, FormEvent, useState} from "react"
import { Circle ,CheckCircle , Trash} from 'phosphor-react'
import styles from "./Task.module.css"

interface TaskProps {
    content: string;
    onDeleteTask: (task:string) => void;
    onCheckTask:(checked:boolean,task:string) => void;
}


export function Task({content,onDeleteTask,onCheckTask}:TaskProps){

    const [check,setCheck] = useState(false);

// apaga as tarefas
function handleDeleteTask(){
    onDeleteTask(content)
}

// seleciona tarefas
function handleClick(){
    const newCheck = check ? false : true
    onCheckTask(newCheck,content)
    setCheck(newCheck)
}

const isCheck = check ? 'line-through' : 'none'

return(
    <div className={styles.task}>
        {check
        ?<CheckCircle  weight="bold" onClick={handleClick} className={styles.checked} />
        :<Circle  weight="bold"  onClick={handleClick} className={styles.check} />
        }
      <span style={{textDecoration : `${isCheck}`}}> {content}</span>
      <Trash size={32} weight="bold" onClick={handleDeleteTask} className={styles.trash}/>
    </div>
)
}