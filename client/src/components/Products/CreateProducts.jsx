import React, { useState } from 'react';
import Nav from '../Nav';
import axios from 'axios';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';

const CreateProducts = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', name);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('price', price);

      await axios.post('http://localhost:3001/product/createProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/product');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div>
      <Header />
      <Nav />
      <main className='main-container'>
        <div className='container-fluid'>
          <div className='card-box'>
            <div className='row' style={{ marginTop: '5px' }}>
              <div className='col-sm-12'>
                <h2 style={{ textAlign: 'center' }}>Add Products</h2>
                <a href='/product' style={{ float: 'left' }} id='addbtn' className='btn btn-primary btn-rounded'>
                  Back
                </a>
              </div>
            </div>
            <br></br>
            <div className='card-box-1'>
              <form onSubmit={handleSubmit} style={{ marginLeft: '5%' }}>
                <div className='col-sm-12'>
                  <label htmlFor=''>Image</label>
                  <input type='file' placeholder='Enter Image' className='form-control' onChange={handleImageChange} />
                </div>
                <br />
                <div className='col-sm-12'>
                  <label>Name</label>
                  <input type='text' placeholder='Enter Name' className='form-control' onChange={(e) => setName(e.target.value)} />
                </div>
                <br />
                <div className='col-sm-12'>
                  <label>Category</label>
                  <input type='text' placeholder='Enter Category' className='form-control' onChange={(e) => setCategory(e.target.value)} />
                </div>
                <br />
                <div className='col-sm-12'>
                  <label>Description</label>
                  <input type='text' placeholder='Enter Description' className='form-control' onChange={(e) => setDescription(e.target.value)} />
                </div>
                <br />
                <div className='col-sm-12'>
                  <label>Price</label>
                  <input type='text' placeholder='Enter Price' className='form-control' onChange={(e) => setPrice(e.target.value)} />
                </div>
                <br />
                <br />
                <button type='submit' className='btn btn-success'>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateProducts;
