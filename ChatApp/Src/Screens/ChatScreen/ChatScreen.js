import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, FlatList, TouchableOpacity } from 'react-native';
import {
    ChatClient,
    ChatOptions,
    ChatMessageChatType,
    ChatMessage,
} from 'react-native-agora-chat';
import { init } from '../../Utils/CheckConnection/CheckConnection';

const chatClient = ChatClient.getInstance();
const chatManager = chatClient.chatManager;
const appKey = '61855611#1047313';

const ChatScreen = (props) => {
    const { convId } = props?.route?.params;
    const [allChatMessage, setAllChatMessage] = useState([]);
    const [messageId, setMessageId] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState();
    const [targetId, setTargetId] = React.useState(props?.route?.params?.convId);

    useEffect(() => {
        const setMessageListener = () => {
            let msgListener = {
                onMessagesReceived(messages) {
                    console.log(messages[0]?.msgId, "messagesmessagesmessagesmessagesmessagessd111", messages);
                    setMessageId(messages[0]?.msgId);
                    for (let index = 0; index < messages.length; index++) {
                        // rollLog('received msgId: ' + messages[index].msgId);
                        console.log("setMessageListenersetMessageListener", messages[index].msgId);
                    }
                },
                onCmdMessagesReceived: messages => { },
                onMessagesRead: messages => { },
                onGroupMessageRead: groupMessageAcks => { },
                onMessagesDelivered: messages => { },
                onMessagesRecalled: messages => { },
                onConversationsUpdate: () => { },
                onConversationRead: (from, to) => { },
            };

            chatManager.removeAllMessageListener();
            chatManager.addMessageListener(msgListener);
        };

        // Initializes the SDK.
        // Initializes any interface before calling it.
        const init = () => {
            let o = new ChatOptions({
                autoLogin: false,
                appKey: appKey,
            });
            console.log("init_successinit_successinit_success", o);
            chatClient.removeAllConnectionListener();
            chatClient
                .init(o)
                .then(() => {
                    // rollLog('init success');
                    console.log("init_success");
                    // this.isInitialized = true;
                    let listener = {
                        onTokenWillExpire() {
                            // rollLog('token expire.');
                            console.log("token_expire");
                        },
                        onTokenDidExpire() {
                            // rollLog('token did expire');
                            console.log("token_did_expire");
                        },
                        onConnected() {
                            // rollLog('onConnected');
                            console.log("onConnected_onConnected");
                            setMessageListener();
                        },
                        onDisconnected(errorCode) {
                            // rollLog('onDisconnected:' + errorCode);
                            console.log("error_onDisconnected", errorCode);
                        },
                    };
                    chatClient.addConnectionListener(listener);
                })
                .catch(error => {
                    rollLog(
                        'init fail: ' +
                        (error instanceof Object ? JSON.stringify(error) : error),
                    );
                });

        };
        init();
        // Specify the conversation ID.
        const convId = props?.route?.params?.convId;
        // Specify the conversation type. For details, see descriptions in  ChatConversationType.
        const convType = ChatMessageChatType.PeerChat;
        // Specify the maximum count of the retrieved messages.
        const pageSize = 100;
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
    useEffect(() => {
        const setMessageListener = () => {
            let msgListener = {
                onMessagesReceived(messages) {
                    console.log(messages[0]?.msgId, "messagesmessagesmessagesmessagesmessagessd", messages);
                    setMessageId(messages[0]?.msgId);
                    for (let index = 0; index < messages.length; index++) {
                        // rollLog('received msgId: ' + messages[index].msgId);
                        console.log("setMessageListenersetMessageListener", messages[index].msgId);
                    }
                },
                onCmdMessagesReceived: messages => { },
                onMessagesRead: messages => { },
                onGroupMessageRead: groupMessageAcks => { },
                onMessagesDelivered: messages => { },
                onMessagesRecalled: messages => { },
                onConversationsUpdate: () => { },
                onConversationRead: (from, to) => { },
            };

            chatManager.removeAllMessageListener();
            chatManager.addMessageListener(msgListener);
        };

        // Initializes the SDK.
        // Initializes any interface before calling it.
        const init = () => {
            let o = new ChatOptions({
                autoLogin: false,
                appKey: appKey,
            });
            console.log("init_successinit_successinit_success", o);
            chatClient.removeAllConnectionListener();
            chatClient
                .init(o)
                .then(() => {
                    // rollLog('init success');
                    console.log("init_success");
                    // this.isInitialized = true;
                    let listener = {
                        onTokenWillExpire() {
                            // rollLog('token expire.');
                            console.log("token_expire");
                        },
                        onTokenDidExpire() {
                            // rollLog('token did expire');
                            console.log("token_did_expire");
                        },
                        onConnected() {
                            // rollLog('onConnected');
                            console.log("onConnected_onConnected");
                            setMessageListener();
                        },
                        onDisconnected(errorCode) {
                            // rollLog('onDisconnected:' + errorCode);
                            console.log("error_onDisconnected", errorCode);
                        },
                    };
                    chatClient.addConnectionListener(listener);
                })
                .catch(error => {
                    rollLog(
                        'init fail: ' +
                        (error instanceof Object ? JSON.stringify(error) : error),
                    );
                });

        };
        init();
        // Specify the conversation ID.
        const convId = props?.route?.params?.convId;
        // Specify the conversation type. For details, see descriptions in  ChatConversationType.
        const convType = ChatMessageChatType.PeerChat;
        // Specify the maximum count of the retrieved messages.
        const pageSize = 100;
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
    }, [messageId]);
    console.log("jdhvghcjbknlm", props)

    // const onSendMsg=(text)=>{
    //     setMessage();
    // };
    const sendmsg = () => {
        console.log("itemitemitemitemitemitemitemitem", message);
        let msg = ChatMessage.createTextMessage(
            targetId,
            message,
            ChatMessageChatType.PeerChat,
        );
        console.log(msg, "msgmsgmsgmsgmsgmsgmsg");
        setMessage("");
        const callback = new (class {
            onProgress(locaMsgId, progress) {
                // rollLog(`send message process: ${locaMsgId}, ${progress}`);
                console.log(progress, "onProgressonProgressonProgress", locaMsgId);
            }
            onError(locaMsgId, error) {
                // rollLog(`send message fail: ${locaMsgId}, ${JSON.stringify(error)}`);
                console.log(JSON.stringify(error), "onProgressonProgressonProgress", locaMsgId);
            }
            onSuccess(message) {
                console.log(message?.body?.content, "contentcontentcontentcontentcontent");
                // setMessage(message?.body?.content);
                setMessage("");
                // rollLog('send message success: ' + message.localMsgId);
            }
        }
        )();
        // rollLog('start send message ...');
        chatClient.chatManager
            .sendMessage(msg, callback)
            .then(() => {
                setMessage("");
                // rollLog(msg?.body?.content);
                // rollLog('send message: ' + msg.localMsgId);
                // console.log(msg?.body?.content, "rollLogrollLogrollLog", msg.localMsgId)
            })
            .catch(reason => {
                // rollLog('send fail: ' + JSON.stringify(reason));
                console.log("catchcatchcatchcatch", JSON.stringify(reason))
            });
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
                            <View style={{ height: 40, backgroundColor: '#fff', alignSelf: 'center', borderRadius: 20, marginBottom: 10, justifyContent: 'center', alignSelf: 'flex-start', borderRadius: 20, marginBottom: 10, borderColor: 'pink', borderWidth: 2 }}>
                                <Text style={{ alignSelf: 'center', padding: 10 }}>{item?.body?.content}</Text>
                            </View>
                            :
                            <View style={{ height: 40, backgroundColor: '#fff', alignSelf: 'center', borderRadius: 20, marginBottom: 10, justifyContent: 'center', alignSelf: 'flex-end', borderRadius: 20, marginBottom: 10, borderColor: 'pink', borderWidth: 2 }}>
                                <Text style={{ alignSelf: 'center', padding: 10 }}>{item?.body?.content}</Text>
                            </View>
                    }
                </View>

            </View>
        )
    }

    return (
        <>
            <KeyboardAvoidingView style={{ height: '100%' }}>

                <FlatList
                    data={allChatMessage}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                <View style={{ height: "12%", flexDirection: "row", justifyContent: "space-around", backgroundColor: "#fff", alignItems: "center" }}>

                    <View style={{ flexDirection: "row", height: 50, width: '75%', backgroundColor: '#fff', alignSelf: 'center', borderRadius: 20, borderColor: 'pink', borderWidth: 3, }} >
                        <TextInput
                            placeholder='chat'
                            style={{ paddingLeft: 20 }}
                            onChangeText={text => setMessage(text)}
                            value={message}

                        />
                    </View>
                    <TouchableOpacity style={{ height: 50, justifyContent: "center", width: '18%', backgroundColor: '#fff', alignItems: 'center', borderRadius: 20, borderColor: 'pink', borderWidth: 3, backgroundColor: "#FBAD28" }} onPress={() => sendmsg()}>
                        <Text>SEND</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

export default ChatScreen