import { prisma } from "../db";

export const sliderRepository = {
    async getAllSliders() {
        return await prisma.slider.findMany({
            orderBy: { createdAt: "desc" },
        });
    },

    async getById(id: string) {
        return await prisma.slider.findUnique({ where: { id } });
    },

    async createSlider(data: {
        name: string;
        imageUrl: string;
        status?: boolean;
    }) {
        return await prisma.slider.create({ data });
    },

    async updateSlider(
        id: string,
        data: {
            name?: string;
            imageUrl?: string;
            status?: boolean;
        },
    ) {
        const cleanData = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value != null),
        );

        return await prisma.slider.update({ where: { id }, data: cleanData });
    },

    async deleteSlider(id: string) {
        return await prisma.slider.delete({ where: { id } });
    },

    async bulkDeleteSliders(ids: string[]) {
        return await prisma.slider.deleteMany({
            where: { id: { in: ids } },
        });
    },
};
