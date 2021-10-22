const path = require('path');
const fs = require('fs');
const { v4: uuidV4 } = require('uuid');

const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
 fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content) => {
 const jobId = uuidV4();
 const filename = `${jobId}.${format}`
 const filepath = path.join(dirCodes, filename);
 await fs.writeFileSync(filepath, content);
 return filepath;
};
module.exports = { generateFile, };