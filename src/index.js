import React from 'react';
// import ReactDOM from 'react-dom';
import {CoursePlanner} from "./components/CoursePlanner.js"
import { createRoot } from "react-dom/client"
import './index.css';
import { BrowserRouter } from "react-router-dom"

// ReactDOM.render(
//   <CoursePlanner />,
//   document.getElementById('root')
// );

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <CoursePlanner />
    </BrowserRouter>
)