
export const getAllCourses=()=>{
    return fetch(`http://localhost:8088/courses`)
    .then(r=>r.json())
}

export const getStudentCourses=(studentObjectId)=>{
    return fetch(`http://localhost:8088/studentCourses?studentId=${studentObjectId}&_expand=course`)
    .then(r=>r.json())
}

export const getLessonsByCourseId=(courseId)=>{
    return fetch(`http://localhost:8088/lessons?courseId=${courseId}`)
    .then(r=>r.json())

}
export const getStudentLessons=(studentId)=>{
    return fetch(`http://localhost:8088/studentLessons?studentId=${studentId}&_expand=lesson`)
    .then(r=>r.json())
}
export const getThisStudentCourse=(courseId)=>{
    return fetch(`http://localhost:8088/studentCourses/${courseId}?_expand=course`)
    .then(r=>r.json())
}
export const getStudentLessonsByCourseId=(studentId, courseId)=>{
    return fetch(`http://localhost:8088/studentLessons?studentId=${studentId}&courseId=${courseId}&_expand=lesson`)
    .then(r=>r.json())
}