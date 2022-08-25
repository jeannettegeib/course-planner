import React, { useEffect, useState } from "react";
import { getStudentLessons, getStudentCourses } from "../APIManager";

export const Dashboard = ()=>{
    const [studentLessons, setStudentLessons]=useState([])
    const [studentCourses, setStudentCourses]=useState([])

    const loggedInStudent=localStorage.getItem("planner_student")
    const studentObject=JSON.parse(loggedInStudent)
    const studentObjectId = studentObject.id

    useEffect(()=>{
        getStudentLessons(studentObjectId)
        .then((studentLessonsArray)=>{setStudentLessons(studentLessonsArray)})
    },[])
    useEffect(()=>{
        getStudentCourses(studentObjectId)
        .then((studentCoursesArray)=>{setStudentCourses(studentCoursesArray)})
    },[])
   
    
    return(
        <React.Fragment>
        <h2>Your Course Schedule</h2>
        <article className="courseContainer">
        {
            studentCourses.map((course)=>{
                return <div className="course lessonContainer">
                    <h3>{course.course.name}</h3>
                    {
                    studentLessons.map((lesson)=>{
                        return(lesson.lesson.courseId ===course.course.id)
                        ? 
                        <div className="eachLesson" key={lesson.lessonId}>
                        Lesson {lesson.lesson.order}-{lesson.lesson.name}
                        </div>
                        :""
                    })
                    }
                </div>
            }
            )
        }
        </article>
        </React.Fragment>
    )
}