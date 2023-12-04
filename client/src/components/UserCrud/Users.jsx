import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../Nav'
import Header from '../Header'

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/user")
            .then(result => setUsers(result.data))
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/user/deleteUser/' + id)
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
                  <Header/>

            <Nav />
            <main className='main-container'>
                <div className="card-box">
                    <div className="row" style={{ marginTop: '5px' }} >
                        <div className="col-sm-12">
                            <h2 style={{ textAlign: 'center' }}>User Data</h2>
                            <a href="/user/create" style={{ float: 'right' }} id="addbtn" className="btn btn-success btn-rounded">Add New</a>
                        </div>
                    </div>
                    <br></br>
                    <table className='table table-bordered border-primary'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>E Mail</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) => {
                                    return <tr>
                                        <td>{user.name}</td>
                                        <td>{user.age}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Link to={`/user/update/${user._id}`} className='btn btn-primary'> Update</Link>
                                            &nbsp;&nbsp;
                                            <button className='btn btn-danger' onClick={(e) => handleDelete(user._id)}>Delete</button></td>
                                    </tr>
                                })
                            }
                        </tbody>

                    </table>
                </div>
            </main>
        </div>
    )
}

export default Users
