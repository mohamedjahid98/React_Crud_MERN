import React, { useState } from 'react'
import Nav from '../Nav'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const CreateEmp = () => {
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
      errors.name = 'name is required';
      valid = false;
    }
    if (!age) {
      errors.age = 'Age is required';
      valid = false;
    }
    if (!dob) {
      errors.dob = 'D.O.B is required';
      valid = false;
    } if (!gender) {
      errors.gender = 'Gender is required';
      valid = false;
    } if (!email) {
      errors.email = 'email is required';
      valid = false;
    } if (!password) {
      errors.password = 'Password is required';
      valid = false;
    } if (!address) {
      errors.address = 'Address is required';
      valid = false;
    }
    setErrors(errors);
    return valid;
  };

  const Submit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post('http://localhost:3001/employee/createEmployee', { name, age, gender, dob, email, password, address })
        .then((result) => {
          console.log(result);
          navigate('/employee');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <Nav />
      <br />
      <div class="container-fluid">
        <div class="card-box">
          <div class="row"  >
            <div class="col-sm-12">
              <h2 style={{ textAlign: 'center' }}>Add Employee</h2>
              <a href="/employee" style={{ marginLeft: '15%' }} id="addbtn" className="btn btn-primary btn-rounded">Back</a>
            </div>
          </div>
          
          <div class="card-box-1">
            <form onSubmit={Submit} style={{ marginLeft: '5%' }}>
              <div className='row'>
                <div className='col-sm-6'>
                  <label>Name</label>
                  <input type='text' placeholder='Enter Name' className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    onChange={(e) => setName(e.target.value)} />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div><br />
                <div className='col-sm-6'>
                  <label>Age</label>
                  <input type='number' placeholder='Enter Age' className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                    onChange={(e) => setAge(e.target.value)} />
                  {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                </div>
              </div><br />
              <div className='row'>
                <div className='col-sm-6'>
                  <label>D.O.B</label>
                  <input type='date' placeholder='Enter D.O.B' className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                    onChange={(e) => setDob(e.target.value)} />
                  {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                </div><br />
                <div className='col-sm-6'>
                  <label>Gender</label>
                  <select className={`form-select ${errors.gender ? 'is-invalid' : ''}`} onChange={(e) => setGender(e.target.value)}>
                    <option selected disabled>Choose..</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                </div>
              </div><br />
              <div className='row'>
                <div className='col-sm-6'>
                  <label>E-Mail</label>
                  <input type="email" placeholder="Enter E-Mail" className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    onChange={(e) => setEmail(e.target.value)} />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Password</label>
                  <div className='input-group'>
                    <input type={showPassword ? 'text' : 'password'} placeholder='Enter Password'
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`} onChange={(e) => setPassword(e.target.value)} />
                    <button className='btn btn-outline-secondary' type='button'
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <i className='fas fa-eye'></i>
                      ) : (
                        <i className='fas fa-eye-slash'></i>
                      )}
                    </button>
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                </div>
              </div><br />
              <div className='row'>
                <div className='col-sm-12'>
                  <label>Address</label>
                  <textarea rows={3}  placeholder='Enter Address' className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    onChange={(e) => setAddress(e.target.value)} />
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>
              </div><br />
              <button className='btn btn-success'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEmp
