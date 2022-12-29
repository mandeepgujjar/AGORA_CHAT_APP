import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, FlatList, TouchableOpacity } from 'react-native';
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
    const [message, setMessage] = useState();


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
    // const onSend = useCallback((messages = []) => {
    //     console.log("cvghbjnkml", messages);
    //     setAllChatMessage(previousMessages => GiftedChat.append(previousMessages, messages))
    // }, [])

const onSendMsg=(text)=>{
    setMessage();

};
    // Sends a text message to somebody.
    // const sendmsg = (item) => {
    //   // if (this.isInitialized === false || this.isInitialized === undefined) {
    //   //   rollLog('Perform initialization first.');
    //   //   return;
    //   // } 
    //   console.log(item, "itemitemitemitemitemitemitemitem");
    //   let msg = ChatMessage.createTextMessage(
    //     targetId,
    //     content,
    //     ChatMessageChatType.PeerChat,
    //   );
    //   console.log(msg, "msgmsgmsgmsgmsgmsgmsg");
    //   setContent("");
    //   const callback = new (class {
    //     onProgress(locaMsgId, progress) {
    //       rollLog(`send message process: ${locaMsgId}, ${progress}`);
    //     }
    //     onError(locaMsgId, error) {
    //       rollLog(`send message fail: ${locaMsgId}, ${JSON.stringify(error)}`);
    //     }
    //     onSuccess(message) {
    //       console.log(message?.body?.content, "contentcontentcontentcontentcontent");
    //       setMessage(message?.body?.content);
    //       rollLog('send message success: ' + message.localMsgId);
    //     }
    //   }
    //   )();
    //   rollLog('start send message ...');
    //   chatClient.chatManager
    //     .sendMessage(msg, callback)
    //     .then(() => {
    //       rollLog(msg?.body?.content);
    //       rollLog('send message: ' + msg.localMsgId);
    //     })
    //     .catch(reason => {
    //       rollLog('send fail: ' + JSON.stringify(reason));
    //     });
    // };


    const renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.95, width: '90%', alignSelf: 'center', marginTop: 10 }}>
                    {
                        item?.direction === "rec" ?
                            <View style={{ height: 40,  backgroundColor: '#fff', alignSelf: 'center', borderRadius: 20, marginBottom: 10, justifyContent: 'center', alignSelf: 'flex-start', borderRadius: 20, marginBottom: 10, borderColor: 'pink', borderWidth: 2 }}>
                                <Text style={{ alignSelf: 'center',padding:10 }}>{item?.body?.content}</Text>
                            </View>
                            :
                            <View style={{ height: 40,  backgroundColor: '#fff', alignSelf: 'center', borderRadius: 20, marginBottom: 10, justifyContent: 'center', alignSelf: 'flex-end', borderRadius: 20, marginBottom: 10, borderColor: 'pink', borderWidth: 2 }}>
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
            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>

                <View style={{ flexDirection: "row", height: 60, width: '80%', backgroundColor: '#fff', alignSelf: 'center', borderRadius: 20, borderColor: 'pink', borderWidth: 3, bottom: 10, }} >
                    <TextInput
                        placeholder='chat'
                        style={{ paddingLeft: 20 }}
                        value={message}
                        onChangeText={(text) => onSendMsg(text)}

                    />
                </View>
                <TouchableOpacity style={{ height: 60, justifyContent: "center", width: '18%', backgroundColor: '#fff', alignItems: 'center', borderRadius: 20, borderColor: 'pink', borderWidth: 3, bottom: 10, backgroundColor: "#FBAD28" }}  onPress={(text)=>(text)}>
                    <Text>SEND</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ChatScreen