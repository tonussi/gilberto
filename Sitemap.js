const fs = require('fs');
const xml2js = require('xml2js');

class UrlDetail {
  constructor(link, title, description) {
    this.link = link;
    this.title = title;
    this.description = description;
  }

  toString() {
    return `
    Title ${this.title}
    Description ${this.description}
    Link ${this.link}
    `
  }
}

class Sitemap {
  constructor(xmlpath) {
    var parser = new xml2js.Parser();
    this.sitemap = fs.readFile(xmlpath, function (err, data) {
      parser.parseString(data, function (err, result) {
        result.rss.channel[0].item;
      });
    });
    console.log(this.sitemap);
  }
}

module.exports.Sitemap = Sitemap;
module.exports.UrlDetail = UrlDetail;

const path = require('path')
new Sitemap(dbpath = path.join(__dirname, '.', 'sitemaps', 'ror.xml'));
