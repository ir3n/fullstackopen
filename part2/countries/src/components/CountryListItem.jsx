import { useState } from "react";
import CountryDetails from "./CountryDetails";

const CountryListItem = (props) => {
  const { name, capital, area, languages, flag } = props;

  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      {name}{" "}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide" : "Show"}
      </button>
      {!!showDetails && (
        <CountryDetails
          name={name}
          capital={capital}
          area={area}
          languages={languages}
          flag={flag}
        />
      )}
    </>
  );
};

export default CountryListItem;
