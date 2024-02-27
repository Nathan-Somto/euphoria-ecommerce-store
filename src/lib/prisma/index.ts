import {PrismaClient} from '@prisma/client';
// write a caching strategy for prisma client connection with typescript
declare global {
    var prisma:undefined | PrismaClient;
}
const prisma = global.prisma ?? new PrismaClient();

if(process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
