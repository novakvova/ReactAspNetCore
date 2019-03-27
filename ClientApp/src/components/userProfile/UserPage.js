// import React, { Component } from 'react';
// import { Tabs, Panel } from "react-bootstrap";

// class UserPage extends Component {
//   render() {
//     return (
//       <Panel>
//         <div className="panel-body">
//           <div className="box box-info">
//             <div className="col-sm-5 col-xs-6 tital " >First Name:</div><div className="col-sm-7 col-xs-6 ">Prasad</div>
//             <div className="clearfix"></div>
//             <div className="bot-border"></div>

//             <div className="col-sm-5 col-xs-6 tital " >Middle Name:</div><div className="col-sm-7"> Shankar</div>
//             <div className="clearfix"></div>
//             <div className="bot-border"></div>

//             <div className="col-sm-5 col-xs-6 tital " >Last Name:</div><div className="col-sm-7"> Huddedar</div>
//             <div className="clearfix"></div>
//             <div className="bot-border"></div>


//             <div className="col-sm-5 col-xs-6 tital " >Date Of Birth:</div><div className="col-sm-7">11 Jun 1998</div>
//             <div className="clearfix"></div>
//             <div className="bot-border"></div>

//           </div>
//         </div>
//       </Panel>

//     );
//   }
// }
// export default UserPage; 

import React, { Component } from 'react';
import ChangePasswordForm from "./ChangePasswordForm"
import { Panel, Row, Col } from "react-bootstrap";
import UserProfile from './UserProfile';

class UserPage extends Component {

    render() {
        return (
            <Row>
                <Col md={8} mdOffset={2}>
                    <Panel>
                        <Col md={6}>
                            <Panel>
                                <UserProfile></UserProfile>
                            </Panel>
                        </Col>
                        <Col md={6}>
                            <Panel>
                                <ChangePasswordForm></ChangePasswordForm>
                            </Panel>
                        </Col>
                    </Panel>
                </Col>
            </Row>
        );
    }
}

export default (UserPage);
