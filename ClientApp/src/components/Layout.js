import React from 'react';
import NavMenu from './NavMenu';
import { Grid } from 'react-bootstrap';

export default props => (
  <div >
    <NavMenu />
      <Grid fluid>{props.children}</Grid>
  </div>
);
