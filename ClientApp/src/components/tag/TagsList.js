import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Col, Row } from 'react-bootstrap';
import { connect } from "react-redux";
import { updateTag } from '../../actions/tagsActions';

class TagList extends React.Component {
  state = {
    errors:{

    },
    columnDefs: [{
      headerName: "Id", field: "id", sortable: true, filter: true, checkboxSelection: true
    },
    {
      headerName: "Name", field: "name", sortable: true, filter: true, editable:true
    }, {
      headerName: "Created Date", field: "createdDate", sortable: true, filter: true
    },
    {
      headerName: "Удалить", field: ""
    }]
  }
  // handleChange = (e) => {
  //   console.log("-TargetName-", e.target.name, e.target.value);
  //   this.setStateByErrors(e.target.name, e.target.value);
  // }
  onCellValueChanged = (data)=>
  {
    var ChangedTag = data.data;
    console.log("Cell Changed: ", ChangedTag.name)
    // data.preventDefault();
    let errors = {};
    if (ChangedTag.name === '') errors.name = "Cant't be empty!"


    const isValid = Object.keys(errors).length === 0
    if (isValid) {
        this.props.updateTag({ChangedTag})
            .then(
                () => this.setState({ done: true }),
                (err) => this.setState({ errors: err.response.data })
            )
            .then(this.setState({ errors }))
    }
    else {
      console.log("Cell Changed: ", ChangedTag)
        this.setState({ errors });
    }

  }

  render() {
    return (
      <Row>
        <Col md={12}>
          <div className="ag-theme-balham"
            style={{
              height: '500px'
            }}>

            <AgGridReact rowSelection="single" pagination="false" onCellValueChanged = {this.onCellValueChanged} 
              columnDefs={this.state.columnDefs}
              rowData={this.props.tag}>
            </AgGridReact>
          </div>
        </Col>
      </Row>
    )
  }
}
const mapStateToProps = (state) => {
  return {
      tags: state.tags.tags
  };
}
export default connect(mapStateToProps, { updateTag })(TagList);