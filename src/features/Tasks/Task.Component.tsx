import { FC } from "react"
import { DeleteForever } from '@material-ui/icons'
import { 
    Checkbox,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText } from "@material-ui/core"

import { AsyncDelTask, AsyncToggleTaskDone } from "./Tasks.Slice"
import { useAppDispatch } from "../../hooks"
import { TaskProps } from "./Task.interface"

export const Task:FC<TaskProps> = (props) => {
    const dispatch = useAppDispatch()
    let color: "primary"|"secondary" = "secondary"
    if (props.index) {
      if ((props.index+1) % 2 === 0) color = "primary"
    }
    return(
      <ListItem
            key={props.id} role={undefined}
            dense button
            onClick={()=>dispatch(AsyncToggleTaskDone(props.id, props.done))}
            >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={props.done}
                tabIndex={-1}
                disableRipple
                color={color}
                inputProps={{ 'aria-labelledby': `checkbox-list-label-${props.id}` }}
              />
            </ListItemIcon>
            <ListItemText id={`checkbox-list-label-${props.id}`} primary={props.txt} />
            <ListItemSecondaryAction>
              <IconButton 
                edge="end" aria-label="DeleteTask"
                onClick={()=>{dispatch(AsyncDelTask(props.id))}}
                >
                <DeleteForever />
              </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}