import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Picker, Text} from 'native-base'
import { getDeckList, getModelList} from '../../actions/anki-get-actions';
import {selectDeck} from '../../actions/anki-set-actions';

const DeckPicker = props => {
    const [deckList, setDeckList] = useState([{name: "no decks", id: 0}]);
    useEffect(() => {
        props.getDeckList()
        props.getModelList()
    }, [])
    useEffect(() => {
        setDeckList(props.decks)
    }, [props.decks])
    return (
        <Picker onValueChange={id => props.selectDeck({id, deck: deckList[id]})} selectedValue={props.selectedDeck.id}>
            {deckList.map((deck, index) => (
                <Picker.Item label={deck.name} key={deck.id} value={index}/>
            ))}
        </Picker>
    )
}

export default connect(state => ({
    decks: state.anki.deckList,
    selectedDeck: state.anki.selectedDeck,
}),{
    getDeckList,
    selectDeck,
    getModelList
})(DeckPicker)
