
export const getAllCourses=()=>{
    return fetch(`http://localhost:8088/courses`)
    .then(r=>r.json())
}

export const getStudentCourses=(studentObjectId)=>{
    return fetch(`http://localhost:8088/studentCourses?studentId=${studentObjectId}`)
    .then(r=>r.json())
}

export const getLessonsByCourseId=(courseId)=>{
    return fetch(`http://localhost:8088/lessons?courseId=${courseId}`)
    .then(r=>r.json())

}