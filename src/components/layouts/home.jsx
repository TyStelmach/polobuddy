import React from "react";
import { Container, Col, Row, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const Home = () => (
  <Container>
    <Row xs="2">
      <Col>
        <Card>
          <CardBody>
            <CardTitle tag="h5">
              Host new session
            </CardTitle>
            <CardText>
              Begin hosting a polo session and allow others to join
            </CardText>
            <Button>
              Host Session
            </Button>
          </CardBody>
        </Card>
      </Col>

      <Col>
        <Card>
          <CardBody>
            <CardTitle tag="h5">
              Join existing session
            </CardTitle>
            <CardText>
              Join an existing session to begin playing polo
            </CardText>
            <Button>
              Join Session
            </Button>
          </CardBody>
        </Card>
      </Col>

    </Row>

    <Row xs="2">
      Test Row
    </Row>
  </Container>
);

export default Home;