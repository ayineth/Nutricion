import { GroceryItem } from '@/types';

export const INITIAL_GROCERY_LIST: GroceryItem[] = [
  // Proteínas
  { id: 'g-1', category: 'Proteínas (Mariscos y Carnes)', name: 'Filetes de Salmón fresco', quantityForBothWeekly: '1.2 kg', checked: false },
  { id: 'g-2', category: 'Proteínas (Mariscos y Carnes)', name: 'Camarones crudos pelados', quantityForBothWeekly: '800 g', checked: false },
  { id: 'g-3', category: 'Proteínas (Mariscos y Carnes)', name: 'Pechuga / Contramuslo de Pollo', quantityForBothWeekly: '1.5 kg', checked: false },
  { id: 'g-4', category: 'Proteínas (Mariscos y Carnes)', name: 'Lomo / Solomillo de Cerdo magro', quantityForBothWeekly: '900 g', checked: false },
  { id: 'g-5', category: 'Proteínas (Mariscos y Carnes)', name: 'Huevos de campo', quantityForBothWeekly: '30 unidades (2.5 docenas)', checked: false },
  { id: 'g-6', category: 'Proteínas (Mariscos y Carnes)', name: 'Salmón ahumado', quantityForBothWeekly: '150 g', checked: false },
  { id: 'g-7', category: 'Proteínas (Mariscos y Carnes)', name: 'Pechuga de pavo artesanal 95%', quantityForBothWeekly: '1 paquete (150 g)', checked: false },

  // Verduras y Ensaladas
  { id: 'g-8', category: 'Verduras y Ensaladas', name: 'Espinacas frescas baby', quantityForBothWeekly: '2 bolsas grandes', checked: false },
  { id: 'g-9', category: 'Verduras y Ensaladas', name: 'Brócoli fresco', quantityForBothWeekly: '2 piezas medianas', checked: false },
  { id: 'g-10', category: 'Verduras y Ensaladas', name: 'Espárragos trigueros', quantityForBothWeekly: '2 manojos', checked: false },
  { id: 'g-11', category: 'Verduras y Ensaladas', name: 'Coliflor (para arroz/puré)', quantityForBothWeekly: '2 cabezas medianas', checked: false },
  { id: 'g-12', category: 'Verduras y Ensaladas', name: 'Calabacines verdes', quantityForBothWeekly: '4 unidades', checked: false },
  { id: 'g-13', category: 'Verduras y Ensaladas', name: 'Pimientos rojos y amarillos', quantityForBothWeekly: '5 unidades', checked: false },
  { id: 'g-14', category: 'Verduras y Ensaladas', name: 'Champiñones frescos enteros o laminados', quantityForBothWeekly: '500 g', checked: false },
  { id: 'g-15', category: 'Verduras y Ensaladas', name: 'Lechuga romana crujiente', quantityForBothWeekly: '2 piezas', checked: false },
  { id: 'g-16', category: 'Verduras y Ensaladas', name: 'Tomates cherry', quantityForBothWeekly: '2 bandejas (500 g)', checked: false },
  { id: 'g-17', category: 'Verduras y Ensaladas', name: 'Pepinos para ensalada y snack', quantityForBothWeekly: '4 unidades', checked: false },
  { id: 'g-18', category: 'Verduras y Ensaladas', name: 'Cebolla morada y ajos frescos', quantityForBothWeekly: '1 malla', checked: false },

  // Grasas Buenas y Frutos Secos
  { id: 'g-19', category: 'Grasas Buenas y Frutos Secos', name: 'Aguacates Hass maduros', quantityForBothWeekly: '6 a 8 unidades', checked: false },
  { id: 'g-20', category: 'Grasas Buenas y Frutos Secos', name: 'Aceite de Oliva Virgen Extra (AOVE)', quantityForBothWeekly: '1 botella (500-750 ml)', checked: false },
  { id: 'g-21', category: 'Grasas Buenas y Frutos Secos', name: 'Almendras naturales o laminadas', quantityForBothWeekly: '200 g', checked: false },
  { id: 'g-22', category: 'Grasas Buenas y Frutos Secos', name: 'Mitades de Nuez de nogal', quantityForBothWeekly: '150 g', checked: false },
  { id: 'g-23', category: 'Grasas Buenas y Frutos Secos', name: 'Nueces de Brasil (selenio)', quantityForBothWeekly: '1 paquete pequeño (100 g)', checked: false },
  { id: 'g-24', category: 'Grasas Buenas y Frutos Secos', name: 'Mantequilla de almendras 100% natural', quantityForBothWeekly: '1 frasco (250 g)', checked: false },
  { id: 'g-25', category: 'Grasas Buenas y Frutos Secos', name: 'Semillas de chía y semillas de lino molidas', quantityForBothWeekly: '1 bolsa de cada una (250g)', checked: false },
  { id: 'g-26', category: 'Grasas Buenas y Frutos Secos', name: 'Aceitunas kalamata o negras', quantityForBothWeekly: '1 frasco', checked: false },

  // Frutas Bajo IG
  { id: 'g-27', category: 'Frutas Bajo IG', name: 'Arándanos frescos o congelados', quantityForBothWeekly: '300 g', checked: false },
  { id: 'g-28', category: 'Frutas Bajo IG', name: 'Fresas / Frambuesas frescas', quantityForBothWeekly: '300 g', checked: false },
  { id: 'g-29', category: 'Frutas Bajo IG', name: 'Manzanas verdes Granny Smith', quantityForBothWeekly: '5 unidades', checked: false },
  { id: 'g-30', category: 'Frutas Bajo IG', name: 'Limones frescos para aderezos', quantityForBothWeekly: '6 unidades', checked: false },

  // Despensa y Lácteos fermentados
  { id: 'g-31', category: 'Despensa y Condimentos', name: 'Yogur griego 100% natural sin azúcar añadida', quantityForBothWeekly: '2 tarros grandes (1 kg total)', checked: false },
  { id: 'g-32', category: 'Despensa y Condimentos', name: 'Queso feta auténtico o requesón 0%', quantityForBothWeekly: '200 g', checked: false },
  { id: 'g-33', category: 'Despensa y Condimentos', name: 'Bebida de almendras sin azúcar', quantityForBothWeekly: '2 briks (1L c/u)', checked: false },
  { id: 'g-34', category: 'Despensa y Condimentos', name: 'Harina de maíz blanco/amarillo precocida (para arepas colombianas)', quantityForBothWeekly: '1 paquete (1 kg)', checked: false },
  { id: 'g-35', category: 'Despensa y Condimentos', name: 'Quinoa en grano cruda', quantityForBothWeekly: '500 g', checked: false },
  { id: 'g-36', category: 'Despensa y Condimentos', name: 'Lentejas cocidas en tarro o crudas', quantityForBothWeekly: '1 tarro grande (400 g)', checked: false },
  { id: 'g-37', category: 'Despensa y Condimentos', name: 'Avena en copos enteros tradicional', quantityForBothWeekly: '500 g', checked: false },
  { id: 'g-38', category: 'Despensa y Condimentos', name: 'Boniato / Camote', quantityForBothWeekly: '2 unidades medianas', checked: false },
  { id: 'g-39', category: 'Despensa y Condimentos', name: 'Vinagre de manzana orgánico con la madre', quantityForBothWeekly: '1 botella (500 ml)', checked: false },
  { id: 'g-40', category: 'Despensa y Condimentos', name: 'Salsa de soja tamari reducida en sodio', quantityForBothWeekly: '1 botella pequeña', checked: false },
  { id: 'g-41', category: 'Despensa y Condimentos', name: 'Canela de Ceilán pura en polvo', quantityForBothWeekly: '1 frasquito', checked: false },
  { id: 'g-42', category: 'Despensa y Condimentos', name: 'Chocolate negro 85%+ cacao sin azúcar', quantityForBothWeekly: '2 tabletas', checked: false },
];
