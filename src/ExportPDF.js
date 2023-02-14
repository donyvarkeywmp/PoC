import React from 'react'
import jsPDF from 'jspdf';
import 'jspdf-autotable';


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

const ExportPDF = () => {
  function generatePdf() {
    const doc = new jsPDF();
  
    const tableData = [];
    const tableColumns = [
      { header: 'Account', dataKey: 'name' },
      {
        header: 'Cost/Month',
        columns: [
          ...data.months.map((month) => ({
            header: month,
            dataKey: month.toLowerCase().substring(0, 3),
          })),
        ],
      },
      { header: 'Total Cost', dataKey: 'total' },
    ];
  
    let totalCosts = Array.from({ length: 6 }, () => 0);
    data.data.forEach((item) => {
      const rowData = {
        name: item.name,
        cost: '---',
      };
    
      data.months.forEach((month, index) => {
        rowData[month.toLowerCase().substring(0, 3)] = item.data[index];
      });
    
      rowData.total = rowData.sep + rowData.oct + rowData.nov + rowData.dec + rowData.jan + rowData.feb;
    
      totalCosts = totalCosts.map((value, index) => value + item.data[index]);
      tableData.push(rowData);
    });
    const totalRowData = {
      name: 'Total',
      sep: totalCosts[0],
      oct: totalCosts[1],
      nov: totalCosts[2],
      dec: totalCosts[3],
      jan: totalCosts[4],
      feb: totalCosts[5],
    };
    totalRowData.total = totalRowData.sep + totalRowData.oct + totalRowData.nov + totalRowData.dec + totalRowData.jan + totalRowData.feb;
    tableData.push(totalRowData);
  
    doc.autoTable({
      head: [tableColumns.map(column => column.header)],
      body: tableData,
      theme: 'grid'
    });
  
    doc.save('myDocument.pdf');
  }
  
  return (
    <div>
      <button className='btn btn-primary' onClick={generatePdf}>Generate PDF</button>
    </div>
  )
}

export default ExportPDF