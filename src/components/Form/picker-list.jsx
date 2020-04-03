import React,{useState, useEffect, useRef} from 'react'
import {View} from 'native-base';
import {connect} from 'react-redux'

/*
****************** props:*****************
* startId props.data[0] / [1] /[8] ...
* labelNum // Translate 1 / Translate 2 ...
* */
const PickerList = props => {
    return(
        <View>

        </View>
    )
}
export default connect(state => ({
    data: state.api.parsedDictionary.compounded
}))(PickerList)
