
/*
    const data1 = [
        {key: 'Line 1', values: [{xValue: 2020, yValue: 10}, {xValue: 2021, yValue: 15}]},
        {key: 'Line 2', values: [{xValue: 2020, yValue: 8}, {xValue: 2021, yValue: 12}]}
    ];
 */
export const transformToLineChart = (rawData, countries) => {
    const countryArray = countries.entries()
    let pos = 0;
    const transformedData = []
    let values = []
    let country = countryArray.shift()
    let dataRow = {key: country, values: values}
    while (countries) {
        let row = rawData[pos]
        if (row.Country !== country) {
            dataRow.values = values
            transformedData.push(dataRow)
            country = countries.shift()
            values = []
            dataRow = {key: country, values: values}
        }
        values.push({xValue: row.Year, yValue: row.Population})
        pos++
    }
    return transformedData;
}
