import '../App.css';
import React, {useEffect, useState} from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {Link} from 'react-router-dom';
import {CollegeHeader} from "../App";

const departments = ["Civil", "Computer Science", "Mechanical", "Electronics and Communications"];

export const Filters = () =>{
    const [department, setDepartment] = useState('');
    const [teacher, setTeacher] = useState('');
    const [teacherOptions, setTeacherOptions] = useState([]);
    const [subject, setSubject] = useState('');
    const [subjectOptions, setSubjectOptions] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8080/teacher?department=' + department , {
            headers: {
                'Authorization':"Basic TmFuZGluaTpuQDc4ODgw"
            }
        })
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
        fetch("http://localhost:8080/subject?teacherId="+ teacherId, {
            headers: {
                'Authorization':"Basic TmFuZGluaTpuQDc4ODgw"
            }
        })
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
        const teacherId = teacherOptions
            .filter(teacherObj => teacherObj.firstName === teacher)
            .map(teacherObj => teacherObj.id)[0]
        window.localStorage.setItem('teacherId', teacherId)
        debugger
        setTeacher(e.value);
    }

    const handleSubjectChange = (e) =>{
        // const teacher = teacherOption
        //     .filter(teacherObj => teacherObj.firstName === teacher)
        //     .map(semesterObj => semesterObj.id)[0]
        setSubject(e.value);
    }
    return (
            <div className='form-filter'>
                <label style={{width: '23%'}}>Department</label>
                <Dropdown className='select' options={departments}
                          value={department}
                          onChange={(e) => handleDepartmentChange(e)}/>
                <label style={{width: '23%'}}>Teacher Name</label>
                <Dropdown className='select' options={teacherOptions.map(teacher => teacher.firstName)}
                          value={teacher}
                          onChange={(e) => handleTeacherChange(e)}/>
                <label style={{width: '23%'}}>Subject Name</label>
                <Dropdown className='select' options={subjectOptions.map(subject => subject.name)}
                          value={subject}
                          onChange={(e) => handleSubjectChange(e)}/>
            </div>
    );

}