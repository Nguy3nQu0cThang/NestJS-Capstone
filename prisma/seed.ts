import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // ===== Users =====
  const adminPwd = await bcrypt.hash('123456', 10);
  const userPwd  = await bcrypt.hash('123456', 10);

  const admin = await prisma.users.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@example.com',
      password: adminPwd,
      role: 'ADMIN',
      phone: '0900000001',
      birthday: new Date('1993-03-10') as any,
      gender: true,
      avatar: null,
    },
  });

  const user = await prisma.users.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      name: 'User One',
      email: 'user1@example.com',
      password: userPwd,
      role: 'USER',
      phone: '0900000002',
      birthday: new Date('1996-06-20') as any,
      gender: false,
      avatar: null,
    },
  });

  // ===== Locations =====
  const hcm = await prisma.locations.create({
    data: {
      name: 'Quận 1',
      province: 'TP. Hồ Chí Minh',
      country: 'Việt Nam',
      value_text: 'Q1, HCM, VN',
      image: null,
    },
  });

  const hn = await prisma.locations.create({
    data: {
      name: 'Hoàn Kiếm',
      province: 'Hà Nội',
      country: 'Việt Nam',
      value_text: 'HK, HN, VN',
      image: null,
    },
  });

  // ===== Rooms =====
  const room1 = await prisma.rooms.create({
    data: {
      name: 'Căn hộ studio trung tâm Q1',
      guests: 2,
      bed_room: 1,
      bath_room: 1,
      description: 'Studio ấm cúng, gần phố đi bộ.',
      price: 700000,
      elevator: true,
      hot_tub: false,
      pool: false,
      indoor_fireplace: false,
      dryer: true,
      gym: false,
      kitchen: true,
      wifi: true,
      heating: false,
      cable_tv: true,
      location_id: hcm.id,
    },
  });

  const room2 = await prisma.rooms.create({
    data: {
      name: 'Căn hộ 2PN view hồ Gươm',
      guests: 4,
      bed_room: 2,
      bath_room: 1,
      description: 'View hồ, đi bộ ra phố cổ.',
      price: 1200000,
      elevator: true,
      hot_tub: false,
      pool: true,
      indoor_fireplace: false,
      dryer: true,
      gym: true,
      kitchen: true,
      wifi: true,
      heating: true,
      cable_tv: true,
      location_id: hn.id,
    },
  });

  const room3 = await prisma.rooms.create({
    data: {
      name: 'Phòng đơn tiết kiệm',
      guests: 1,
      bed_room: 1,
      bath_room: 1,
      description: 'Giá rẻ, sạch sẽ.',
      price: 300000,
      elevator: false,
      hot_tub: false,
      pool: false,
      indoor_fireplace: false,
      dryer: false,
      gym: false,
      kitchen: false,
      wifi: true,
      heating: false,
      cable_tv: false,
      location_id: hcm.id,
    },
  });

  // ===== Room images =====
  await prisma.room_images.createMany({
    data: [
      { room_id: room1.id, image_url: 'https://picsum.photos/seed/room1a/800/600' },
      { room_id: room1.id, image_url: 'https://picsum.photos/seed/room1b/800/600' },
      { room_id: room2.id, image_url: 'https://picsum.photos/seed/room2a/800/600' },
      { room_id: room3.id, image_url: 'https://picsum.photos/seed/room3a/800/600' },
    ],
  });

  // ===== Bookings =====
  await prisma.bookings.createMany({
    data: [
      {
        room_id: room1.id,
        user_id: user.id,
        check_in: new Date('2025-08-20') as any,
        check_out: new Date('2025-08-23') as any,
        guests: 2,
      },
      {
        room_id: room2.id,
        user_id: user.id,
        check_in: new Date('2025-09-05') as any,
        check_out: new Date('2025-09-08') as any,
        guests: 2,
      },
    ],
  });

  // ===== Reviews =====
  await prisma.reviews.createMany({
    data: [
      { user_id: user.id, room_id: room1.id, content: 'Phòng sạch, chủ nhà thân thiện.', rating: 4.5 },
      { user_id: user.id, room_id: room2.id, content: 'View đẹp, đi bộ ra phố cổ.', rating: 5 },
    ],
  });

  console.log('✅ Seed data created. Admin: admin@example.com / 123456');
  console.log('✅ User : user1@example.com / 123456');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
