import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Button} from "@material-ui/core"; 


const columns = [
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
  //  editable: true,
  sortable: true, 
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    sortable: false, 
   // editable: true,
  },
  {
    field: "action", 
    headerName: "Action", 
    width: 150, 
    //editable: true, 
    renderCell:(params)=>{
      
      
      return (
        <Button>
          hell9
        </Button>
      )
      
    }
  }
 
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataGridDemo() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
