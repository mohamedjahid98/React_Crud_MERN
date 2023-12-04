import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
  from 'react-icons/bs'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
  from 'recharts';
import Nav from './Nav';
import Header from './Header';

const Dashboard = () => {
  const [apiData, setApiData] = useState([]);
  const [apiData1, setApiData1] = useState([]);
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        //console.log(data)
        setApiData(data);
        setEmployeeCount(data.length);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((data) => {
        //console.log(data)
        setApiData1(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div >
      <Header />
      <Nav />
      <main className='main-container'>
        <div className='main-title'>
          <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
          <div className='card'>
            <div className='card-inner'>
              <h3>Employee</h3>
              <BsFillArchiveFill className='card_icon' />
            </div>
            <h1>{employeeCount}</h1>

          </div>
          <div className='card'>
            <div className='card-inner'>
              <h3>CATEGORIES</h3>
              <BsFillGrid3X3GapFill className='card_icon' />
            </div>
            <h1>12</h1>
          </div>
          <div className='card'>
            <div className='card-inner'>
              <h3>CUSTOMERS</h3>
              <BsPeopleFill className='card_icon' />
            </div>
            <h1>33</h1>
          </div>
          <div className='card'>
            <div className='card-inner'>
              <h3>ALERTS</h3>
              <BsFillBellFill className='card_icon' />
            </div>
            <h1>42</h1>
          </div>
        </div>

        <div className='row charts'>
          <div className='col'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={apiData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="id" fill="#8884d8" />
                <Bar dataKey="username" fill="#82ca9d" />
              </BarChart>

            </ResponsiveContainer>
          </div>
          <div className='col'>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={apiData1}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="postId" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="name" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

    </div>
  )
}

export default Dashboard
