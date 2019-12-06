import React, { Component } from "react";
import { Row, Card } from "antd";
import "./index.less";

const { Meta } = Card;

export default class ShopFeeds extends Component {
  render() {
    const { children } = this.props;
    console.log(this.props);
    return (
      <>
        <Card
          cover={
            <div
              className="item"
              style={{
                backgroundImage: `url(${children.item_pic})`
              }}
            />
          }
          style={{ width: 300, display: "inline-block", margin: 30 }}
          hoverable
        >
          <Meta title={"d" + children.item_desc} />
        </Card>
      </>
    );
  }
}
