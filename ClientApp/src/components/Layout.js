import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import NavMenu from './NavMenu';
import CategoriesPanel from  './CategoriesPanel';

export default props => (
  <Grid fluid>
    <Row>
      <Col sm={3}>
        <NavMenu />
      </Col>
      <Col sm={7}>
        {props.children}
      </Col>
      <Col sm={2}>
        <CategoriesPanel />
      </Col>
    </Row>
  </Grid>


);
