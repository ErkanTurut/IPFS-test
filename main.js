import { create } from "ipfs-http-client";

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
  let response = await ipfs.add(`La grosse daronne à Benjamin.`);
  console.log(response);
}

addText();

async function addFile() {
  let ipfs = await ipfsClient();

  let data = {
    name: "Turut",
    age: "20",
    sex: "M",
  };

  let options = {
    warpWithDirectory: true,
    progress: (prog) => console.log(`Saved : ${prog}`),
  };

  let response = await ipfs.add(
    {
      path: "test.json",
      content: JSON.stringify(data),
    },
    options
  );
  console.log(response);
}

//addFile();

async function getData(hash) {
  let ipfs = await ipfsClient();

  let response = ipfs.cat(hash);

  for await (const itr of response) {
    let data = Buffer.from(itr).toString();
    console.log(data);
  }
}

getData("QmfDsf9uDHVGZKfxR21cGWpzydzhPHD8eRmMgvyggVZ1yq");
