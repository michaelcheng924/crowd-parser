var em = require('./emoticonsList');
var emojiRegex = require('./emojiRegex');

var emojiConverter = require('./emojiConverter');

module.exports = function(string) {

  // Initialize results object with what we want in theh end
  var results = {
    positiveWords: [],
    negativeWords: [],
    unknown: [],
    score: 0
  };

  // Create an array of the emojis in the string
  var emojis = string.match(emojiRegex());

  // Character representation of emoji
  var itemCode;

  if (emojis) {

    // check each emoji against emoticon list
    emojis.forEach(function(item) {

      // Convert emoji to characters
      itemCode = toCodePoint(item);

      // If emoji is in the positive emoticons list, add to positive words array
      if (itemCode in em.positive) {
        results.positiveWords.push(item);

        // Increment the final score of the string
        results.score++;

      // If emoji is in the negative emoticons list, add to negative words array
      } else if (toCodePoint(item) in em.negative) {
        results.negativeWords.push(item);

        // Decrement the final score of the string
        results.score--;

      } else {
        // If not in either table, store it in 'unknown' array so we know what we missed
        results.unknown.push(item);
      }
    });
  }

  return results;
};


// Used to convert emojis to and from characters
function fromCodePoint(codepoint) {
  var code = typeof codepoint === 'string' ?
        parseInt(codepoint, 16) : codepoint;
  if (code < 0x10000) {
    return String.fromCharCode(code);
  }
  code -= 0x10000;
  return String.fromCharCode(
    0xD800 + (code >> 10),
    0xDC00 + (code & 0x3FF)
  );
}

function toCodePoint(unicodeSurrogates, sep) {
  var
    r = [],
    c = 0,
    p = 0,
    i = 0;
  while (i < unicodeSurrogates.length) {
    c = unicodeSurrogates.charCodeAt(i++);
    if (p) {
      r.push((0x10000 + ((p - 0xD800) << 10) + (c - 0xDC00)).toString(16));
      p = 0;
    } else if (0xD800 <= c && c <= 0xDBFF) {
      p = c;
    } else {
      r.push(c.toString(16));
    }
  }
  return r.join(sep || '-');
}

module.exports.tweetObject = function(tweetObject) {

  // Initialize results object with what we want in theh end
  var results = {
    positiveWords: [],
    negativeWords: [],
    unknown: [],
    score: 0
  };

  var string = tweetObject.text;

  // Create an array of the emojis in the string
  var emojis = string.match(emojiRegex());

  // Character representation of emoji
  var itemCode;

  if (emojis) {

    // check each emoji against emoticon list
    emojis.forEach(function(item) {

      // Convert emoji to characters
      itemCode = toCodePoint(item);

      // If emoji is in the positive emoticons list, add to positive words array
      if (itemCode in em.positive) {
        item = '<%-' + emojiConverter.toCodePoint(item) + '%>';
        results.positiveWords.push(item);

        // Increment the final score of the string
        results.score++;

      // If emoji is in the negative emoticons list, add to negative words array
      } else if (toCodePoint(item) in em.negative) {
        item = '<%-' + emojiConverter.toCodePoint(item) + '%>';
        results.negativeWords.push(item);

        // Decrement the final score of the string
        results.score--;

      } else {
        item = '<%-' + emojiConverter.toCodePoint(item) + '%>';
        // If not in either table, store it in 'unknown' array so we know what we missed
        results.unknown.push(item);
      }
    });
  }

  return results;
};

console.log(module.exports.tweetObject({"created_at":"Wed May 20 23:13:04 +0000 2015","id":601163762242981900,"id_str":"601163762242981888","text":"u\'ve been our inspiration for the past 19 years! Wishing you a wonderful day! 😃😘🎁🎉🎈🎂🍸","source":"<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>","truncated":false,"in_reply_to_status_id":601160439414857700,"in_reply_to_status_id_str":"601160439414857728","in_reply_to_user_id":277764780,"in_reply_to_user_id_str":"277764780","in_reply_to_screen_name":"LanaeBeau_TY","user":{"id":3252488177,"id_str":"3252488177","name":"●○●○♡","screen_name":"2411Clark","location":"","url":null,"description":"I'm dope just follow .","protected":false,"verified":false,"followers_count":7,"friends_count":29,"listed_count":0,"favourites_count":11,"statuses_count":40,"created_at":"Wed May 13 19:04:37 +0000 2015","utc_offset":null,"time_zone":null,"geo_enabled":false,"lang":"en","contributors_enabled":false,"is_translator":false,"profile_background_color":"C0DEED","profile_background_image_url":"http://abs.twimg.com/images/themes/theme1/bg.png","profile_background_image_url_https":"https://abs.twimg.com/images/themes/theme1/bg.png","profile_background_tile":false,"profile_link_color":"0084B4","profile_sidebar_border_color":"C0DEED","profile_sidebar_fill_color":"DDEEF6","profile_text_color":"333333","profile_use_background_image":true,"profile_image_url":"http://pbs.twimg.com/profile_images/600318202212519937/4Qidlfxo_normal.jpg","profile_image_url_https":"https://pbs.twimg.com/profile_images/600318202212519937/4Qidlfxo_normal.jpg","profile_banner_url":"https://pbs.twimg.com/profile_banners/3252488177/1431961882","default_profile":true,"default_profile_image":false,"following":null,"follow_request_sent":null,"notifications":null},"geo":null,"coordinates":null,"place":null,"contributors":null,"retweet_count":0,"favorite_count":0,"entities":{"hashtags":[],"trends":[],"urls":[],"user_mentions":[{"screen_name":"LanaeBeau_TY","name":"tyisha.","id":277764780,"id_str":"277764780","indices":[0,13]}],"symbols":[]},"favorited":false,"retweeted":false,"possibly_sensitive":false,"filter_level":"low","lang":"en","timestamp_ms":"1432163584658"}))