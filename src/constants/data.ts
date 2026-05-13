export interface Clinic {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
  rating: number;
}

export interface DogListing {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: string;
  image: string;
  location: string;
  description: string;
}

export const VET_CLINICS: Clinic[] = [
  {
    id: "v1",
    name: "Klinik Hewan Pangkalpinang (BB Vet)",
    address: "Jl. Alexander, Pangkal Pinang, Bangka Belitung",
    lat: -2.1283,
    lng: 106.1161,
    phone: "+62 811-7111-xxx",
    hours: "08:00 - 17:00",
    rating: 4.8,
  },
  {
    id: "v2",
    name: "Praktek Dokter Hewan (Pangkalpinang)",
    address: "Jl. Ahmad Yani No. 12, Pangkalpinang",
    lat: -2.1350,
    lng: 106.1050,
    phone: "+62 812-7888-xxx",
    hours: "09:00 - 19:00",
    rating: 4.6,
  }
];

export const ADOPTION_LISTINGS: DogListing[] = [
  {
    id: "d1",
    name: "Rambo",
    breed: "Golden Retriever Mix",
    age: "2 Years",
    gender: "Male",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600",
    location: "Bukit Intan, Pangkalpinang",
    description: "Friendly, high energy, and loves to swim. Found near Pasir Padi beach.",
  },
  {
    id: "d2",
    name: "Misty",
    breed: "Husky Mix",
    age: "1 Year",
    gender: "Female",
    image: "https://images.unsplash.com/photo-1560743641-3914f2c45636?auto=format&fit=crop&q=80&w=600",
    location: "Girimaya, Pangkalpinang",
    description: "Gentle soul, quiet, and loves belly rubs. Needs a caring family.",
  }
];
