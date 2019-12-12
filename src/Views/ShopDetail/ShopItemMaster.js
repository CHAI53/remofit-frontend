import React, { Component } from "react";
import "./index.less";
import { Card } from "antd";

export default class ShopItemMaster extends Component {
  render() {
    const master = this.props;
    return (
      <Card style={{ width: "100%" }}>
        <p className="bold">용량 또는 중량</p>
        <p> {master.size}</p>
        <p className="bold">제조연월일</p>
        <p> {master.madeInYear}</p>
        <p className="bold">제조국가</p>
        <p> {master.madeIn}</p>
        <p className="bold">원산지</p>
        <p> {master.ori}</p>
        <p className="bold">사용기한 또는 개봉후 사용기간</p>
        <p> {master.expiryYear}</p>
        <p className="bold">제조업자 및 제조판매업자</p>
        <p>{master.maIm}</p>
        <p className="bold">품질보증기준</p>
        <p> {master.qa}</p>
        <p className="bold">성분</p>
        <p> {master.mat}</p>
        <p className="bold">사용 시 주의사항</p>
        <p> {master.cauOfUse}</p>
        <p className="bold">
          구매, 교환, 반품, 배송, 설치 등과 관련하여 추가비용, 제한조건 등의
          특이사항
        </p>
        <p> {master.special}</p>
        <p className="bold">고객센터 전화번호</p>
        <p> {master.managerTel}</p>
      </Card>
    );
  }
}
