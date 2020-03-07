import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Picker, Text} from 'native-base'
import { getDeckList} from '../../actions/anki-get-actions';
import {selectDeck} from '../../actions/anki-set-actions';

const DeckPicker = props => {
    const [deckList, setDeckList] = useState([{name: "no decks", id:"666"}])
    const [selectedDeck, setSelectedDeck] = useState('1')
    useEffect(() => {
        props.getDeckList()
        setDeckList(props.decks)
    }, [])
    return (
        <Picker note mode={'dropdown'} onValueChange={id => setSelectedDeck(id)} selectedValue={selectedDeck} >
            {deckList.map(deck => (
                <Picker.Item label={deck.name} key={deck.id}/>
            ))}
        </Picker>
    )
}

export default connect(state => ({
    decks: state.anki.deckList,
    selectedDeck: state.anki.selectedDeck
}),{
    getDeckList,
    setDeck: selectDeck
})(DeckPicker)
