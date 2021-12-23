import React from 'react';
import { CardBody, CardTitle, CardText, Button } from 'reactstrap';

const HomeCardBody = ({
  title,
  description,
  type,
  toggle={}
}) => (
  <CardBody>
    <CardTitle tag="h5">
      {title}
    </CardTitle>
    <CardText>
      {description}
    </CardText>
    <Button onClick={toggle} name={type}>
      {type === 'host' ? 'Host Session' : 'Join Session'}
    </Button>
  </CardBody>
);

export default HomeCardBody;
