const CountryDetails = (countryProps) => {
  const { name, capital, area, languages, flag } = countryProps;

  const languagesArray = Object.entries(languages);

  return (
    <div>
      <h2>{name}</h2>
      <p>Capital {capital}</p>
      <p>Area {area}</p>
      <h3>Languages</h3>
      <ul>
        {languagesArray.map((lang) => (
          <li key={lang[0]}>{lang[1]}</li>
        ))}
      </ul>
      <img src={flag.svg} alt={flag.alt} width={300} />
    </div>
  );
};

export default CountryDetails;
