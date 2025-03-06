import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

async function hashPassword(password) {
    const salt = bcrypt.genSaltSync(15);
    const hash = await bcrypt.hash(password, salt);
    console.log(salt, password);
    return hash;
}

async function isMatch(password, hash) {
    return await bcrypt.compare(password, hash);
}

export {
    hashPassword,
    isMatch,
}