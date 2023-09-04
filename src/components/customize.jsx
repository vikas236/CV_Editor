import { useState } from "react";
import PropTypes from "prop-types";

// Functions
import CamelCase from "./CamelCase";

// Images
import Assets from "./Assets";

// Sync personal Details with cv preview
function HandleChange(e, n, data, setData) {
  const labels = Object.keys(data);
  const newData = { ...data };
  newData[labels[n]] = e.target.value;
  setData(newData);
}

function HandleListChange(e, n, m, List, setList) {
  const newList = [...List];
  newList[n][m] = e.target.value;
  setList(newList);
}

function DeleteItem(List, setList, showForm, setShowForm, n, m) {
  setShowForm([false, false]);
  setList(List.slice(0, m).concat(List.slice(m + 1, List.length)));
}

function PersonalDetails({ data, setData }) {
  PersonalDetails.propTypes = {
    data: PropTypes.object.isRequired,
    setData: PropTypes.func.isRequired,
  };

  const labels = Object.keys(data);
  const values = Object.values(data);
  const types = ["text", "email", "text", "text"];

  return (
    <div key="personal_details" className="personal_details">
      <h2>Personal Details</h2>
      {labels.map((l, i) => (
        <label key={l}>
          {l}
          <input
            key={l}
            type={types[i]}
            value={values[i]}
            onChange={(e) => HandleChange(e, i, data, setData)}
          />
        </label>
      ))}
    </div>
  );
}

// Add Item button and Item list
function ItemsBox({ name, n, setShowForm, itemsList, setList }) {
  ItemsBox.propTypes = {
    name: PropTypes.string.isRequired,
    n: PropTypes.string.isRequired,
    setShowForm: PropTypes.func.isRequired,
    itemsList: PropTypes.array.isRequired,
    setList: PropTypes.func.isRequired,
  };
  const ListLength = itemsList.length;

  function ShowForm(i, j) {
    if (itemsList.length === 0) {
      i = 0;
      j = 0;
    }
    n == 0
      ? setShowForm([true, false, i, j])
      : setShowForm([false, true, i, j]);
  }

  return (
    <>
      {itemsList.map((e, i) => {
        return (
          <div
            key={e[i] + i}
            className="container item"
            onClick={() => ShowForm(n, i)}
          >
            <h3 key={`${e[i]}i`}>
              {CamelCase(e[0])} <Assets.DotIcon />
            </h3>
          </div>
        );
      })}
      <button
        className="addItem"
        onClick={() => {
          ShowForm(ListLength, ListLength);
          const arr = [...itemsList];
          if (n === 0) arr.push(["", "", "", "", ""]);
          else arr.push(["", "", "", "", "", ""]);
          setList(arr);
        }}
      >
        + {CamelCase(name)}
      </button>
    </>
  );
}

// Form to add Items
function Form({ labels, showForm, setShowForm, List, setList }) {
  Form.propTypes = {
    labels: PropTypes.array.isRequired,
    showForm: PropTypes.array.isRequired,
    setShowForm: PropTypes.func.isRequired,
    List: PropTypes.array.isRequired,
    setList: PropTypes.func.isRequired,
  };

  if (List.length == 0) setShowForm([showForm[0], showForm[1], 0, 0]);

  const n = showForm[2];
  const m = showForm[3];

  return (
    <div className="form">
      {labels.map((e, i) => (
        <label key={e + n} className="text">
          {e}{" "}
          <input
            key={e + m}
            type="text"
            placeholder={`Enter ${e}`}
            onChange={(e) => HandleListChange(e, m, i, List, setList)}
            value={n <= List.length ? List[m][i] : ""}
          />
        </label>
      ))}
      <div className="formEnd">
        <button
          className="delete"
          onClick={() => DeleteItem(List, setList, showForm, setShowForm, n, m)}
        >
          <Assets.DeleteIcon />
          Delete
        </button>
        <div className="right">
          <button className="save" onClick={() => setShowForm([false, false])}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function Customize({
  personalData,
  setPersonalData,
  eduList,
  expList,
  setEduList,
  setExpList,
}) {
  // const expExample = [];

  const [showForm, setShowForm] = useState([false, false, [0, 0]]);
  const [showBox, setShowBox] = useState([false, false]);

  return (
    <div className="customize">
      <PersonalDetails data={personalData} setData={setPersonalData} />
      <div className={`education ${showBox[0] ? "active" : ""}`}>
        <div
          className="container"
          onClick={() => setShowBox([!showBox[0], false])}
        >
          <div>
            <Assets.EducationIcon />
            <h2>Education</h2>
          </div>
          <Assets.ArrowIcon />
        </div>
        {!showForm[0] && (
          <ItemsBox
            name="education"
            n="0"
            setShowForm={setShowForm}
            itemsList={eduList}
            setList={setEduList}
          />
        )}
        {showForm[0] && (
          <Form
            labels={["School", "Degree", "Start Date", "End Date", "Location"]}
            showForm={showForm}
            setShowForm={setShowForm}
            List={eduList}
            setList={setEduList}
          />
        )}
      </div>
      <div className={`experience ${showBox[1] ? "active" : ""}`}>
        <div
          className="container"
          onClick={() => setShowBox([false, !showBox[1]])}
        >
          <div>
            <Assets.ExperienceIcon />
            <h2>Experience</h2>
          </div>
          <Assets.ArrowIcon />
        </div>
        {!showForm[1] && (
          <ItemsBox
            name="experience"
            n="1"
            setShowForm={setShowForm}
            itemsList={expList}
            setList={setExpList}
          />
        )}
        {showForm[1] && (
          <Form
            labels={[
              "Company Name",
              "Position Title",
              "Start Date",
              "End Date",
              "Location",
              "Description",
            ]}
            showForm={showForm}
            setShowForm={setShowForm}
            List={expList}
            setList={setExpList}
          />
        )}
      </div>
    </div>
  );
}

Customize.propTypes = {
  personalData: PropTypes.object.isRequired,
  setPersonalData: PropTypes.func.isRequired,
  eduList: PropTypes.array.isRequired,
  expList: PropTypes.array.isRequired,
  setEduList: PropTypes.func.isRequired,
  setExpList: PropTypes.func.isRequired,
};

export default Customize;
