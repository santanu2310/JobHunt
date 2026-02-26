import { prisma } from "../db";

export const jobRepository = {
  async getAllVisible() {
    return await prisma.job.findMany({
      where: { status: "published" },
      orderBy: { createdAt: "desc" },
    });
  },

  async getById(id: string) {
    return await prisma.job.findUnique({ where: { id } });
  },
};
