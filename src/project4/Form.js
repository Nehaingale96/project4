import React, { useState } from "react";
import "./Form.css";
import { Container, Form, Button } from 'react-bootstrap';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJs.register(Tooltip, Title, ArcElement, Legend);
const ChartMain = () => {
  const [percent, setPercent] = useState({
    correct: "",
    false: "",
  });
  const [err, setErr] = useState("");
  const [data, setData] = useState({
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["red", "green"],
      },
    ],
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (value <= 100 && value >= 0) {
      if (name === "true") {
        setPercent({ true: value, false: 100 - value });
        setErr("");
      } else {
        setPercent({ true: 100 - value, false: value });
        setErr("");
      }
    } else {
      setErr(alert("percentage value always less than 100"));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((percent.true === "", percent.false === "")) {
      setErr("please enter percentage value");
    } else if (!err) {
      setData({
        datasets: [
          {
            data: [percent.true, percent.false],
            backgroundColor: ["red", "green"],
          },
        ],
      });
    }
  };

  
  return (
  <Container>
      {err && <p class="alert alert-danger col-sm-12" style={{ color: 'red', textAlign: 'center' }}>{err}</p>}
      <div className='form'>
        <Form.Group controlId='true'>
          <Form.Label>Box 1</Form.Label>
          <Form.Control
            type='number'
            name='true'
            value={percent.true}
            onChange={handleChange}
            className='form-control'
          />
        </Form.Group>

        <Form.Group controlId='false'>
          <Form.Label>Box 2</Form.Label>
          <Form.Control
            type='number'
            name='false'
            value={percent.false}
            onChange={handleChange}
            className='form-control '
          />
        </Form.Group>
      <button type="button" class="btn btn-primary btn-lg active" role="button" aria-pressed="true" onClick={handleSubmit}>Create Chart</button>
      </div>
      <div style={{ width: '40%', height: '40%', margin: '0 auto' }}>
        <Pie data={data} />
      </div>
    </Container>
  
  );
};

export default ChartMain;