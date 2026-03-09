import { useState } from "react";
import PhonebookForm from "./components/PhonebookForm";
import PhonebookList from "./components/PhonebookList";
import SearchInput from "./components/SearchInput";
import Notification from "./components/Notification";
import { useNotification } from "./hooks/useNotification";
import { usePersons } from "./hooks/usePersons";

const App = () => {
  const [formData, setFormData] = useState({ name: "", number: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const { notification, notify } = useNotification();
  const { persons, handlePersonCreate, handlePersonDelete, handlePersonEdit } =
    usePersons(notify);

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
      if (
        window.confirm(
          `${formData.name} is already added to the phonebook, would you like to replace the phone number with a new one?`,
        )
      ) {
        const existingPerson = persons.find(
          (person) => person.name.toLowerCase() === formData.name.toLowerCase(),
        );
        //keep the existing id
        const editedPerson = { ...existingPerson, ...formData };
        handlePersonEdit(editedPerson);
        setFormData({ name: "", number: "" });
      }
    } else {
      handlePersonCreate(formData);
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

      {!!notification && <Notification notification={notification} />}

      <h2>Add a new number</h2>
      <PhonebookForm
        formData={formData}
        onInputChange={handleInputChange}
        handleSubmit={handleFormSubmit}
      />

      <h2>Numbers</h2>
      <PhonebookList
        persons={filteredPersons}
        handleDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;
