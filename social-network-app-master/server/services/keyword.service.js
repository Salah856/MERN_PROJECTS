/*
 * File: keyword.service.js
 * Project: social-network-app
 * File Created: Thursday, 20th June 2019 2:13:50 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Thursday, 20th June 2019 2:13:52 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

const nGram = require("n-gram");

class KeywordService {
  constructor() {}

  generateKewords(text) {
    text = text.toLowerCase();
    const l = text.length;
    let keywords = [];
    for (let i = 2; i <= l; i++) {
      const generatedKeywords = nGram(i)(text);
      keywords = keywords.concat(generatedKeywords);
    }
    return keywords;
  }
}

module.exports = KeywordService;
