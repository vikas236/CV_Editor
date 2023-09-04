import PropTypes from "prop-types";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";

import Assets from "./Assets";

function Download({ personalData, setPersonalData, setEduList, setExpList }) {
  function Clear() {
    const keys = Object.keys(personalData);
    const obj = { ...personalData };
    keys.map((e) => {
      obj[e] = "";
    });
    setPersonalData(obj);
    setEduList([]);
    setExpList([]);
  }

  const generatePDF = () => {
    const report = new JsPDF("p", "mm", "a4");
    const cvPreview = document.querySelector(".cv_preview");

    if (cvPreview) {
      html2canvas(cvPreview).then((canvas) => {
        const img = canvas.toDataURL("image/png");
        const width = report.internal.pageSize.getWidth();
        const height = report.internal.pageSize.getHeight();
        report.addImage(img, "PNG", 0, 0, width, height);

        report.save("cv.pdf");
      });
    }
  };

  return (
    <div className="download">
      <span onClick={Clear}>
        <Assets.DeleteIcon />
        clear
      </span>
      <span onClick={generatePDF}>
        <Assets.DownloadIcon />
        save
      </span>
    </div>
  );
}

Download.propTypes = {
  personalData: PropTypes.object.isRequired,
  setPersonalData: PropTypes.func.isRequired,
  setEduList: PropTypes.func.isRequired,
  setExpList: PropTypes.func.isRequired,
};

export default Download;
