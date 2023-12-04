import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nav from '../Nav';
import Header from '../Header';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/product/productdata")  // Correct endpoint
      .then(result => setProducts(result.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <Header />
      <Nav />
      <main className='main-container'>
        <div className="card-box">
          <div className="row" style={{ marginTop: '5px' }}>
            <div className="col-sm-12">
              <h2 style={{ textAlign: 'center' }}>Products Data</h2>
              <a href="/product/create" style={{ float: 'right' }} id="addbtn" className="btn btn-success btn-rounded">Add New</a>
            </div>
          </div>
          <br />
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 mb-4" key={product._id}>
                <div className="card">
                  {product.imageUrl && <img src={product.imageUrl} className="card-img-top" alt={product.imageUrl} />}
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Category: {product.category}</p>
                    <p className="card-text">Description: {product.description}</p>
                    <p className="card-text">Price: {product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Product;
