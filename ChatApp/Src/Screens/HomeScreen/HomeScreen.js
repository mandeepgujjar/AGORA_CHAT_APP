import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import {
    ChatClient,
    ChatOptions,
    ChatMessageChatType,
    ChatMessage,
} from 'react-native-agora-chat';

const chatClient = ChatClient.getInstance();
const chatManager = chatClient.chatManager;
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
const HomeScreen = (props) => {
    const [allConversation, setAllConversation] = useState([]);
    useEffect(() => {
        chatManager.getAllConversations()
            .then((res) => {
                console.log(res, "Loadingconversationssucceeds");
                setAllConversation(res);
            })
            .catch((reason) => {
                console.log("Loadingconversationsfails", reason);
            });
    }, []);
    const onUserChat = (item) => {
        props?.navigation?.navigate("ChatScreen", { convId: item?.convId })
    }
    const renderItem = ({ item }) => {
        return (
            <View style={{ borderBottomColor: '#000', borderBottomWidth: 1, width: '95%', alignSelf: 'center' }}>
                <TouchableOpacity style={{ flexDirection: 'row', margin: 10 }} onPress={() => onUserChat(item)} >
                    {/* <Image source={item.image} /> */}
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: '500', color: '#000', padding: '4%' }}>{item.convId}</Text>
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
                    key={item => item.id}
                    data={allConversation}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

export default HomeScreen