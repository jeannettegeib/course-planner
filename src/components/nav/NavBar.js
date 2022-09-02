import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { Button } from "react-bootstrap"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Button className="addClassButton" onClick={()=>{navigate("/addClass")}}>Add a Course</Button>
            </li>
            
           
            {
                localStorage.getItem("planner_student")
                    ? <li className="navbar__item navbar__logout">
                        <Button className="logout-button" onClick={() => {
                            localStorage.removeItem("planner_student")
                            navigate("/", {replace: true})
                        }}>Logout</Button>
                    </li>
                    : ""
            }
        </ul>
    )
}
