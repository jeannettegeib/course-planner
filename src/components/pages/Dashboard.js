import React, { useEffect, useState } from "react";
import { getStudentLessons, getStudentCourses } from "../APIManager";
import { format, parse, parseJSON } from 'date-fns'
import { useNavigate } from "react-router-dom"
import "../CoursePlanner.css"
import { CompletionChart } from "./CompletionChart";
import {Card} from "react-bootstrap"
import { Greeting } from "../auth/Greeting";


export const Dashboard = ()=>{
    //State 1
    const [studentLessons, setStudentLessons]=useState([])
    //State 2
    const [studentCourses, setStudentCourses]=useState([])
    //State 3
    const [refilter, setRefilter]=useState(false)

    const navigate = useNavigate()
    const loggedInStudent=localStorage.getItem("planner_student")
    const studentObject=JSON.parse(loggedInStudent)
    const studentObjectId = studentObject.id

    const getParsedFilteredStudentLessons=(studentObjectId)=>{
        getStudentLessons(studentObjectId)
        .then((studentLessonsArray)=>{
            
            const filteredStudentLessonsArray=studentLessonsArray.filter((lesson)=>lesson.complete===false).sort((a,b)=>(a.lesson.order > b.lesson.order)? 1 : -1)
            console.log("filtered student lessons array",filteredStudentLessonsArray)
            const parsedFilteredStudentLessonsArray=filteredStudentLessonsArray.map((lesson)=>{
               
              
              return {"studentId": lesson.studentId,
                    "lessonId": lesson.lessonId,
                    "courseId": lesson.courseId,
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
            
            setStudentLessons(parsedFilteredStudentLessonsArray ) 
        })
        .then(setRefilter(false))      
    }

    useEffect(()=>{
        getParsedFilteredStudentLessons(studentObjectId)
    },[refilter])

    useEffect(()=>{
        getParsedFilteredStudentLessons(studentObjectId)
        getStudentCourses(studentObjectId)
        .then((studentCoursesArray)=>{
            const parsedStudentCoursesArray=studentCoursesArray.map(
                (course)=>{
                    return {
                        "courseId": course.courseId,
                        "studentId": course.studentId,
                        "targetDate": parse(course.targetDate,"yyyy-MM-dd", new Date()),
                        "id": course.id,
                        "course": {
                            "id": course.course.id,
                            "name": course.course.name
                            } 
                    }
                }
            )
            setStudentCourses(parsedStudentCoursesArray)})
    },[])
    
    const CompleteLesson=(event, lessonId)=>{
        event.preventDefault()
        return(
            fetch(`http://localhost:8088/studentLessons/${lessonId}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({complete: true})
            })
            .then(r=>r.json())
            .then(navigate("/"))
            
        )

    }
    
    return(
        <React.Fragment>
        <h2>{studentObject ? <Greeting />:""}</h2>
        <article className="courseContainer">
        {
            studentCourses.map((course)=>{
                return <Card className="lessonContainer ">
                    <Card.Body className="d-flex flex-column">
                        <div>
                        Your target completion date is <b>{format(course.targetDate, 'MMM dd, y')}</b> 
                        <button 
                        className="updateGoal"
                        onClick={ () => navigate(`./updateGoal/${course.id}`) }
                        >Update Goal
                        </button>
                    </div>
                        <div className="d-flex mb-2 justify-content-between">
                    <Card.Title className="courseTitle">
                        <h2>{course.course.name}</h2>
                    </Card.Title>
                        <CompletionChart pendingLessons={studentLessons} student={studentObject} courseId={course.courseId} />
                    </div>
                    
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
                            <td>
                                <button className="complete" onClick={(clickEvent)=>
                                    {CompleteLesson(clickEvent, lesson.id) 
                                        setRefilter(true)}}>
                                        Completed!
                                </button>
                            </td>
                        
                        </tr>
                        :""
                    }
                    })
                    }
                    </table>
                    </Card.Body>
                </Card>
            }
            )
        }
        </article>
        </React.Fragment>
    )
}