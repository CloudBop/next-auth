import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;
  // connect to client
  const { email, password } = data;
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res //ponse
      .status(422)
      .json({
        message:
          "Invalid input - password should also be at least 7 chars long."
      });
    // stop invoking
    return undefined;
  }

  const client = await connectToDatabase();
  const db = client.db();

  //
  const existingUser = await db.collection("users").findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: "this email already exists" });
  }

  // HASH PASSWORD
  const hashedPassword = await hashPassword(password);
  // creates on the fly
  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword
  });
  res.status(201).json({ message: "create user!" });
  client.close();
}

export default handler;
