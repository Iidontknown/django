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

const Katalog: React.FC = () => {  


  


  return (
    <MenuBar/>
  )
}
export default Katalog;