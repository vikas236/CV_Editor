import { useState } from "react";
import "../styles/App.css";
import "../styles/Download.css";
import "../styles/customize.css";
import "../styles/cv_preview.css";

// Components
import Download from "./Download";
import Customize from "./customize";
import CvPreview from "./CvPreview";

// Functions
// import ExtraFunctions from "./ExtraFunctions";

function App() {
  const [personalData, setPersonalData] = useState({
    "Full Name": "full name",
    Email: "123@gmail.com",
    "Phone Number": "91 12345 12345",
    Address: "address",
  });

  const [eduList, setEduList] = useState([
    [
      "london city university",
      "Bachelors in Economics",
      "08/2022",
      "08/2023",
      "New York City, US",
    ],
    [
      "Hidden University",
      "Master's Degree in Math",
      "02/2000",
      "10/2020",
      "New York City, US",
    ],
  ]);

  const [expList, setExpList] = useState([
    [
      "Umbrella Inc.",
      "UX & UI Designer",
      "09/2003",
      "05/2009",
      "New York City, US",
      "Designed and prototyped user interface patterns for various clients in various industries, ranging from self-service apps within the telecommunications-sector to mobile games for IOS and Android",
    ],
    [
      "Black Mesa Labs",
      "UX Research Assistant",
      "08/2020",
      "12/2022",
      "Berlin, Germany",
      "Supported senior researchers on accessibility standards for the open web. Created and usability tested wireframes and prototypes. Produced interactive documentation for quick onboarding of new researchers.",
    ],
  ]);

  return (
    <main>
      <Download
        personalData={personalData}
        setPersonalData={setPersonalData}
        setEduList={setEduList}
        setExpList={setExpList}
      />
      <Customize
        personalData={personalData}
        setPersonalData={setPersonalData}
        eduList={eduList}
        expList={expList}
        setEduList={setEduList}
        setExpList={setExpList}
      />
      <CvPreview
        personalData={personalData}
        eduList={eduList}
        expList={expList}
      />
    </main>
  );
}

export default App;
