'use strict';

console.log("hi");

// XLSX is a global from the standalone script

(async() => {
  const url = "data.xlsx";
  const data = await (await fetch(url)).arrayBuffer();
  /* data is an ArrayBuffer */
  const workbook = XLSX.read(data);

  /* DO SOMETHING WITH workbook HERE */
})();
