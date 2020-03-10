import {AnkiDroid} from 'react-native-ankidroid/dist/ankidroid';
import {setAnkiNoteCreator, setCreatorTemplate} from './anki-set-actions';
import {checkAnkiLanModelForExisting, getFieldList, getModelList} from './anki-get-actions';

export const createAnkiLanModel = model => async dispatch => {
  try {
    const deckName = model.deck.name;
    const modelName = model.name;
    const dbDeckReference = 'com.anki.decks';
    const dbModelReference = 'com.anki.models';
    const tags = ['AnkiLan'];
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
    const cardNames = ['Russian>English', 'English>Russian'];
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

    // ADDING NOTES //

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
      'AnkiLan',
      'Translate by typing the word',
      '',
      'You can type the word in input field and get translate, sound and definition of this word',
      'Translate via sharing',
      '',
      'You can mark the word in you phone and share it with AnkiLan',
      'IMAGE WILL BE HERE',
      'guide',
      '',
    ];

    const settings = {
      modelId: undefined,
      modelProperties: modelProperties,
      deckId: model.deck.id,
      deckProperties: deckProperties,
    };
    const selectedDeck = new AnkiDroid(settings);
    await dispatch(setAnkiNoteCreator(selectedDeck));
    await dispatch(setCreatorTemplate(modelFields));
    addNote(selectedDeck, valueFields, modelFields);
    checkAnkiLanModelForExisting(model.name, model.list);
    await dispatch(getModelList());
    await dispatch(getFieldList(model.name));
  } catch (err) {
    console.log(err);
  }
};

export const addNote = (creator, words, template) => {
  creator.addNote(words, template);
};
