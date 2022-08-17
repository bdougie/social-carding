const m = require("metascraper")([
  //   require("metascraper-author")(),
  //   require("metascraper-date")(),
  require("metascraper-description")(),
  require("metascraper-image")(),
  //   require("metascraper-logo")(),
  //   require("metascraper-clearbit-logo")(),
  //   require("metascraper-logo-favicon")(),
  //   require("metascraper-publisher")(),
  //   require("metascraper-title")(),
  //   require("metascraper-url")(),
  //   require("metascraper-logo-favicon")(),
  //   require("metascraper-amazon")(),
  //   require("metascraper-youtube")(),
  //   require("metascraper-soundcloud")(),
  //   require("metascraper-video-provider")(),
]);

// const url = 'http://github.com/samholmes/node-open-graph/raw/master/test.html';

export default async function handler(req, res) {
  if (req.method === "GET") {
    const url = req.query.url;
    const data = await fetchData(url);
    res.status(200).json({ response: data });
  } else {
    res.status(200).json({ response: {} });
  }
}

async function fetchData(url) {
  const html = await fetch(url).then((r) => r.text());

  console.log(html);
  const data = await m({ url, html });
  return data;
}
