import React, { Component } from "react";
import { Row, Card, Statistic } from "antd";
import "./index.less";
import moment from "moment";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { format } from "path";

export default class ShopFeeds extends Component {
  state = {};

  render() {
    const t2 = moment();
    const t1 = moment(this.props.children.time, "YYYY-MM-DD HH:mm:ss");
    const gap = moment.duration(t1.diff(t2)).asMilliseconds();

    const { children } = this.props;
    const { Meta } = Card;
    const { Countdown } = Statistic;
    const deadline = Date.now();

    return (
      <>
        <Card
          cover={
            <Link to="/shopdetail">
              <div
                className="item"
                style={{
                  backgroundImage: `url(${children.itemImg})`
                }}
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
            </Link>
          }
          style={{
            width: 300,
            display: "inline-block",
            margin: 30,
            overflow: "hidden",
            borderRadius: "30px"
          }}
          hoverable
          className="PullDown"
        >
          <Meta title={children.itemTi} style={{ width: "auto" }} />
        </Card>
      </>
    );
  }
}
