import {AnkiDroid} from 'react-native-ankidroid/dist/ankidroid';

export const createAnkiLanModel = model => async dispatch => {
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
 <div style='font-family: Arial; font-size: 20px;'>{{Translate 1}}</div>
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
      deckId: '1582019808117',
    };
    const currentDeck = new AnkiDroid(settings);
    currentDeck.addNote(
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
  }
};
