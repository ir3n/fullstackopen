import CountryListItem from "./CountryListItem";

const CountriesList = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common.replaceAll(" ", "-")}>
          <CountryListItem
            name={country.name.common}
            capital={country.capital[0]}
            area={country.area}
            languages={country.languages}
            flag={country.flags}
          />
        </li>
      ))}
    </ul>
  );
};

export default CountriesList;
