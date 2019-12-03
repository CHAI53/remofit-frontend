import React, { Component } from "react";
import { Card, Row, Col, Form, Icon, Input, Button } from "antd";
import "./index.less";
// import onSignIn from "../../index";
import { isFulfilled } from "q";
import GoogleLogin from "react-google-login";

export default class LoginView extends Component {
  state = {
    id: "",
    pw: ""
  };
  Setemail = e => {
    this.setState({ id: e.target.value }, () => {
      console.log(this.state.id);
    });
  };

  Setpassword = e => {
    this.setState({ pw: e.target.value }, () => {
      console.log(this.state.pw);
    });
  };

  HandleClick = e => {
    fetch("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.id,
        pw: this.state.pw
      })
    });
  };

  Kakaologin = () => {
    // 로그인 창을 띄웁니다.
    window.Kakao.Auth.login({
      success: function(authObj) {
        // alert(JSON.stringify(authObj.access_token));
      },
      fail: function(err) {
        alert(JSON.stringify(err));
      }
    });
    // console.log("함수끝날때", localStorage);
    this.props.history.push("/Shop");
    // console.log("함수다 끝날때 토큰유무", localStorage);
  };

  //카카오로그인 시,  localstorage에 토큰 저장되고, shop으로 넘어감 (나중에 fetch로 토큰 보내고 확인후에 넘어가게 만들어야됨)

  Facebooklogin = () => {
    window.FB.login(function(response) {
      console.log(response);
      localStorage.setItem("Facebook_token", response.authResponse.accessToken);
    });
    this.props.history.push("/Shop");
  };
  //페이스북 로그인, fetch로 back에 보내고 확이 후 넘어가게 만들어야됨

  responseGoogle = response => {
    // console.log(response);
    localStorage.setItem("Google_token", response.accessToken);
    // console.log(this.props.history);
    this.props.history.push("/Shop");
  };
  render() {
    return (
      <>
        <br />
        <br />
        <Row type="flex" justify="center" align="middle">
          <Col style={{ width: 450 }}>
            <Card
              xs={24}
              sm={24}
              md={8}
              lg={8}
              xl={8}
              style={{ width: isFulfilled }}
              hoverable
            >
              <Form
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xl={8}
                onSubmit={this.handleSubmit}
                className="login-form"
              >
                <Form.Item>
                  <Input
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={12}
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="이메일 주소"
                    onChange={this.Setemail}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={12}
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="비밀번호"
                    onChange={this.Setpassword}
                  />
                </Form.Item>
                <Form.Item>
                  <Row gutter={[12]} className="btn-row">
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Button
                        type="primary"
                        block
                        htmlType="submit"
                        className="email"
                      >
                        이메일 로그인
                      </Button>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Button
                        type="primary"
                        block
                        htmlType="submit"
                        className="facebook"
                        onClick={this.Facebooklogin}
                      >
                        페이스북 로그인
                      </Button>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Button
                        type="primary"
                        block
                        htmlType="submit"
                        className="google"
                      >
                        <GoogleLogin
                          clientId="1092800745543-f9npagl8ktirq03cjf00ms8l5qpavevf.apps.googleusercontent.com"
                          buttonText="구글 로그인"
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                          cookiePolicy={"single_host_origin"}
                        />
                      </Button>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Button
                        type="primary"
                        block
                        htmlType="submit"
                        className="kakao"
                        onClick={this.Kakaologin}
                      >
                        카카오 로그인
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
