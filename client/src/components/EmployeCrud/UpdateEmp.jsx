import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from '../Nav'

const UpdateEmp = () => {

  const { id } = useParams()
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const errors = {};
    if (!name) {
        errors.name = 'Name is required';
        valid = false;
    }
    if (!email) {
        errors.email = 'Email is required';
        valid = false;
    } if (!password) {
        errors.password = 'Password is required';
        valid = false;
    }
    setErrors(errors);
    return valid;
};
  useEffect(() => {
      axios.get("http://localhost:3001/employee/getEmployee/" + id)
        .then(result => {
          console.log(result)
          setName(result.data.name)
          setAge(result.data.age)
          setGender(result.data.gender)
          const formattedDob = new Date(result.data.dob).toISOString().split('T')[0]; //date format to remove time
          setDob(formattedDob) //and to convert dd/mm/yyyy format
          setEmail(result.data.email)
          setPassword(result.data.password)
          setAddress(result.data.address)
        })
        .catch(err => console.log(err))
  }, [])

  const Update = (e) => {
    e.preventDefault();
    if (validateForm()) {
    axios.put("http://localhost:3001/employee/updateEmployee/" + id, { name, age, gender, dob, email, password, address })
      .then(result => {
        console.log(result)
        navigate('/employee')
      })
      .catch(err => console.log(err))
    }
  }

  return (
    <div>
      <Nav />
      <br />
      <div className="container-fluid">
        <div className="card-box">
          <div className="row" style={{ marginTop: '5px' }} >
            <div className="col-sm-12">
              <h2 style={{ textAlign: 'center' }}>Update Employee</h2>
              <a href="/employee" style={{ marginLeft: '15%' }} id="addbtn" className="btn btn-primary btn-rounded">Back</a>
            </div>
          </div>
          <br></br>
          <div className="card-box-1">
            <form onSubmit={Update} style={{ marginLeft: '5%' }}>
              <div className='row'>
                <div className='col-sm-6'>
                  <label htmlFor=''>Name</label>
                  <input type='text' placeholder='Enter Name' className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={name}
                    onChange={(e) => setName(e.target.value)} />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div><br />
                <div className='col-sm-6'>
                  <label>Age</label>
                  <input type='number' placeholder='Enter Age' className='form-control' value={age}
                    onChange={(e) => setAge(e.target.value)} />
                </div>
              </div><br />
              <div className='row'>
                <div className='col-sm-6'>
                  <label htmlFor=''>D.O.B</label>
                  <input type='date' placeholder='Enter D.o.B' className='form-control' value={dob}
                    onChange={(e) => setDob(e.target.value)} />
                </div><br />
                <div className='col-sm-6'>
                  <label>Age</label>
                  <select className="form-select" onChange={(e) => setGender(e.target.value)} value={gender}>
                    <option selected disabled>Choose..</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div><br />
              <div className='row'>
                <div className='col-sm-6'>
                  <label>E-Mail</label>
                  <input type='email' placeholder='Enter E-Mail' className='form-control' value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='col-sm-6'>
                  <label>Password</label>
                  <div className='input-group'>
                    <input type={showPassword ? 'text' : 'password'} placeholder='Enter Password'
                      className='form-control'value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='btn btn-outline-secondary' type='button'
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <i className='fas fa-eye'></i>
                      ) : (
                        <i className='fas fa-eye-slash'></i>
                      )}
                    </button>
                  </div>
                </div>

              </div><br />
              <div className='row'>
                <div className='col-sm-6'>
                  <label>Address</label>
                  <input type='address' placeholder='Enter Address' className='form-control' value={address}
                    onChange={(e) => setAddress(e.target.value)} />
                </div>
              </div><br /><br />
              <button className='btn btn-success'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateEmp
