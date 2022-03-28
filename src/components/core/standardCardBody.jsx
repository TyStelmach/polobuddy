import React from 'react';
import { CardBody, CardTitle, CardText, Button } from 'reactstrap';

const StandardCardBody = ({
  title,
  children
}) => (
  <CardBody>
    <CardTitle tag="h5">
      {title}
    </CardTitle>
    {children}
  </CardBody>
);

export default StandardCardBody;
