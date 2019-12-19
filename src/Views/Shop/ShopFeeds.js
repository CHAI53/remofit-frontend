import React, { Component } from "react";
import { Card, Statistic } from "antd";
import "./index.less";
import moment from "moment";
import { withRouter } from "react-router-dom";

class ShopFeeds extends Component {
  state = {};

  GoodsClick = () => {
    // console.log("11", this.props.children.itemId);
    // console.log("props확인", this.props);

    this.props.history.push(`/shopdetail?itemId=${this.props.children.itemId}`);
  };

  render() {
    const t2 = moment();
    const t1 = moment(this.props.children.time, "YYYY-MM-DD HH:mm:ss");
    const gap = moment.duration(t1.diff(t2)).asMilliseconds();
    const deadline = Date.now();

    const { children } = this.props;
    const { Meta } = Card;
    const { Countdown } = Statistic;
    // console.log("props로받아오는것", this.props);
    // console.log(this.props.children.itemId);

    return (
      <>
        <Card
          cover={
            <div
              className="item"
              style={{
                backgroundImage: `url(${children.itemImg})`
              }}
              onClick={this.GoodsClick}
            >
              {gap > 0 ? (
                <Countdown
                  className="counttest"
                  value={deadline + gap}
                  valueStyle={{
                    fontSize: "29px",
                    color: "#ffffff",
                    fontWeight: "700",
                    textShadow: "1px 1px 2px black"
                  }}
                />
              ) : (
                ""
              )}
            </div>
          }
          style={{
            width: 300,
            display: "inline-block",
            margin: 30,
            overflow: "hidden",
            borderRadius: "10px"
          }}
          hoverable
        >
          <Meta title={children.itemTi} style={{ width: "auto" }} />
        </Card>
      </>
    );
  }
}

export default withRouter(ShopFeeds);
