import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Col, Row } from 'react-bootstrap';
import { connect } from "react-redux";
import { updateTagApi } from '../../actions/tagsActions';
import AddTag from './AddTag';
import DeleteTag from './DeleteTag';
import {bindActionCreators} from 'redux';
class TagList extends React.Component {

  state = {
    errors: {

    },
    columnDefs: [{
      headerName: "Id", field: "id", sortable: true, filter: true, checkboxSelection: true
    },
    {
      headerName: "Name", field: "name", sortable: true, filter: true, editable: true
    }, {
      headerName: "Created Date", field: "createdDate", sortable: true, filter: true
    },
    {
      headerName: "Удалить", field: ""
    }],
    getRowNodeId: function(data) {
      return data.id;
    }
  }
 
  getContextMenuItems = (params) => {
    const folderActions = [{
        name: "ADD_TAG",
        action: () => this.props.actions.addTagApi(params.node.data)
    }];

    const fileActions = [{
        name: "DELETE_TAG",
        action: () => this.props.actions.deleteTagApi(params.node.data)
    }];

    return params.node.group ? folderActions : fileActions;
  };

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // params.api.setRowData(this.props.tags);
  };


  onSelectionChanged() {
    this.setState({tag: this.gridApi.getSelectedRows()[0]})
    console.log("Cell Changed: ", this.props.rowData)
    console.log("Selected: ",this.state.tag)
  }

  onCellValueChanged = (data) => {
    var ChangedTag = data.data;
    console.log("Cell Changed: ", this.props.rowData)
    // data.preventDefault();
    let errors = {};
    if (ChangedTag.name === '') errors.name = "Cant't be empty!"


    const isValid = Object.keys(errors).length === 0
    if (isValid) {
      this.props.updateTagApi({ ChangedTag })
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
      <Row style={{
        paddingTop: 10,
        alignContent: "center"
      }}>
        <AddTag />
        <DeleteTag tag={this.state.tag}/>
        <Row>
          <Col md={11}>
            <div className="ag-theme-balham"
              style={{
                height: '700px'
              }}>
              <AgGridReact 
              deltaRowDataMode="true"
              rowSelection="single" 
              pagination="false" 
              animateRows={true}
              onGridReady={this.onGridReady}
              getRowNodeId={this.state.getRowNodeId}
              onCellValueChanged={this.onCellValueChanged} 
              onSelectionChanged={this.onSelectionChanged.bind(this)}
              columnDefs={this.state.columnDefs}
              getContextMenuItems={this.getContextMenuItems}
              rowData={this.props.tags}
                >
              </AgGridReact>
            </div>
          </Col>
        </Row>
      </Row>

    )
  }
}
const mapStateToProps = (state) => {
  return {
      tags: state.tags.tags,
  };
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});
export default connect(mapStateToProps,mapDispatchToProps, { updateTagApi })(TagList);