import { useState } from "react";

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

const Persons = ({ persons, currFilter }) => {
  return (
    <div>
      {persons
        .filter(({ name }) =>
          name.toLowerCase().includes(currFilter.toLowerCase())
        )
        .map(({ name, number, id }) => (
          <Person key={id} name={name} number={number} />
        ))}
    </div>
  );
};

const Person = ({ name, number }) => {
  return (
    <p>
      {name} {number}
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [currFilter, setNewFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.filter(({ name }) => name === newName).length > 0) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      setPersons(
        persons.concat({
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        })
      );
      setNewNumber("");
      setNewName("");
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
      <Persons persons={persons} currFilter={currFilter} />
    </div>
  );
};

export default App;
