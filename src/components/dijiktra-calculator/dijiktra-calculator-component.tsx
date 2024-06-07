import React, { useState } from "react";
import "../../styles/dijiktraCalculator.css";
import OptimizerIcon from "../shared/Icons/OptimizerIcon";
import { IShortestPathData } from "../../interfaces/ShortestPathData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { getShortestPath } from "../../redux/feature/PathThunk";
import { PathActions } from "../../redux/feature/PathSlice";

const NODE_VALUES = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

const DijiktraCalculatorComponent: React.FC = () => {
  const [fromNode, setFromNode] = useState("");
  const [toNode, setToNode] = useState("");
  const [isCalculate, setIsCalculate] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const { shortestPathResponse, shortestPathLoading, shortestPathError } = useSelector((state: RootState) => state.path);

  const handleClear = () => {
    dispatch(PathActions.clearShotestPathData());
    setIsCalculate(false);
    setFromNode("");
    setToNode("");
  };

  const handleCalculate = () => {
    dispatch(getShortestPath({ fromNode, toNode })).then((res) => {
      if (res.type === getShortestPath.fulfilled.type) {
          setIsCalculate(true);
      }
    });
  };

  return (
    <div className="dijiktra__section">
      <div>
       <h1 className="typography-heading">Dijiktra’s Algorithm Calculator</h1>
       <h2 className="typography-subheading">Discovering Optimal Routes Through Nodes Using Dijkstra's Method</h2>
      </div>
      <div className="calculate__section">
        <div className="calculate__input__container">
          <h1 className="calculate__input__container__head">Select Path</h1>
          <label className="select__input__label">From Node</label>
          <select
            value={fromNode}
            onChange={(e) => setFromNode(e.target.value)}
            className="custom__select"
          >
            <option value="" disabled>
              Select
            </option>
            {NODE_VALUES.map((val) => (
               <option key={val} value={val} disabled={val === toNode}>
               {val}
             </option>
            ))}
          </select>
          <label className="select__input__label">To Node</label>
          <select
            value={toNode}
            onChange={(e) => setToNode(e.target.value)}
            className="custom__select"
          >
            <option value="" disabled>
              Select
            </option>
            {NODE_VALUES.map((val) => (
              <option key={val} value={val} disabled={val === fromNode}>
              {val}
            </option>
            ))}
          </select>
          <div className="button__container">
            <button
              onClick={handleClear}
              className="custom__button clear__button"
            >
              Clear
            </button>
            <button
              disabled={fromNode=="" || toNode==""}
              onClick={handleCalculate}
              className="custom__button calculate__button"
            >
              Calculate
            </button>
          </div>
        </div>

        <div className="right__container" style={{ backgroundColor: isCalculate ? '#F2F3F6' : '#fff' }}>
          {!isCalculate ? (
           <OptimizerIcon style={{ height: "200px",width:"200px" }} />
          ) : (
            <div className="result__section">
              <h1 className="calculate__input__container__head">Result</h1>
              {!shortestPathLoading && 
                 <div className="result__show__section">
                 <p className="result__show__section__result">From Node Name = "{fromNode}", to Node Name {toNode} : {shortestPathResponse?.nodeNames?.join(", ")} </p>
                 <p className="result__show__section__result">Total Distance : {shortestPathResponse?.distance} </p>
               </div>
              }
             
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DijiktraCalculatorComponent;
