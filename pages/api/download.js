const request = require("request");

export default (req, res) => {
   
  const url = req.query.url;     

  // filename only
  const fileName = url.substring(url.lastIndexOf("/") + 1);


  console.log("printing date" );
  // set header
  res.setHeader("content-disposition", "attachment; filename=" + fileName);

  // send request to the original file
  request
    .get(url) // download original image
    .on("error", function(err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("<h1>404 not found</h1>");
      res.end();
      return;
    })
    .pipe(res); // pipe converted image to HTTP response
};
