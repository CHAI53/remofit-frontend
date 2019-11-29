import React, { Component } from "react";
import { Card, Row, Col, Form, Icon, Input, Button } from "antd";
import "./index.less";
import { isFulfilled } from "q";

export default class LoginView extends Component {
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
                        구글 로그인
                      </Button>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Button
                        type="primary"
                        block
                        htmlType="submit"
                        className="kakao"
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
