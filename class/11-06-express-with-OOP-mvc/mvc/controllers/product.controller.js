import { CashService } from "./services/cash.service.js";
import { ProductService } from "./services/product.js";

export class ProductController {
  buyProduct = (req, res) => {
    //1. 가진돈이 얼만큼 있는지 검증하는 코드(대략10줄 => 2줄)
    const cashService = new CashService();
    const hasMoney = cashService.checkValue(); // is나has 로 시작하는 변수명을 쓸때는 불린타입으로 받아오는걸 뜻함

    // 2. 판매 여부 검증하는 코드 (대략 10줄  => 2줄)
    const productService = new ProductService();
    const isSoldout = productService.checkSoldout();

    // 3. 삼품 구매하는 코드
    if (hasMoney && !isSoldout) {
      res.send("상품 구매 완료");
    }
  };

  refundProduct = (req, res) => {
    // 1. 판매여부 검증하는 코드 (10줄 =>2줄 )
    const productService = new ProductService();
    const isSoldout = productService.checkSoldout();

    // 2. 상품 환불하는 코드
    if (isSoldout) {
      res.send("상품 환불 완료");
    }
  };
}
