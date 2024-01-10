import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/Show.css"

const Show = () => {

    const [formData, setFormData] = useState([]);

    useEffect(() => {
        axios.get(`https://elegant-crow-smock.cyclic.app/form/`)
            .then((res) => {
                console.log(res)
                setFormData(res.data)
            })
            .catch((er) => {
                console.log(er)
            })
    }, [])
    return (
        <div className="form-data-table">
            <div>
                <h1>Form Data Table</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.name}</td>
                                <td>{data.age}</td>
                                <td>{data.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Show