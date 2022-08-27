import React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { Authorized } from "./auth/Authorized"
import { Greeting } from "./auth/Greeting"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { NavBar } from "./nav/NavBar"
import { AddClass } from "./pages/AddClass"
import { Dashboard } from "./pages/Dashboard"
import { UpdateGoal } from "./pages/UpdateGoal"


export const CoursePlanner=()=>{
    const loggedInStudent=localStorage.getItem("planner_student")
    const studentObject=JSON.parse(loggedInStudent)
    console.log(studentObject)
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
                <Authorized>
                    <React.Fragment>
                        <NavBar />
                        <h1 className="title--main">Course Planner</h1>
                        {studentObject ? <Greeting />:""}
                        <div>What will you learn today?</div>
                        {studentObject ? <Dashboard />:""}
                        <Outlet />
                    </React.Fragment>
                </Authorized>
            }
            />
             
            <Route path="/addClass" element={<AddClass />} />
            <Route path="/updateGoal/:studentCourseId" element={<UpdateGoal />} />
            
        </Routes>
        
    )
}