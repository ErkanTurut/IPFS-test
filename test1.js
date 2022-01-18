import { create } from "ipfs-http-client";

import * as fs from "fs";

async function ipfsClient() {
  //const client = create("http://localhost:80");

  const ipfs = await create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  });

  return ipfs;
}

async function addText() {
  let ipfs = await ipfsClient();
  //const t = "Erkam";
  let response = await ipfs.add(`Salut moi c'est Erkan Turut.`);
  console.log(response);
}

//addText();

async function addFile() {
  let ipfs = await ipfsClient();

  let data = fs.readFileSync("./wallpaper.jpg");

  let options = {
    warpWithDirectory: false,
    progress: (prog) => console.log(`Saved : ${prog}`),
  };

  let response = await ipfs.add(data, options);
  console.log(response);
}

//addFile();

async function getData(hash) {
  let ipfs = await ipfsClient();

  let response = ipfs.cat(hash);

  for await (const itr of response) {
    let data = Buffer.from(itr).toString();
    //console.log(data);
    return data;
  }
}

async function createFile() {
  const v = await getData("QmdqKTrTwEc4QQ73fKiFgnSrsoe6CksN4iCY7asV6qSpTH");
  console.log(v);
  fs.appendFile("nft.txt", v, function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });
}

createFile();
