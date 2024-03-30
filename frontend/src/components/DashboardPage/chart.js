
// Code for 'Welcome/Hello' block on dashboard 

//import * as React from 'react';
import React, { useState } from 'react';
//import { useTheme } from '@mui/material/styles';
//import { LineChart, axisClasses } from '@mui/x-charts';

import Title from './title.js';

/*
function TimePicker(){
  const [time, setTime] = useState(new Date())
  useEffect(()=>{
    setInterval(() => setTime(new Date()), 1000)
  },[])
}
*/
function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
  
}

export default function Chart() {
 // const theme = useTheme();
  const [currentDate] = useState(getDate());
  const [time] = useState(new Date());
  return (
    <React.Fragment>
      <Title>Hello (patient name).</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
      <p>Today is: <p>{currentDate}</p> at {time.toLocaleTimeString()}</p>
      </div>
    </React.Fragment>
  );
}


