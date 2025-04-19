import React, { useEffect, useState } from 'react'
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import SearchBar from '../common/SearchBar';

export default function Student() {

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadStudent()
    }, [])

    const loadStudent = async () => {
        const result = await axios.get("http://localhost:8080/students", {
            validateStatus: () => {
                return true;
            }
        }
        );
        if (result.status === 200) {
            setStudents(result.data);
        }
    }

    async function handleDelete(id) {
        await axios.delete(`http://localhost:8080/students/delete/${id}`);
        loadStudent()
    }

    return (
        <section className='container'>
            <h2 className='text-center my-5'>Students</h2>
            <SearchBar search={search} setSearch={setSearch} />
            <table className="table table-bordered table-hover shadow">
                <thead>
                    <tr className='text-center'>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='center'>
                    {students.filter(st => st.firstName.toLowerCase().includes(search.toLowerCase())).length > 0 ? (
                        students.filter(st => st.firstName.toLowerCase().includes(search.toLowerCase()))
                            .map((student, index) => (
                                <tr key={student.id}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.email}</td>
                                    <td>{student.department}</td>
                                    <td className='mx-2'>
                                        <Link className="btn btn-info" to={`/student-profile/${student.id}`}><FaEye /></Link>
                                    </td>
                                    <td className='mx-2'>
                                        <button className="btn btn-danger" onClick={() => handleDelete(student.id)}><FaTrashAlt /></button>
                                    </td>
                                    <td className='mx-2'>
                                        <Link className="btn btn-warning" to={`/edit-student/${student.id}`}><FaEdit /></Link>
                                    </td>
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">No students found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </section>
    )
}
