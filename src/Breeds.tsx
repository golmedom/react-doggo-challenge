import { useEffect, useState } from "react";
import { SelectedBreed } from "./SelectedBreed";
import { IBreed } from "./types";

const foobar = (id: number, breed: string, subBreed?: string) => {
  const label = subBreed ? `${subBreed} ${breed}` : breed;
  return { id, label, resource: { breed, subBreed } };
};

export const Breeds = () => {
  const [breeds, setBreeds] = useState<IBreed[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<IBreed | null>(null);

  async function loadBreeds() {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((json) => {
        const message: Record<string, string[]> = json.message;
        let counter = 0;

        const breeds = Object.entries(message).reduce<IBreed[]>(
          (acc, [breed, subBreeds]) => {
            const currentBreed = foobar(counter++, breed);
            acc.push(currentBreed);
            acc.concat(
              subBreeds.map((subBreed: string) =>
                foobar(counter++, breed, subBreed)
              )
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
      {selectedBreed && <SelectedBreed selectedBreed={selectedBreed} />}
    </div>
  );
};
