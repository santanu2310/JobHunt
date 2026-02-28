"use server";

import { createSliderSchema } from "@/lib/zod";
import { sliderRepository } from "@/lib/repository/slider";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function getAllSliders() {
    try {
        const sliders = await sliderRepository.getAllSliders();
        return { sliders };
    } catch (error) {
        return { error: "Something went wrong while fetching sliders." };
    }
}

export async function createSlider(
    prevState: { error?: string; success?: string } | undefined,
    formData: FormData,
) {
    try {
        const name = formData.get("name") as string;
        const imageFile = formData.get("image") as File | null;

        if (!imageFile || imageFile.size === 0) {
            return { error: "Slider image is required." };
        }

        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });

        const ext = path.extname(imageFile.name) || ".jpg";
        const fileName = `${randomUUID()}${ext}`;
        const filePath = path.join(uploadDir, fileName);

        const buffer = Buffer.from(await imageFile.arrayBuffer());
        await writeFile(filePath, buffer);

        const imageUrl = `/uploads/${fileName}`;

        const result = createSliderSchema.safeParse({ name, imageUrl });

        if (!result.success) {
            return { error: result.error.issues[0].message };
        }

        const slider = await sliderRepository.createSlider(result.data);

        return { success: "Slider created successfully.", slider };
    } catch (error) {
        return { error: "Something went wrong while creating the slider." };
    }
}

export async function toggleSliderStatus(id: string, currentStatus: boolean) {
    try {
        const slider = await sliderRepository.updateSlider(id, {
            status: !currentStatus,
        });
        return { success: "Slider status updated.", slider };
    } catch (error) {
        return { error: "Something went wrong while updating slider status." };
    }
}

export async function deleteSlider(id: string) {
    try {
        const slider = await sliderRepository.getById(id);
        if (!slider) {
            return { error: "Slider not found." };
        }

        const filePath = path.join(process.cwd(), "public", slider.imageUrl);

        await sliderRepository.deleteSlider(id);

        try {
            await unlink(filePath);
        } catch { }

        return { success: "Slider deleted successfully." };
    } catch (error) {
        return { error: "Something went wrong while deleting the slider." };
    }
}

export async function bulkDeleteSliders(ids: string[]) {
    try {
        if (ids.length === 0) {
            return { error: "No sliders selected for deletion." };
        }

        const sliders = await Promise.all(
            ids.map((id) => sliderRepository.getById(id))
        );
        const filePaths = sliders
            .filter((s): s is NonNullable<typeof s> => s !== null)
            .map((s) => path.join(process.cwd(), "public", s.imageUrl));

        await sliderRepository.bulkDeleteSliders(ids);

        await Promise.allSettled(
            filePaths.map((fp) => unlink(fp))
        );

        return { success: `${ids.length} slider(s) deleted successfully.` };
    } catch (error) {
        return { error: "Something went wrong while deleting sliders." };
    }
}

