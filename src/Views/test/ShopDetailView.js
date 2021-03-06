import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Carousel,
  Statistic,
  Divider,
  Input,
  Button,
  Tabs,
  BackTop
} from "antd";
import { mockup } from "config.js";
import "./index.less";
import ShopItemMaster from "./ShopItemMaster";
import ShopCarousel from "./ShopCarousel";

export default class ShopDetailView extends Component {
  state = {
    data: [],
    optionDescription: ""
  };

  componentDidMount() {
    fetch(mockup, {
      method: "get"
    })
      .then(res => res.json())
      .then(info => {
        this.setState(
          {
            data: info
          },
          () => {
            // console.log("data taken", this.state);
          }
        );
      });
  }

  handleChange = e =>
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => console.log("input entered")
    );

  render() {
    const { Countdown } = Statistic;
    const { TabPane } = Tabs;
    const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
    const { data } = this.state;

    function onFinish() {
      console.log("finished!");
    }
    // console.log(this.state);
    return (
      <>
        <div
          style={{
            width: "100%",
            height: "100px",
            backgroundColor: "white",
            borderBottom: "1px solid black",
            marginBottom: "50px",
            fontWeight: 700,
            fontSize: "20px",
            textAlign: "center",
            lineHeight: "5rem"
          }}
        >
          헤더.
        </div>
        <Row type="flex" justify="center">
          <Col className="photoCol" xs={24} xl={8} type="flex" justify="center">
            <Card
              hoverable
              style={{
                maxwidth: "400px",
                height: "auto",
                padding: "5%",
                borderRadius: "5px",
                margin: "0 auto"
              }}
              cover={
                <Carousel autoplay>
                  {data.itemImg &&
                    data.itemImg.map(item => (
                      <ShopCarousel>{item.url}</ShopCarousel>
                    ))}
                </Carousel>
              }
            ></Card>
          </Col>
          <Col
            className="info"
            xs={24}
            xl={14}
            type="flex"
            justify="center"
            style={{ padding: "0 3%" }}
          >
            <Row type="flex" justify="center" align="middle">
              <Col span={24}>
                <p className="product">{data.itemTi}</p>

                <Divider />
              </Col>
            </Row>
            <br />
            <br />
            <br />
            <br />
            <Row type="flex" justify="center" align="middle">
              <Col span={24}>
                <Divider />
                <Countdown
                  title="남은 시간"
                  className="leftTime"
                  value={deadline}
                  onFinish={onFinish}
                  style={{
                    display: "inline-block",
                    margin: "10px 60px 10px 0",
                    fontWeight: "700",
                    width: "100px"
                  }}
                />
                <Statistic
                  title="남은 수량"
                  className="abc"
                  value={data.stock}
                  style={{
                    display: "inline-block",
                    margin: "10px 60px 10px 0",
                    fontWeight: "700",
                    width: "100px"
                  }}
                />
                <Divider />
              </Col>
            </Row>
            <Row type="flex" justify="center" align="middle">
              <Col span={24}>
                <div className="optionInputDesc">선택사항 입력</div>
                <Input
                  className="optionInput"
                  placeholder="선택사항을 입력해주세요"
                  size="large"
                  name="optionDescription"
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
            <Row type="flex" justify="center" align="middle">
              <Col span={24}>
                <Button
                  className="purchaseBtn"
                  type="primary"
                  block
                  size="large"
                >
                  ￦3,000 경험하기 (VAT 별도)
                </Button>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="middle">
              <Col span={24}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="상품 설명" key="1">
                    <ShopItemMaster
                      madeInYear={data.madeInYear}
                      maIm={data.maIm}
                      ori={data.ori}
                      special={data.special}
                      mat={data.mat}
                      col={data.col}
                      managerTel={data.managerTel}
                      cauOfUse={data.cauOfUse}
                      qa={data.qa}
                      size={data.size}
                      madeIn={data.madeIn}
                      expiryYear={data.expiryYear}
                    ></ShopItemMaster>
                  </TabPane>
                  <TabPane tab="상품 이미지" key="2">
                    <img
                      className="productImg"
                      src={data.itemInformationImg}
                      alt=""
                    />
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Col>
        </Row>
        <BackTop style={{ right: 10, bottom: 10 }} />
      </>
    );
  }
}
