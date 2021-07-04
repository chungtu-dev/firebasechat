import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    Input: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        width: "80%",
        marginBottom: 10,
        borderRadius: 5,
    },
    InputMessage: {
        color:'white',
        padding: 10,        
        borderWidth: 1,
        borderColor: "#ccc",
        width: "60%",
        // width:"85%",
        marginBottom: 10,
        borderRadius: 20,
    },
    btnText: {
        color: "black",
        fontSize: 20,
    },
    bottomBar: {
        // backgroundColor:'#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        height: 60,
    },
    sendButton: {
        marginBottom: 10,
        marginLeft: 10,
        height: 40,
        width: 40,
        paddingTop: 10,
        paddingLeft: 5,
        backgroundColor: '#2196F3',
        borderRadius: 20,
        alignItems:'center',
    },

});


export default styles;