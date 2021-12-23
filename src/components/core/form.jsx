import React from 'react';
import { Form, FormGroup, Label, Col, Input } from 'reactstrap';

const SignupForm = ({
  type,
  changeHandler
}) => (
  <Form>
    {type === 'join' ?
      <FormGroup row>
        <Label for="sessionId">
          Your session ID
        </Label>
        <Col>
          <Input
            id="yourSessionId"
            name="sessionId"
            placeholder="Enter your Session ID"
            type="text"
            onBlur={changeHandler}
          />
        </Col>
      </FormGroup>
    : ''}

    <FormGroup row>
      <Label for="username">
        Your username
      </Label>
      <Col>
        <Input
          id="yourUsername"
          name="username"
          placeholder="Enter your Username"
          type="text"
          onBlur={changeHandler}
        />
      </Col>
    </FormGroup>
    <FormGroup row>
      <Label for="skillLevel">
        Your skill level
      </Label>
      <Col>
      <Input
        id="yourSkillLevel"
        name="skillLevel"
        type="select"
        onBlur={changeHandler}
        placeholder="Select Skill level"
        defaultValue="2"
      >
        <option>
          Beginner
        </option>
        <option>
          Intermediate
        </option>
        <option>
          Veteran
        </option>
      </Input>
      </Col>
    </FormGroup>
  </Form>
);

export default SignupForm;
