import './App.css';
import React, {useEffect, useState} from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


function App() {
    return (
        <div className="App">
            <Student/>

        </div>
    );
}

function Student() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [semester, setSemester] = useState('');
    const [semesterOptions, setSemesterOptions] = useState([]);
    const [rollNumber, setRollNumber] = useState('');

    useEffect(() => {
        fetch("http://localhost:8080/semester")
            .then(res => res.json())
            .then(
                (result) => {
                    setSemesterOptions(result);
                    //[ {id: 1, number:1}, {id:2, number:2}]
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                }
            )
    }, [])
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handleSemesterChange = (e) => {
        setSemester(e.value);
    }

    const handleRollNumberChange = (e) => {
        setRollNumber(e.target.value);
    }

    const handleSubmit = (e) => {
        const semesterId = semesterOptions
            .filter(semesterObj => semesterObj.number === semester)
            .map(semesterObj => semesterObj.id)[0]
        fetch("http://localhost:8080/student", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                rollNum: rollNumber,
                semesterId: semesterId
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setFirstName('');
                    setLastName('');
                    setSemester('');
                    setRollNumber('');
                },
                (error) => {
                }
            )
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Collage Name</h1>
            </header>
            <form onSubmit={(e) => {
                handleSubmit(e)
            }}>

                <h3>Student detail form</h3>
                <label> First Name</label>
                <input type="text" value={firstName} required onChange={(e) => handleFirstNameChange(e)}/><br/>
                <label> Last Name</label>
                <input type="text" value={lastName} required onChange={(e) => handleLastNameChange(e)}/><br/>
                <label> Roll Number</label>
                <input type="text" value={rollNumber} required onChange={(e) => handleRollNumberChange(e)}/><br/>
                <div className='drop-down'>
                    <label>Semester</label>
                    <Dropdown className='drop-down-select' options={semesterOptions.map(semester => semester.number)}
                              value={semester}
                              onChange={(e) => handleSemesterChange(e)}/>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default App;
