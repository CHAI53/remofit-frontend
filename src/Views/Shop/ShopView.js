import React, { Component } from "react";
import { Row, Card } from "antd";
import { isFulfilled } from "q";

export default class ShopView extends Component {
  render() {
    return (
      <>
        <Row xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card
            hoverable
            style={({ width: isFulfilled }, { height: 300 })}
            cover={<div className="bg" />}
            // cover={
            //   <img src="https://img.08liter.com/bo/brand/d3813ccf11eb4310ba683987efcff788320" />
            // }
          ></Card>
        </Row>
      </>
    );
  }
}
