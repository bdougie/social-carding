import axios from "axios";
const ogs = require("open-graph-scraper");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const url = req.query.url;
    const options = {
      url: url,
      headers: {
        "user-agent": "Googlebot/2.1 (+http://www.google.com/bot.html)",
      },
    };
    ogs(options, (error, results, response) => {
      console.log("error:", error); // This returns true or false. True if there was an error. The error itself is inside the results object.
      if (error) {
        res.status(200).json({ error });
      }
      res.status(200).json({ results });
    });
  } else {
    res.status(401).json({ error: "Method not allowed." });
  }
}

// axios(
//   "https://www.facebook.com/photo/?fbid=10160356302200152&set=a.151066730151"
// )
//   .then((result) => {
//     const htmlData = result.data;
//     const $ = cheerio.load(htmlData);
//     $("a", htmlData).each((e) => {
//       console.log($(e).text());
//     });
//     res.status(200).send(htmlData);
//   })
//   .catch((err) => {
//     console.log({ err });
//     res.status(200).json({ response: { message: "Failed" } });
//   });
// // res.status(200).json({ response: {} });
// res.status(200).send("");
/* fetch("https://twitter.com/saberhc/status/1558117226653286401")
      .then(function (response) {
        // The API call was successful!
        return response.text();
      })
      .then(function (data) {
        const $ = cheerio.load(data);

        //create a reference to the meta elements
        const title = $("head title").text();
        // const desc = $('meta[property="description"]').attr("content");
        // const kwd = $('meta[property="keywords"]').attr("content");
        // const ogTitle = $('meta[property="og:title"]').attr("content");
        // const ogImage = $('meta[property="og:image"]').attr("content");
        // const ogkeywords = $('meta[property="og:keywords"]').attr("content");
        // const images = $("img");
        // $("meta");

        // for (const m of $("meta", data)) {
        //   console.log(m.attr("content"));
        // }

        const obj = { title };

        console.log(obj);
        res.status(200).send(data);
      })
      .catch(function (err) {
        // There was an error
        console.warn("Something went wrong.", err);
      }); */
