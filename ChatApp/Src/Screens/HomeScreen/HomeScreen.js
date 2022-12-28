import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
const data = [
    {
        id: '1',
        image: require('../../Assets/Image1.png'),
        name: "Mandeep"
    },
    {
        id: '2',
        image: require('../../Assets/Image2.png'),
        name: 'Neha'
    },
    {
        id: '3',
        image: require('../../Assets/Image1.png'),
        name: 'Jagmeet'
    },
    {
        id: '4',
        image: require('../../Assets/Image2.png'),
        name: 'Gurleen'
    },
    {
        id: '5',
        image: require('../../Assets/Image1.png'),
        name: 'Manjeet'
    },
    {
        id: '6',
        image: require('../../Assets/Image2.png'),
        name: 'Simran'
    },
    {
        id: '7',
        image: require('../../Assets/Image1.png'),
        name: 'Ajit'
    },
    {
        id: '8',
        image: require('../../Assets/Image2.png'),
        name: 'Kamal'
    },
]
const HomeScreen = () => {
    const renderItem = ({ item }) => {
        return (
            <View style={{ borderBottomColor: '#000', borderBottomWidth: 1, width: '95%', alignSelf: 'center' }}>
                <TouchableOpacity style={{ flexDirection: 'row', margin: 10 }} >
                    <Image source={item.image} />
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: '500', color: '#000', padding: '4%' }}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: '500', color: '#000' }}>
                    Chat
                </Text>
            </View>
            <View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

export default HomeScreen