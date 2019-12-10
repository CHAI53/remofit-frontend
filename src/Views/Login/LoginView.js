import React, { Component } from "react";
import { Card, Row, Col, Form, Icon, Input, Button } from "antd";
import { isFulfilled } from "q";
import { loginimg, Google_Login, Facebook_Login, Kakao_Login } from "config.js";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import KakaoLogin from "react-kakao-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "./index.less";

export default class LoginView extends Component {
  state = {};
  Setemail = e => {
    this.setState({ id: e.target.value }, () => {
      console.log(this.state);
    });
  };

  Setpassword = e => {
    this.setState({ pw: e.target.value }, () => {
      console.log(this.state.pw);
    });
  };

  HandleClick = e => {
    fetch("", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.id,
        pw: this.state.pw,
        userLoginTypeCd: this.state.userLoginTypeCd
      })
    });
  };

  fb = response => {
    console.log(response);
    localStorage.setItem("fb_access_token", response.signedRequest);
    this.setState({
      name: response.name,
      email: response.email
    });
    console.log(this.state);
    // fetch(Facebook_Login, {
    //   method: "post",
    //   headers: { Authorization: localStorage.getItem("fb_access_token") },
    //   body: JSON.stringify({
    //     email: this.state.email,
    //     name: this.state.name,
    //     userLoginTypeCd: this.state.userLoginTypeCd
    //   })
    // });
  };

  responseGoogle = response => {
    console.log("구글", response);
    localStorage.setItem("google_access_token", response.Zi.id_token);

    fetch(Google_Login, {
      method: "post",
      headers: { Authorization: localStorage.getItem("google_access_token") }
    })
      .then(res => res.json())
      .then(localStorage.removeItem("google_access_token"))
      .then(res => {
        console.log(res);
        if (res.MESSAGE === "SIGNUP_SUCCESS") {
          localStorage.setItem("accesstoken", res.Access_token);
          this.props.history.push("/Shop");
        } else if (res.MESSAGE !== "SIGNUP_SUCCESS") {
          alert("로그인에 실패했습니다.");
        }
      });

    //if문 정상작동 하면 그대로 사용하고 , 이상있으면 주석처리한 .then 사용
  };
  //res.hi 를 제대로된 이름으로 변경해야함

  responseKakao = response => {
    console.log(response);
    localStorage.setItem("kakao_access_token", response.response.access_token);
    // console.log(response);

    fetch(Kakao_Login, {
      method: "post",
      headers: { Authorization: localStorage.getItem("kakao_access_token") }
    })
      .then(res => res.json())
      .then(localStorage.removeItem("kakao_access_token"))
      .then(res => {
        console.log(res);
        if (res.MESSAGE === "SUCCESS") {
          localStorage.setItem("accesstoken", res.ACCESS_TOKEN);
          this.props.history.push("/Shop");
        } else if (res.MESSAGE !== "SUCCESS") {
          alert("로그인에 실패했습니다.");
        }
      });
    // .then(this.props.history.push("/Shop"));
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
                      <Link to={"/signup"}>
                        <span>회원가입</span>
                      </Link>
                    </div>
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
