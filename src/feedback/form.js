import '../App.css';
import React, {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {Link} from 'react-router-dom';
import {CollegeHeader} from "../App";
import {Checkbox} from "./Checkbox";

const departments = ["Civil", "Computer Science", "Mechanical", "Electronics and Communications"];

const pointsMap = {};
export const Form = () => {

    const[pointsMap, setPointsMap] = useState({})
    const savePoints = (points, qNumber) => {
       pointsMap[qNumber] = points
        setPointsMap(pointsMap)
    }

    const handleSubmit = (e) => {
        const teacherId = window.localStorage.getItem('teacherId');
        Object.keys(pointsMap).map(qNumber => {
            fetch("http://localhost:8080/feedback", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':"Basic TmFuZGluaTpuQDc4ODgw"
                },
                method: "POST",
                body: JSON.stringify({
                    teacherId: teacherId,
                    studentId: 1,
                    questionNum: qNumber,
                    points: pointsMap[qNumber],
                })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // setFirstName('');
                        // setLastName('');
                        // setSemester('');
                        // setRollNumber('');
                        // setDepartment(departments[0]);
                    },
                    (error) => {
                    }
                )
        });
    }
    //

    return (
        <div >
        <Table striped bordered hover style={{ width : '70%', marginLeft :'15%'}}>
            <thead>
            <tr>
                <th className="feedbackQuestions">Questions</th>
                <th className="feedbackAnswers">Strongly Agree</th>
                <th className="feedbackAnswers">Agree</th>
                <th className="feedbackAnswers">Neutral</th>
                <th className="feedbackAnswers">Disagree</th>
                <th className="feedbackAnswers">Strongly Disagree</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Made students feel free to ask questions</td>
                <td><Checkbox savePoints={savePoints} points={5} qNumber={1}/></td>
                <td><Checkbox savePoints={savePoints} points={4} qNumber={1}/></td>
                <td><Checkbox savePoints={savePoints} points={3} qNumber={1}/></td>
                <td><Checkbox savePoints={savePoints} points={2} qNumber={1}/></td>
                <td><Checkbox savePoints={savePoints} points={1} qNumber={1}/></td>

            </tr>
            <tr>
                <td>Was capable of answering questions</td>
                <td><Checkbox savePoints={savePoints} points={5} qNumber={2}/></td>
                <td><Checkbox savePoints={savePoints} points={4} qNumber={2}/></td>
                <td><Checkbox savePoints={savePoints} points={3} qNumber={2}/></td>
                <td><Checkbox savePoints={savePoints} points={2} qNumber={2}/></td>
                <td><Checkbox savePoints={savePoints} points={1} qNumber={2}/></td>
            </tr>
            <tr>
                <td>Communicated clearly</td>
                <td><Checkbox savePoints={savePoints} points={5} qNumber={3}/></td>
                <td><Checkbox savePoints={savePoints} points={4} qNumber={3}/></td>
                <td><Checkbox savePoints={savePoints} points={3} qNumber={3}/></td>
                <td><Checkbox savePoints={savePoints} points={2} qNumber={3}/></td>
                <td><Checkbox savePoints={savePoints} points={1} qNumber={3}/></td>
            </tr>
            <tr>
                <td>Assigned homework that was relevant to course material</td>
                <td><Checkbox savePoints={savePoints} points={5} qNumber={4}/></td>
                <td><Checkbox savePoints={savePoints} points={4} qNumber={4}/></td>
                <td><Checkbox savePoints={savePoints} points={3} qNumber={4}/></td>
                <td><Checkbox savePoints={savePoints} points={2} qNumber={4}/></td>
                <td><Checkbox savePoints={savePoints} points={1} qNumber={4}/></td>
            </tr>
            <tr>
                <td>Allowed sufficient time to complete homework assignments</td>
                <td><Checkbox savePoints={savePoints} points={5} qNumber={5}/></td>
                <td><Checkbox savePoints={savePoints} points={4} qNumber={5}/></td>
                <td><Checkbox savePoints={savePoints} points={3} qNumber={5}/></td>
                <td><Checkbox savePoints={savePoints} points={2} qNumber={5}/></td>
                <td><Checkbox savePoints={savePoints} points={1} qNumber={5}/></td>
            </tr>
            <tr>
                <td>Gave exams that reflected the material covered in lectures and assignments</td>
                <td><Checkbox savePoints={savePoints} points={5} qNumber={6}/></td>
                <td><Checkbox savePoints={savePoints} points={4} qNumber={6}/></td>
                <td><Checkbox savePoints={savePoints} points={3} qNumber={6}/></td>
                <td><Checkbox savePoints={savePoints} points={2} qNumber={6}/></td>
                <td><Checkbox savePoints={savePoints} points={1} qNumber={6}/></td>
            </tr>
            <tr>
                <td>Provided constructive feedback on graded material</td>
                <td><Checkbox savePoints={savePoints} points={5} qNumber={7}/></td>
                <td><Checkbox savePoints={savePoints} points={4} qNumber={7}/></td>
                <td><Checkbox savePoints={savePoints} points={3} qNumber={7}/></td>
                <td><Checkbox savePoints={savePoints} points={2} qNumber={7}/></td>
                <td><Checkbox savePoints={savePoints} points={1} qNumber={7}/></td>
            </tr>
            <tr>
                <td>Kept students informed about their class grades and progress</td>
                <td><Checkbox savePoints={savePoints} points={5} qNumber={8}/></td>
                <td><Checkbox savePoints={savePoints} points={4} qNumber={8}/></td>
                <td><Checkbox savePoints={savePoints} points={3} qNumber={8}/></td>
                <td><Checkbox savePoints={savePoints} points={2} qNumber={8}/></td>
                <td><Checkbox savePoints={savePoints} points={1} qNumber={8}/></td>
            </tr>
            <tr>
                <td>Was available outside of lecture</td>
                <td><Checkbox savePoints={savePoints} points={5} qNumber={9}/></td>
                <td><Checkbox savePoints={savePoints} points={4} qNumber={9}/></td>
                <td><Checkbox savePoints={savePoints} points={3} qNumber={9}/></td>
                <td><Checkbox savePoints={savePoints} points={2} qNumber={9}/></td>
                <td><Checkbox savePoints={savePoints} points={1} qNumber={9}/></td>
            </tr>
            <tr>
                <td>Set and followed clearly defined grading criteria</td>
                <td><Checkbox savePoints={savePoints} points={5} qNumber={10}/></td>
                <td><Checkbox savePoints={savePoints} points={4} qNumber={10}/></td>
                <td><Checkbox savePoints={savePoints} points={3} qNumber={10}/></td>
                <td><Checkbox savePoints={savePoints} points={2} qNumber={10}/></td>
                <td><Checkbox savePoints={savePoints} points={1} qNumber={10}/></td></tr>
            <tr>
                <td>Utilized the entire allotted lecture time</td>
                <td><Checkbox savePoints={savePoints} points={5} qNumber={11}/></td>
                <td><Checkbox savePoints={savePoints} points={4} qNumber={11}/></td>
                <td><Checkbox savePoints={savePoints} points={3} qNumber={11}/></td>
                <td><Checkbox savePoints={savePoints} points={2} qNumber={11}/></td>
                <td><Checkbox savePoints={savePoints} points={1} qNumber={11}/></td>  </tr>
            <tr>
                <td>I would recommend this teacher to other students</td>
                <td><Checkbox savePoints={savePoints} points={5} qNumber={12}/></td>
                <td><Checkbox savePoints={savePoints} points={4} qNumber={12}/></td>
                <td><Checkbox savePoints={savePoints} points={3} qNumber={12}/></td>
                <td><Checkbox savePoints={savePoints} points={2} qNumber={12}/></td>
                <td><Checkbox savePoints={savePoints} points={1} qNumber={12}/></td></tr>
            </tbody>
        </Table>
         <button style={{marginLeft:'50%', height:'35px', marginBottom: '15px'}} onClick={(e) => {
             handleSubmit(e)
         }}>Submit</button>
        </div>
);

}