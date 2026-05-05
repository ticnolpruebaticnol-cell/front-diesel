import { CarBrand } from './carBrand';

// Esta función obtiene dinámicamente todas las imágenes de la carpeta public/marcaAutos usando import.meta.glob (Vite)
export async function getLocalCarBrands(): Promise<CarBrand[]> {
  // @ts-ignore
  const images = import.meta.glob('/public/marcasAutos/*.png', { eager: true });
  console.log('Imágenes encontradas en /public/marcasAutos:', Object.keys(images));
  const brands: CarBrand[] = Object.keys(images).map((path, idx) => {
    // Extrae el nombre de la marca del nombre del archivo
    const fileName = path.split('/').pop() || '';
    const name = fileName.replace(/\.png$/i, '');
    console.log('Procesando:', fileName, 'Nombre:', name, 'URL:', `/marcasAutos/${fileName}`);
    return {
      id: idx,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      logoUrl: `/marcasAutos/${fileName}`,
    };
  });
  return brands;
}
