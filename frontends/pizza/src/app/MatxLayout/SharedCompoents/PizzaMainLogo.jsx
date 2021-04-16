import React from "react";

const PizzaMainLogo = (props) => (
  <div
    style={{
      width: props.width,
      display: "flex",
      alignItems: "center",
    }}
  >
    <img alt="pizza-log-min" src="/assets/images/PizzaLogo.png" />
  </div>
);

export default PizzaMainLogo;
