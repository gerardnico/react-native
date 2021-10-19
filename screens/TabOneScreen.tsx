import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {DOMParser} from '@xmldom/xmldom';


import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';

export default function TabOneScreen({navigation}: RootTabScreenProps<'TabOne'>) {

    const [radioButtonState, setRadioButtonState] = React.useState(true);

    // const element = '<Text style={styles.title}>Tab Nico</Text>';
    const obj = {
        title: "My Title",
        text: "My text"
    }
    let jsxChildren = [];

    let xml = `
<address>
  <distance>0.04</distance>
</address>
`

    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    let distanceValue = doc.documentElement.getElementsByTagName("distance")[0]?.textContent;
    jsxChildren.push(<Text key={0}>Distance: {distanceValue}</Text>);

    let key = 0;
    for (let prop in obj) {
        key++;
        switch (prop) {
            case "title":
                jsxChildren.push(<Text key={key} style={styles.title}>Title: {obj[prop]}</Text>);
                break;
            case "text":
                jsxChildren.push(<Text key={key}>Text: {obj[prop]}</Text>);
        }
    }

    jsxChildren.push(<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>);
    jsxChildren.push(<EditScreenInfo path="/screens/TabOneScreen.tsx"/>);

    // Example Radio Button
    jsxChildren.push((
        <View>
            <View style={styles.radioContainer}>
                <TouchableOpacity onPress={() => {
                    if (!radioButtonState) setRadioButtonState(!radioButtonState)
                }}>
                    <RadioButton selected={radioButtonState}/>
                </TouchableOpacity>
                <Text> Answer 1</Text>
            </View>
            <View style={styles.radioContainer}>
                <TouchableOpacity onPress={() => {
                    if (radioButtonState) {
                        setRadioButtonState(!radioButtonState)
                    }
                }}>
                    <RadioButton selected={!radioButtonState}/>
                </TouchableOpacity>
                <Text> Answer 2</Text>
            </View>
        </View>
    ));


    return (
        <View style={styles.container}>
            {jsxChildren}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        paddingVertical: 8,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    radioContainer: {
        flexDirection: 'row', justifyContent: "center", alignItems: "center"
    }
});

function RadioButton(props: { style?: object, selected: boolean }) {
    return (
        <View style={[{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10
        }, props.style]}>
            {
                props.selected ?
                    <View style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000',
                    }}/>
                    : null
            }
        </View>
    );
}
