const constants = require("./BibleConstants");
const dateformatter = require("./MomentUtil");
const TurndownService = require('turndown');
const turndownService = new TurndownService();

class EditionDetail {
  constructor(editionDescription, abbreviation, comments,
    editionVersion, versionDate, publishDate,
    rightToLeft, ot, nt, strong) {
    this.editionDescription = editionDescription;
    this.abbreviation = abbreviation.toUpperCase();
    this.comments = `${turndownService.turndown(comments).slice(0, 500)}...`;
    this.editionVersion = editionVersion;
    this.versionDate = versionDate;
    this.publishDate = publishDate;
    this.rightToLeft = rightToLeft;
    this.ot = ot;
    this.nt = nt;
    this.strong = strong;
  }

  getEditionDescrition() {
    return `
    Edition Name: ${this.editionDescription}.\n
    Edition Abbreviation: ${this.abbreviation}.\n
    Description: ${this.comments}\n
    Edition Version: ${this.editionVersion}.\n
    Version Date: ${dateformatter.formatDate(this.versionDate, "pt-BR")}.\n
    Publish Date: ${dateformatter.formatDate(this.publishDate, "pt-BR")}.\n
    Is right to left? ${Boolean(this.rightToLeft)}.\n
    Contains OT? ${Boolean(this.ot)}.\n
    Contains NT? ${Boolean(this.nt)}.\n
    Has Strongs? ${Boolean(this.strong)}.
    `;
  }
}

class Verse {
  constructor(book, chapter, verse, scripture) {
    this.book = book;
    this.chapter = chapter;
    this.verse = verse;
    this.scripture = scripture;
  }

  getVerseRef() {
    let aux = constants.getBookTitleById(this.book);
    return `_${aux} ${this.chapter}:${this.verse}_.`;
  }

  getScripture() {
    return this.convertMyswordTagsToDiscordMarkdown(this.removeStrongTags(this.scripture));
  }

  removeStrongTags(text) {
    text = text.replace(/<WG[^>]+\d+>|\\n+/gm, '');
    text = text.replace(/<WH[^>]+\d+>|\\n+/gm, '');
    text = text.replace(/<WT[^>]+\w+>|\\n+/gm, '');
    text = text.replace(/.*[\\]line\s/gm, '');
    text = text.replace(/[\\]up\d+/gm, '');
    text = text.replace(/[\\]cf\d+\s\d+[\\]cf\d+/gm, '');
    text = text.replace(/[\\]b\s/gm, '**');
    text = text.replace(/[\\]b\d+\s/gm, '**');
    return text;
  }

  convertMyswordTagsToDiscordMarkdown(text) {
    text = text.replace(/<FI>|<Fi>/gm, '__');
    text = text.replace(/(<TS>)|(<TS1>)/gm, '** ');
    text = text.replace(/<Ts>/gm, '**\n\n');
    return text;
  }
}

module.exports.Verse = Verse;
module.exports.EditionDetail = EditionDetail;
