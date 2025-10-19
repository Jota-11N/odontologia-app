import bcrypt from "bcrypt";

async function test() {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash("123456", salt);
  console.log("Hash generado:", hash);

  const isMatch = await bcrypt.compare("123456", hash);
  console.log("¿Coincide la contraseña?:", isMatch);
}

test();
