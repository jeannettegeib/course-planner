import React, { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import { getThisStudentCourse } from "../APIManager"


export const UpdateGoal=()=>{
    const {studentCourseId}=useParams()
    const [course, updateCourse]=useState({})
    const loggedInStudent=localStorage.getItem("planner_student")
    const studentObject=JSON.parse(loggedInStudent)
    const studentObjectId = studentObject.id
    
    useEffect(()=>{
        getThisStudentCourse( studentObjectId, studentCourseId )
        .then((studentCourseObject)=>{updateCourse(studentCourseObject)})
    },
    [studentCourseId]
    )


    return(
        <React.Fragment>
        <h2>Update your Learning Goals</h2>
        <div className="quote">"Being a student is easy. Learning requires actual work."" —William Crawford</div>
        </React.Fragment>
    )
}