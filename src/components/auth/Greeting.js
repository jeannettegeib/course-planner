import React, {useEffect} from "react"

export const Greeting= ()=>{

    const loggedInStudent=localStorage.getItem("planner_student")
    const studentObject=JSON.parse(loggedInStudent)
    console.log(studentObject)
    const updateGreeting = (studentObjectParam) => {
        return`Hi, ${studentObjectParam.name}!`
    }
    useEffect(()=>{
        updateGreeting(studentObject)
        },
        [studentObject]
     )
     return(
        <h2>{updateGreeting(studentObject)}</h2>
     )

    }
