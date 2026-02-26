import { prisma } from "../db";

export const userRepository = {
  async getUser(email: string) {
    return await prisma.user.findUnique({
      where: { email: email },
    });
  },

  async createAdmin(data: { email: string; name?: string; password: string }) {
    return await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
        isAdmin: true,
      },
    });
  },
};
