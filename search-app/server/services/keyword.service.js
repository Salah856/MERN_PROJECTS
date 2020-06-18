/*
 * File: ngram.service.js
 * Project: search-app
 * File Created: Monday, 22nd July 2019 5:46:36 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Monday, 22nd July 2019 5:46:40 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

const MongoService = require("./mongo.service");
const nGram = require("n-gram");

class KeywordService {
  constructor() {
    this.keywords = new MongoService().db.collection("keywords");
  }

  generateKeywords(text) {
    text = text.toLowerCase();
    const l = text.length;
    let keywords = [];
    for (let i = 2; i <= l; i++) {
      const generatedKeywords = nGram(i)(text);
      keywords = keywords.concat(generatedKeywords);
    }
    return keywords;
  }

  async setKeywords(keywords) {
    for (const i in keywords) {
      const isKeywordExist = await this.countKeyword({
        text: keywords[i].trim()
      });
      if (isKeywordExist === 0) {
        await this.keywords.insertOne({
          text: keywords[i].trim()
        });
      }
    }
  }

  async countKeyword(keyword) {
    return await this.keywords.count(keyword);
  }

  async searchSuggestions(keyword) {
    let _keywords = await (await this.keywords.find({})).toArray();
    for (const i in _keywords) {
      _keywords[i].levenshtein_score = this.compareTwoStrings(keyword, _keywords[i].text);
    }
    _keywords = _keywords.sort((a, b) => {return b.levenshtein_score - a.levenshtein_score});
    _keywords = _keywords.slice(0, 10);
    const keywords = [];
    for (const i in _keywords) {
      keywords.push(_keywords[i].text);
    }
    return keywords;
  }

  compareTwoStrings(a, b) {
    a = a.replace(/\s+/g, '')
    b = b.replace(/\s+/g, '')
  
    if (!a.length && !b.length) return 1;             // if both are empty strings
    if (!a.length || !b.length) return 0;             // if only one is empty string
    if (a === b) return 1;       					            // identical
    if (a.length === 1 && b.length === 1) return 0;   // both are 1-letter strings
    if (a.length < 2 || b.length < 2) return 0;	      // if either is a 1-letter string
  
    let firstBigrams = new Map();
    for (let i = 0; i < a.length - 1; i++) {
      const bigram = a.substring(i, i + 2);
      const count = firstBigrams.has(bigram)
        ? firstBigrams.get(bigram) + 1
        : 1;
  
      firstBigrams.set(bigram, count);
    };
  
    let intersectionSize = 0;
    for (let i = 0; i < b.length - 1; i++) {
      const bigram = b.substring(i, i + 2);
      const count = firstBigrams.has(bigram)
        ? firstBigrams.get(bigram)
        : 0;
  
      if (count > 0) {
        firstBigrams.set(bigram, count - 1);
        intersectionSize++;
      }
    }
  
    return (2.0 * intersectionSize) / (a.length + b.length - 2);
  }
}

module.exports = KeywordService;
