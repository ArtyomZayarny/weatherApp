import React from 'react'
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';

export default function Chart({ data }) {
    return (
        <>
            <div className="bar-chart-wrapper">
                <BarChart width={400} height={400} data={data} >
                    <XAxis dataKey="name" />
                    <YAxis type="number" />
                    <CartesianGrid horizontal={false} />
                    <Tooltip />
                    <Bar dataKey="values" fill="#8884d8" />
                </BarChart>
            </div>

        </>
    )
}
