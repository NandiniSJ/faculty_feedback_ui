import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, {Student, Teacher, Home, AboutUs} from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider} from "react-router-dom"
import {FeedBackForm} from "./feedback/FeedBackForm";


const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
    {
        path: "/",
        element:<Home/>,
    },{
        path: "/student",
        element:<Student/>,
    },{
        path: "/teacher",
        element: <Teacher/>
    },{
        path: "/aboutUs",
        element: <AboutUs/>
    },{
        path: "/feedbackForm",
        element: <FeedBackForm/>
    }
]);
root.render(

    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
//
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
