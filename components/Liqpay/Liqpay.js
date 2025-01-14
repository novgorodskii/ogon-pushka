import { LiqPayPay } from "react-liqpay";
import style from "./Liqpay.module.css";
const Liqpay = ({ amount, orderId }) => {
  return (
    <div className={style.liqpay} style={{ display: "flex" }}>
      {typeof window !== "undefined" ? (
        <LiqPayPay
          publicKey="i58476922278"
          privateKey="XKkn2frDXrSYRxuSzpLKJXsaM9iAQCdmVPxTzW5S"
          amount={amount}
          description="Payment for product"
          currency="UAH"
          orderId={orderId}
          result_url="https://ogonpushka.com.ua"
          server_url="https://ogon-pushka.herokuapp.com/orders/callback"
          product_description="Online courses"
          style={{ margin: "2rem 0px", width: "100%" }}
          title="Оплатить"
        />
      ) : null}
    </div>
  );
};
export default Liqpay;
