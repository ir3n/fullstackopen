import { useState, useEffect } from "react";
import PhonebookForm from "./components/PhonebookForm";
import PhonebookList from "./components/PhonebookList";
import SearchInput from "./components/SearchInput";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [formData, setFormData] = useState({ name: "", number: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);

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

  const handlePersonCreate = (personToCreate) => {
    personService
      .create(personToCreate)
      .then((newPerson) => {
        setPersons((prevPersons) => [...prevPersons, newPerson]);
        setNotification({
          type: "success",
          message: `New person "${newPerson.name}" was created.`,
        });
      })
      .catch((err) => {
        setNotification({
          type: "error",
          message: `There was an error creating this person. Please try again.`,
        });
      });
  };

  const handlePersonDelete = (id) => {
    personService
      .remove(id)
      .then((deletedPerson) => {
        setPersons((prevPersons) =>
          prevPersons.filter((person) => person.id !== deletedPerson.id),
        );
        setNotification({
          type: "success",
          message: `"${deletedPerson.name}" was deleted.`,
        });
      })
      .catch((err) =>
        setNotification({
          type: "error",
          message:
            "There was an error deleting this person. Please refresh and try again.",
        }),
      );
  };

  const handlePersonEdit = (personToEdit) => {
    personService
      .edit(personToEdit)
      .then((editedPerson) => {
        setPersons((prevPersons) =>
          prevPersons.map((person) =>
            person.id === editedPerson.id ? editedPerson : person,
          ),
        );
        setNotification({
          type: "success",
          message: `${editedPerson} was edited.`,
        });
      })
      .catch((err) =>
        setNotification({
          type: "error",
          message:
            "There was an error editing this person. Please refresh and try again.",
        }),
      );
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

      {!!notification && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}

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
