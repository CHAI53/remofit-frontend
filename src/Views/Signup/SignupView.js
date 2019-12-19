import React, { Component } from "react";
import { Row, Col, Card, Form, Input, Button, Checkbox, Icon } from "antd";
import { signup } from "config.js";
import "./index.less";

export default class SignupView extends Component {
  state = {
    email: "",
    password: "",
    passwordChk: "",
    isAgreed: false,
    userTypeCd: "002",
    userLoginTypeCd: "010",
    name: null,
    snsid: null,
    receivingEmail: null
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      email,
      password,
      passwordChk,
      isAgreed,
      userTypeCd,
      userLoginTypeCd,
      name,
      snsid,
      receivingEmail
    } = this.state;
    if (
      email &&
      password &&
      passwordChk &&
      password === passwordChk &&
      isAgreed === true &&
      userTypeCd &&
      userLoginTypeCd
    ) {
      fetch(signup, {
        method: "post",
        body: JSON.stringify({
          name,
          snsid,
          receivingEmail,
          email,
          password,
          isAgreed,
          userTypeCd,
          userLoginTypeCd
        })
      })
        .then(res => res.json())

        .then(res => {
          console.log(res, "이메일가입정보 전송완료");
          return this.goToLogin();
        });
    }
  };

  handleChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        console.log("input ok");
      }
    );
  };

  checkAgreed = e => {
    this.setState(
      {
        isAgreed: true
      },
      () => {
        console.log("agreeeee");
      }
    );
  };

  goToLogin = () => {
    this.props.history.push("/");
  };

  render() {
    const { email, password, passwordChk } = this.state;
    console.log(email, password, passwordChk);

    return (
      <Row type="flex" justify="center">
        <Col xs={24} xl={8}>
          <Card
            className="signupCard"
            style={{
              backgroundImage: "-webkit-linear-gradient(top, #fff, #E2E4E4)"
            }}
          >
            <Form onSubmit={this.handleSubmit} className="signupForm">
              <div className="title">회원가입</div>
              <br />
              <br />
              <Form.Item className="formInput">
                <Input
                  name="email"
                  placeholder="이메일"
                  size="large"
                  onChange={this.handleChange}
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
                {email && (!email.includes("@") || !email.includes(".")) ? (
                  <div> 이메일 형식이 올바르지 않습니다.</div>
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
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
              </Form.Item>
              <Form.Item className="formInput">
                <Input.Password
                  name="passwordChk"
                  placeholder="비밀번호 확인"
                  size="large"
                  onChange={this.handleChange}
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
                {password && password !== passwordChk ? (
                  <div> 동일한 비밀번호를 입력해주세요</div>
                ) : (
                  ""
                )}
              </Form.Item>
              <Form.Item>
                <Checkbox onChange={this.checkAgreed}>
                  이용약관 및 개인정보처리방침에 동의합니다.
                </Checkbox>
              </Form.Item>
              <Form.Item className="formInput">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="login-form-button"
                  style={{ color: "#EAECEC", fontWeight: 600 }}
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
