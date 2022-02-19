import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Form, FormGroup, Label, Col, Input } from 'reactstrap';
//LJT-AIND
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
        <DebounceInput
          debounceTimeout={300}
          id="yourUsername"
          name="username"
          placeholder="Enter your Username"
          type="text"
          onChange={changeHandler} />
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
        onChange={changeHandler}
      >
        <option disabled hidden selected>
          Select Skill level
        </option>
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