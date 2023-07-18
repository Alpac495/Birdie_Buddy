//결제 api

import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import "./MypagePay.css"

const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
const customerKey = "YbX2HuSlsC9uVJW6NMRMj";

const MypageUpdate = () => {
    const paymentWidgetRef = useRef(null);
    const paymentMethodsWidgetRef = useRef(null);
    const [price, setPrice] = useState(50000);

    useEffect(() => {
        (async () => {
            const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

            const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
                "#payment-widget",
                price
            );

            paymentWidgetRef.current = paymentWidget;
            paymentMethodsWidgetRef.current = paymentMethodsWidget;
        })();
    }, []);

    useEffect(() => {
        const paymentMethodsWidget = paymentMethodsWidgetRef.current;

        if (paymentMethodsWidget == null) {
            return;
        }

        paymentMethodsWidget.updateAmount(
            price,
            paymentMethodsWidget.UPDATE_REASON.COUPON
        );
    }, [price]);

    return (
        <div className="mypagepay">

                <div className="cta-header-1">
                    <div className="headline">🌤️ Sunny</div>
                    <div className="subtitle">Enjoy your day!</div>
                    <div className="spacer">
                        <div className="x16" />
                    </div>
                    <img
                        className="rounded-end-piece"
                        alt=""
                        src="/rounded-end-piece.svg"
                    />
                </div>


            <h1>주문서</h1>
            <div id="payment-widget" />
            <div>
                <input
                    type="checkbox"
                    onChange={(event) => {
                        setPrice(event.target.checked ? price - 5000 : price + 5000);
                    }}
                />
                <label>5,000원 할인 쿠폰 적용</label>
            </div>
            <button
                onClick={async () => {
                    const paymentWidget = paymentWidgetRef.current;

                    try {
                        await paymentWidget?.requestPayment({
                            orderId: nanoid(),
                            orderName: "토스 티셔츠 외 2건",
                            customerName: "김토스",
                            customerEmail: "customer123@gmail.com",
                            successUrl: `${window.location.origin}/success`,
                            failUrl: `${window.location.origin}/fail`,
                        });
                    } catch (err) {
                        console.log(err);
                    }
                }}
            >
                결제하기
            </button>
            <div className="title3">Dashboard</div>
        </div>
    );
}
export default MypageUpdate;
