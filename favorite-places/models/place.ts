export interface ILocation {
  lat: number;
  lng: number;
}

export interface IPickLocation extends ILocation {
  address: string;
}

export class Place {
  title: string;
  imageUri: string | null;
  address?: string | null;
  location?: ILocation | null;
  id: string;

  constructor(
    title: string,
    imageUri: string | null,
    location: IPickLocation | null,
    id: string
  ) {
    const { address, ...rest } = location!;
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = rest;
    this.id = id;
  }
}
