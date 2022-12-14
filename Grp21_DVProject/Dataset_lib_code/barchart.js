const data = [
  { Country: 'Brazil', Price_USD: 3.6 },
  { Country: 'Canada', Price_USD: 4.37 },
  { Country: 'Australia', Price_USD: 4.42},
  { Country: 'South Korea', Price_USD: 3.87 },
  { Country: 'Germany', Price_USD: 4.92 },
  { Country: 'United Kingdom', Price_USD: 5.65 },
  { Country: 'Spain', Price_USD: 5.41 },
  { Country: 'Italy', Price_USD: 5.41 },
  { Country: 'Mexico', Price_USD: 4.96 },
  { Country: 'Japan', Price_USD: 5.3 },
  { Country: 'France', Price_USD: 5.9 },
  { Country: 'United States', Price_USD: 6.99 },
];


const width = 800;
const height = 800;
const margin = { top: 30, bottom: 30, left: 30, right: 30 };

const svg = d3.select('#d3-container')
  .append('svg')
  .attr('width', width - margin.left - margin.right)
  .attr('height', height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

const x = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([margin.left, width - margin.right])
  .padding(0.1)

const y = d3.scaleLinear()
  .domain([0, 10])
  .range([height - margin.bottom, margin.top])

svg
  .append("g")
  .attr("fill", 'red')
  .selectAll("rect")
  .data(data.sort((a, b) => d3.descending(a.Price_USD, b.Price_USD)))
  .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d.Price_USD))
    .attr('title', (d) => d.Price_USD)
    .attr("class", "rect")
    .attr("height", d => y(0) - y(d.Price_USD))
    .attr("width", x.bandwidth());

function yAxis(g) {
  g.attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
    .attr("font-size", '15px')
}

function xAxis(g) {
  g.attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => data[i].Country))
    .attr("font-size", '10px')
}

svg.append("g").call(xAxis);
svg.append("g").call(yAxis);
svg.node();