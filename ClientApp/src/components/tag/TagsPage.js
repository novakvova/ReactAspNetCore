import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { connect } from "react-redux";
import { getTagsApi } from '../../actions/tagsActions';
import TagList from './TagsList'

class TagsPage extends Component {

     componentDidMount = () => {
      this.state =  this.props.getTagsApi()
            .then(
                () => { },
                (err) => { console.log("Error get data ", err); }
            ).then(
                console.log(this.state)
            )
    }

    render() {

        return (
                <TagList/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tags: state.tags.tags
    };
}
export default connect(mapStateToProps, { getTagsApi })(TagsPage);