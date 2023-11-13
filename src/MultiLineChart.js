import React, {useRef, useEffect} from 'react';
import * as d3 from 'd3';
import randomColor from "randomcolor";

const colors = [];
const MultiLineChart = ({data}) => {
    const svgRef = useRef();
    const width = 600;
    const height = 400;
    const margin = {top: 20, right: 20, bottom: 30, left: 50};

    useEffect(() => {
        // Set up the SVG dimensions and margins
        const innerWidth =  width - margin.right;
        const innerHeight = height - margin.bottom
        const svg = d3.select(svgRef.current);
        // Set up the scales and axes
        const xScale = d3.scaleLinear().range([margin.left, innerWidth]);
        const yScale = d3.scaleLinear().range([innerHeight, margin.top]);
        const xAxis = d3.axisBottom(xScale).tickValues([2020, 2021]).tickFormat(x => Number(x));
        const yAxis = d3.axisLeft(yScale);

        // Set the domain of the scales
        xScale.domain(d3.extent(data.flatMap((d) => d.values), (d) => d.xValue));
        yScale.domain(d3.extent(data.flatMap((d) => d.values), (d) => d.yValue));

        // Draw the axes
        svg
            .append('g')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(xAxis);
        svg.append('g').attr('transform', `translate(${margin.left}, 0)`).call(yAxis);

        // Draw the lines
        const line = d3
            .line()
            .x((d) => {
                //console.log(d)
                return xScale(d.xValue)
            })
            .y((d) => yScale(d.yValue));

        /*svg
            .append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('d',(d)=> {
                return line(d.values)
            });*/
        const lines = svg
            .selectAll(".line")
            .data(data)
            .enter()
            .append("path")
            .attr("class","lines")
            .attr("fill", "none")
            .attr("stroke-width", 3)
            .attr("d", (d) => line(d.values));

        lines.each((d, i, nodes) =>{
            const element = nodes[i];
            const length = element.getTotalLength();
            d3.select(element)
                .attr("stroke-dasharray", `${length},${length}`)
                .attr("stroke-dashoffset", length)
                .transition()
                .duration(750)
                .attr("stroke", "red")
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0);
        })

    }, [data]);

    const generateRandomColors = () => {
        for (let i = 0; i < data.length; i++) {
            colors.push(randomColor())
        }
    }

    return <svg ref={svgRef} width={width+200} height={height+200}></svg>;
};

export default MultiLineChart;