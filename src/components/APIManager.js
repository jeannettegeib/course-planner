import React from "react"
export const getAllCourses=()=>{
    return fetch(`http://localhost:8088/courses`)
    .then(r=>r.json())
}

export const getStudentCourses=(studentObjectId)=>{
    fetch(`http://localhost:8088/studentCourses?studentId=${studentObjectId}`)
    .then(r=>r.json())
}