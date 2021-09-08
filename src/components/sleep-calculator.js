import React from "react";
import {Button, Row, Typography, Select, Col, message} from "antd";
import { calculateSleepScore, getScoreColor, getTimes } from "./sleep-calculator-funcs";
import {mockSleepScoreApi} from "../apis/sleep-score-apis";
const { Text } = Typography;

const SleepCalculator = () => {
  const [timeInBed, setTimeInBed] = React.useState(null);
  const [timeAsleep, setTimeAsleep] = React.useState(null);
  const [sleepScore, setSleepScore] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const calculateAndSubmit = async () => {
    setSleepScore(null); //in case sleep score is already set
    setLoading(true);
    const score = calculateSleepScore(timeInBed, timeAsleep);
    const posted = await mockSleepScoreApi(score);
    setLoading(false);
    if (posted) {
      setSleepScore(score);
    } else {
      message.error("We were unable to generate or save your sleep score");
    }
  };

  const displayText = () => {
    if (loading) {
      return "Loading";
    }
    if (sleepScore || sleepScore === 0) {
      return `Your sleep score is ${sleepScore}`;
    }
    return "";
  }

  return (
    <div>
      <Text>Sleep Score Calculator</Text>
      <Row className={"sleep-score-row"} gutter={[16, 16]}>
        <Col>
          <Select
            className={"sleep-score-selector"}
            placeholder={"Duration in bed"}
            value={timeInBed}
            onChange={setTimeInBed}
          >
            {getTimes()}
          </Select>
        </Col>
        <Col>
          <Select
            className={"sleep-score-selector"}
            placeholder={"Duration asleep"}
            value={timeAsleep}
            onChange={setTimeAsleep}
          >
            {getTimes()}
          </Select>
        </Col>
        <Col>
          <Button
            disabled={timeInBed === null || timeAsleep === null}
            type={"primary"}
            onClick={() => calculateAndSubmit()}
            data-testid={"calculate"}
          >
            Calculate
          </Button>
        </Col>
      </Row>
      <Text style={{color: getScoreColor(sleepScore)}}>
        {displayText()}
      </Text>
    </div>
  );
};

export default SleepCalculator;
