import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {getStudentLessonsByCourseId} from "../APIManager";

ChartJS.register(ArcElement, Tooltip, Legend);

// 
export const CompletionChart = ({pendingLessons, student, courseId})=>{
// ChartJS.overrides[type].plugins.legend.display=false
    const [lessons, setLessons]=useState([])
    const [numLessonsPending, setPending]=useState(0)
    const [numLessonsComplete, setComplete]=useState(0)
 

    useEffect(()=>{
        getStudentLessonsByCourseId(student.id, courseId)
        .then((lessonsArray)=>{
            let thisCoursePendingLessons=pendingLessons.filter((lesson)=>lesson.courseId===courseId)
            let numComplete = lessonsArray.length - thisCoursePendingLessons.length
            setComplete(numComplete)
            let numPending =thisCoursePendingLessons.length
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