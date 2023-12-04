import React, { useState } from 'react'
import Nav from '../Nav'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("");
    const [nameTouched, setNameTouched] = useState(false);

    const [age, setAge] = useState("")
    const [ageError, setAgeError] = useState("");

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("");

    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault();
        if (name.trim() === "") {
            setNameError("Name is required");
            setNameTouched(true);
            return;
        }

        axios.post("http://localhost:3001/user/createUser", { name, age, email })
            .then(result => {
                console.log(result)
                navigate('/user')
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Nav />
            <br />
            <div className="container-fluid">
                <div className="card-box">
                    <div className="row" style={{ marginTop: '5px' }} >
                        <div class="col-sm-12">
                            <h2 style={{ textAlign: 'center' }}>Add User</h2>
                            <a href="/user" style={{ marginLeft: '15%' }} id="addbtn" className="btn btn-primary btn-rounded">Back</a>
                        </div>
                    </div>
                    <br></br>
                    <div class="card-box-1">
                        <form onSubmit={Submit} style={{marginLeft:'5%'}}>
                            <div className='col-sm-12'>
                                <label htmlFor=''>Name</label>
                                <input type='text' placeholder='Enter Name' className='form-control' 
                                    onChange={(e) => {setName(e.target.value);setNameTouched(true);}}  onBlur={() => {
                                        if (!name) {
                                          setNameError("Name is required");
                                        } else {
                                          setNameError("");
                                        }
                                      }}  />
                                    {nameError && nameTouched && <span className="error-text">{nameError}</span>}
                            </div><br/>
                            <div className='col-sm-12'>
                                <label>Age</label>
                                <input type='number' placeholder='Enter Age' className='form-control'
                                    onChange={(e) => setAge(e.target.value)} />
                            </div><br/>
                            <div className='col-sm-12'>
                                <label>E Mail</label>
                                <input type='email' placeholder='Enter E-Mail' className='form-control'
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

export default CreateUser
