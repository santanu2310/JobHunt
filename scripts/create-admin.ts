import "dotenv/config";
import { PrismaClient } from "../generated/prisma";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import bcrypt from "bcrypt";

async function main() {
  const prisma = new PrismaClient();
  const rl = readline.createInterface({ input, output });

  try {
    const email = await rl.question("Enter admin email (username): ");
    const name = await rl.question("Enter admin name: ");
    
    let password = "";
    let confirmPassword = "";

    while (true) {
      password = await rl.question("Enter password: ");
      confirmPassword = await rl.question("Confirm password: ");

      if (password && password === confirmPassword) {
        break;
      }
      console.log("Passwords do not match or are empty. Please try again.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword, 
        isAdmin: true,
      },
    });

    console.log(`Admin created ${user.name || user.email}`);
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

main();
