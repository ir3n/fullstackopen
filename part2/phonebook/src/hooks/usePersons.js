import { useState, useEffect } from "react";
import personService from "../services/persons";

export const usePersons = (notify) => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((initPersons) => setPersons(initPersons));
  }, []);

  const handlePersonCreate = (personToCreate) => {
    personService
      .create(personToCreate)
      .then((newPerson) => {
        setPersons((prevPersons) => [...prevPersons, newPerson]);
        notify("success", `New person "${newPerson.name}" was created.`);
      })
      .catch((err) => {
        notify(
          "error",
          `There was an error creating this person. Please try again.`,
        );
      });
  };

  const handlePersonDelete = (id) => {
    personService
      .remove(id)
      .then((deletedPerson) => {
        setPersons((prevPersons) =>
          prevPersons.filter((person) => person.id !== deletedPerson.id),
        );
        notify("success", `"${deletedPerson.name}" was deleted.`);
      })
      .catch((err) =>
        notify(
          "error",
          "There was an error deleting this person. Please refresh and try again.",
        ),
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
        notify("success", `${editedPerson.name} was edited.`);
      })
      .catch((err) =>
        notify(
          "error",
          "There was an error editing this person. Please refresh and try again.",
        ),
      );
  };

  return { persons, handlePersonCreate, handlePersonDelete, handlePersonEdit };
};
