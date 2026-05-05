import { apiFetch } from './api';

export interface CarBrand {
  id: number;
  name: string;
  logoUrl: string;
}

// Lista de marcas conocidas (debe coincidir con los nombres de los archivos en public/marcaAutos)
const LOCAL_BRANDS: string[] = [
  'Toyota',
  'Ford',
  'Chevrolet',
  'Nissan',
  'Volkswagen',
  'Honda',
  'Hyundai',
  'Kia',
  'Mercedes-Benz',
  'BMW',
  'Audi',
  'Peugeot',
  'Renault',
  'Fiat',
  'Jeep',
  'Mazda',
  'Subaru',
  'Mitsubishi',
  'Suzuki',
  'Volvo',
];

export async function getCarBrands(): Promise<CarBrand[]> {
  // Devuelve las marcas usando imágenes locales en public/marcaAutos/[marca].png
  return LOCAL_BRANDS.map((name, idx) => ({
    id: idx,
    name,
    logoUrl: `/marcaAutos/${name.toLowerCase().replace(/ /g, '').replace(/-/g, '')}.png`,
  }));
}
