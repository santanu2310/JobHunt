import { prisma } from "../db";

export const jobRepository = {
  async getAllJobs() {
    return await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  async getById(id: string) {
    return await prisma.job.findUnique({ where: { id } });
  },

  async createJob(data: {
    title: string;
    designation: string;
    salary?: string;
    category?: string;
    jobType?: string;
    location?: string;
    deadline?: string;
    image?: string;
    skills?: string;
    details?: string;
    isActive?: boolean;
  }) {
    return await prisma.job.create({ data });
  },

  async updateJob(
    id: string,
    data: {
      title: string;
      designation: string;
      salary?: string;
      category?: string;
      jobType?: string;
      location?: string;
      deadline?: string;
      image?: string;
      skills?: string;
      details?: string;
      isActive?: boolean;
    },
  ) {
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value != null),
    );

    return await prisma.job.update({ where: { id }, data: cleanData });
  },

  async deleteJob(id: string) {
    return await prisma.job.delete({ where: { id } });
  },
};
