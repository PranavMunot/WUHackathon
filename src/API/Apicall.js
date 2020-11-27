import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function Apicall(props) {
  let [isLoad, setLoad] = useState(true);
  let [rate, setRate] = useState(0);
  let [returnedDate, setreturnedDate] = useState("NO");

  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        setreturnedDate(response.data.date);
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
    <div className="Cards">
      <p>{props.name}</p>
      {/* <p>{props.url}</p> */}
      <p>{returnedDate}</p>
      <p>{rate ? props.to + " " + props.amount * rate : "No Data Available"}</p>
    </div>
  );
}

export default Apicall;
