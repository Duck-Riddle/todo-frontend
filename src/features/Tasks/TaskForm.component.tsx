import { makeStyles, TextField, Theme, createStyles, IconButton, Switch, FormControlLabel } from "@material-ui/core"
import { Send, CloudUpload } from "@material-ui/icons";
import React, { FC } from "react"
import { useAppDispatch } from "../../hooks"
import { AsyncAddTask, Sort, TestOverflow } from "./Tasks.Slice"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    textField: {
      marginLeft: theme.spacing(8),
      margin: theme.spacing(2),
    },
    button: {
        marginLeft: theme.spacing(0),
        margin: theme.spacing(2),
    },
    div: {
        display: 'grid'
    },
    options: {
        margin: theme.spacing(0),
    },

  }),
);



export const TaskForm:FC = () => {

    const classes = useStyles()
    const dispatch = useAppDispatch()

    const [ overflow, setOverflow ] = React.useState(false)

    const [ sort, setSort] = React.useState(false)
    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSort(event.target.checked)
        dispatch(Sort(sort))
    }
    const [ input, setInput ] = React.useState('')
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
    }
    
    return (
        <form
            className={classes.root}
            noValidate 
            autoComplete="off"
            onSubmit={(event: React.SyntheticEvent)=>{
                event.preventDefault()
                if (input) dispatch(AsyncAddTask(input))
                setInput('')
            }}
            >
            <div className={classes.div}>
            <IconButton
                className={classes.options}
                color="secondary"
                disabled={overflow}
                onClick={()=>{
                    setOverflow(true)
                    dispatch(TestOverflow())
                    console.warn(`You may need to refresh!`)
                }}
                >
                <CloudUpload/>
            </IconButton>
            <FormControlLabel
                className={classes.options}
                control={<Switch
                    checked={sort}
                    onChange={handleSwitch}
                    color='primary'
                    />}
                label="sortDone"
                />
            </div>
            <TextField
                className={classes.textField}
                label="Task-Todo" 
                variant="outlined"
                value={input}
                onChange={handleChange}
                fullWidth
                />
            <IconButton
                className={classes.button}
                color="primary"
                onClick={()=>{
                    if (input) dispatch(AsyncAddTask(input))
                    setInput('')
                }}
                >
                <Send/>
            </IconButton>
        </form>
    )
}