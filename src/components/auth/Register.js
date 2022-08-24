import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import "./Login.css"

export const Register = (props) => {
    const [student, setStudent] = useState({
        name: "",
        email: ""    
    })
    let navigate = useNavigate()

    const registerNewStudent = () => {
        return fetch("http://localhost:8088/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        })
            .then(res => res.json())
            .then(createdStudent => {
                if (createdStudent.hasOwnProperty("id")) {
                    localStorage.setItem("planner_student", JSON.stringify({
                        id: createdStudent.id,
                        name: createdStudent.name
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/students?email=${student.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewStudent()
                }
            })
    }

    const updateStudent = (evt) => {
        const copy = {...student}
        copy[evt.target.id] = evt.target.value
        setStudent(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Course Planner</h1>
                <fieldset>
                    <label htmlFor="name"> Name </label>
                    <input onChange={updateStudent}
                           type="text" id="name" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateStudent}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>

                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

