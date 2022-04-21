const fs = require("fs")
const { promisify } = require("util")
const sha3_256 = require("js-sha3").sha3_256
let directory = "./Documents/"
let files // optional
promisify(fs.readdir)(directory)
  .then((filenames) => {
    files = filenames // optional
    return Promise.all(
      filenames.map((filename) => {
        return promisify(fs.readFile)(directory + filename, {})
      })
    )
  })
  .then((strArr) => {
   
    let dataArr = new Array()
    strArr.forEach((str, i) => {
      dataArr.push(sha3_256(str))
    })
    let dataArrSort = dataArr.sort((a, b) => a.localeCompare(b)).join("")
    dataArrSort += "kwiatkowski.kamil.618@gmail.com"
    console.log(
      "5515f92d8241f4d86e32ac827b96cab8ecabcf35f160b4c7f77c0a25adcd1598".length
    )
    const result = sha3_256(dataArrSort)

    fs.writeFile("result.txt", result, (err) => {
      if (err) {
        console.error(err)
        return
      }
      console.log('Written Succesfully');
    })
    
  })
  .catch((err) => {
    console.log(err)
  })
