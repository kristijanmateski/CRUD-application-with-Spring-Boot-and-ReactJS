import React from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function EditStudent() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [student, setStudents] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
    });

    const { firstName, lastName, email, department } = student;

    useEffect(() => {
        loadStudent()
    }, [])

    const loadStudent = async () => {
        const result = await axios.get(`http://localhost:8080/students/student/${id}`);
        setStudents(result.data)
    }


    const handleInputChange = (e) => {
        setStudents({ ...student, 
            [e.target.name] : e.target.value })
    }

    async function updateStudent(e){
        e.preventDefault();
        await axios.put(`http://localhost:8080/students/update/${id}`,student);
        navigate("/view-students");
    }
  return (
    <div className='col-sm-8 py-2 px-5 offset-2 shadow'>
                <h2 className="my-5"> Add Student</h2>
                <form onSubmit={(e)=>updateStudent(e)}>
                    <div className='input-group mb-5'>
                        <label className='input-group-text' htmlFor='firstName'>First Name</label>
                        <input type="text" className='form-control col-sm-6' name='firstName' id='firstName' required value={firstName} onChange={(e)=> handleInputChange(e)}/>
                        </div>
                        <div className='input-group mb-5'>
                        <label className='input-group-text' htmlFor='lastName'>Last Name</label>
                        <input type="text" className='form-control col-sm-6' name='lastName' id='lastName' required value={lastName} onChange={(e)=> handleInputChange(e)} />
                        </div>
                        <div className='input-group mb-5'>
                        <label className='input-group-text' htmlFor='email'>Email</label>
                        <input type="email" className='form-control col-sm-6' name='email' id='email' required value={email} onChange={(e)=> handleInputChange(e)} />
                        </div>
                        <div className='input-group mb-5'>
                        <label className='input-group-text' htmlFor='department'>Department</label>
                        <input type="text" className='form-control col-sm-6' name='department' id='department' required value={department} onChange={(e)=> handleInputChange(e)} />
                        </div>
                        <div className='input-group mb-5'>
                            <div className='col-sm-2'>
                                <button type='submit' className='btn btn-outline-success btn-lg'>Save</button>
                            </div>
                            <div className='col-sm-2'>
                                <Link type='submit' to={"/view-students"} className='btn btn-outline-warning btn-lg'>Cancel</Link>
                            </div>
                        </div>
                </form>
            </div>
  )
}
