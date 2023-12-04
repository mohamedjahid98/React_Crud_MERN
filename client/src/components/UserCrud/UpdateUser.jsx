import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from '../Nav'

const UpdateUser = () => {

    const { id } = useParams()
    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [email, setEmail] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3001/user/getUser/" + id)
            .then(result => {
                console.log(result)
                setName(result.data.name)
                setAge(result.data.age)
                setEmail(result.data.email);
            })
            .catch(err => console.log(err))
    }, [])

    const Update = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3001/user/updateUser/" + id, { name, age, email })
            .then(result => {
                console.log(result)
                navigate('/user')
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Nav/>
            <br />
            <div class="container-fluid">
                <div class="card-box">
                    <div class="row" style={{ marginTop: '5px' }} >
                        <div class="col-sm-12">
                            <h2 style={{ textAlign: 'center' }}>Update User</h2>
                            <a href="/user" style={{ marginLeft: '15%' }} id="addbtn" class="btn btn-primary btn-rounded">Back</a>
                        </div>
                    </div>
                    <br></br>
                    <div class="card-box-1">
                        <form onSubmit={Update} style={{marginLeft:'5%'}}>
                            <div className='col-sm-12'>
                                <label htmlFor=''>Name</label>
                                <input type='text' placeholder='Enter Name' className='form-control' value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </div><br/>
                            <div className='col-sm-12'>
                                <label>Age</label>
                                <input type='number' placeholder='Enter Age' className='form-control' value={age}
                                    onChange={(e) => setAge(e.target.value)} />
                            </div><br/>
                            <div className='col-sm-12'>
                                <label>E Mail</label>
                                <input type='email' placeholder='Enter E-Mail' className='form-control' value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div><br/><br/>
                            <button className='btn btn-success'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser
