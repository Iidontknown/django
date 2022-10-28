import axios from 'axios';
import * as React from 'react';
import { Card, Button, CardGroup } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { CardColumns } from 'reactstrap';
import TasksService from '../services/TaskService';
import MenuBar from './MenuBar';
import http from "../http-common";
import { ChangeEvent, useEffect, useState } from 'react';
import TasksData from '../types/tasks';

// console.log( http.get("/tasks/"));
// console.log( TasksService.getAll());


export default function Katalog():JSX.Element  {
  const [tasks, settasks] = useState<Array<TasksData>>([]);
  const [currenttask, setCurrentTask] = useState<TasksData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    retrieveTasks();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTasks = () => {
    TasksService.getAll()
      .then((response: any) => {
        settasks(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };



  const setActiveTask = (Task: TasksData, index: number) => {
    setCurrentTask(Task);
    setCurrentIndex(index);
  };

  const findByTitle = () => {
    TasksService.findByTitle(searchTitle)
      .then((response: any) => {
        settasks(response.data);
        setCurrentTask(null);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  


  return (
    <> 
    <MenuBar/>
    <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          /><button
          className="btn btn-outline-secondary"
          type="button"
          onClick={findByTitle}
        >
          Search
        </button>
    <ul className="list-group">
          {tasks &&
            tasks.map((task, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTask(task, index)}
                key={index}
              >
                {task.title}
              </li>
            ))}
        </ul>

      </>
  )
}