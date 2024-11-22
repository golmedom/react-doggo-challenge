export interface IBreed {
  id: number;
  label: string;
  resource: Resource;
}

interface Resource {
  breed: string;
  subBreed?: string;
}
