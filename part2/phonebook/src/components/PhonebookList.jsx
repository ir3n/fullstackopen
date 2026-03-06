const PhonebookList = ({ persons }) => {
  return (
    <>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name}: {person.number}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PhonebookList;
