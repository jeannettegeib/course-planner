import { addBusinessDays, differenceInBusinessDays, format, parse, parseJSON } from "date-fns"
import React, { useEffect, useState } from "react"
import {useNavigate, useParams} from "react-router-dom"
import { getStudentLessonsByCourseId, getThisStudentCourse } from "../APIManager"
import { Container } from "react-bootstrap"


export const UpdateGoal=()=>{
    const {studentCourseId}=useParams()
    const navigate = useNavigate()
    console.log("student course id",studentCourseId)
    //State 1
    const [course, updateCourse]=useState({})
    //State 2
    const [studentLessons, setStudentLessons]=useState([])

    const loggedInStudent=localStorage.getItem("planner_student")
    const studentObject=JSON.parse(loggedInStudent)
    const studentObjectId = studentObject.id
    
    useEffect(()=>{
        getThisStudentCourse(studentCourseId)
        .then((courseArray)=>{
            updateCourse(courseArray)
        })

    },
    []
    )

console.log("course.courseId",course.courseId)

    useEffect(
        ()=>{
            getStudentLessonsByCourseId(studentObjectId, course.courseId)
            .then((studentLessonsArray)=>{
                studentLessonsArray.sort((a,b)=>(a.lesson.order > b.lesson.order)? 1 : -1)
                setStudentLessons(studentLessonsArray)})
        },[course.courseId]
    )
   
        const today = new Date();
        let populateStudentLessons=[]       


    const handleSaveButtonClick=(event)=>{
        event.preventDefault()

        const totalSchoolDays= differenceInBusinessDays(new Date(course.targetDate), today);
        console.log("total school days", totalSchoolDays)
        console.log("This student's lessons", studentLessons)
       
        const pendingLessons=studentLessons.filter((object)=>object.complete===false)
        console.log("Pending Lessons:", pendingLessons)
        
        let lessonCount = pendingLessons.length;
        console.log("count of pending lessons in this course",lessonCount)

        const daysPerLesson= Math.floor(totalSchoolDays/lessonCount);

        let dayDue={}
        pendingLessons.forEach((lesson, i)=>{
            console.log(i)

            populateStudentLessons.push({
            studentId: studentObjectId,
            lessonId: lesson.lessonId,
            courseId: +lesson.courseId,
            dueDate: ((i===0) ? dayDue=addBusinessDays(today, daysPerLesson) : dayDue=addBusinessDays(dayDue, daysPerLesson)),
            complete: lesson.complete,
            id: lesson.id
        })})
        console.log("Populate Student Lessons",populateStudentLessons)

        const coursePut = {
            method:"PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(course)
            }
        
        return Promise.all([fetch(`http://localhost:8088/studentCourses/${course.id}`,coursePut),
            populateStudentLessons.map(lesson=> fetch(`http://localhost:8088/studentLessons/${lesson.id}`,{
            method: "PUT",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(lesson)
            }))
        ])
        .then(window.alert("Updated!"))
        .then(()=>{navigate("/") })
    }

    return(
        <React.Fragment>
        <Container>
        <h2 className="update">Update your Learning Goals for {course?.course?.name}</h2>
        <div className="quote">"Being a student is easy. Learning requires actual work." —William Crawford</div>

        
                <div className="form-group">
                    <label>Update your target completion date: </label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        value={course.targetDate}
                        onChange={
                            (evt)=>{
                                const copy={...course}
                                copy.targetDate=evt.target.value
                                updateCourse(copy)
                            }
                        } /> 
                <button 
            onClick={(clickEvent)=>handleSaveButtonClick(clickEvent)} className="updateGoal">
                Save
            </button>
            </div>
            </Container>
        </React.Fragment>
    )
}