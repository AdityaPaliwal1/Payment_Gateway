import { useState } from "react";
import "./App.css";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
function App() {
  const [show, setShow] = useState(false);
  const [succes, setSucces] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState(false);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Simple Books",
            amount: {
              currency_code: "USD",
              value: 40,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderId) => {
        setOrderId(orderId);
        return orderId;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSucces(true);
    });
  };

  const onError = (data, actions) => {
    setError("Something went wrong");
  };

  return (
    <div className="App">
      <PayPalScriptProvider
        options={{
          clientId:
            "AfrsJr17pAJR8qRm6KelOGfreDy3z8Xx6AwrSXg67JsQYs1pSn4Fo3Up6LsikBPiaTQDwsOw7QFlMFoM",
        }}
      >
        <h1>Simple Books</h1>
        <span>$40</span>
        <button type="submit" onClick={() => setShow(true)}>
          Buy Now
        </button>

        <div className="PayPalButtons">
          {show ? (
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            />
          ) : null}
        </div>
      </PayPalScriptProvider>
    </div>
  );
}

export default App;
