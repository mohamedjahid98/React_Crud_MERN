import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';

import Nav from '../Nav'
import Header from '../Header';

const Employee = () => {
    const [employees, setEmployees] = useState([])
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');


    useEffect(() => {
        axios.get("http://localhost:3001/employee/empdata")
            .then(result => {
                // Format D.O.B before setting the state
                const formattedEmployees = result.data.map(emp => {
                    return {
                        ...emp,
                        dob: new Date(emp.dob).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })
                    };
                });
                setEmployees(formattedEmployees);

            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/employee/deleteEmployee/' + id)
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    //update and delete btn function
    const actionTemplate = (rowData) => {
        return (
            <div>
                <Link to={`/employee/update/${rowData._id}`} className='btn btn-primary'> Update</Link>
                &nbsp;&nbsp;
                <button className='btn btn-danger' onClick={() => handleDelete(rowData._id)}>Delete</button>
            </div>
        );
    };

    return (
        <div>
            <Header />
            <Nav />
            <main className='main-container'>
                <div className="card-box">
                    <div className="row" style={{ marginTop: '5px' }} >
                        <div className="col-sm-12">
                            <h2 style={{ textAlign: 'center',color:"black" }}>Employee Data</h2>
                            <a href="/employee/create" style={{ float: 'right' }} id="addbtn" className="btn btn-success btn-rounded">Add New</a>
                        </div>
                    </div>
                    <br></br>
                    <div className="flex justify-content-start">
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                        </span>
                    </div><br />
                    <DataTable value={employees} showGridlines filters={filters} globalFilterFields={['name', 'age', 'dob', 'gender', 'email', 'address']} stripedRows paginator rows={5} rowsPerPageOptions={[2, 5, 10]} tableStyle={{ minWidth: '50rem' }}
                        emptyMessage="No Employees found.">
                        <Column field="name" filterField="name" header="Name"></Column>
                        <Column field="age" filterField="age" header="Age"></Column>
                        <Column field="dob" filterField="dob" header="D.O.B"></Column>
                        <Column field="gender" filterField="gender" header="Gender"></Column>
                        <Column field="email" filterField="email" header="E-Mail"></Column>
                        <Column field="address" filterField="address" header="Address"></Column>
                        <Column header="Action" body={actionTemplate}></Column>

                        {/* <Column header="Action">

                             <Link to={`/employee/update/${employees._id}`} className='btn btn-primary'> Update</Link>
                                            &nbsp;&nbsp;
                 <button className='btn btn-danger' onClick={(e) => handleDelete(employees._id)}>Delete</button> 
                        </Column> */}
                    </DataTable>
                </div>
            </main>
        </div>
    )
}

export default Employee
