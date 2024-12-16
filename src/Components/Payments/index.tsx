import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import './styles.css'
import { useLocation } from "react-router-dom";
import {gql, useMutation} from "@apollo/client"
import { useUser } from "../../context/UserContext";
// Renders errors or successfull transactions on the screen.
function Message({ content } : any) {
    return <p>{content}</p>;
}

type gameData = {
    _id: string;
    price: number;
    title: string;
}

const ADD_GAME_TO_USER = gql`
mutation addGameToUser($gameID: ID!, $userID: ID!){
  addGameToUser(gameID: $gameID, userID: $userID){
    _id,
    ownedGames {
      _id
    }
  }
}
`;

function App() {
    const location = useLocation();
    const {_id, price, title} : gameData = location.state || {};
    console.log(location.state)
    const [addGameToUser] = useMutation(ADD_GAME_TO_USER);
    const initialOptions = {
        "clientId": "",
        "enable-funding": "venmo",
        "disable-funding": "",
        "currency": "USD",
        "data-page-type": "product-details",
        "components": "buttons",
        "data-sdk-integration-source": "developer-studio",
    };
    const {userId} = useUser();

    const [message, setMessage] = useState("");

    if (!_id || (price != 0 && !price) || !title) {
        console.error("One of the required parameters is missing. Please make sure to pass the required parameters to the component.");
        return (
            <div className="full-height-container-error">
                <div className="heading">An unexpected error occured.</div>
            </div>
        );
    }

    const createOrder = async () => {
        try {
            const response = await fetch("http://localhost:4000/payments/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // use the "body" param to optionally pass additional order information
                // like product ids and quantities
                body: JSON.stringify({
                    cart: {
                            id: _id,
                            quantity: 1,
                            value: price,
                        },
                }),
            });

            const orderData = await response.json();

            if (orderData.id) {
                return orderData.id;
            } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);

                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(error);
            // setMessage(
            //     `Could not initiate PayPal Checkout...${error}`
            // );
        }
    }

    const onApprove = async (data: any, actions: any) => {
        try {
            const response = await fetch(
                `http://localhost:4000/payments/api/orders/${data.orderID}/capture`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const orderData = await response.json();
            // Three cases to handle:
            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            //   (2) Other non-recoverable errors -> Show a failure message
            //   (3) Successful transaction -> Show confirmation or thank you message

            const errorDetail = orderData?.details?.[0];

            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
            } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                    `${errorDetail.description} (${orderData.debug_id})`
                );
            } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                // Add the game to user's library
                const transaction =
                    orderData.purchase_units[0].payments
                        .captures[0];
                setMessage(
                    `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                );
                const {data} = await addGameToUser({
                    variables: {
                        gameID: _id,
                        userID: userId
                    }
                });
                console.log(
                    data,
                    "Capture result",
                    orderData,
                    JSON.stringify(orderData, null, 2)
                );

            }
        } catch (error) {
            console.error(error);
            setMessage(
                `Sorry, your transaction could not be processed...${error}`
            );
        }
    }

    return (
        <div className="full-height-container">
            <div className="heading">Buy {title} now!</div>
            <div className="inner-container">
                <div className="App">
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons
                            style={{
                                shape: "pill",
                                layout: "vertical",
                                color: "blue",
                                label: "paypal"
                            }} 
                            createOrder={createOrder}
                            onApprove={onApprove}
                            className="paypal-button"
                        />
                    </PayPalScriptProvider>
                    <Message content={message} />
                </div>
            </div>
        </div>
    );
}


export default App; 