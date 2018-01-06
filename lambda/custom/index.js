'use strict';
const Alexa = require('alexa-sdk');
const myBooks = require('./books');

const APP_ID = undefined;
require('./facts.js');

//====
exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {
  'LaunchRequest': function () {
    this.emit('GetNewFactIntent');
  },
  'GetNewFactIntent': function () {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    this.response.cardRenderer(SKILL_NAME, randomFact);
    this.response.speak(speechOutput);
    this.emit(':responseReady');
  },
  'GetAnswerIntent': function () {
    const itemSlot = this.event.request.intent.slots.book;
    let itemName;
    if (itemSlot && itemSlot.value) {
      itemName = itemSlot.value.toLowerCase();
    }

    const cardTitle = this.t('DISPLAY_CARD_TITLE', this.t('SKILL_NAME'), itemName);
    const book = myBooks['BOOKS'][itemName];

    if (book) {
      this.attributes.speechOutput = book;

      this.response.speak(book);
      this.emit(':responseReady');
    } else {
      let speechOutput = BOOK_NOT_FOUND_MESSAGE;
      const repromptSpeech = BOOK_NOT_FOUND_REPROMPT;
      speechOutput += BOOK_NOT_FOUND_WITHOUT_ITEM_NAME;
      speechOutput += repromptSpeech;

      this.attributes.speechOutput = speechOutput;
      this.attributes.repromptSpeech = repromptSpeech;

      this.response.speak(speechOutput).listen(repromptSpeech);
      this.emit(':responseReady');
    }
  },
  'AMAZON.HelpIntent': function () {
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;

    this.response.speak(speechOutput).listen(reprompt);
    this.emit(':responseReady');
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(STOP_MESSAGE);
    this.emit(':responseReady');
  },
  'AMAZON.StopIntent': function () {
    this.response.speak(STOP_MESSAGE);
    this.emit(':responseReady');
  },
};
