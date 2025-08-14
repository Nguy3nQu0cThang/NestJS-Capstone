export interface Booking {
  id: number;
  roomId: number;
  userId: number;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  createdAt?: Date;
}
