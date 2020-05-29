import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';


class DegreeComponent extends Component{

    render(){

        return(
            <View style={styles.circleicon}>
            </View>
        );
    };

    
}

const styles = StyleSheet.create({

    circleicon: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        marginTop: -50
    },
    
});

module.exports = DegreeComponent;