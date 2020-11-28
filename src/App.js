import { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  TextField,
  Grid,
  Input,
} from "@material-ui/core";
import "./App.css";
import Apicall from "./API/Apicall";

function App() {
  let [from, setFrom] = useState("");
  let [to, setTo] = useState("");
  let [amount, setAmount] = useState();
  let [checkInfo, setCheckInfo] = useState(false);
  let [apiDate, setapiDate] = useState(
    new Date().toLocaleDateString("en-US").split("/")
  );

  console.log(apiDate);

  let fromHandler = (e) => {
    setFrom(e.target.value);
  };
  let toHandler = (e) => {
    setTo(e.target.value);
  };
  let amountHandler = (e) => {
    setAmount(e.target.value);
  };

  let dateEventHandler = (e) => {
    let handlerDate = e.target.value.split("-");
    setapiDate([handlerDate[1], handlerDate[2], handlerDate[0]]);
  };

  let ButtonClick = () => {
    if (from !== "" && to !== "" && amount > 0 && from !== to) {
      setCheckInfo(true);
    } else {
      setCheckInfo(false);
    }
  };

  return (
    <div className="App">
      <Container>
        <h1>TEAM Forex</h1>

        <form autoComplete="off">
          <Grid
            // spacing={3}
            direction="column"
            justify="space-between"
            alignItems="center"
            container
          >
            <div className="queryBox">
              <Grid item spacing={3} xs={12} md={2}>
                <FormControl variant="filled" className="Selector">
                  <TextField
                    id="filled-basic"
                    value={amount}
                    onChange={amountHandler}
                    label="Amount"
                    variant="filled"
                    className="field"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl variant="filled" className="Selector">
                  <InputLabel id="fromLabel">From</InputLabel>
                  <Select
                    className="field"
                    labelId="fromLabel"
                    value={from}
                    onChange={fromHandler}
                    label="Select"
                  >
                    <MenuItem value={""}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"EUR"}>EUR</MenuItem>
                    <MenuItem value={"INR"}>INR</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl variant="filled" className="Selector">
                  <InputLabel id="fromLabel">To</InputLabel>
                  <Select
                    className="field"
                    labelId="fromLabel"
                    value={to}
                    onChange={toHandler}
                  >
                    <MenuItem value={""}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"EUR"}>EUR</MenuItem>
                    <MenuItem value={"INR"}>INR</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl className="selector">
                  <TextField
                    type="date"
                    variant="filled"
                    fullWidth
                    className="field"
                    label="Date"
                    onChange={dateEventHandler}
                    defaultValue={
                      apiDate[2] + "-" + apiDate[0] + "-" + apiDate[1]
                    }
                  ></TextField>
                </FormControl>
              </Grid>
            </div>
          </Grid>

          <Button
            variant="contained"
            className="button"
            className="field"
            color="primary"
            onClick={ButtonClick}
          >
            {" "}
            Convert{" "}
          </Button>
        </form>

        {checkInfo ? (
          <div>
            <Apicall
              name="Exchange Rate API"
              url={
                "https://api.exchangeratesapi.io/" +
                apiDate[2] +
                "-" +
                apiDate[0] +
                "-" +
                apiDate[1] +
                "?base=" +
                from
              }
              amount={amount}
              from={from}
              to={to}
            />

            <Apicall
              name="Rates API"
              url={
                "https://api.ratesapi.io/api/" +
                apiDate[2] +
                "-" +
                apiDate[0] +
                "-" +
                apiDate[1] +
                "?base=" +
                from
              }
              amount={amount}
              from={from}
              to={to}
            />
            <Apicall
              name="Fixer API"
              url={
                "http://data.fixer.io/api/" +
                apiDate[2] +
                "-" +
                apiDate[0] +
                "-" +
                apiDate[1] +
                "?access_key=e3f344598c4bbe8027b8570af73f8fef&base=" +
                from
              }
              amount={amount}
              from={from}
              to={to}
            />
          </div>
        ) : null}
      </Container>
    </div>
  );
}

export default App;
