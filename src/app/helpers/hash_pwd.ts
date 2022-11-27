import bcrypt from "bcrypt";

export const hashPwd = async (pwd: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pwd, salt);
};

export const comparePwd = async (bodyPwd: string, dbPwd: string) => {
  return await bcrypt.compare(bodyPwd, dbPwd);
};
