export interface Room {
  id: number;
  name: string;
  guests: number;
  bedRoom: number;
  bathRoom: number;
  description: string;
  price: number;
  elevator: boolean;
  hotTub: boolean;
  pool: boolean;
  indoorFireplace: boolean;
  dryer: boolean;
  gym: boolean;
  kitchen: boolean;
  wifi: boolean;
  heating: boolean;
  cableTV: boolean;
  locationId: number;
  image?: string;    
  createdAt?: Date;
}
