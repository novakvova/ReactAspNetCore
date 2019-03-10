import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class Tag extends React.Component {
  state = {
    columnDefs: [{
      headerName: "Name", field: "id", sortable: true, filter: true,  checkboxSelection: true
    },
    {
      headerName: "Name", field: "name", sortable: true, filter: true
    }, {
      headerName: "Created Date", field: "createdDate", sortable: true, filter: true
    },
    {
      headerName: "Удалить"
    }]
  }
  render() {
    return (
      <div className="ag-theme-balham"
      style={{
          height: '500px'
      }}>
      
      <AgGridReact rowSelection="single" pagination="true"
        columnDefs={this.state.columnDefs}
        rowData={this.props.tag}>
      </AgGridReact>
      </div>

    )
  }
}
export default Tag;