import { Button, Table } from "reactstrap";
import React, { useRef } from "react";
import ReactApexChart from "react-apexcharts";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as htmlToImage from 'html-to-image';
import ExportPDF from "./ExportPDF";

var uData = [
  {
    name: 'John',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345'
    }
  },
  {
    name: 'Jane',
    age: 25,
    address: {
      street: '456 Elm St',
      city: 'Othertown',
      state: 'NY',
      zip: '67890'
    }
  }
];

var columns = [
  { dataKey: 'name', header: 'Name' },
  { dataKey: 'age', header: 'Age' },
  {
    dataKey: 'address',
    header: 'Address',
    columns: [
      { dataKey: 'street', header: 'Street' },
      { dataKey: 'city', header: 'City' },
      { dataKey: 'state', header: 'State' },
      { dataKey: 'zip', header: 'Zip' }
    ]
  }
];



// 6M
const data = {
  data: [
    {
      name: 'Account 1',
      data: [1098, 1500, 600, 1180, 990, 705]
    },
    {
      name: "Account 2",
      data: [700, 390, 760, 880, 940, 720],
    },
    {
      name: "Account 3",
      data: [735, 300, 400, 580, 640, 220],
    }
  ],
  months: ["September", "October", "November", "December", "January", "February"]
}


// 3M
// const data = {
//   data: [
//     {
//       name: 'Account 1',
//       data: [1098, 1500, 600]
//     },
//     {
//       name: "Account 2",
//       data: [700, 390, 760],
//     },
//     {
//       name: "Account 3",
//       data: [735, 300, 400],
//     }
//   ],
//   months: ["December", "January", "February"]
// }


const Apaexlinecolumn = () => {
  const chartRef = useRef(null)
  const tableRef = useRef(null)
  const options = {
    colors: ["#3c4ccf", "#02a499", "#34f489", "#bff995", "#faab00"],
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 0.1,
    },
    grid: {
      borderColor: "#c3c3c3",
      row: {
        colors: ["transparent", "transparent", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: data.months,
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
    },
    legend: {
      show: true,
    },
  }
  const series = data.data

  // Setting the table headers.
  // Format --> Account Name | Months(3/6) | Total Cost
  const tableColumn = ["Account Name"];
  data.months.map((month, i) => {
    tableColumn.push(month)
  })
  tableColumn.push('Total Cost')

  // Setting up the table data rows.
  const tableRows = [];

  // Reforming the data to fit to the table.
  // Final table rows will be for 3 months data. 
  // ['Account 3', 735, 300, 400, 1435]
  series.forEach(item => {
    const rowData = [item.name];
    let sum = 0;
    item.data.forEach(cost => {
      rowData.push(cost)
      sum = sum + cost;
    })
    rowData.push(sum);
    tableRows.push(rowData);
  });
  console.log(tableRows);

  // Main function that handles the export of data
  // to PDF format
  const handleExport = async () => {
    const doc = new jsPDF();
    // Get the html element for the chart
    const chartEl = document.getElementById('cost-chart');
    // Convert the html element to image 
    const imgData = await htmlToImage.toPng(chartEl);
    // Add the image to the pdf document
    doc.addImage(imgData, 'PNG', 10, 30, 200, 60);
    // Create the table from the JSON data.
    doc.autoTable({ 
      margin: { top: 100 },
      head: [tableColumn],
      body: tableRows,
      theme: 'grid'
    });

    // Download the PDF report
    doc.save("report.pdf")
  };

  // [
  //   [ "Account 1", 1098, 1500, 600, 1180, 990, 705, 6073],
  //   ["Account 2", 700, 390, 760, 880, 940, 720, 4390],
  //   ['Account 3', 735, 300, 400, 580, 640, 220, 2875],
  //   ['Account 4', 705, 500, 100, 980, 600, 420, 3305],
  //   ['Account 5', 675, 200, 480, 280, 110, 290, 2035],
  //   ['Account 5', 724, 278, 1100, 380, 740, 250, 3472]
  // ]

  return (
    <div>
      <Button onClick={handleExport} style={{ border: 'none', width: 80, height: 40, backgroundColor: '#c3c', borderRadius: 5, color: '#fff', cursor: 'pointer', }}>Export</Button>
      <div id='cost-chart'>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height="290"
        />
      </div>
      <ExportPDF />
    </div>
  )
};

export default Apaexlinecolumn;