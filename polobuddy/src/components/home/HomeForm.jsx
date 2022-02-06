import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Form, FormGroup, Label, Col, Input } from 'reactstrap';

const SignupForm = ({
  type,
  changeHandler
}) => (
  <Form>
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