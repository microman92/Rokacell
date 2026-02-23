import { IMAGES } from "@/assets/images";


export type ProductCategory = 'rolls' | 'tubes' | 'accessories';

export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription: string; 
  category: ProductCategory;
  image: string;
}


export const PRODUCTS: Product[] = [
  
  {
    id: 'roll-std',
    name: 'ROKAFLEX ROLL STD',
    description: 'Elastomeric rubber foam insulation material with high water vapour diffusion resistance and low thermal conductivity, based on synthetic Rubber (NBR).',
    fullDescription: 'Elastomeric rubber foam insulation material with high water vapour diffusion resistance and low thermal conductivity, based on synthetic Rubber (NBR). Produced in accordance with EN 14304. It is used for the insulation and protection of pipes and air ducts, as well as all HVAC equipment, in order to prevent heat transfer and condensation.',
    category: 'rolls',
    image: IMAGES.products.items.roll.std,
  },
  {
    id: 'roll-sa',
    name: 'ROKAFLEX ROLL SA',
    description: 'Laminated with Self adhesive layer which is a Pressure-Sensitive Adhesive (PSA) on acrylicbased adhesive including mesh structure covered with polyethylene foil.',
    fullDescription: 'Laminated with Self adhesive layer which is a Pressure-Sensitive Adhesive (PSA) on acrylicbased adhesive including mesh structure covered with polyethylene foil.\n\n1. Faster installation: No extra adhesive is needed, which significantly reduces labor time.\n2. Cleaner application: Eliminates adhesive spreading, dripping, or smearing on the insulation surface.\n3. More uniform adhesion: Factory-applied adhesive layers ensure consistent bonding across the surface.\n4. Advantage in tight working areas: Makes installation easier in narrow, hard-to-reach spaces.',
    category: 'rolls',
    image: IMAGES.products.items.roll.sa,
  },
  {
    id: 'roll-af',
    name: 'ROKAFLEX ROLL AF',
    description: 'Laminated with composite aluminum foil layer.',
    fullDescription: 'Laminated with composite aluminum foil layer\n\n1. Vapor barrier performance: Provides strong vapor diffusion resistance, preventing moisture from reaching the insulated surface.\n2. Heat reflection (protection against radiant heat): Aluminium has a high reflectivity to radiant heat, improving insulation efficiency in environments exposed to solar radiation or high external heat sources.\n3. Improved UV resistance: Standard elastomeric rubber is not resistant to UV radiation. The foil layer protects the insulation from UV-related aging, cracking, and surface degradation, making it suitable for: Outdoor installations and Rooftop piping applications.\n4. Increased mechanical durability: The foil acts as an additional protective layer, reducing the risk of damage caused by mechanical impact, scratching, or abrasion during installation or maintenance.',
    category: 'rolls',
    image: IMAGES.products.items.roll.af,
  },
  {
    id: 'roll-ag',
    name: 'ROKAFLEX ROLL AG',
    description: 'Laminated with AG; which is a strong composite layer made of PVC and aluminum.',
    fullDescription: 'Laminated with AG; which is a strong composite layer made of PVC and aluminum.\n\n1. High mechanical impact resistance: The PVC layer significantly reduces the risk of scratches, punctures, and surface wear.\n2. Improved UV resistance: Standard elastomeric rubber is not UV-resistant; the PVC+Al facing prevents cracking and aging caused by sun exposure.\n3. Radiant heat reflection: The aluminium layer reflects solar and radiant heat, reducing thermal gain on external installations.\n4. Vapor barrier performance: Provides strong vapor diffusion resistance, preventing moisture from reaching the insulated surface.\n5. Extended service life: In outdoor, rooftop, and industrial applications, it increases the durability of the insulation system.',
    category: 'rolls',
    image: IMAGES.products.items.roll.ag,
  },
  {
    id: 'roll-afsa',
    name: 'ROKAFLEX ROLL AFSA',
    description: 'One side of the roll is laminated with a Self-Adhesive (SA) pressure-sensitive adhesive (PSA).',
    fullDescription: 'One side of the roll is laminated with a Self-Adhesive (SA) pressure-sensitive adhesive (PSA), made of an acrylic-based adhesive with a mesh structure and covered with polyethylene foil. The other side is laminated with aluminium foil.',
    category: 'rolls',
    image: IMAGES.products.items.roll.afsa,
  },
  {
    id: 'roll-agsa',
    name: 'ROKAFLEX ROLL AGSA',
    description: 'One side of the roll is laminated with a Self-Adhesive (SA) pressure-sensitive adhesive (PSA).',
    fullDescription: 'One side of the roll is laminated with a Self-Adhesive (SA) pressure-sensitive adhesive (PSA), made of an acrylic-based adhesive with a mesh structure and covered with polyethylene foil. The other side is laminated with AG; which is a strong composite layer made of PVC and aluminum.',
    category: 'rolls',
    image: IMAGES.products.items.roll.agsa,
  },

  
  {
    id: 'tube-std',
    name: 'ROKAFLEX TUBE STD',
    description: 'Elastomeric rubber foam insulation material with high water vapour diffusion resistance and low thermal conductivity, based on synthetic Rubber (NBR).',
    fullDescription: 'Elastomeric rubber foam insulation material with high water vapour diffusion resistance and low thermal conductivity, based on synthetic Rubber (NBR). Produced in accordance with EN 14304. It is used for the insulation and protection of pipes in order to prevent heat transfer and condensation.',
    category: 'tubes',
    image: IMAGES.products.items.tube.std,
  },
  {
    id: 'tube-af',
    name: 'ROKAFLEX TUBE AF',
    description: 'Laminated with composite aluminum foil layer. Insulation/protection for pipes, vessels (incl. elbows, fittings, flanges etc.).',
    fullDescription: 'Laminated with composite flexible aluminum foil layer.\nInsulation/protection for pipes, vessels (incl. elbows, fittings, flanges etc.) of air-conditioning/refrigeration and process equipment to prevent condensation and save energy. It protects the product surface from physical impacts.\nAluminum foil acts as a vapor barrier, preventing moisture from reaching the insulated surface. This is especially important on cold lines, refrigeration pipes, or chiller systems.',
    category: 'tubes',
    image: IMAGES.products.items.tube.af,
  },
  {
    id: 'tube-ag',
    name: 'ROKAFLEX TUBE AG',
    description: 'Laminated with AG; which is a strong composite layer made of PVC and aluminum. Can be used both outdoor and indoor applications.',
    fullDescription: 'Laminated with AG; which is a strong composite layer made of PVC and aluminum. Can be used both outdoor and indoor applications.\nInsulation/protection for pipes, vessels (incl. elbows, fittings, flanges etc.) of air-conditioning/refrigeration to prevent condensation and save energy.\nAG acts as a vapor barrier, preventing moisture from reaching the insulated surface. It protects the product surface from physical impacts such as punctures and tears. This is especially important on cold lines, refrigeration pipes, or chiller systems.',
    category: 'tubes',
    image: IMAGES.products.items.tube.ag,
  },

  
  {
    id: 'acc-rubber-tape',
    name: 'ROKAFLEX RUBBER TAPE',
    description: 'Reinforced rubber tapes provide complete reliable sealing and prevent condensation between flanged profiles.',
    fullDescription: 'Reinforced rubber tapes provide complete reliable sealing and prevent condensation between flanged profiles.\n\nThickness        Width × Length        Quantity per package\n3 mm                  50 mm × 15 m          24 pcs\n3 mm                  50 mm × 15 m          16 pcs\n3 mm                  100 mm × 15 m        12 pcs',
    category: 'accessories',
    image: IMAGES.products.items.rubberTape,
  },
  {
    id: 'acc-pvc-tape',
    name: 'PVC TAPE',
    description: 'Insulating tape is used when working with rubber rolls and tubes for thermal and acoustic insulation.',
    fullDescription: 'Insulating tape is used when working with rubber rolls and tubes for thermal and acoustic insulation.\n\nThickness × Width × Length        Quantity per package\n50mm × 25 m                                  48 pcs',
    category: 'accessories',
    image: IMAGES.products.items.pvcTape,
  },
  {
    id: 'acc-adhesive',
    name: 'ROKAFLEX ADHESIVE',
    description: 'Packaging / Can (kg).',
    fullDescription: 'Packaging / Can (kg)\n\n1 kg\n3 kg\n15 kg',
    category: 'accessories',
    image: IMAGES.products.items.glue,
  },
  {
    id: 'acc-alu-tape',
    name: 'ALUMINIUM SELF-ADHESIVE TAPE',
    description: 'Tape type.',
    fullDescription: 'Tape type                                    Size                            Quantity per package\nFlat aluminum tape                      50 mm × 25 m           24 pcs\nFlat aluminum tape                      75 mm × 25 m           16 pcs\nFlat aluminum tape                      100 mm × 25 m         12 pcs\nReinforced aluminum tape          5 mm × 13 mm × 10 m   24 pcs\nReinforced aluminum tape          5 mm × 15 mm × 10 m   16 pcs\nReinforced aluminum tape          5 mm × 20 mm × 10 m   12 pcs',
    category: 'accessories',
    image: IMAGES.products.items.aluminiumTape,
  },
];


export const PRODUCT_TABS = [
  { id: 'rolls', label: 'Rolls' },
  { id: 'tubes', label: 'Tubes' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'all', label: 'All' },
] as const;

export type TabId = typeof PRODUCT_TABS[number]['id'];
