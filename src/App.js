import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {Link} from 'react-router-dom';


function App() {
    return (
        <div className="App">
            <Home/>

        </div>
    );
}

const departments = ["Civil", "Computer Science", "Mechanical", "Electronics and Communications"];

export const Home = () => {
    return (
        <div className="App">
            <CollegeHeader/>
            <div className="App-logo">
                <img
                    src="https://www.shutterstock.com/image-vector/university-buildingeducation-studentcity-landscape-house-260nw-1117704410.jpg"/>
            </div>
            <div>
                <table>
                    <tr>Our Vision</tr>
                    <tr>Empowering the rural youth through technical education</tr>
                </table>

            </div>
        </div>
    );
}

export const Student = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [semester, setSemester] = useState('');
    const [semesterOptions, setSemesterOptions] = useState([]);
    const [rollNumber, setRollNumber] = useState('');
    const [department, setDepartment] = useState(departments[0]);

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

    const handleDepartmentChange = (e) => {
        setDepartment(e.value);
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
                semesterId: semesterId,
                department: department
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setFirstName('');
                    setLastName('');
                    setSemester('');
                    setRollNumber('');
                    setDepartment(departments[0]);
                },
                (error) => {
                }
            )
    }

    return (
        <div className="App">
            <CollegeHeader/>
            <form onSubmit={(e) => {
                handleSubmit(e)
            }}>

                <h3>Student detail form</h3>
                <label> First Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" value={firstName} required onChange={(e) => handleFirstNameChange(e)}/>
                </label>
                <br/>
                <label> Last Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" value={lastName} required onChange={(e) => handleLastNameChange(e)}/>
                </label>
                <br/>
                <label> Roll Number:&nbsp;&nbsp;&nbsp;
                    <input type="text" value={rollNumber} required onChange={(e) => handleRollNumberChange(e)}/>
                </label>
                <br/>
                <div className='drop-down'>
                    <label style={{width: '23%'}}>Semester:</label>
                    <Dropdown className='select' options={semesterOptions.map(semester => semester.number)}
                              value={semester}
                              onChange={(e) => handleSemesterChange(e)}/>
                </div>
                <div className='drop-down'>
                    <label style={{width: '23%'}}>Department</label>
                    <Dropdown className='select' options={departments}
                              value={department}
                              onChange={(e) => handleDepartmentChange(e)}/>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}
export const Teacher = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [department, setDepartment] = useState(departments[0]);

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handleDepartmentChange = (e) => {
        setDepartment(e.value);
    }

    const handleSubmit = (e) => {
        fetch("http://localhost:8080/teacher", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                department: department
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setFirstName('');
                    setLastName('');
                    setDepartment(departments[0]);
                },
                (error) => {
                }
            )
    }

    return (
        <div className="App">
            <CollegeHeader/>
            <form onSubmit={(e) => {
                handleSubmit(e)
            }}>

                <h3>Teacher detail form</h3>
                <label> First Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" value={firstName} required onChange={(e) => handleFirstNameChange(e)}/><br/>
                </label>
                <label> Last Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" value={lastName} required onChange={(e) => handleLastNameChange(e)}/><br/>
                </label>
                <div className='drop-down'>
                    <label style={{width: '23%'}}>Department</label>
                    <Dropdown className='select' options={departments}
                              value={department}
                              onChange={(e) => handleDepartmentChange(e)}/>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export const AboutUs = () => {

    return (
        <div className="App">
            <CollegeHeader/>
            <h4 style={{textAlign: 'center'}}> About our Collage </h4>
        </div>
    )
}

export const CollegeHeader = () => {

    return (
        <header className="App-header">
            <h1 className="header">Collage Name</h1>
            <nav className="nav">
                <Link className="App-link" to="/"> Home</Link>
                <Link className="App-link" to="/student"> Student</Link>
                <Link className="App-link" to="/teacher"> Teacher</Link>
                <Link className="App-link" to="/feedbackForm"> FeedBackForm</Link>
                <Link className="App-link" to="/aboutUs"> AboutUs</Link>

            </nav>
        </header>
    )
}

export default App;
