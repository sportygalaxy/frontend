"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDiscount = calculateDiscount;
function calculateDiscount(order, coupon) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (coupon.type) {
            case "PERCENTAGE":
                return (order.total * coupon.value) / 100;
            case "PRODUCT_OFF":
                const minProductPrice = Math.min(...order.items.map((item) => item.product.price));
                return minProductPrice * coupon.value;
            case "PRICE_OFF":
                return coupon.value;
            default:
                return 0;
        }
    });
}
