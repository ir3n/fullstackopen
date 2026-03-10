import { useState } from "react";
import { useCountries } from "./hooks/useCountries";
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";

function App() {
  const [searchValue, setSearchValue] = useState("");

  const { countries, isLoading, error } = useCountries();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const getFilteredCountries = () => {
    if (!searchValue) {
      return null;
    }

    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchValue.toLowerCase()),
    );

    if (filteredCountries.length > 10) {
      return <p>Too many countries, please keep typing.</p>;
    }

    if (filteredCountries.length === 0) {
      return <p>No countries found.</p>;
    }

    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];

      return (
        <CountryDetails
          name={country.name.common}
          capital={country.capital[0]}
          area={country.area}
          languages={country.languages}
          flag={country.flags}
        />
      );
    } else {
      return <CountriesList countries={filteredCountries} />;
    }
  };

  return (
    <div>
      <h1>Countries</h1>

      {isLoading && <p>Loading countries...</p>}

      {error && <p>{error}</p>}

      {!isLoading && !error && (
        <div>
          <label htmlFor="search">Find countries: </label>
          <input
            id="search"
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
          />
          {getFilteredCountries()}
        </div>
      )}
    </div>
  );
}

export default App;
