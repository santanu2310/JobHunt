"use server";

import { createJobSchema } from "@/lib/zod";
import { jobRepository } from "@/lib/repository/jobs";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function createJob(
  prevState: { error?: string; success?: string } | undefined,
  formData: FormData,
) {
  try {
    // Handle file upload
    let imagePath: string | undefined;
    const imageFile = formData.get("image") as File | null;

    if (imageFile && imageFile.size > 0) {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });

      const ext = path.extname(imageFile.name) || ".jpg";
      const fileName = `${randomUUID()}${ext}`;
      const filePath = path.join(uploadDir, fileName);

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await writeFile(filePath, buffer);

      imagePath = `/uploads/${fileName}`;
    }

    const rawData = {
      title: formData.get("title") as string,
      designation: formData.get("designation") as string,
      salary: formData.get("salary") as string,
      jobType: formData.get("jobType") as string,
      category: formData.get("category") as string,
      deadline: formData.get("deadline") as string,
      location: formData.get("location") as string,
      image: imagePath,
      skills: formData.get("skills") as string,
      details: formData.get("details") as string,
    };

    const result = createJobSchema.safeParse(rawData);

    if (!result.success) {
      return { error: result.error.issues[0].message };
    }

    const job = await jobRepository.createJob(result.data);

    return { success: "Job created successfully.", job };
  } catch (error) {
    return { error: "Something went wrong while creating the job." };
  }
}

export async function getAllJobs() {
  try {
    const jobs = await jobRepository.getAllJobs();
    return { jobs };
  } catch (error) {
    return { error: "Something went wrong while fetching jobs." };
  }
}


export async function updateJob(
  prevState: { error?: string; success?: string } | undefined,
  formData: FormData,
) {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      return { error: "Job ID is required." };
    }

    // Handle file upload
    let imagePath: string | undefined;
    const imageFile = formData.get("image") as File | null;

    if (imageFile && imageFile.size > 0) {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });

      const ext = path.extname(imageFile.name) || ".jpg";
      const fileName = `${randomUUID()}${ext}`;
      const filePath = path.join(uploadDir, fileName);

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await writeFile(filePath, buffer);

      imagePath = `/uploads/${fileName}`;
    }

    const rawData = {
      title: formData.get("title") as string,
      designation: formData.get("designation") as string,
      salary: formData.get("salary") as string,
      jobType: formData.get("jobType") as string,
      category: formData.get("category") as string,
      deadline: formData.get("deadline") as string,
      location: formData.get("location") as string,
      image: imagePath,
      skills: formData.get("skills") as string,
      details: formData.get("details") as string,
    };

    const result = createJobSchema.safeParse(rawData);

    if (!result.success) {
      return { error: result.error.issues[0].message };
    }

    const job = await jobRepository.updateJob(id, result.data);

    return { success: "Job updated successfully.", job };
  } catch (error) {
    return { error: "Something went wrong while updating the job." };
  }
}

export async function deleteJob(id: string) {
  try {
    await jobRepository.deleteJob(id);
    return { success: "Job deleted successfully." };
  } catch (error) {
    return { error: "Something went wrong while deleting the job." };
  }
}

export async function toggleJobActive(id: string) {
  try {
    const job = await jobRepository.getById(id);

    if (!job) {
      return { error: "Job not found." };
    }

    const updated = await jobRepository.updateJob(id, {
      title: job.title,
      designation: job.designation,
      isActive: !job.isActive,
    });

    return { success: "Job status updated.", isActive: updated.isActive };
  } catch (error) {
    return { error: "Something went wrong while toggling job status." };
  }
}
