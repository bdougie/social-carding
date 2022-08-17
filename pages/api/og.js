const og = require("open-graph");
const ogs = require("open-graph-scraper");
// const url = 'http://github.com/samholmes/node-open-graph/raw/master/test.html';

export default function handler(req, res) {
  if (req.method === "GET") {
    const url = req.query.url;
    og(url, function (err, meta) {
      if (typeof meta == typeof {}) {
        res.status(200).json({ response: meta });
      } else {
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
          res.status(200).json({
            response: {
              description: results?.ogDescription,
              title: results?.ogTitle,
              image: {
                url: results?.ogImage?.url,
              },
              // type: "article",
              url: results?.ogUrl,
            },
          });
          res.status(200).json(results.ogUrl);
          //   res.status(200).json({ results });
        });
      }
    });
  } else {
    res.status(200).json({ response: {} });
  }
}

/* 

{
		"ogSiteName": "Twitter",
		"ogType": "article",
		"ogUrl": "https://twitter.com/saberhc/status/1558117226653286401",
		"ogTitle": "Saber H Chowdhury | সাবের হোসেন চৌধুরী on Twitter",
		"ogDescription": "“Learnt from Ambassador ⁦@odo_tevi⁩ about Vanuatu 🇻🇺 initiative seeking an advisory opinion from International Court of Justice on rights of present, future generations to be protected from adverse impacts of #climatechange. ⁦@IPUparliament⁩ ⁦@muhammad_muhith⁩”",
		"alIosUrl": "twitter://status?id=1558117226653286401",
		"alIosAppStoreId": "333903271",
		"alIosAppName": "Twitter",
		"alAndroidUrl": "twitter://status?id=1558117226653286401",
		"alAndroidPackage": "com.twitter.android",
		"alAndroidAppName": "Twitter",
		"ogImage": {
			"url": "https://pbs.twimg.com/media/FZ-LW6iXgAYCmyO.jpg:large",
			"width": null,
			"height": null,
			"type": null
		},
		"ogLocale": "en",
		"ogDate": "2022-08-12T15:44:29.000Z",
		"favicon": "//abs.twimg.com/favicons/twitter.2.ico",
		"charset": "utf8",
		"requestUrl": "https://twitter.com/saberhc/status/1558117226653286401",
		"success": true
	}

*/
