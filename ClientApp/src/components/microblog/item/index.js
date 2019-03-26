import React, { Component } from 'react';

import { getfromNowDateDiffHelper } from '../../../helpers/dateTimeHelper';
import { Icon } from 'antd';
import renderHTML from 'react-render-html';

import './index.css';

class MicroblogItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewFullDescription: false
        };
    }

    onViewMoreClick = () => {
        this.setState({
            viewFullDescription: !this.state.viewFullDescription
        })
    }

    render() {
        const { email, name, shortDescription, description, createdAt } = this.props;

        return (
            <div>
                <div className="short-cut-container-up"></div>
                <div className="microblog-list-container">
                    <div className="microblog-list-item">
                        <div className="microblog-list-item-header">
                            <span className="microblog-list-item-header-email"><Icon type="user" />{email}</span>
                            <span className="microblog-list-item-header-time">{getfromNowDateDiffHelper(createdAt)}</span>
                        </div>
                        <div className="microblog-list-item-name">
                            {name}
                        </div>
                        <div className="microblog-list-item-short-description">
                            <b>Short description : </b>
                            <div>
                                {shortDescription}
                            </div>
                        </div>
                        {
                            description &&
                            <div className="microblog-list-item-description">
                                <b>Description : </b>
                                {
                                    !this.state.viewFullDescription &&
                                    <div className="microblog-list-item-view-more-container">
                                        <div> ... </div>
                                        <div className="microblog-list-item-view-more-button" onClick={this.onViewMoreClick}>
                                            View more
                                    </div>
                                    </div>
                                }
                                {
                                    this.state.viewFullDescription &&
                                    <div>{renderHTML(description)}</div>
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className="short-cut-container-down"></div>
            </div>
        )
    }
}

export default MicroblogItem;