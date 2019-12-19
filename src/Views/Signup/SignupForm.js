import React, { Component } from "react";
import "antd/dist/antd.css";
import { Form, Input, Icon, Checkbox, Button } from "antd";
import { withRouter } from "react-router-dom";
import { signup } from "config.js";
import "./index.less";

const FormItem = Form.Item;
const axios = require("axios");

class SignupForm extends Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        axios({
          method: "post",
          url: signup,
          data: values
        }).then(res => {
          console.log(values);
          if (res.data.MESSAGE === "SIGNUP_SUCCESS") {
            console.log(res, "이메일가입정보 전송완료");
            return this.goToLogin();
          } else {
            console.log(res, "이메일가입 실패");
          }
        });
      } else {
        console.log("에러로 인해 제출 안됨");
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("비밀번호가 같지 않습니다.");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  goToLogin = () => {
    console.log(this.props);
    this.props.history.push("/");
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form
        onSubmit={this.handleSubmit}
        // antd의 form을 이용을 못했다!
        // decorator 사용 잘 해볼 것!!
        className="signupForm"
      >
        <div className="title">회원가입</div>
        <br />
        <br />
        <FormItem className="formInput">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "이메일 형식이 올바르지 않습니다."
              },
              {
                required: true,
                message: "이메일을 입력해주세요."
              }
            ]
          })(
            <Input
              name="email"
              placeholder="이메일"
              size="large"
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          )}
        </FormItem>
        <FormItem className="formInput" hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "비밀번호를 입력해주세요."
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(
            <Input.Password
              name="password"
              placeholder="비밀번호"
              size="large"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          )}
        </FormItem>
        <FormItem className="formInput" hasFeedback>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "동일한 비밀번호를 입력해주세요."
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(
            <Input.Password
              onBlur={this.handleConfirmBlur}
              name="passwordChk"
              placeholder="비밀번호 확인"
              size="large"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          )}
        </FormItem>
        <FormItem className="formInput">
          {getFieldDecorator("isAgreed", {
            valuePropName: "checked",
            initialValue: false
          })(<Checkbox>이용약관 및 개인정보처리방침에 동의합니다.</Checkbox>)}
        </FormItem>
        <FormItem className="formInput">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="login-form-button"
            style={{ color: "#EAECEC", fontWeight: 600 }}
          >
            가입하기
          </Button>
        </FormItem>
        <FormItem className="formInput" style={{ display: "none" }}>
          {getFieldDecorator("userTypeCd", {
            initialValue: "002"
          })(<Input name="userTypeCd" size="large" />)}
        </FormItem>
        <FormItem className="formInput" style={{ display: "none" }}>
          {getFieldDecorator("userLoginTypeCd", {
            initialValue: "010"
          })(<Input name="userLoginTypeCd" size="large" />)}
        </FormItem>
        <FormItem className="formInput" style={{ display: "none" }}>
          {getFieldDecorator("name", {
            initialValue: null
          })(<Input name="name" size="large" />)}
        </FormItem>
        <FormItem className="formInput" style={{ display: "none" }}>
          {getFieldDecorator("snsid", {
            initialValue: null
          })(<Input name="snsid" size="large" />)}
        </FormItem>
        <FormItem className="formInput" style={{ display: "none" }}>
          {getFieldDecorator("receivingEmail", {
            initialValue: null
          })(<Input name="receivingEmail" size="large" />)}
        </FormItem>
      </Form>
    );
  }
}

const SignupFormWrapper = Form.create()(SignupForm);
export default withRouter(SignupFormWrapper);
