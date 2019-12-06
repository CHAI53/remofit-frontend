import React, { Component } from "react";
import { Card, Meta } from "antd";

class ShopCarousel extends Component {
  render() {
    const { children } = this.props;
    console.log("맵돌릴거", this.props);
    return (
      <Card
        hoverable
        style={{ width: 350 }}
        cover={<img alt="carousel" src={children} />}
      />
    );
  }
}

export default ShopCarousel;
