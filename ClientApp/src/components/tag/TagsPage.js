import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { connect } from "react-redux";
import { getTagsApi } from '../../actions/tagsActions';
import Tag from './TagsList';

import AddTag from './AddTag'

class TagsPage extends Component {


    componentDidMount = () => {
        this.props.getTagsApi()
            .then(
                () => { },
                (err) => { console.log("Error get data ", err); }
            )
    }
    render() {

        return (
            <Row>
                <AddTag />
                <Tag tag={this.props.tags} />
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tags: state.tags.tags
    };
}
export default connect(mapStateToProps, { getTagsApi })(TagsPage);