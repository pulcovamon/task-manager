import React, { useState } from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

const colorTheme = createTheme({
  palette: {
    primary: {
      main: '#00adb5'
    },
    mode: 'dark',
  }
});

function DateTimePickerValue({ disabled }) {
  const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
        <DateTimePicker
          label="Deadline"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          disabled={disabled}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

function TaskList({ tasks, handleRemove, handleCompleted, active }) {
  const taskList = tasks.map((task, index) => (
    <Task
      key={index}
      name={task}
      index={index}
      handleRemove={handleRemove}
      handleCompleted={handleCompleted}
      active={active}
    />
  ));
  return (
    <div className="task-grid">
      {taskList}
    </div>
  );
}

function Task({ name, index, handleRemove, handleCompleted, active }) {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <ThemeProvider theme={colorTheme}>
      <div className="task">
        <h3>{name}</h3>
        <DateTimePickerValue disabled={!active} />
        <Checkbox
          {...label}
          color="success"
          checked={!active}
          onChange={() => handleCompleted(index)}
          disabled={!active}
        />
        <RemoveTask disabled={!active} handleRemove={handleRemove} index={index} />
      </div>
    </ThemeProvider>
  );
}

function RemoveTask({ handleRemove, index, disabled }) {
  const handleClick = () => {
    handleRemove(index);
  };
  return (
    <IconButton disabled={disabled} onClick={handleClick} aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );
}

function AddTask({ handleAdd }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      handleAdd(task);
      setTask("");
    }
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <ThemeProvider theme={colorTheme}>
        <TextField
          required
          label="Add task"
          variant="standard"
          value={task}
          onInput={(e) => setTask(e.target.value)}
        />
      </ThemeProvider>
      <Button
        type="submit"
        sx={{
          border: "1px solid #00adb5",
          borderRadius: "4px",
          padding: "10px",
          margin: "10px",
          backgroundColor: "#3a4750",
          color: "#00adb5",
        }}
      >
        Add
      </Button>
    </form>
  );
}

function App() {
  const [toDo, setToDo] = useState([]);
  const [completed, setCompleted] = useState([]);

  function handleAdd(task) {
    setToDo([...toDo, task]);
  }
    
  function handleRemoveToDo(index) {
    setToDo(toDo.filter((_, i) => i !== index));
  }

  function handleCompleted(index) {
    setCompleted([...completed, toDo[index]]);
    setToDo(toDo.filter((_, i) => i !== index));
  }

  return (
    <div>
      <h1>Task manager</h1>
      <div className="content">
        <div className="to-do">
          <h2>TO DO</h2>
          <AddTask handleAdd={handleAdd} />
          <TaskList tasks={toDo} handleRemove={handleRemoveToDo} handleCompleted={handleCompleted} active={true} />
        </div>
        <div className="completed">
          <h2>Completed</h2>
          <TaskList tasks={completed} handleRemove={() => {}} handleCompleted={() => {}} active={false} />
        </div>
      </div>
    </div>
  );
}

export default App;
