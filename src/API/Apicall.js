import React, { useEffect, useState } from "react";
import axios from "axios";

function Apicall(props) {
  let [isLoad, setLoad] = useState(true);
  let [rate, setRate] = useState(0);

  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        let objData = response.data.rates;
        if (objData[props.to]) {
          console.log("yes");

          setRate(objData[props.to]);
        } else {
          console.log("NO");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <p>{props.name}</p>
      <p>{props.url}</p>

      <p>
        {props.to}
        {"  "}
        {props.amount * rate}
      </p>
    </div>
  );
}

export default Apicall;
