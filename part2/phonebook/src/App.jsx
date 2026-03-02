import { useState } from "react";
import PhonebookForm from "./components/PhonebookForm";
import PhonebookList from "./components/PhonebookList";

const initData = {
  name: "Arto Hellas",
  number: "040-12344556",
};

const App = () => {
  const [persons, setPersons] = useState([initData]);

  const [formData, setFormData] = useState({ name: "", number: "" });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === formData.name)) {
      alert(`${formData.name} is already added to the phonebook.`);
    } else {
      setPersons((prevPersons) => [...prevPersons, formData]);
      setFormData({ name: "", number: "" });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <PhonebookForm
        formData={formData}
        onInputChange={handleInputChange}
        handleSubmit={handleFormSubmit}
      />

      <PhonebookList persons={persons} />
    </div>
  );
};

export default App;
