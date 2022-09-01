import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {getStudentLessons} from "../APIManager";

ChartJS.register(ArcElement, Tooltip, Legend);

// 
export const CompletionChart = ({pendingLessons, student})=>{
// ChartJS.overrides[type].plugins.legend.display=false
    const [lessons, setLessons]=useState([])
    const [numLessonsPending, setPending]=useState(0)
    const [numLessonsComplete, setComplete]=useState(0)
 

    useEffect(()=>{
        getStudentLessons(student.id)
        .then((lessonsArray)=>{
            let numComplete = lessonsArray.length - pendingLessons.length
            setComplete(numComplete)
            let numPending =pendingLessons.length
            setPending(numPending)
        })  
    },[pendingLessons])
        
    
    console.log(lessons)
    console.log(numLessonsComplete)
    console.log(numLessonsPending)

    return(
        <div className="chart">
           
      <Doughnut plugins={{
        legend: {
            display: false,
        },
      }}
      data={{
            labels:['Complete',`Pending`],
            datasets:[{
                label: `Completed Lessons`,
                data: [numLessonsComplete, numLessonsPending],
                backgroundColor:['#FFA039', '#8B1860'],
                borderColor: `#3F0968`
            }]
      }}
      
    
 
        /> 
        </div>
)
}