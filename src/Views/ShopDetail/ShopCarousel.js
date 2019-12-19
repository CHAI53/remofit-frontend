import React, { Component } from "react";

class ShopCarousel extends Component {
  render() {
    const { children } = this.props;
    //console.log("맵돌릴거", this.props);
    return (
      <img
        // react-slick 잘보고 고민해보아용
        alt="carousel"
        src={children}
        style={{ width: "90%", margin: "0 auto", borderRadius: "5px" }}
      />
    );
  }
}

export default ShopCarousel;
