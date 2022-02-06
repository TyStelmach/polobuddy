import React from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const ContentCard = ({
  title,
  description,
  children
}) => (
  <Card>
    <CardBody>
      <CardTitle tag="h5">
        {title}
      </CardTitle>
      <CardText>
        {description}
      </CardText>
      {children}      
    </CardBody>
  </Card>
);

export default ContentCard;