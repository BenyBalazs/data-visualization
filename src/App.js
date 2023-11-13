import './App.css';
import economyCsv from './asd/Global Economy Indicators.csv';
import Papa from 'papaparse';
import {useEffect, useState} from "react";
import MultiLineChart from "./MultiLineChart";

function App() {

    const [data, setData] = useState([]);
    const [countries, setCountries] = useState(new Set());
    const [years, setYears] = useState(new Set());
    const [currency, setCurrency] = useState(new Set());

    const [selectedCountry, setSelectedCountry] = useState(countries[0]);

    // Load the data when the component mounts
    useEffect(() => {
        Papa.parse(economyCsv, {
            download: true,
            header: true,
            complete: function (results) {
                let cleanedData = results.data.map(item => {
                    let newItem = {};
                    for (let key in item) {
                        let newKey = key.replace(/\s+/g, "");
                        newItem[newKey] = typeof item[key] === 'string' ? item[key].replace(/\s+/g, "") : item[key];
                    }
                    return newItem;
                });
                if (cleanedData) {
                    setData(cleanedData)
                    const tempCountries = new Set()
                    const tempYear = new Set()
                    const tempCurrency = new Set()
                    results.data.map(element => {
                        tempCountries.add(element[' Country '])
                        tempYear.add(element[' Year '])
                        tempCurrency.add(element[' Currency '])
                    })
                    setCountries(tempCountries)
                    setYears(tempYear)
                    setCurrency(tempCurrency)
                }
            }
        });
    }, []);

    console.log(data)

    const data1 = [
        {key: 'Line 1', values: [{xValue: 2020, yValue: 10}, {xValue: 2021, yValue: 15}]},
        {key: 'Line 2', values: [{xValue: 2020, yValue: 8}, {xValue: 2021, yValue: 12}]}
    ];

    return (<div className="App">
        <header className="App-header">
            <MultiLineChart data={data1}/>
        </header>
    </div>);
}

export default App;
