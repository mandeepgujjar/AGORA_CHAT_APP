import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, FlatList } from 'react-native';
import {
    ChatClient,
    ChatOptions,
    ChatMessageChatType,
    ChatMessage,
} from 'react-native-agora-chat';

const chatClient = ChatClient.getInstance();
const chatManager = chatClient.chatManager;

const ChatScreen = (props) => {
    const { convId } = props?.route?.params;
    const [allChatMessage, setAllChatMessage] = useState([]);


    useEffect(() => {
        // Specify the conversation ID.
        const convId = props?.route?.params?.convId;
        // Specify the conversation type. For details, see descriptions in  ChatConversationType.
        const convType = ChatMessageChatType.PeerChat;
        // Specify the maximum count of the retrieved messages.
        const pageSize = 10;
        // Specify the message ID from which to retrieve the historical messages.
        const startMsgId = "";
        chatManager.fetchHistoryMessages(convId, convType, pageSize, startMsgId)
            .then((messages) => {
                console.log("getmessagesuccess", messages);
                setAllChatMessage(messages?.list)
            })
            .catch((reason) => {
                console.log("load conversions fail.", reason);
            });
    }, []);
    const renderItem = ({ item }) => {
        console.log("setAllConversationsetAllConversation", item);
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.95, width: '90%', alignSelf: 'center', marginTop: 10 }}>
                    {
                        item?.direction === "rec" ?
                            <View style={{ height: 50, backgroundColor: '#fff', alignSelf: 'center', borderRadius: 20, marginBottom: 10, justifyContent: 'center', alignSelf: 'flex-start', borderRadius: 20, marginBottom: 10, borderColor: 'pink', borderWidth: 2,alignItems:"center" }}>
                                <Text style={{ alignSelf: 'center',padding:10 }}>{item?.body?.content}</Text>
                            </View>
                            :
                            <View style={{ height: 50, backgroundColor: '#fff',  borderRadius: 20, marginBottom: 10, justifyContent: 'center', alignSelf: 'flex-end', borderRadius: 20, marginBottom: 10, borderColor: 'pink', borderWidth: 2 }}>
                                <Text style={{ alignSelf: 'center',padding:10 }}>{item?.body?.content}</Text>
                            </View>
                    }
                </View>

            </View>
        )
    }

    return (
        <KeyboardAvoidingView style={{ height: '100%' }}>

            <FlatList
                data={allChatMessage}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <View style={{ height: 60, width: '90%', backgroundColor: '#fff', alignSelf: 'center', borderRadius: 20, borderColor: 'pink', borderWidth: 3, bottom :10 }} >
                <TextInput
                    placeholder='chat' />
            </View>
        </KeyboardAvoidingView>
    )
}

export default ChatScreen