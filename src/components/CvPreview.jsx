import PropTypes from "prop-types";

// Images
import Assets from "./Assets";

// Functions
import CamelCase from "./CamelCase";

function ItemsList({ title, List }) {
  ItemsList.propTypes = {
    title: PropTypes.string.isRequired,
    List: PropTypes.array.isRequired,
  };

  function formatDate(date) {
    date = date.replace(/\d+-/, "");
    date = date.replace(/-/, "/");
    return date;
  }

  return (
    <>
      <h3 key={title}>{title}</h3>
      {List.map((e, i) => {
        return (
          <div key={i} className="itemsList">
            <div key="left" className="left">
              <span key="date" className="date">
                {formatDate(e[2]) + " - " + formatDate(e[3])}
              </span>
              <span key="location" className="location">
                {CamelCase(e[4])}
              </span>
            </div>
            <div key="right" className="right">
              <span key="facility" className="facility">
                {CamelCase(e[0])}
              </span>
              <span key="branch" className="branch">
                {CamelCase(e[1])}
              </span>
              {e.length === 6 ? (
                <span key="description" className="description">
                  {List[0][5]}
                </span>
              ) : (
                " "
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

function CvPreview({ personalData, eduList, expList }) {
  const data = Object.values(personalData);

  return (
    <div className="cv_preview">
      <div className="top">
        <h1>{data[0].toUpperCase()}</h1>
        <div className="contact_details">
          <span className="email">
            <Assets.EmailIcon />
            {data[1]}
          </span>
          <span className="phone">
            <Assets.PhoneIcon />
            {"+" + data[2]}
          </span>
          <span className="address">
            <Assets.AddressIcon />
            {CamelCase(data[3])}
          </span>
        </div>
      </div>
      <div className="bottom">
        <ItemsList title={"Education"} List={eduList} />
        <ItemsList title={"Experience"} List={expList} />
      </div>
    </div>
  );
}

CvPreview.propTypes = {
  personalData: PropTypes.object.isRequired,
  eduList: PropTypes.array.isRequired,
  expList: PropTypes.array.isRequired,
};

export default CvPreview;
