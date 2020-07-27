import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./App.css";

const economyDataString =
  "['Professional, scientific, technical services (11.0%)', 'Educational services (9.6%)', 'Public administration (9.6%)', 'Construction (7.1%)', 'Health care (6.6%)', 'Data processing, libraries, other information services (3.7%)', 'Broadcasting & telecommunications (3.6%)']";
// "['Health care (13.7%)', 'Professional, scientific, technical services (9.6%)', 'Educational services (9.0%)', 'Accommodation & food services (7.7%)', 'Finance & insurance (6.1%)', 'Construction (5.2%)', 'Other transportation, support activities, couriers (4.5%)']";

const convertStringToObject = (arr) => {
  let keyValueArray = [];
  let arrOfKeyValueArrays = [];
  let arrParsed = arr.split(" ' ");

  arrParsed.map((element) => {
    element.split("'").map((item) => {
      if (item.length > 3) {
        keyValueArray.push(item);
      }
    });
  });

  keyValueArray.forEach((item) => {
    let newitem = item.split(/[()]/);
    newitem.pop();
    arrOfKeyValueArrays.push(newitem);
  });

  function toObject(pairs) {
    return Array.from(pairs).reduce(
      (acc, [key, value]) => Object.assign(acc, { [key]: value }),
      {}
    );
  }

  let ObjectFromArray = toObject(arrOfKeyValueArrays);

  return ObjectFromArray;
};

const economyObject = convertStringToObject(economyDataString);
let arrOfIndustries = [];

const changeKeyNames = () => {
  for (let keyName in economyObject) {
    let xlabel;
    function shortenIndustryName(keyName) {
      let translation = [];

      translation["Health care "] = "Health";
      translation["Professional, scientific, technical services "] = "Tech";
      translation["Educational services "] = "Education";
      translation["Accommodation & food services "] = "Food";
      translation["Construction "] = "Construction";
      translation["Chemicals "] = "Chemicals";
      translation["Administrative & support & waste management services "] =
        "Maintenance";
      translation["Public administration "] = "Public admin";
      translation["Transportation equipment "] = "Transportation";
      translation["Publishing, motion picture & sound recording industries "] =
        "Publishing";
      translation["Food & beverage stores "] = "Stores";
      translation["Social assistance "] = "Assistance";
      translation["Finance & insurance "] = "Finance";
      translation["Metal & metal products "] = "Metal";
      translation["Utilities "] = "Utilities";
      translation["Computer & electronic products "] = "Electronics";
      translation["Truck transportation "] = "Transportation";
      translation["Mining, quarrying, oil & gas extraction "] = "Extraction";
      translation["Department & other general merchandise stores "] =
        "Merchandise";
      translation["Air transportation "] = "Transportation";
      translation["Textile mills & textile products "] = "Textile";
      translation["Agriculture, forestry, fishing & hunting "] = "Agriculture";
      translation["Apparel "] = "Apparel";
      translation["Repair & maintenance "] = "Maintenance";
      translation["Food "] = "Food";
      translation["Paper "] = "Paper";
      translation["Broadcasting & telecommunications "] = "Broadcasting";
      translation[
        "Used merchandise, gift, novelty, souvenir, other miscellaneous stores "
      ] = "Miscellaneous";
      translation["Data processing, libraries, other information services "] =
        "Information";

      xlabel = translation[keyName];
    }

    shortenIndustryName(keyName);

    arrOfIndustries.push({
      name: keyName,
      Industry: parseFloat(economyObject[keyName]),
      xlabel: xlabel,
    });
  }
};

changeKeyNames();

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <h3 className="label">{`${payload[0].value}%`}</h3>
        <p
          className="desc"
          style={{ textalign: "center" }}
        >{`${payload[0].payload.name}`}</p>
      </div>
    );
  }
  return null;
}

const renderCustomBarLabel = ({ x, y, width, value }) => {
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
          data={arrOfIndustries}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="xlabel" />
          <YAxis />
          <Tooltip
            wrapperStyle={{
              width: 120,
              backgroundColor: "rgb(248,255,255,0.9)",
              border: "1px solid #00CED1",
              borderRadius: 3,
              fontSize: "15px",
              fontWeight: "bold",
              overflow: "hidden",
              lineHeight: "15px",
            }}
            content={<CustomTooltip />}
          />
          <Legend />
          <Bar dataKey="Industry" fill="#00CED1" label={renderCustomBarLabel} />
        </BarChart>
      </div>
    );
  }
}
