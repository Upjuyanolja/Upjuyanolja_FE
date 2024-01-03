import React from 'react';
import './roomForSale.scss';

const RoomForSale = () => {
  return (
    <div className="room-card">
      <div className="room-image"></div>
      <div className="room-content">
        <div className="room-title">스탠다드 트윈룸</div>
        <div className="room-amenities">
          <span>TV</span>
          <span>에어컨</span>
          <span>인터넷</span>
        </div>
        <div className="room-info">
          <div>최소 2일 / 최대 4인</div>
          <div>체크인 15:00 / 체크아웃 11:00</div>
        </div>
        <div className="room-booking">
          <button className="booking-button">예약</button>
          <div className="room-price">65,000원</div>
        </div>
      </div>
    </div>
  );
};

export default RoomForSale;
