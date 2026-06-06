import tractor from "@/assets/tractor.jpg";
import harvester from "@/assets/harvester.jpg";
import sprayer from "@/assets/sprayer.jpg";
import fertilizer from "@/assets/fertilizer.jpg";
import seeds from "@/assets/seeds.jpg";
import herbicide from "@/assets/herbicide.jpg";

export type Machine = {
  id: string;
  name: string;
  category: string;
  owner: string;
  distance: string;
  pricePerDay: number;
  marketPrice: number;
  rating: number;
  image: string;
  available: string;
};

export const machines: Machine[] = [
  {
    id: "m1",
    name: "Trator John Deere 5075E",
    category: "Tratores",
    owner: "Sítio Boa Vista",
    distance: "8 km",
    pricePerDay: 380,
    marketPrice: 720,
    rating: 4.9,
    image: tractor,
    available: "Livre a partir de 12/jun",
  },
  {
    id: "m2",
    name: "Colheitadeira Case 2566",
    category: "Colheita",
    owner: "Fazenda São Pedro",
    distance: "14 km",
    pricePerDay: 1200,
    marketPrice: 2100,
    rating: 4.8,
    image: harvester,
    available: "Disponível agora",
  },
  {
    id: "m3",
    name: "Pulverizador Jacto Uniport",
    category: "Pulverização",
    owner: "Coop. Vale Verde",
    distance: "22 km",
    pricePerDay: 540,
    marketPrice: 980,
    rating: 4.7,
    image: sprayer,
    available: "Livre a partir de 18/jun",
  },
];

export type GroupBuy = {
  id: string;
  product: string;
  brand: string;
  unitPrice: number;
  marketPrice: number;
  unit: string;
  goal: number;
  current: number;
  participants: number;
  deadline: string;
  image: string;
};

export const groupBuys: GroupBuy[] = [
  {
    id: "g1",
    product: "Fertilizante NPK 20-05-20",
    brand: "Yara Brasil",
    unitPrice: 142,
    marketPrice: 198,
    unit: "saco 50kg",
    goal: 400,
    current: 268,
    participants: 23,
    deadline: "Encerra em 4 dias",
    image: fertilizer,
  },
  {
    id: "g2",
    product: "Semente de Soja TMG 7062",
    brand: "TMG Sementes",
    unitPrice: 480,
    marketPrice: 620,
    unit: "saco 40kg",
    goal: 150,
    current: 112,
    participants: 17,
    deadline: "Encerra em 2 dias",
    image: seeds,
  },
  {
    id: "g3",
    product: "Herbicida Glifosato 5L",
    brand: "Syngenta",
    unitPrice: 89,
    marketPrice: 134,
    unit: "galão 5L",
    goal: 300,
    current: 96,
    participants: 11,
    deadline: "Encerra em 7 dias",
    image: herbicide,
  },
];

export const fmtBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });
