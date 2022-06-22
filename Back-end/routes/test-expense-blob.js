const Responses = require("../config/httpresponse");
const fileBlob = require("../app/models/test-expense-blob");
const formidable = require('formidable');
var fs = require('fs'),
  path = require('path'),
  filePath = path.join(__dirname, '../asset/sample1.pdf');


module.exports = function (app, ProtectedRoutes) {
  const today = new Date();
  const GMTTime = today.toGMTString(); // deprecated! use toUTCString()

  //  Create new file
  app.post("/api/v1/fileBlobupload", async (request, response) => {
    try {
      console.log(request.files.expenses)
      // var buf = fs.readFileSync(filePath)
      var body = {
        id: 0,
        file: request.files.expenses.data,
        filename: request.files.expenses.name,
        mimeType: request.files.expenses.mimetype
      }
      console.log(body)
      // console.log(request.body)
      // var fileBuff = Buffer.from(request.body.uploadBody)
      // console.log(fileBuff)

      const newFile = await fileBlob.create(body);
      console.log(newFile.dataValues.id)
      if (newFile.dataValues.id) {
          await response.status(Responses.Status.OK).json(newFile.dataValues.id)
        }else {
          response.status(Responses.Status.BAD_REQUEST).json("error")
        }
      }
    catch (e) {
        console.log("category module exception", e);
        response.status(Responses.Status.BAD_REQUEST).json(e); // Sending the error in response that is thrown in try block
      }
    })
  // get file from id 
  app.get("/api/v1/fileBlobupload/:id", async (request, response) => {
    try {
      const data = await fileBlob.findOne({
        where: {
          Id: request.params.id
        }
      })
      var newbase64 = data.file.toString('base64');
      // console.log(newbase64)

      // fs.writeFileSync("uploaded.pdf",data.file)
      response.status(Responses.Status.OK).json(newbase64)

    }
    catch (e) {
      console.log("category module exception", e);
      response.status(Responses.Status.BAD_REQUEST).json(e); // Sending the error in response that is thrown in try block
    }
  })

}