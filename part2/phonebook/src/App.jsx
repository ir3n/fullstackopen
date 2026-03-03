import { useState, useEffect } from "react";
import axios from "axios";
import PhonebookForm from "./components/PhonebookForm";
import PhonebookList from "./components/PhonebookList";
import SearchInput from "./components/SearchInput";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [formData, setFormData] = useState({ name: "", number: "" });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(res => setPersons(res.data));
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name.toLowerCase() === formData.name.toLowerCase())) {
      alert(`${formData.name} is already added to the phonebook.`);
    } else {
      setPersons((prevPersons) => [...prevPersons, formData]);
      setFormData({ name: "", number: "" });
    }
  };

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h1>Phonebook</h1>

      <SearchInput value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Filter by name"/>

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
