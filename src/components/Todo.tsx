// parei na funcionalidade de alertas para input

import { ChangeEvent, FormEvent, InvalidEvent,useState} from "react"
import { ClipboardText ,PlusCircle } from 'phosphor-react'
import { Task } from "./Task";
import styles from "./Todo.module.css"


export function Todo(){

    const [tasks,setTasks] = useState<{content: string; isCompleted: boolean}[]>([]);
    const [newTasksText,setnewTasksText] = useState('');
    const [inputError,setInputError] = useState(false);


    // APERTA CONFIRMA
    function handleCreateNewTask(event: FormEvent | InvalidEvent<HTMLInputElement>){

        event.preventDefault();
        const newTasks = [...tasks]
        const indexTasks = tasks.length;

        const isFindEqualTask = newTasks.some(task =>{
            return task.content == newTasksText
        })

        if(isFindEqualTask){
            setInputError(true)
        }else{
            newTasks.splice(indexTasks,0,{
                content: newTasksText,
                isCompleted: false,
            })

            setTasks(newTasks);
            setnewTasksText('');
        }
    }
    
    // EVENTO DO INPUT
    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>){
        setnewTasksText(event.target.value);
        
        // retorna o estado de erro do input
        setInputError(false);
        
    }

    //DELETA AS TASKS
    function deleteTaks(taskToDelete: string){
        // limpa cursor e retorna estado input
        setInputError(false)
        setnewTasksText('');

        const tasksWithoutDeleteOne = tasks.filter(task => {
            return task.content !== taskToDelete
        })
        setTasks(tasksWithoutDeleteOne);

        console.log('task_after => ', tasks)
    }

   // VALIDA TASKS CHECADAS/FEITAS     
    function checkTaks(taskToCheck: boolean, content:string){
        const newTasks = [...tasks]

        let index = newTasks.findIndex((task) => {
            return task.content === content 
        });

        newTasks[index].isCompleted  ? 
        newTasks[index].isCompleted = false :
        newTasks[index].isCompleted = true;

        // atualiza com tasks feitas (true)
        setTasks(newTasks);
        
    }
    // validação de telas de tarefas e range de tarefas concluidas/criadas
    const isEmptTasks = tasks.length !== 0 
    const concluidas = tasks.filter(index => index.isCompleted == true)


    const getStyle = () => {
        if (inputError) return styles.taskInput;
        else return styles.taskInput3;
      };

    return(
        // <main className={styles.main}>
        <>
            <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
                <input 
                    name='task'
                    placeholder="Adicione uma nova tarefa"
                    onChange={handleNewTaskChange}
                    value={newTasksText}
                    className={getStyle()}
                    required
                />
                <button type="submit">
                    Criar 
                    <PlusCircle size={50} weight="bold"className={styles.buttomPlus} />
                </button>
            </form>

            {inputError 
            ? <small className={styles.smallNotHide}>tarefa já existe</small>
            : <small className={styles.smallHide}>small hide</small>}
            
            <div className={styles.tasksInfo}>
                <div className={styles.summary}>
                    <div>
                        <span>Tarefas criadas</span>   
                        <span>{tasks.length}</span>
                    </div>

                    <div>
                        <span>Concluidas</span>   
                        <span>{concluidas.length} de {tasks.length}</span>
                         
                    </div>
                </div>
                <div className={styles.taskList}>
                    {isEmptTasks 
                        ?(tasks.map(task => {
                                return(
                                    <div className={styles.taskList}>
                                        <Task
                                        key={task.content} 
                                        content={task.content} 
                                        onDeleteTask={deleteTaks}
                                        onCheckTask={checkTaks}
                                        />
                                    </div>
                                )
                            })
                        )     
                        :(  
                            <div className={styles.emptyTasks}>
                                <ClipboardText size={32} weight="bold" className={styles.clipboard}/>
                                <div>
                                    <p>Voce ainda não tem tarefas cadastradas</p>
                                    <p>Crie tarefas e organize seus itens a fazer</p>
                                </div>
                            </div>
                        )
                    }                   
                </div>
            </div>
        </>
        // </main>
    )
}