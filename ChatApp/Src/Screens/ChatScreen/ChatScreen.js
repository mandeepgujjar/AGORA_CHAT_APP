import React, { useEffect } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import {
    ChatClient,
    ChatOptions,
    ChatMessageChatType,
    ChatMessage,
} from 'react-native-agora-chat';

const chatClient = ChatClient.getInstance();
const chatManager = chatClient.chatManager;

const ChatScreen = (props) => {
    const { convId } = props?.route?.params


    console.log("setAllConversationsetAllConversation", convId);
    useEffect(() => {
        // Specify the conversation ID.
        const convId = convId;
        // Specify the conversation type. For details, see descriptions in  ChatConversationType.
        const convType = ChatMessageChatType.PeerChat;
        // Specify the maximum count of the retrieved messages.
        const pageSize = 10;
        // Specify the message ID from which to retrieve the historical messages.
        const startMsgId = "";
        chatManager.fetchHistoryMessages(convId, convType, pageSize, startMsgId)
            .then((messages) => {
                console.log("getmessagesuccess: ", messages);
            })
            .catch((reason) => {
                console.log("load conversions fail.", reason);
            });
    }, []);
    return (
        <KeyboardAvoidingView style={{ height: '100%' }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.95, width: '90%', alignSelf: 'center', marginTop: 10 }}>
                    <View style={{ height: 40, width: '30%', backgroundColor: '#fff', alignSelf: 'center', borderRadius: 20, marginBottom: 10, justifyContent: 'center', alignSelf: 'flex-start', borderRadius: 20, marginBottom: 10, borderColor: 'pink', borderWidth: 2 }}>
                        <Text style={{ alignSelf: 'center' }}>Hello</Text>
                    </View>
                    <View style={{ height: 40, width: '20%', backgroundColor: '#fff', alignSelf: 'center', borderRadius: 20, marginBottom: 10, justifyContent: 'center', alignSelf: 'flex-end', borderRadius: 20, marginBottom: 10, borderColor: 'pink', borderWidth: 2 }}>
                        <Text style={{ alignSelf: 'center' }}>Ha G</Text>
                    </View>
                </View>
                <View style={{ height: 50, width: '90%', backgroundColor: '#fff', alignSelf: 'center', borderRadius: 20, borderColor: 'pink', borderWidth: 3 }} >
                    <TextInput
                        placeholder='chat' />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ChatScreen