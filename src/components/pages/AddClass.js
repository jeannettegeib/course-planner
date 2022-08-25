import React, { useState, useEffect } from "react"
import { getAllCourses, getStudentCourses, getLessonsByCourseId } from "../APIManager"
import { useNavigate } from "react-router-dom"

const loggedInStudent = localStorage.getItem("planner_student")
const studentObject = JSON.parse(loggedInStudent)
const studentObjectId = studentObject.id



export const AddClass = () => {
    const [allCourses, setAllCourses] = useState([])
    const [enrolledCourses, setEnrolledCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState(0)
    const [selectedDate, setSelectedDate] = useState("")
    const [lessonsByCourseId, setLessonsByCourseId]=useState([])

    const navigate=useNavigate()
    // const [courseList, setAvailableCourses]=useState([])

    useEffect(
        ()=>{
            getLessonsByCourseId(selectedCourse)
            .then((lessonArray)=>{setLessonsByCourseId(lessonArray)})
        },
        [selectedCourse]
    )


    useEffect(
        () => {
            getAllCourses()
                .then((courseArray) => { setAllCourses(courseArray) })

        }, []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/studentCourses?studentId=${studentObjectId}&_expand=course`)
                .then(r => r.json())
                .then((studentCourseArray) => { setEnrolledCourses(studentCourseArray) })
        }, [allCourses]
    )


    // let availableCourses = [] 
    // availableCourses= allCourses.filter((course) => {
    //                 // if at least one the things in the studentCourse array contain this courseId 
    //                 if(addedCourses.some(sc => sc.courseId === course.id)){
    //                     return false
    //                 } else {
    //                     // if none of the things in the studentCourses array contain this courseId, return false 
    //                     return true
    //                 }
    //             })
    // console.log(availableCourses)
    let populateStudentLessons=[]
    lessonsByCourseId.forEach((lesson)=>{populateStudentLessons.push({
        studentId: studentObjectId,
        lessonId: lesson.id,
        complete: false
    })})
    console.log(populateStudentLessons)

    const handleSaveButtonClick = (evt) => {
        evt.preventDefault()
        console.log("You clicked the button!")
        const selectionToSendToAPI = {
            courseId: selectedCourse,
            studentId: studentObjectId,
            targetDate: selectedDate
        }
        const coursePost={
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(selectionToSendToAPI)
        }


        return Promise.all([fetch(`http://localhost:8088/studentCourses`,coursePost ),populateStudentLessons.map(lesson=> fetch(`http://localhost:8088/studentLessons`,{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(lesson)
            }))])

    }

    return (
        <React.Fragment>
            <h2>Add a New Course Plan</h2>
            <div className="quote">"The mind, once stretched by a new idea, never returns to its original dimensions." Ralph Waldo Emerson</div>
            <br></br>
            <fieldset>
                <section className="courseOptions">
                    <label>Choose a Course:</label>
                    <select onChange={
                        (evt) => {
                            setSelectedCourse(+evt.target.value)
                        }
                    }>
                        {
                            allCourses.map((course) => {
                                return <option value={course.id}
                                >{course.name}</option>
                            }
                            )
                        }
                    </select>
                </section>
            </fieldset>

            <fieldset>
                <section className="setDate">
                    <label>Set a target completion date:</label>
                    <input type="date"
                        id="targetDate"
                        value={selectedDate}
                        onChange={(evt) => { setSelectedDate(evt.target.value) }} />
                </section>
            </fieldset>
            
            <button 
            onClick={(clickEvent)=>handleSaveButtonClick(clickEvent)} 
            className="btn btn-primary">
                Save Selection
                </button>
            
            <br></br>
            You are enrolled in the following course(s)
            {
                enrolledCourses.map((enrolledCourse) => {
                    return <section>
                        <div>
                            {enrolledCourse.course.name}
                        </div>
                    </section>
                }

                )
            }
        </React.Fragment>
    )
}