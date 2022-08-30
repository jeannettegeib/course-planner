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
import logo from "../../course-planner-logo.png"
import { Container } from "react-bootstrap"


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
                    <Container>
                        <NavBar />
                        <h1><center>
                        <img src={logo} /></center>
                        {studentObject ? <Greeting />:""}
                        
                        </h1>
                        {studentObject ? <Dashboard />:""}
                        <Outlet />
                    </Container>
                </Authorized>
            }
            />
             
            <Route path="/addClass" element={<AddClass />} />
            <Route path="/updateGoal/:studentCourseId" element={<UpdateGoal />} />
            
        </Routes>
        
    )
}