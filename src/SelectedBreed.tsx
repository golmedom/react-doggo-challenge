import { useEffect, useState } from "react";
import path from "path-browserify";
import { IBreed } from "./types";

function buildPath({ breed, subBreed }: { breed: string; subBreed?: string }) {
  if (!subBreed) {
    return path.join(breed, "images/random/9");
  }

  const resource = path.join(breed, subBreed);
  return path.join(resource, "images/random/9");
}

export const SelectedBreed = ({ selectedBreed }: { selectedBreed: IBreed }) => {
  const [doggos, setDoggos] = useState([]);

  async function loadDoggos() {
    const { resource } = selectedBreed;
    const base = buildPath(resource);
    const endpoint = new URL(base, "https://dog.ceo/api/breed/").toString();

    fetch(endpoint)
      .then((response) => response.json())
      .then((json) => setDoggos(json.message))
      .catch(() => setDoggos([]));
  }

  useEffect(() => {
    if (selectedBreed) {
      loadDoggos();
    }
  }, [selectedBreed]);

  if (!selectedBreed) {
    return <p>Please select a breed</p>;
  }

  return (
    <div>
      <h3>Doggo</h3>
      {doggos.map((src, i) => (
        <img key={i} src={src} alt="doggo" />
      ))}
    </div>
  );
};
