// import React from 'react';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//        Hello people
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./App.css";

const data = [
  {
    name: "Health carehgjghjghfjgfhfgj ",
    score: 13.7,
  },
  {
    name: "Health caresdhfdfjfg",
    score: 15.7,
  },
  {
    name: "Healthcvgdf care ",
    score: 1.7,
  },
];

const economdata ="['Professional, scientific, technical services (11.0%)', 'Educational services (9.6%)', 'Public administration (9.6%)', 'Construction (7.1%)', 'Health care (6.6%)', 'Data processing, libraries, other information services (3.7%)', 'Broadcasting & telecommunications (3.6%)']"
  // "['Health care (13.7%)', 'Professional, scientific, technical services (9.6%)', 'Educational services (9.0%)', 'Accommodation & food services (7.7%)', 'Finance & insurance (6.1%)', 'Construction (5.2%)', 'Other transportation, support activities, couriers (4.5%)']";
console.log("economdata", economdata);

const funeconom = (arr) => {
  let newArray = [];
  let objarr = [];
  let arrParsed = arr.split(" ' ");

  arrParsed.map((element) => {
    element.split("'").map((item) => {
      if (item.length > 3) {
        newArray.push(item);
      }
    });
  });
  newArray.forEach((item) => {
    let newitem = item.split(/[()]/);
    // console.log(newitem, "new");
    newitem.pop();
    objarr.push(newitem);
  });

  //console.log(objarr, "new objarr");

  function toObject(pairs) {
    return Array.from(pairs).reduce(
      (acc, [key, value]) => Object.assign(acc, { [key]: value }),
      {}
    );
  }
  let ObjectFromArray = toObject(objarr);
  //console.log(toObject(objarr), "it works");

  return ObjectFromArray;
};

const HELLOoBJECT = funeconom(economdata);

console.log(HELLOoBJECT, "HELLOoBJECT");

// let KeyArray = Object.keys(HELLOoBJECT);
// let valuesArray = Object.values(HELLOoBJECT);

// const newvaluearr = [];
// valuesArray.forEach((value) => {
//   return newvaluearr.push(parseFloat(value));
// });

let bigARRAY = [];

const makeitWork = () => {
  for (let k in HELLOoBJECT) {
    let xlabel;
    function getxaxis(k) {

      let translation = [];
      translation["Health care "] = "Health";
      translation["Professional, scientific, technical services "] = "Tech";
      translation["Educational services "] = "Education";
      translation["Accommodation & food services "] = "Food";
      translation["Construction "] = "Construction";
      translation["Chemicals "] = "Chemicals";
      translation["Administrative & support & waste management services "] = "Maintenance";
      translation["Public administration "] = "Public admin";
      translation["Transportation equipment "] = "Transportation";
      translation["Publishing, motion picture & sound recording industries "] = "Publishing";
      translation["Food & beverage stores "] = "Stores";
      translation["Social assistance "] = "Assistance";
      translation["Finance & insurance "] = "Finance";
      translation["Metal & metal products "] = "Metal";
      translation["Utilities "] = "Utilities";
      translation["Computer & electronic products "] = "Electronics";
      translation["Truck transportation "] = "Transportation";
      translation["Mining, quarrying, oil & gas extraction "] = "Extraction";
      translation["Department & other general merchandise stores "] = "Merchandise";
      translation["Air transportation "] = "Transportation";
      translation["Textile mills & textile products "] = "Textile";
      translation["Agriculture, forestry, fishing & hunting "] = "Agriculture";
      translation["Apparel "] = "Apparel";
      translation["Repair & maintenance "] = "Maintenance";
      translation["Food "] = "Food";
      translation["Paper "] = "Paper";
      translation["Broadcasting & telecommunications "] = "Broadcasting";
      translation["Used merchandise, gift, novelty, souvenir, other miscellaneous stores "] = "Miscellaneous";
      translation["Data processing, libraries, other information services "] = "Information";

      console.log(translation);
      xlabel = translation[k];
    }
   
    getxaxis(k);

    bigARRAY.push({
      name: k,
      score: parseFloat(HELLOoBJECT[k]),
      xlabel: xlabel,
    });
  }
};
makeitWork();

console.log(bigARRAY, "here");

function CustomTooltip({ payload, label, active }) {
  
  if (active) {
    console.log(payload[0].payload.name,"payload")
    return (
      <div className="custom-tooltip">
        <h3 className="label">{`${payload[0].value}%`}</h3>
        <p className="desc" style={{ textalign: "center" }}>{`${payload[0].payload.name}`}</p>
      </div>
    );
  }

  return null;
}

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  return (
    <text
      x={x + width / 2}
      y={y}
      fill="#666"
      textAnchor="middle"
      dy={-6}
    >{`${value}%`}</text>
  );
};

export default class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <BarChart
          width={800}
          height={300}
          data={bigARRAY}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
           dataKey="xlabel" 
           />
          <YAxis />
          <Tooltip
            wrapperStyle={{
              width: 120,
              backgroundColor: "rgb(245,245,245 ",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "40px",
            }}
            content={<CustomTooltip />}
          />
          <Legend />
          <Bar 
          dataKey="score" 
          fill="#82ca9d"
           label={renderCustomBarLabel}
            />
        </BarChart>
      </div>
    );
  }
}
