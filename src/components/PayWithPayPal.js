import { useEffect, useContext } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from 'axios';
import { useNavigate } from "react-router-dom";




// This values are the props in the UI


const payment_method = "paypal";
const currency = "USD";
const style = {"layout":"vertical"};

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ showSpinner, amount, showid }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const navigate = useNavigate();
    let userid = localStorage.getItem('userid')



    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                // currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, showid, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        // .then((orderId) => {
                            // Your code here after create the order
                        //     return orderId;
                        // });
                        
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        // Your code here after capture the order
                        console.log(details, "detai")
                        const data = {
                            "payment_id": details.id,
                            "status": details.status,
                            "userid": userid,
                            "payment_method" : payment_method,
                            "amount_paid": amount,
                        }
                
                        const url = "http://127.0.0.1:8000/bookings/payment/";
                        const config = { 'content-type': 'application/json' };
                
                        axios.post(url, data, config).then((response) => {
                            console.log(response.data, "data");
                            navigate(`/booked/${showid}/${response.data.id}`)
                            });
                    });
                }}
            />
        </>
    );
}

export default function PayWithPayPal(props) {
    const amount = props.amountx;
    const showid = props.showid;
	return (
		<div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider
                options={{
                    "client-id" : "ATXEQKGgzDc0QE6V9PPwK1y8ue8-Ho82xzlxWh5VDk2kOPk5RepHNi9zmzeAEgF4TK6fZ7Dts1NyBmEW",
                    components: "buttons",
                    // currency: "USD",
                }}
            >
				<ButtonWrapper
                    // currency={currency}
                    showSpinner={false}
                    amount={amount}
                    showid={showid}
                />
			</PayPalScriptProvider>
		</div>
	);
}