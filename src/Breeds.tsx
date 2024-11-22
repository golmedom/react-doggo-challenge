import { useEffect, useState } from "react";

const foobar = (id, breed, subBreed) => {
  const label = subBreed ? `${subBreed} ${breed}` : breed;
  return { id, label, resource: { breed, subBreed } };
};

export const Breeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);

  async function loadBreeds() {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((json) => {
        const { message } = json;
        let counter = 0;
        const breeds = Object.entries(message).reduce(
          (acc, [breed, subBreeds]) => {
            acc.push(foobar(counter++, breed));
            acc.concat(
              subBreeds.map((subBreed) => foobar(counter++, breed, subBreed))
            );
            return acc;
          },
          []
        );
        setBreeds(breeds);
      });
  }

  function reset() {
    setSelectedBreed(null);
  }

  useEffect(() => {
    loadBreeds();
  }, []);

  const list = breeds.map((breed) => (
    <li key={breed.id}>
      <a href={`#${breed.id}`} onClick={() => setSelectedBreed(breed)}>
        {breed.label}
      </a>
    </li>
  ));

  const page = <ul>{list}</ul>;

  return (
    <div>
      <p>Breeds</p>
      <button onClick={reset}>reset</button>
      {page}
    </div>
  );
};
