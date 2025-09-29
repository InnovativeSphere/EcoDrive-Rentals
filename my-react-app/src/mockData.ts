import chevy1 from "./assets/Cars/chevy1.jpg";
import chevy2 from "./assets/Cars/chevy2.jpg";
import chevy3 from "./assets/Cars/chevy3.jpg";
import altima1 from "./assets/Cars/altima1.jpg";
import altima2 from "./assets/Cars/altima2.jpg";
import altima3 from "./assets/Cars/altima3.jpg";
import corolla1 from "./assets/Cars/corolla1.jpg";
import corolla2 from "./assets/Cars/corolla2.jpg";
import corolla3 from "./assets/Cars/corolla3.jpg";
import elentra1 from "./assets/Cars/elentra1.jpg";
import elentra2 from "./assets/Cars/elentra2.jpg";
import elentra3 from "./assets/Cars/elentra3.jpg";
import ford1 from "./assets/Cars/ford1.jpg";
import ford2 from "./assets/Cars/ford2.jpg";
import ford3 from "./assets/Cars/ford3.jpg";
import honda1 from "./assets/Cars/honda1.jpg";
import honda2 from "./assets/Cars/honda2.jpg";
import honda3 from "./assets/Cars/honda3.jpg";
import hyundai1 from "./assets/Cars/hyundai1.jpg";
import hyundai2 from "./assets/Cars/hyundai2.jpg";
import hyundai3 from "./assets/Cars/hyundai3.jpg";
import kia1 from "./assets/Cars/kia1.jpg";
import kia2 from "./assets/Cars/kia2.jpg";
import kia3 from "./assets/Cars/kia3.jpg";
import malibu1 from "./assets/Cars/malibu1.jpg";
import malibu2 from "./assets/Cars/malibu2.jpg";
import malibu3 from "./assets/Cars/malibu3.jpg";
import mazda1 from "./assets/Cars/mazda1.jpg";
import mazda2 from "./assets/Cars/mazda2.jpg";
import mazda3 from "./assets/Cars/mazda3.jpg";
import nissanleaf1 from "./assets/Cars/nissanleaf1.webp";
import nissanleaf2 from "./assets/Cars/nissanleaf2.webp";
import nissanleaf3 from "./assets/Cars/nissanleaf3.webp";
import tesla1 from "./assets/Cars/tesla1.jpg";
import tesla2 from "./assets/Cars/tesla2.jpg";
import tesla3 from "./assets/Cars/tesla3.jpg";
import wagon1 from "./assets/Cars/wagon1.jpg";
import wagon2 from "./assets/Cars/wagon2.jpg";
import wagon3 from "./assets/Cars/wagon3.jpg";
import fordE1 from "./assets/Cars/fordE1.jpg";
import fordE2 from "./assets/Cars/fordE2.jpg";
import fordE3 from "./assets/Cars/fordE3.jpg";

interface ElectricCar {
  id: number;
  make: string;
  model: string;
  year: number;
  range: string;
  images: string[];
  description: string;
  features: string[];
  pricePerDay: number;
  seatingCapacity: number;
  batteryCapacity: string;
}

interface MechanicalCar {
  id: number;
  make: string;
  model: string;
  year: number;
  images: string[];
  description: string;
  features: string[];
  pricePerDay: number;
  seatingCapacity: number;
  engineType: string;
  horsepower: number;
}


export const electricCars: ElectricCar[] = [
  {
    id: 1,
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    range: "358 miles",
    images: [tesla1, tesla2, tesla3],
    description:
      "A compact luxury electric sedan known for its impressive range and performance.",
    features: [
      "Zero to 60 mph in 3.1 seconds",
      "Autopilot capabilities",
      "Minimalistic interior with a 15-inch touchscreen",
    ],
    pricePerDay: 79,
    seatingCapacity: 5,
    batteryCapacity: "75 kWh",
  },
  {
    id: 2,
    make: "Nissan",
    model: "Leaf",
    year: 2023,
    range: "226 miles",
    images: [nissanleaf1, nissanleaf2, nissanleaf3],
    description:
      "One of the best-selling electric cars featuring practicality and efficiency for daily commuting.",
    features: [
      "ProPILOT Assist technology",
      "e-Pedal for one-pedal driving",
      "Compact hatchback design",
    ],
    pricePerDay: 55,
    seatingCapacity: 5,
    batteryCapacity: "62 kWh",
  },
  {
    id: 3,
    make: "Chevrolet",
    model: "Bolt EV",
    year: 2023,
    range: "259 miles",
    images: [chevy1, chevy2, chevy3],
    description:
      "An affordable yet spacious electric hatchback with ample range and features.",
    features: [
      "High-definition rear camera",
      "Smartphone integration",
      "Ample cargo space",
    ],
    pricePerDay: 59,
    seatingCapacity: 5,
    batteryCapacity: "66 kWh",
  },
  {
    id: 4,
    make: "Ford",
    model: "Mustang Mach-E",
    year: 2023,
    range: "305 miles",
    images: [fordE1, fordE2, fordE3],
    description:
      "A stylish electric SUV that combines high-tech features with sporty performance.",
    features: [
      "Fast charging capability",
      "Ford Co-Pilot360 technology",
      "Premium sound system",
    ],
    pricePerDay: 89,
    seatingCapacity: 5,
    batteryCapacity: "75.7 kWh",
  },
  {
    id: 5,
    make: "Volkswagen",
    model: "ID.4",
    year: 2023,
    range: "250 miles",
    images: [wagon1, wagon2, wagon3],
    description:
      "An all-electric SUV with a roomy interior designed for everyday use.",
    features: [
      "Rear View Camera",
      "Adaptive Cruise Control",
      "Customizable ambient lighting",
    ],
    pricePerDay: 77,
    seatingCapacity: 5,
    batteryCapacity: "77 kWh",
  },
  {
    id: 6,
    make: "Hyundai",
    model: "Kona Electric",
    year: 2023,
    range: "258 miles",
    images: [hyundai1, hyundai2, hyundai3],
    description:
      "A compact SUV with a solid electric range and a range of standard features.",
    features: [
      "Built-in navigation and safety features",
      "Regenerative braking",
      "Heated front seats",
    ],
    pricePerDay: 65,
    seatingCapacity: 5,
    batteryCapacity: "64 kWh",
  },
  {
    id: 7,
    make: "Kia",
    model: "EV6",
    year: 2023,
    range: "310 miles",
    images: [kia1, kia2, kia3],
    description:
      "A stylish electric crossover that combines convenience with performance.",
    features: [
      "Ultra-fast charging capability",
      "High-tech driver assistance",
      "Panoramic glass roof",
    ],
    pricePerDay: 85,
    seatingCapacity: 5,
    batteryCapacity: "77.4 kWh",
  },
];


export const mechanicalCars: MechanicalCar[] = [
  {
    id: 8,
    make: "Toyota",
    model: "Corolla",
    year: 2023,
    images: [corolla1, corolla2, corolla3],
    description:
      "A reliable and fuel-efficient compact sedan; perfect for everyday use.",
    features: [
      "Adaptive Cruise Control",
      "Apple CarPlay and Android Auto",
      "Automatic high beams",
    ],
    pricePerDay: 45,
    seatingCapacity: 5,
    engineType: "1.8L 4-cylinder",
    horsepower: 139,
  },
  {
    id: 9,
    make: "Honda",
    model: "Civic",
    year: 2023,
    images: [honda1, honda2, honda3],
    description:
      "A popular sedan known for its reliability and engaging driving experience.",
    features: [
      "Sport-tuned suspension",
      "Collision Mitigation Braking System",
      "Multi-angle rearview camera",
    ],
    pricePerDay: 50,
    seatingCapacity: 5,
    engineType: "2.0L 4-cylinder",
    horsepower: 158,
  },
  {
    id: 10,
    make: "Ford",
    model: "Escape",
    year: 2023,
    images: [ford1, ford2, ford3],
    description:
      "A compact SUV with practical features and a comfortable ride for families.",
    features: [
      "Ford Co-Pilot360 safety features",
      "Available hybrid and plug-in hybrid options",
      "Sync 4 infotainment system",
    ],
    pricePerDay: 55,
    seatingCapacity: 5,
    engineType: "1.5L EcoBoost",
    horsepower: 181,
  },
  {
    id: 11,
    make: "Chevrolet",
    model: "Malibu",
    year: 2023,
    images: [malibu1, malibu2, malibu3],
    description:
      "A midsize sedan that provides a spacious interior and a smooth driving experience.",
    features: [
      "Chevrolet Infotainment System",
      "Available all-wheel drive",
      "Lane Departure Warning",
    ],
    pricePerDay: 52,
    seatingCapacity: 5,
    engineType: "1.5L Turbocharged 4-cylinder",
    horsepower: 160,
  },
  {
    id: 12,
    make: "Hyundai",
    model: "Elantra",
    year: 2023,
    images: [elentra1, elentra2, elentra3],
    description:
      "A stylish compact sedan that combines modern design with advanced technology.",
    features: [
      "Blind-Spot Collision Warning",
      "LED headlights",
      "10.25-inch touchscreen display",
    ],
    pricePerDay: 49,
    seatingCapacity: 5,
    engineType: "2.0L 4-cylinder",
    horsepower: 147,
  },
  {
    id: 13,
    make: "Nissan",
    model: "Altima",
    year: 2023,
    images: [altima1, altima2, altima3],
    description:
      "Comfortable midsize sedan known for its spaciousness and performance features.",
    features: [
      "Intelligent All-Wheel Drive",
      "Nissan Safety Shield 360",
      "NissanConnect infotainment",
    ],
    pricePerDay: 54,
    seatingCapacity: 5,
    engineType: "2.5L 4-cylinder",
    horsepower: 188,
  },
  {
    id: 14,
    make: "Mazda",
    model: "CX-5",
    year: 2023,
    images: [mazda1, mazda2, mazda3],
    description:
      "A compact SUV renowned for its upscale interior finishes and engaging driving dynamics.",
    features: [
      "i-Activsense safety technologies",
      "Leatherette upholstery",
      "Available turbocharged engine",
    ],
    pricePerDay: 68,
    seatingCapacity: 5,
    engineType: "2.5L 4-cylinder",
    horsepower: 187,
  },
];

export const allCars: (ElectricCar | MechanicalCar)[] = [
  ...electricCars,
  ...mechanicalCars,
];

export const findCarById = (
  id: number
): ElectricCar | MechanicalCar | undefined => {
  return allCars.find((car) => car.id === id);
};
