import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import "./index.less";
import SignupFormWrapper from "./SignupForm";

export default class SignupView extends Component {
  render() {
    return (
      <Row type="flex" justify="center">
        <Col xs={24} xl={8}>
          <Card
            className="signupCard"
            style={{
              backgroundImage: "-webkit-linear-gradient(top, #fff, #E2E4E4)",
              marginTop: "70px"
            }}
          >
            <SignupFormWrapper />
          </Card>
        </Col>
      </Row>
    );
  }
}
