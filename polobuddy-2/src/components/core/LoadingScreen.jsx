import React, { useEffect, useContext } from 'react';
import { Card, CardBody, CardText, Spinner } from 'reactstrap';

const Loader = () => {
  return(
    <Card>
      <CardBody>
        <Spinner
          color="dark"
          type="grow"
        >
        Loading...
      </Spinner>
      </CardBody>
    </Card>
  )
}

export default Loader;