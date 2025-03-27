import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Now you can use process.env.YOUR_VARIABLE
console.log(process.env.JWT_SECRET);

import crypto from 'crypto';

const generateSecret = () => {
  return crypto.randomBytes(64).toString('hex'); // Generates a 64-byte random string, and converts it to hex.
};

const jwtSecret = generateSecret();
console.log('New JWT Secret:', jwtSecret);