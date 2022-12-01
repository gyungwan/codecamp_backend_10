//import { CashService } from "./services/cash.service.js";
import { PointService } from "./services/point.service.js";

export class CouponController {
  buyCoupon = (req, res) => {
    //1. 가진돈이 얼만큼 있는지 검증하는 코드(대략10줄 => 2줄)
    const cashService = new PointService();
    const hasMoney = cashService.checkValue();

    // 2. 쿠폰 구매하는 코드
    if (hasMoney && !isSoldout) {
      res.send("쿠폰 구매 완료");
    }
  };
}
