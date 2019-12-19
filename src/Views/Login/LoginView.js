import React, { Component } from "react";
import { Card, Row, Col, Form, Icon, Input, Button, Alert } from "antd";
import { isFulfilled } from "q";
import {
  loginimg,
  Google_Login,
  Facebook_Login,
  Kakao_Login,
  email_Login
} from "config.js";
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

  HandleClick = () => {
    fetch(email_Login, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.id,
        password: this.state.pw,
        userLoginTypeCd: "010"
      })
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        if (res.MESSAGE === "SUCCESS") {
          localStorage.setItem("accesstoken", res.ACCESS_TOKEN);
          localStorage.setItem("refreshtoken", res.REFRESH_TOKEN);
          alert("이메일로 로그인 되었습니다.");
          this.props.history.push("/Shop");
        } else if (res.MESSAGE !== "SUCCESS") {
          alert("로그인에 실패했습니다.");
        }
      });
  };

  fb = response => {
    console.log(response);
    localStorage.setItem("fb_access_token", response.accessToken);

    fetch(Facebook_Login, {
      method: "post",
      headers: { Authorization: localStorage.getItem("fb_access_token") }
    })
      .then(res => res.json(), localStorage.removeItem("fb_access_token"))
      .then(res => {
        console.log(res);
        if (res.MESSAGE === "SUCCESS") {
          localStorage.setItem("accesstoken", res.ACCESS_TOKEN);
          localStorage.setItem("refreshtoken", res.REFRESH_TOKEN);
          alert(<Alert message="Success Text" type="success" />);
          this.props.history.push("/Shop");
        } else if (res.MESSAGE !== "SUCCESS") {
          alert("로그인에 실패했습니다.");
        }
      });
  };

  responseGoogle = response => {
    console.log("구글에서 가져오는 것", response);
    localStorage.setItem("google_access_token", response.Zi.id_token);

    fetch(Google_Login, {
      method: "post",
      headers: { Authorization: localStorage.getItem("google_access_token") }
    })
      .then(res => res.json(), localStorage.removeItem("google_access_token"))
      .then(res => {
        console.log("fetch 후 응답", res);
        if (res.MESSAGE === "SUCCESS") {
          localStorage.setItem("accesstoken", res.ACCESS_TOKEN);
          localStorage.setItem("refreshtoken", res.REFRESH_TOKEN);
          alert("구글로 로그인 되었습니다.");
          // this.props.history.push("/Shop");
        } else if (res.MESSAGE !== "SUCCESS") {
          alert("로그인에 실패했습니다.");
        }
      })

      .catch("구글 error");

    //if문 정상작동 하면 그대로 사용하고 , 이상있으면 주석처리한 .then 사용
  };
  //res.hi 를 제대로된 이름으로 변경해야함

  responseKakao = response => {
    // console.log("카카오로그인", response);
    localStorage.setItem("kakao_access_token", response.response.access_token);

    fetch(Kakao_Login, {
      method: "post",
      headers: { Authorization: localStorage.getItem("kakao_access_token") }
    })
      // .then(res => res.json())
      // .then(localStorage.removeItem("kakao_access_token"))
      .then(res => res.json(), localStorage.removeItem("kakao_access_token"))
      .then(res => {
        if (res.MESSAGE === "SUCCESS") {
          localStorage.setItem("accesstoken", res.ACCESS_TOKEN);
          localStorage.setItem("refreshtoken", res.REFRESH_TOKEN);
          alert("카카오로 로그인 되었습니다.");
          this.props.history.push("/Shop");
        } else if (res.MESSAGE !== "SUCCESS") {
          alert("로그인에 실패했습니다.");
        }
      });
  };

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
                        onClick={this.HandleClick}
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
