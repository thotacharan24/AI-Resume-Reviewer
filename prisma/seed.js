import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Create a test user
  const testUser = await prisma.user.upsert({
    where: { email: 'demo@resumeai.com' },
    update: {},
    create: {
      email: 'demo@resumeai.com',
      name: 'Demo User',
      profile: {
        create: {
          theme: 'system',
        },
      },
      subscriptions: {
        create: {
          plan: 'free',
          status: 'active',
        },
      },
    },
  });

  console.log('Seed completed:', testUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
