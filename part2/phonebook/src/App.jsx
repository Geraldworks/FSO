import { useState, useEffect } from "react";
import personServices from "./services/persons";

const Filter = ({ currFilter, handleFilter }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        value={currFilter}
        onChange={(event) => handleFilter(event.target.value)}
      />
    </div>
  );
};

const PersonForm = ({
  newName,
  handleName,
  newNumber,
  handleNumber,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(event) => handleName(event.target.value)}
        />
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(event) => handleNumber(event.target.value)}
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, currFilter, removePerson }) => {
  return (
    <div>
      {persons
        .filter(({ name }) =>
          name.toLowerCase().includes(currFilter.toLowerCase())
        )
        .map(({ name, number, id }) => (
          <Person
            key={id}
            name={name}
            number={number}
            removePerson={() => removePerson(id)}
          />
        ))}
    </div>
  );
};

const Person = ({ name, number, removePerson }) => {
  return (
    <p>
      {name} {number} <button onClick={removePerson}>delete</button>
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [currFilter, setNewFilter] = useState("");

  useEffect(() => {
    personServices.getAll().then((persons) => setPersons(persons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personSearch = persons.filter(({ name }) => name === newName);
    if (personSearch.length > 0) {
      const message = `${personSearch[0].name} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(message)) {
        console.log("replacing number...");
        // replace number here
        const newPerson = { ...personSearch[0], number: newNumber };
        personServices
          .update(newPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            );
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      // create new contact here
      const newPerson = { name: newName, number: newNumber };
      personServices.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
      setNewNumber("");
      setNewName("");
    }
  };

  const removePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    const confirm = window.confirm(`Delete ${person.name} ?`);
    if (confirm) {
      personServices.removePerson(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter currFilter={currFilter} handleFilter={setNewFilter} />
      <h3>Add a New</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleName={setNewName}
        handleNumber={setNewNumber}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        currFilter={currFilter}
        removePerson={removePerson}
      />
    </div>
  );
};

export default App;
