import React, { Component } from "react";
import { Card, Row, Col, Form, Icon, Input, Button } from "antd";
import { isFulfilled } from "q";
import { loginimg } from "config.js";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import KakaoLogin from "react-kakao-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "./index.less";

export default class LoginView extends Component {
  state = {};
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

  //카카오로그인 시,  localstorage에 토큰 저장되고, shop으로 넘어감 (나중에 fetch로 토큰 보내고 확인후에 넘어가게 만들어야됨)

  Facebooklogin = () => {
    window.FB.login(function(response) {
      console.log(response);
      localStorage.setItem("access_token", response.authResponse.accessToken);
    });
    // this.props.history.push("/Shop");
  };
  //페이스북 로그인, fetch로 back에 보내고 확이 후 넘어가게 만들어야됨
  fb = response => {
    localStorage.setItem("fb_access_token", response.accessToken);
    this.setState({
      name: response.name,
      email: response.email,
      userLoginTypeCd: "013"
    });
    console.log(this.state);
    fetch("", {
      method: "post",
      headers: { Authorization: localStorage.getItem("fb_access_token") },
      body: JSON.stringify({
        email: this.state.email,
        name: this.state.name
      })
    });
  };
  //headers 에 token 넣어줘야한다.

  responseGoogle = response => {
    localStorage.setItem("access_token", response.accessToken);
    this.setState(
      { name: response.w3.ig, email: response.w3.U3, userLoginTypeCd: "012" },
      () => {
        console.log(this.state);
      }
    );
    // this.props.history.push("/Shop");
  };
  responseKakao = response => {
    localStorage.setItem("kakao_access_token", response.response.access_token);
    // console.log(response);
    this.setState(
      {
        email: response.profile.kakao_account.email,
        name: response.profile.kakao_account.profile.nickname,
        userLoginTypeCd: "011"
      },
      () => {
        console.log(this.state);
      }
    );
  };
  //구글 로그인, fetch로 back에 보내고 확이 후 넘어가게 만들어야됨

  render() {
    const failure = console.error;
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
              style={{
                width: isFulfilled,
                backgroundImage: "-webkit-linear-gradient(top, #fff, #E2E4E4)"
              }}
              hoverable
            >
              <Row type="flex" justify="center" align="middle">
                <img className="imgtest" src={loginimg} alt="" />
              </Row>

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
                      <FacebookLogin
                        appId="737826633381169"
                        render={renderProps => (
                          <Button
                            type="primary"
                            block
                            htmlType="submit"
                            className="facebook"
                            onClick={renderProps.onClick}
                          >
                            페이스북 로그인
                          </Button>
                        )}
                        autoLoad
                        textButton="페이스북 로그인"
                        callback={this.fb}
                        fields="name,email"
                      />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <GoogleLogin
                        clientId="1092800745543-f9npagl8ktirq03cjf00ms8l5qpavevf.apps.googleusercontent.com"
                        render={renderProps => (
                          <Button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className="google"
                            block
                          >
                            구글 로그인
                          </Button>
                        )}
                        buttonText="구글 로그인"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={"single_host_origin"}
                      />
                      {/* </Button> */}
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Button
                        type="primary"
                        block
                        htmlType="submit"
                        className="kakao"
                      >
                        <KakaoLogin
                          jskey={"44cb0d837ce42427ba3f2e9d08b86f58"}
                          getProfile={true}
                          onSuccess={this.responseKakao}
                          onFailure={failure}
                          buttonText="카카오 로그인"
                          className="kakao-feed"
                        />
                      </Button>
                    </Col>
                    <div className="for-signup">
                      <span style={{ paddingRight: "10px" }}>
                        아직 회원이 아니신가요?
                      </span>
                      <Link to={"/"}>
                        <span>회원가입</span>
                      </Link>
                    </div>
                  </Row>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
        백에다가 소셜로그인 시 fetch의 body에 state에 있는 email, name, type을
        보내고, storage에 있는 각 토큰을 보내줘야 한다.
      </>
    );
  }
}
