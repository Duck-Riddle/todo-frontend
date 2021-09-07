import { List } from "@material-ui/core";
import { FC } from "react";

import { useAppSelector } from "../../hooks"
import { Task } from "./Task.Component"
import { SelectTasks } from "./Tasks.Slice";


export const TasksList:FC = () =>{
    
    const TasksTodo = useAppSelector(SelectTasks)

    return (
        <List>
            {TasksTodo.map(({txt, done, id, timeStamp}, index) => {
                return (
                    <Task 
                        key={index}
                        index={index}
                        txt={txt}
                        done={done}
                        id={id}
                        timeStamp={timeStamp}/>
                )
            })}
        </List>
    )
}