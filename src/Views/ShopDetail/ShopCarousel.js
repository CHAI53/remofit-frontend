import React, { Component } from "react";
import { Card } from "antd";

class ShopCarousel extends Component {
  render() {
    const { children } = this.props;
    console.log("맵돌릴거", this.props);
    return (
      <Card
        hoverable
        style={{ width: "auto", borderRadius: "5px" }}
        cover={
          <img alt="carousel" src={children} style={{ borderRadius: "5px" }} />
        }
      />
    );
  }
}

export default ShopCarousel;
