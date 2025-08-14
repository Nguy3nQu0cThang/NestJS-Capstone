export interface Review {
  id: number;
  userId: number;
  roomId: number;
  content: string;
  rating: number;
  createdAt?: Date;
}
