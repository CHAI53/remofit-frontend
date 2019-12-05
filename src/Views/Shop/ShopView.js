import React, { Component } from "react";
import { Row, Card } from "antd";
import { ShowMockup } from "../../config.js";
import "./index.less";
import ShopFeeds from "./ShopFeeds.js";
const { Meta } = Card;

export default class ShopView extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    fetch(ShowMockup, {
      method: "get"
    })
      .then(res => res.json())
      .then(info => {
        this.setState(
          {
            data: info
          },
          () => {
            console.log("데이터받아온 후", this.state);
          }
        );
      });
    // console.log(this.state);
  }
  render() {
    const { data } = this.state;
    return (
      <>
        <div className="wrapper">
          <Row xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              style={({ height: 300 }, { overflow: "hidden" })}
              cover={
                <div
                  className="background"
                  style={{
                    backgroundImage: `url(${data.mainpic})`
                  }}
                />
              }
            >
              <Meta
                title={data.company_name}
                description={data.company_sub}
                style={{ textAlign: "center" }}
              />
              <Meta
                title="&nbsp;"
                description={data.company_desc}
                style={{ textAlign: "center" }}
              />
              <br />
              <div className="item-wrapper">
                <Row type="flex" justify="center">
                  {this.state.data.item &&
                    this.state.data.item.map((e, index) => (
                      <ShopFeeds>{e}</ShopFeeds>
                    ))}
                </Row>
              </div>
            </Card>
          </Row>
        </div>
      </>
    );
  }
}
