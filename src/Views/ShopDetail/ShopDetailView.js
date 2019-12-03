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
  Tabs
} from "antd";
import "./index.less";

export default class ShopDetailView extends Component {
  componentDidMount() {}
  render() {
    const { Countdown } = Statistic;
    const { TabPane } = Tabs;
    const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
    const text = `
    용량 또는 중량
75g
제품 주요사양
자몽추출물이 함유되어 더욱 상쾌한 클렌징!
촉촉한 샤베트 타입으로, 고체 형태의 오일이 밤 형태로 존재하다가 피부 온도에 반응하여 부드럽게 사르르 녹아 말끔하게 클렌징 해줍니다.
사용기한 또는 개봉후 사용기간
개봉 후 12개월
사용방법
물기가 없는 손에 적당량을 덜어 부드럽게 마사지하듯 클렌징한 후 따뜻한 물로 충분히 씻어냅니다.
제조업자 및 제조판매업자
제조업자-㈜코스메카코리아, 제조판매업자-㈜조이코스
제조국가(원산지)
한국
주요성분
자몽추출물,귤껍질추출물,라임추출물,레몬추출물,오렌지수,루이보스잎추출물, 알로에베라잎즙, 올리브오일, 마카다미아씨오일, 왕귤껍질오일
식품의약품안전처 심사 필 유무(기능성)
기능성 없음
사용 시 주의사항
1. 화장품을 사용하여 다음과 같은 이상이 있는 경우에는 사용을 중지하여야 하며, 계속 사용하면 증상이 악화되므로 피부과 전문의 등에게 상담할 것.
 가. 사용중 붉은 반점, 부어오름, 가려움증, 자극등의 이상이 있는 경우.
 나. 적용부위가 직사광선에 의하여 위와 같은 이상이 있는 경우.
2. 상처가 있는 부위, 습진 및 피부염등의 이상이 있는 부위에는 사용을 하지말 것.
3. 보관 및 취급시의 주의사항
 가. 사용후에는 반드시 마개를 닫아둘 것.
 나. 유아•소아의 손이 닿지 않는 곳에 보관할 것.
 다. 고온 또는 저온의 장소 및 직사광선이 닿는 곳에는 보관하지 말 것.
품질보증기준
공정거래위원회 고시 품목별 소비자분쟁 해결기준에 따름
고객센터 전화번호
02-3472-2375
`;
    function onFinish() {
      console.log("finished!");
    }

    return (
      <Row>
        <Col className="photoCol" span={8}>
          <Card
            hoverable
            style={{
              width: 350,
              height: 500,
              margin: "50px",
              borderRadius: "5px"
            }}
            cover={
              <Carousel autoplay>
                <div className="photoSlider">
                  <div className="slide1">a</div>
                </div>
                <div className="photoSlider">
                  <div className="slide2">aa</div>
                </div>
                <div className="photoSlider">
                  <div className="slide3">aaa</div>
                </div>
              </Carousel>
            }
          ></Card>
        </Col>
        <Col className="info" span={14}>
          <Card className="product">
            <p>지나 인 스킨 자몽 비타 필링 스틱</p>
          </Card>
          <Divider />
          <br />
          <br />
          <br />
          <br />
          <Divider />
          <Countdown
            title="남은 시간"
            className="leftTime"
            value={deadline}
            onFinish={onFinish}
            style={{
              display: "inline-block",
              margin: " 10px 60px",
              fontWeight: "700"
            }}
          />
          <Statistic
            title="남은 수량"
            className="abc"
            value={35}
            style={{
              display: "inline-block",
              margin: "10px 60px",
              fontWeight: "700"
            }}
          />
          <Divider />
          <div className="optionInputDesc">선택사항 입력</div>
          <Input
            className="optionInput"
            placeholder="Basic usage"
            size="large"
          />
          <Button className="purchaseBtn" type="primary" block size="large">
            ￦3,000 경험하기 (VAT 별도)
          </Button>
          <Tabs defaultActiveKey="1">
            <TabPane tab="상품 설명" key="1">
              <div>{text}</div>
            </TabPane>
            <TabPane tab="상품 이미지" key="2">
              <img
                className="productImg"
                src="https://img.08liter.com/release/product/b1ec8406c826477bba3a5d1e5a8e8b21640"
                alt=""
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}
