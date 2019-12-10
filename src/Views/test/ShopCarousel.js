import React, { Component } from "react";
import { Card, Meta } from "antd";

class ShopCarousel extends Component {
  render() {
    const { children } = this.props;
    // console.log("맵돌릴거", this.props);
    return (
      <img
        alt="carousel"
        src={children}
        style={{ width: "90%", margin: "0 auto" }}
      />
    );
  }
}

export default ShopCarousel;
