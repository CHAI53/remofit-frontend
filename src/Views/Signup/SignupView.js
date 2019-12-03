import React, { Component } from "react";
import { Row, Col, Card, Form, Input, Button } from "antd";
import "./index.less";
import { isFulfilled } from "q";

export default class SignupView extends Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center" align="middle">
          <Col span={16} style={{ width: "600px" }}>
            <Card className="signupCard">
              <Form onSubmit={this.handleSubmit} className="signupForm">
                <Form.Item className="formInput">
                  <Input placeholder="이메일" />
                </Form.Item>
                <Form.Item className="formInput">
                  <Input.Password placeholder="비밀번호" />
                </Form.Item>
                <Form.Item className="formInput">
                  <Input.Password placeholder="비밀번호 확인" />
                </Form.Item>
                <Form.Item className="formInput">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    가입하기
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
