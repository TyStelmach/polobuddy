import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const PendingGameCard = ({
  title,
  description,
  children,
  pendingGame
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

export default PendingGameCard;