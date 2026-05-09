import { generateSecret, verify } from "otplib";

async function run() {
  const secret = generateSecret();
  console.log("Secret:", secret);
  
  const isValidWrong = await verify({ token: "123456", secret });
  console.log("isValidWrong:", isValidWrong); // Should be false or throw?
}

run();
