import React, {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
} from 'chart.js';
import {getHistory} from "../../store/actions/currency";
import {useDispatch} from "react-redux";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
);

export const options = {
    responsive: true,
    scales: {
        x: {
            grid: {
                color: 'rgba(255,0,0,0.1)',
                borderColor: 'red'
            }
        },
        y: {
            grid: {
                color: 'rgba(0,255,0,0.1)',
                borderColor: 'green'
            }
        }
    }
};


const Graph = ({first,second, secondValue}) => {
    const dispatch=useDispatch()
    const [historyData, setHistoryData] = useState([])

    const dateFrom = ()=>{
        const df = new Date()-518400000
        return new Date(df).toISOString().slice(0,10)
    }
    const dateTo= ()=>{
        const dt= new Date()-86400000
        return new Date(dt).toISOString().slice(0,10)
    }

    const funct=(ob)=>{
        let arr =[]
        for(let key in ob){
            arr.push(key.slice(5))
        }
        arr.push(new Date().toISOString().slice(5,10))
        return arr
    }
    const funct2=(ob)=>{
        let arr =[]
        for(let key in ob){
            arr.push((ob[key][second]))
        }
        arr.push(secondValue)
        return arr
    }


    const labels = funct(historyData);
    const dataS = funct2(historyData);


    const data = {
        labels,
        datasets: [
            {
                data: dataS,
                borderColor: 'rgb(21,108,43)',
                backgroundColor: 'rgb(255,255,255)'
            }
        ],
    };

    useEffect(()=>{
        dispatch(getHistory(first,second,dateFrom(),dateTo())).then(data=>setHistoryData(data))
    },[])

    return (
        <div >
            <Line options={options} data={data}/>
        </div>


    );
};

export default Graph;