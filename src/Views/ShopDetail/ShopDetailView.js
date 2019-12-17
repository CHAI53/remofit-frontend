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
import moment from "moment";
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

  handleClick = e => {
    let stock = this.state.data.stock;

    fetch(mockup, {
      method: "post",
      body: JSON.stringify({
        stock: stock - 1
      })
    })
      .then(res => res.json())
      .then(info => {
        this.setState(
          {
            data: info
          },
          () => {
            console.log("data reeeeeetaken", this.state);
          }
        );
      });
  };

  render() {
    const { Countdown } = Statistic;
    const { TabPane } = Tabs;
    const { data } = this.state;
    const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
    //console.log("현재시각", nowDate);
    const endDate = data.endDate;
    //console.log("마감시각", endDate);
    const deadline = moment(endDate).diff(nowDate) + Date.now();
    //console.log("남은시간", deadline);

    function onFinish() {
      console.log("finished!");
    }
    //console.log(this.state);

    return (
      <>
        <Row type="flex" justify="center">
          <Col className="photoCol" xs={24} xl={8}>
            <Card
              hoverable
              style={{
                maxwidth: "400px",
                height: "auto",
                padding: "5%",
                borderRadius: "5px",
                margin: "20px auto"
              }}
              cover={
                <Carousel autoplay>
                  {data.itemImg &&
                    data.itemImg.map((item, index) => (
                      <ShopCarousel key={index}>{item.url}</ShopCarousel>
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
                    margin: " 10px 60px 10px 0",
                    fontWeight: "700",
                    width: "100px",
                    paddingLeft: "20px"
                  }}
                />
                <Statistic
                  title="남은 수량"
                  className="leftQuantity"
                  value={data.stock}
                  style={{
                    display: "inline-block",
                    margin: "10px 60px 10px 0",
                    fontWeight: "700",
                    width: "100px",
                    paddingLeft: "40px"
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
                  onClick={this.handleClick}
                >
                  ￦5,000 경험하기 (VAT 별도)
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
