import '../App.css';
import React from "react";
import 'react-dropdown/style.css';
import {CollegeHeader} from "../App";
import {Filters} from "./Filters";
import {Form} from "./form";

export const FeedBackForm = () =>{
       return (
        <div className="App">
            <CollegeHeader/>
            <Filters/>
            <Form/>
        </div>
    );
}