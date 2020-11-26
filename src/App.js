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
} from "@material-ui/core";
import "./App.css";
import Apicall from "./API/Apicall";

function App() {
  let [from, setFrom] = useState("from");
  let [to, setTo] = useState("to");
  let [amount, setAmount] = useState(0);
  let [checkInfo, setCheckInfo] = useState(false);

  let fromHandler = (e) => {
    setFrom(e.target.value);
  };
  let toHandler = (e) => {
    setTo(e.target.value);
  };
  let amountHandler = (e) => {
    setAmount(e.target.value);
  };

  let ButtonClick = () => {
    if (from !== "None" && to !== "None" && amount > 0) {
      setCheckInfo(true);
    } else {
      setCheckInfo(false);
    }
  };

  return (
    <div className="App">
      <Container>
        <h1>Forex Aggregator</h1>
        <form>
          <div className="queryBox">
            <FormControl variant="filled" className="Selector">
              <TextField
                id="filled-basic"
                value={amount}
                onChange={amountHandler}
                label="Amount"
                variant="filled"
              />
            </FormControl>
            <FormControl variant="filled" className="Selector">
              <InputLabel id="fromLabel">From</InputLabel>
              <Select
                className=""
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
            <FormControl variant="filled" className="Selector">
              <InputLabel id="fromLabel">To</InputLabel>
              <Select
                className=""
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
            <Button
              fullWidth
              variant="contained"
              className="button"
              color="primary"
              onClick={ButtonClick}
            >
              {" "}
              Convert{" "}
            </Button>
          </div>
        </form>
        {checkInfo ? (
          <div>
            <Card>
              <Apicall
                name="Exchange Rate API"
                url={"https://api.exchangeratesapi.io/latest?base=" + from}
                amount={amount}
                to={to}
              />
            </Card>
            <Card>
              <Apicall
                name="Rates API"
                url={"https://api.ratesapi.io/api/latest?base=" + from}
                amount={amount}
                to={to}
              />
            </Card>
          </div>
        ) : null}
      </Container>
    </div>
  );
}

export default App;
