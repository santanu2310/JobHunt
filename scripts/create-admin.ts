import "dotenv/config";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import bcrypt from "bcryptjs";
import { createAdminSchema } from "../lib/zod";
import { userRepository } from "../lib/repository/users";

async function main() {
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

    // Validate with zod
    const result = createAdminSchema.safeParse({ email, password, name: name || undefined });

    if (!result.success) {
      console.error("Validation failed:");
      result.error.issues.forEach((issue) => {
        console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.createAdmin({
      email: result.data.email,
      name: result.data.name,
      password: hashedPassword,
    });

    console.log(`Admin created ${user.name || user.email}`);
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    rl.close();
  }
}

main();
