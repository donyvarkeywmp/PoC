// src/components/filter.
import React, { useMemo } from "react";
import PropTypes from 'prop-types';

//import components
import TableContainer from './TableContainer';
import { Button } from "reactstrap";

function DatatableTables() {
    const columns = useMemo(
        () => [
            {
                Header: 'First Name',
                accessor: 'firstName',
            },
            {
                Header: 'Last Name',
                accessor: 'lastName'
            },
            {
                Header: 'Age',
                accessor: 'age'
            },
            {
                Header: 'Visits',
                accessor: 'visits'
            },
            {
                Header: 'Status',
                accessor: 'status'
            },
            {
                Header: 'Profile Progress',
                accessor: 'progress'
            },
        ],
        []
    );

    const data = [
        {
            "firstName": "horn-od926",
            "lastName": "selection-gsykp",
            "age": 22,
            "visits": 20,
            "progress": 39,
            "status": "single"
        },
        {
            "firstName": "heart-nff6w",
            "lastName": "information-nyp92",
            "age": 16,
            "visits": 98,
            "progress": 40,
            "status": "complicated"
        },
        {
            "firstName": "minute-yri12",
            "lastName": "fairies-iutct",
            "age": 7,
            "visits": 77,
            "progress": 39,
            "status": "single"
        },
        {
            "firstName": "degree-jx4h0",
            "lastName": "man-u2y40",
            "age": 27,
            "visits": 54,
            "progress": 92,
            "status": "relationship"
        },
        {
            "firstName": "horn-od926",
            "lastName": "selection-gsykp",
            "age": 22,
            "visits": 20,
            "progress": 39,
            "status": "single"
        },
        {
            "firstName": "heart-nff6w",
            "lastName": "information-nyp92",
            "age": 16,
            "visits": 98,
            "progress": 40,
            "status": "complicated"
        },
        {
            "firstName": "minute-yri12",
            "lastName": "fairies-iutct",
            "age": 7,
            "visits": 77,
            "progress": 39,
            "status": "single"
        },
        {
            "firstName": "degree-jx4h0",
            "lastName": "man-u2y40",
            "age": 27,
            "visits": 54,
            "progress": 92,
            "status": "relationship"
        },
        {
            "firstName": "horn-od926",
            "lastName": "selection-gsykp",
            "age": 22,
            "visits": 20,
            "progress": 39,
            "status": "single"
        },
        {
            "firstName": "heart-nff6w",
            "lastName": "information-nyp92",
            "age": 16,
            "visits": 98,
            "progress": 40,
            "status": "complicated"
        },
        {
            "firstName": "minute-yri12",
            "lastName": "fairies-iutct",
            "age": 7,
            "visits": 77,
            "progress": 39,
            "status": "single"
        },
        {
            "firstName": "degree-jx4h0",
            "lastName": "man-u2y40",
            "age": 27,
            "visits": 54,
            "progress": 92,
            "status": "relationship"
        }
    ];

     //meta title
    document.title = "Data Tables | Skote - React Admin & Dashboard Template";

    return (
        <div className="page-content">
            <div className="container-fluid">
                {/* <TableContainer columns={columns} data={data} /> */}
                <Button>Export</Button>
                <TableContainer
                    columns={columns}
                    data={data}
                    isAddOptions={true}
                    customPageSize={10}
                />
            </div>
        </div>
    );
}
DatatableTables.propTypes = {
    preGlobalFilteredRows: PropTypes.any,

};


export default DatatableTables;