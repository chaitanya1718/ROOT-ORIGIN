const User = require("../models/User");

const bootstrapAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const mobile = process.env.ADMIN_MOBILE;

  if (!email || !password) {
    console.warn(
      "Admin bootstrap skipped: ADMIN_EMAIL or ADMIN_PASSWORD is missing."
    );
    return;
  }

  const existingAdmin = await User.findOne({ email });

  if (existingAdmin) {
    if (existingAdmin.role !== "admin") {
      existingAdmin.role = "admin";
      await existingAdmin.save();
      console.log(`Updated existing user ${email} to admin role.`);
    }
    return;
  }

  await User.create({
    email,
    password,
    mobile,
    role: "admin",
  });

  console.log(`Bootstrapped admin account for ${email}.`);
};

module.exports = bootstrapAdmin;
