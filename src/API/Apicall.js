import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";

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
      <Card variant="outlined">
        {/* <div className="card"> */}
        <Grid container>
          <Grid item xs={12} md={6}>
            <div className="leftSide">
              <CardContent>
                <Typography variant="h4" className="Head">
                  {props.name}
                </Typography>
                <Typography variant="body2" className="Head">
                  {returnedDate}
                </Typography>
              </CardContent>
            </div>
          </Grid>
          <Grid className="Currency" item xs={12} md={6}>
            <div className="rightSide">
              <Typography variant="body1" className="Head2">
                {rate
                  ? props.from +
                    " " +
                    props.amount +
                    " = " +
                    props.to +
                    " " +
                    props.amount * rate
                  : "No Data Available"}
              </Typography>
              <Typography variant="body2" className="Head2">
                {rate
                  ? props.from + " 1" + " = " + props.to + " " + rate
                  : "No Data Available"}
              </Typography>
            </div>
          </Grid>
        </Grid>
        {/* </div> */}
        <p>Source: {props.url}</p>
      </Card>
    </div>
  );
}

export default Apicall;
