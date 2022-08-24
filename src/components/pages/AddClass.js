import React, {useState, useEffect} from "react"
import {getAllCourses, getStudentCourses} from "../APIManager"

const loggedInStudent=localStorage.getItem("planner_student")
const studentObject=JSON.parse(loggedInStudent)
const studentObjectId=studentObject.id

export const AddClass=()=>{
    const [allCourses, setAllCourses]=useState([])
    const [enrolledCourses, setEnrolledCourses]=useState([])
    const[selectedCourse, setSelectedCourse]=useState(0)

    // const [courseList, setAvailableCourses]=useState([])
    
    //After getting all the courses, remove the ones that the student is already signed up for since those should no longer be available options.
    
        useEffect(
        ()=>{
            getAllCourses()
            .then((courseArray)=>{setAllCourses(courseArray)})            
        
        },[]    
        )

        useEffect(
            ()=>{
                fetch(`http://localhost:8088/studentCourses?studentId=${studentObjectId}`)
                .then(r=>r.json())
                .then((studentCourseArray)=>{setEnrolledCourses(studentCourseArray)})
        },[allCourses]    
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
                                     
       const handleSaveButtonClick=(evt)=>{
        evt.preventDefault()
        console.log("You clicked the button!")
        const selectionToSendToAPI={
            courseId: selectedCourse,
            studentId: studentObjectId,
            targetDate: 0
            }
            return fetch(`http://localhost:8088/studentCourses`,{
                method:"POST",
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify(selectionToSendToAPI)
            })
                .then(response=> response.json())            
       }

    return(
        <React.Fragment>
        <h2>Add a New Course Plan</h2>
        <div className="quote">"The mind, once stretched by a new idea, never returns to its original dimensions." Ralph Waldo Emerson</div>
        <section className="courseOptions">
        <select onChange={
                        (evt)=>{
                        setSelectedCourse(+evt.target.value)}

                    }>
            {
                allCourses.map((course)=>{
                    return <option value={course.id}
                    >{course.name}</option>
                }
                )
            }
        </select>
        </section>
                <br></br>
        You are enrolled in the following course(s)
        {
            enrolledCourses.map((enrolledCourse)=>{
                return <section>
                <div>
                {enrolledCourse.id}
                </div>
                </section>
            }

            )
        }
        </React.Fragment>
    )
}