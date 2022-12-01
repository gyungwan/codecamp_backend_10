import express from "express";
import { ProductController } from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller";
import { CashService } from "./mvc/controllers/services/cash.service.js";
const app = express();
const productService = new ProductService(); // 1. new 한번으로 모든곳에서 사용가능(싱글톤패턴)
const cashService = new CashService(); // 2. 쿠폰 구매 방식이 포인트결재로 변견됨(의존성주입) 컨트롤러 코드 수정없이 사용가능
const pointService = new PointService();

//상품 API
const productController = new ProductController(cashService, productService);

//상품 구매하기 API
app.post("/products/buy", productController.buyProduct); //상품 구매하기

//상품 환불하기 API
app.post("/products/refund", productController.refundProduct); //상품환불하기

//쿠폰(상품권) 구입 API
const couponController = new CouponController(cashService);
app.post("/coupons/buy", couponController.buyCoupon); //쿠폰구매하기

// //게시판 API
// app.get("/boards/...");

app.listen(3000, () => {
  console.log(`백엔드 API서버가 켜졌어요`);
});

//
// 1. ProductController 가 CashService에 의존하고 있음 (CashService => 의존성)
//       => 이 상황을 "강하게 결합되어있다" 라고 표현 => tight-coupling

// 2. 개선하기위해서 "느슨항 결합"으로 변결할 필요가 있음 => Loose-coupling
//        => 이런한 변경을 위해서 밖에서 "의존성 주입"해줌 => Dependency-Injection(DI)
//        => 이역할을 대시해주는 Nestjs 도구 =>IoC 컨테이너 (DI 해주는 얘) =>Inversion-Of-Controll(통제를 역전하다)

// 3. "의존성 주입"으로 new를 2번이상 할 필요가 없어짐, 또한 하나의 의존성을 여러곳에서 재사용 =>싱글톤패턴
//        =>대상 class의 소스코드를 직접 수정하지 않고 변경 가능(cashService => pointService  바꿔치기)  => "핵심!!!"

// 4. "의존성 주입"이면 "싱글톤 패턴" 인가?? => 아니다 (단지 디폴트가 "싱글톤"이었을 뿐 바뀔수 이있다 )

// DI프레임워크
// Nestjs
