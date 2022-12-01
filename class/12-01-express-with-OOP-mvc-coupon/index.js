import express from "express";
import { ProductController } from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller";

const app = express();

//상품 API
const productController = new ProductController();

//상품 구매하기 API
app.post("/products/buy", productController.buyProduct); //상품 구매하기

//상품 환불하기 API
app.post("/products/refund", productController.refundProduct); //상품환불하기

//쿠폰(상품권) 구입 API
const couponController = new CouponController();
app.post("/coupons/buy", couponController.buyCoupon); //쿠폰구매하기

// //게시판 API
// app.get("/boards/...");

app.listen(3000, () => {
  console.log(`백엔드 API서버가 켜졌어요`);
});
