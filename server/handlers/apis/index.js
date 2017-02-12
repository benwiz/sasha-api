'use strict';

const SpeechToText = require('./lib/speech-to-text');
const NLP = require('./lib/nlp');
const textToSpeech = require('./lib/text-to-speech');
const Converse = require('./lib/converse');
const Mopidy = require('./lib/mopidy');

module.exports = {
    speechToText: SpeechToText.watson,
    nlp: NLP.luis,
    textToSpeech: textToSpeech.goolgeTranslate,
    joke: Converse.joke,
    fact: Converse.fact,
    mopidy: Mopidy
};
