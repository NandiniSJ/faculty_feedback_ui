import './App.css';
import React, {useEffect, useState} from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {Link} from 'react-router-dom';
import {CollegeHeader} from "./App";

const departments = ["Civil", "Computer Science", "Mechanical", "Electronics and Communications"];

export const FeedBackForm = () =>{
    const [department, setDepartment] = useState('');
    const [teacher, setTeacher] = useState('');
    const [teacherOptions, setTeacherOptions] = useState([]);
    const [subject, setSubject] = useState('');
    const [subjectOptions, setSubjectOptions] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8080/teacher?department=' + department )
            .then(res => res.json())
            .then(
                (result) => {
                    setTeacher('')
                    setTeacherOptions(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                }
            )
    }, [department])

    useEffect(() => {
        if(teacher === ''){
            return;
        }
        const teacherId = teacherOptions
            .filter(teacherObj => teacherObj.firstName === teacher)
            .map(teacherObj => teacherObj.id)[0]
        fetch("http://localhost:8080/subject?teacherId="+ teacherId)
            .then(res => res.json())
            .then(
                (result) => {
                    setSubject('')
                    setSubjectOptions(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                }
            )
    }, [teacher])
    const handleDepartmentChange = (e) => {
        setDepartment(e.value);
    }

    const handleTeacherChange = (e) =>{
        // const teacher = teacherOption
        //     .filter(teacherObj => teacherObj.firstName === teacher)
        //     .map(semesterObj => semesterObj.id)[0]
        setTeacher(e.value);
    }

    const handleSubjectChange = (e) =>{
        // const teacher = teacherOption
        //     .filter(teacherObj => teacherObj.firstName === teacher)
        //     .map(semesterObj => semesterObj.id)[0]
        setSubject(e.value);
    }
    return (
        <div className="App">
            <CollegeHeader/>
            <div className='drop-down'>
                <label>Department</label>
                <Dropdown className='drop-down-select' options={departments}
                          value={department}
                          onChange={(e) => handleDepartmentChange(e)}/>
                <label>Teacher Name</label>
                <Dropdown className='drop-down-select' options={teacherOptions.map(teacher => teacher.firstName)}
                          value={teacher}
                          onChange={(e) => handleTeacherChange(e)}/>
                <label>Subject Name</label>
                <Dropdown className='drop-down-select' options={subjectOptions.map(subject => subject.name)}
                          value={subject}
                          onChange={(e) => handleSubjectChange(e)}/>
            </div>

        </div>
    );

}