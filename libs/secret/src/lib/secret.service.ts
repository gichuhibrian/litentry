import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class SecretService {
    public async randomSecret() {
        const secrets = await prisma.secret.findMany({});
        const randomSecret = secrets[Math.floor(Math.random() * secrets.length)];
        return randomSecret;
    }
}
