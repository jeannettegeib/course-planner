import React, { useEffect, useState } from "react";
import { getStudentLessons, getStudentCourses } from "../APIManager";
import { format, getDay, parseJSON } from 'date-fns'
import "../CoursePlanner.css"
export const Dashboard = ()=>{
    const [studentLessons, setStudentLessons]=useState([])
    const [studentCourses, setStudentCourses]=useState([])

    const loggedInStudent=localStorage.getItem("planner_student")
    const studentObject=JSON.parse(loggedInStudent)
    const studentObjectId = studentObject.id

    useEffect(()=>{
        getStudentLessons(studentObjectId)
        .then((studentLessonsArray)=>{
            
            
            const parsedStudentLessonsArray=studentLessonsArray.map((lesson)=>{
               
              
              return {"studentId": lesson.studentId,
                    "lessonId": lesson.lessonId,
                    "dueDate": parseJSON(lesson.dueDate),
                    "complete": lesson.complete,
                    "id": lesson.id,
                    "lesson": {
                        "id":lesson.lesson.id,
                        "courseId": lesson.lesson.courseId,
                        "order": lesson.lesson.order,
                        "name": lesson.lesson.name,
                        "multiday": lesson.lesson.multiday
                    }                        
                    }
            
            })
            setStudentLessons(parsedStudentLessonsArray) 
        })
       
        
            
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
                    <h3><center>{course.course.name}</center></h3>
                    <table>
                        <tr>
                            <th>Lesson</th>
                            <th>Due Date</th>
                        </tr>
                    {
                    studentLessons.map((lesson)=>{
                        if (lesson.lesson){

                        
                        return (lesson.lesson.courseId ===course.course.id)
                        ? 
                        <tr className="eachLesson" key={lesson.lessonId}>
                            <td>
                                Lesson {lesson.lesson.order}-{lesson.lesson.name}
                            </td>
                            <td>
                                {format(lesson.dueDate, 'eee MMM do')}
                            </td>
                        
                        </tr>
                        :""
                    }
                    })
                    }
                    </table>
                </div>
            }
            )
        }
        </article>
        </React.Fragment>
    )
}