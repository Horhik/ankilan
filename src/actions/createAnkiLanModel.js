import {AnkiDroid} from 'react-native-ankidroid/dist/ankidroid';

export const createAnkiLanModel = model => async dispatch => {
  try {
    /*
  (async function() {
    const [err, res] = await AnkiDroid.getSelectedDeckName();
    console.log(model.deck);
    console.log(typeof res);
  })();
  try {
    const modelFields = [
      'Word or sentence',
      'Part of speech 1',
      'Translate 1',
      'Definition 1',
      'Part of speech 2',
      'Translate 2',
      'Definition 2',
      'Example',
      'Transcription',
      'Sound',
    ];

    const css = `<style>
 .card {
        display: flex;
        justify-content:center;
         text-align: center;
        }
        body {text-align: center;}
        ul{
        padding:0;
        }
        .span: {
        display: flex;
        justify-content: space-around;

}</style>`;

    const answerFormat = `
  {{FrontSide}}

<hr id=answer>

<ol>
<li>
 <div style='font-family: Arial; font-size: 20px;'>{{Translate 1}}</div> Qq
 <div style='font-family: Arial; font-size: 20px;'>{{Definition 1}}</div>
</li>

<li>
<div style='font-family: Arial; font-size: 20px;'>{{Translate 2}}</div>
<div style='font-family: Arial; font-size: 20px;'>{{Definition 2}}</div>
</li>
</ol>
<p style="">{Example}}</p>\`;
<span style="">{{Sound}}</span>
  `;
    const questionFormat = `
        <span style="font-size: 40px; 07f">{{Word or sentence}}</span>
        <br>
        <div style='font-family: Arial; font-size: 20px;color: blue'>{{Transcription}}</div>
        <br>
        <ol>
            <li>
                <div style='font-family: Arial; font-size: 20px;'>{{Part of speech 1}}</div>
            </li>
            <li>
                <div style='font-family: Arial; font-size: 20px;'>{{Part of speech 2}}</div>
            </li>
        </ol>
        <span style="">{{Sound}}</span>`;
    const modelProperties = {
      name: model.name,
      reference: 'com.ankilan.models',
      fields: modelFields,
      tags: [],
      cardNames: ['Rus->En', 'En->Rus'],
      questionFormat,
      answerFormat,
      css,
    };
    const settings = {
      modelId: model.id,
      modelProperties,
      deckId: model.deck.id,
    };
    new AnkiDroid(settings).addNote(
      [
        'Word or sentence',
        'Part of speech 1',
        'Translate 1',
        'Definition 1',
        'Part of speech 2',
        'Translate 2',
        'Definition 2',
        'Example',
        'Transcription',
        'Sound',
      ],
      modelFields,
    );
  } catch (err) {
    console.log(err);
  }*/

    ///////////////////////////////////
    // SETTING UP THE DECK AND MODEL //
    ///////////////////////////////////

    // Name of deck which will be created in AnkiDroid
    const deckName = model.deck.name;
    // Name of model which will be created in AnkiDroid (can be any string)
    const modelName = model.name + '_test';
    // Used to save a reference to this deck in the SharedPreferences (can be any string)
    const dbDeckReference = 'com.anki.decks';
    // Used to save a reference to this model in the SharedPreferences (can be any string)
    const dbModelReference = 'com.anki.models';
    // Optional space separated list of tags to add to every note
    const tags = ['AnkiLan'];
    // List of field names that will be used in AnkiDroid model
    const modelFields = [
      'Word or sentence',
      'Part of speech 1',
      'Translation 1',
      'Definition 1',
      'Part of speech 2',
      'Translation 2',
      'Definition 2',
      'Usage example',
      'Transcription',
      'Sound',
    ];
    // List of card names that will be used in AnkiDroid (one for each direction of learning)
    const cardNames = ['Russian>English', 'English>Russian'];
    // CSS to share between all the cards (optional).
    const css = `.card {
            font-family: 'Roboto', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            font-size: 24px;
            text-align: center;
            color: black;
            background-color: white;
            word-wrap: break-word;
        }

        .big {
            font-size: 48px;
        }

        .small {
            font-size: 18px;
        }

        .sound--container {
            display: flex;
            justify-content: center;
            padding: 0px;
            align-items: center;
        }

        .sound {
            padding-left: 10px;
        }

        .transcription {
            color: #1e7efc;
            font-weight: bold;
        }
.list{
list-style: none;
display: flex;
flex-direction:column;
align-items:center;
padding: 0;
}
.definition{
font-size: 20px;
font-famyli:  sans-serif;
font-style: italic;
display: block;
margin: 7px ;
padding: 0 20px ;
white-space: normal;
width: 70vw;
}
.usage{
background-color: rgba(100,100,100,0.1);
padding: 10px;
font-size: 20px;
white-space: normal;
width: 70vw;
margin: 0 auto;
border-radius: 5px;
}`;
    // Template for the question of each card
    const questionFmt1 = `
    <div class="big">{{Word or sentence}}</div>
    <ul class="list">
        <li>
            <div class="small">{{Part of speech 1}}</div>
        </li>
        <li>
            <div class="small">{{Part of speech 2}}</div>
        </li>
    </ul>
    <div class="sound--container">
        <div class="transcription">{{Transcription}}</div>
        <span class="sound">{{Sound}}</span>
  `;
    const questionFmt2 = '<div class="big">{{Translation 1}}</div>';
    const questionFormat = [questionFmt1, questionFmt2];
    // Template for the answer (this example is identical for both sides)
    const answerFmt1 = `
        <div class="big">{{Word or sentence}}</div>
        <div class="sound--container">
            <div class="transcription">{{Transcription}}</div>
            <span class="sound">{{Sound}}</span>
        </div>


        <hr>

        <div class="usage">{{Usage example}}</div>

        <hr />
        <ul class="list">
            <li>
                <div>
                    <div class="small">{{Part of speech 1}}</div>
                    <pre class="definition">{{Definition 1}}</pre>
                    <div>{{Translation 1}}</div>
                </div>
            </li>
            <li>
                <div>
                    <div class="small">{{Part of speech 2}}</div>
                    <pre class="definition">{{Definition 2}}</pre>
                    <div>{{Translation 2}}</div>
                </div>
            </li>
        </ul>
    </div>`;
    const answerFormat = [answerFmt1, answerFmt1];

    //////////////////
    // ADDING NOTES //
    //////////////////

    const deckProperties = {
      name: deckName,
      reference: dbDeckReference,
    };
    const modelProperties = {
      name: modelName,
      reference: dbModelReference,
      fields: modelFields,
      tags,
      cardNames,
      questionFormat,
      answerFormat,
      css,
    };

    const valueFields = [
      'Word or sentence',
      'Part of speech 1',
      'Translation 1',
      'Definition 1',
      'Part of speech 2',
      'Translation 2',
      'Definition 2',
      'Usage example',
      'Transcription',
      'Sound',
    ];

    const settings = {
      modelId: undefined,
      modelProperties: modelProperties,
      deckId: model.deck.id,
      deckProperties: deckProperties,
    };

    const selectedDeck = new AnkiDroid(settings);

    selectedDeck.addNote(valueFields, modelFields);
    // returns a promise that returns the added note ID
  } catch (err) {
    console.log(err);
  }
};
