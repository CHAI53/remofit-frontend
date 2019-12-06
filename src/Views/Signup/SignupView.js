import React, { Component } from "react";
import { Row, Col, Card, Form, Input, Button, Checkbox } from "antd";
// import { API } from "src/config.js";
import "./index.less";

export default class SignupView extends Component {
  state = {
    email: "",
    password: "",
    passwordChk: "",
    is_agreed: false
  };

  handleSubmit = e => {
    // e.preventDefault();
    // const { email, password, passwordChk } = this.state;
    // if (email && password && passwordChk && password === passwordChk) {
    //   fetch(`${API}/account/signup`, {
    //     method: "post",
    //     body: JSON.stringify({
    //       email,
    //       password
    //     })
    //   })
    //     .then(res => res.json())
    //     .then(res => {
    //       return this.goToLogin();
    //     });
    // }
  };

  handleChange = e => {
    this.setState = {
      [e.target.name]: e.target.value
    };
  };

  handleAgree = e => {
    this.setState = {
      is_agreed: true
    };
  };

  goToLogin = () => {
    this.props.history.push("/login");
  };

  render() {
    const { email, password, passwordChk } = this.state;
    console.log(email, password, passwordChk);

    return (
      <Row type="flex" justify="center">
        <Col xs={24} xl={8}>
          <Card className="signupCard">
            <Form onSubmit={this.handleSubmit} className="signupForm">
              <Form.Item className="formInput">
                <Input
                  name="email"
                  placeholder="이메일"
                  size="large"
                  onChange={this.handleChange}
                />
                {email && (!email.includes("@") || !email.includes(".")) ? (
                  <div>이메일 형식이 올바르지 않습니다</div>
                ) : (
                  ""
                )}
              </Form.Item>
              <Form.Item className="formInput">
                <Input.Password
                  name="password"
                  placeholder="비밀번호"
                  size="large"
                  onChange={this.handleChange}
                />
              </Form.Item>
              <Form.Item className="formInput">
                <Input.Password
                  name="passwordChk"
                  placeholder="비밀번호 확인"
                  size="large"
                  onChange={this.handleChange}
                />
                {password && password !== passwordChk ? (
                  <div> 동일한 비밀번호를 입력해주세요</div>
                ) : (
                  ""
                )}
              </Form.Item>
              <Form.Item>
                <Checkbox onChange={this.handleAgree}>
                  이용약관 및 개인정보처리방침에 동의합니다.
                </Checkbox>
              </Form.Item>
              <Form.Item className="formInput">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="login-form-button"
                >
                  가입하기
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}
