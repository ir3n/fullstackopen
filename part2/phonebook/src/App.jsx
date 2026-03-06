import { useState, useEffect } from "react";
import PhonebookForm from "./components/PhonebookForm";
import PhonebookList from "./components/PhonebookList";
import SearchInput from "./components/SearchInput";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [formData, setFormData] = useState({ name: "", number: "" });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    personService.getAll().then((initPersons) => setPersons(initPersons));
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      persons.some(
        (person) => person.name.toLowerCase() === formData.name.toLowerCase(),
      )
    ) {
      alert(`${formData.name} is already added to the phonebook.`);
    } else {
      personService
        .create(formData)
        .then((newPerson) =>
          setPersons((prevPersons) => [...prevPersons, newPerson]),
        );
      setFormData({ name: "", number: "" });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <h1>Phonebook</h1>

      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Filter by name"
      />

      <h2>Add a new number</h2>
      <PhonebookForm
        formData={formData}
        onInputChange={handleInputChange}
        handleSubmit={handleFormSubmit}
      />

      <h2>Numbers</h2>
      <PhonebookList persons={filteredPersons} />
    </div>
  );
};

export default App;
