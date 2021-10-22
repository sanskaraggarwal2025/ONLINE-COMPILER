const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const outputPath = path.join(__dirname, "outputs");


if (!fs.existsSync(outputPath)) {
 fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
 const jobId = path.basename(filepath).split(".")[0];
 const outPath = path.join(outputPath, `${jobId}.out`);

 //[3b6e9b4d-f99b-4683-b935-dc983b0a758b,cpp]
 return new Promise((resolve, reject) => {
  exec(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && ${jobId}.out`, (error, stdout, stderr) => {
   error && reject({ error, stderr });
   stderr && reject(stderr);
   resolve(stdout);


   //  if (error) {
   //   reject({error,stderr});
   //  }
   //  if (stderr) {
   //   reject(stderr);
   //  }
   //  resolve(stdout);
   // })

  })

 })
}
module.exports = { executeCpp, };