
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// Import depend packages.
import React, { useEffect } from 'react';
import {
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Dimensions
} from 'react-native';
import {
    ChatClient,
    ChatOptions,
    ChatMessageChatType,
    ChatMessage,
} from 'react-native-agora-chat';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// Defines the App object.
const LoginScreen = (props) => {
    // Defines the variable.
    const title = 'AgoraChatQuickstart';
    // Replaces <your appKey> with your app key.
    const appKey = '61855611#1047313';
    // Replaces <your userId> with your user ID.
    const roomId = '201631492800513';
    // Replaces <your userId> with your user ID.

    // Sepcify the conversation ID.
    // const convId = "mandeep12";
    // // Whether to create a conversation if the specified one does not exist. If you set it as true, this method always returns a conversation object.
    // const createIfNeed = false;
    // // Set conversation type. For details, see descriptions in ChatConversationType.
    // const convType = ChatMessageChatType.PeerChat;
    // // Call getConversation to retrieve the specified conversation.









    const [username, setUsername] = React.useState('mandeep123');
    // Replaces <your agoraToken> with your Agora token.
    const [chatToken, setChatToken] = React.useState('007eJxTYPBfeWLpJ8cfEy+t4/ngfi3Q7j+v89/g4niNiq+bwlN2pPkoMCQlW1gYm6YkmxikmJpYmqdapJibGyabp1hYmBinWZon9SivSW4IZGRY/fsBKyMDKwMjEIL4KgxGRonGpgYWBroWhknmuoaGqSm6iRZArkmaSbKFUbKRabJlKgBLeyk/');
    const [password, setPassword] = React.useState('');
    const [targetId, setTargetId] = React.useState('');
    const [content, setContent] = React.useState('');
    const [logText, setWarnText] = React.useState('Show log area');
    const [message, setMessage] = React.useState('');
    const chatClient = ChatClient.getInstance();
    const chatManager = chatClient.chatManager;
    const roomManager = chatClient.roomManager;


    // Outputs console logs.
    useEffect(() => {
        logText.split('\n').forEach((value, index, array) => {
            if (index === 0) {
                console.log(value);
            }
        });
    }, [logText]);
    console.log("hvhjckmvhfbv", props);

    // Outputs UI logs.
    const rollLog = text => {
        setWarnText(preLogText => {
            let newLogText = text;
            preLogText
                .split('\n')
                .filter((value, index, array) => {
                    if (index > 8) {
                        return false;
                    }
                    return true;
                })
                .forEach((value, index, array) => {
                    newLogText += '\n' + value;
                });
            return newLogText;
        });
    };

    useEffect(() => {
        // Registers listeners for messaging.
        const setMessageListener = () => {
            let msgListener = {
                onMessagesReceived(messages) {
                    console.log(messages, "messagesmessagesmessagesmessagesmessages")
                    for (let index = 0; index < messages.length; index++) {
                        rollLog('received msgId: ' + messages[index].msgId);
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

            // Specify the conversation ID.
            const convId = "mandeep123";
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
            chatManager.getAllConversations()
                .then((res) => {
                    console.log(res, "Loadingconversationssucceeds");
                })
                .catch((reason) => {
                    console.log("Loadingconversationsfails", reason);
                });
            chatManager.fetchAllConversations()
                .then((message) => {
                    console.log(message, "loadconversionssuccess");
                })
                .catch((reason) => {
                    console.log("load_conversions_fail.", reason);
                });


            // chatClient
            // .chatManager.getConversation(convId, convType, createIfNeed)
            // .then((message) => {
            //   console.log("Gettingconversationssucceeds", message);
            // })
            // .catch((reason) => {
            //   console.log("Getting conversations fails.", reason);
            // });




        };

        // Initializes the SDK.
        // Initializes any interface before calling it.
        const init = () => {
            let o = new ChatOptions({
                autoLogin: false,
                appKey: appKey,
            });
            chatClient.removeAllConnectionListener();
            chatClient
                .init(o)
                .then(() => {
                    rollLog('init success');
                    // this.isInitialized = true;
                    let listener = {
                        onTokenWillExpire() {
                            rollLog('token expire.');
                        },
                        onTokenDidExpire() {
                            rollLog('token did expire');
                        },
                        onConnected() {
                            rollLog('onConnected');
                            setMessageListener();
                        },
                        onDisconnected(errorCode) {
                            rollLog('onDisconnected:' + errorCode);
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
    }, [chatClient, chatManager, appKey]);

    // Logs in with an account ID and a token.
    const login = () => {
        // if (this.isInitialized === false || this.isInitialized === undefined) {
        //   rollLog('Perform initialization first.');
        //   return;
        // }



        props?.navigation?.navigate("HomeScreen");
        rollLog('start login ...');
        chatClient
            .loginWithAgoraToken(username, chatToken)
            .then((response) => {
                console.log(response, "responseresponseresponseresponse");
                rollLog('login operation success.');
            })
            .catch(reason => {
                rollLog('login fail: ' + JSON.stringify(reason));
            });
    };

    // Logs out from server.
    // const logout = () => {
    //   // if (this.isInitialized === false || this.isInitialized === undefined) {
    //   //   rollLog('Perform initialization first.');
    //   //   return;
    //   // }
    //   rollLog('start logout ...');
    //   chatClient
    //     .logout()
    //     .then(() => {
    //       rollLog('logout success.');
    //     })
    //     .catch(reason => {
    //       rollLog('logout fail:' + JSON.stringify(reason));
    //     });
    // };

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
    // const onGroupJoin = () => {
    // chatManager
    // You can set the value of `pageSize` to a maximum of 1000.

    // roomManager.fetchPublicChatRoomsFromServer(10, 100)
    //   .then((rooms) => {
    //     console.log("get room success.", rooms);
    //   })
    //   .catch((reason) => {
    //     console.log("get room fail.", reason);
    //   });


    // roomManager.joinChatRoom(roomId)
    //   .then(() => {
    //     console.log("join room success.");
    //   })
    //   .catch((reason) => {
    //     console.log("join room fail.", reason);
    //   });


    //     roomManager.fetchPublicChatRoomsFromServer(roomId)
    //     .then((info) => {
    //       console.log("get room success.", info);

    //     roomManager.joinChatRoom(roomId)
    // .then(() => {
    //   console.log("join room success.");
    // })
    // .catch((reason) => {
    //   console.log("join room fail.", reason);
    // });
    // roomManager.joinChatRoom(rooms?.list[0]?.roomId)
    //     .then(() => {
    //       console.log("join room success.");
    //     })
    //     .catch((reason) => {
    //       console.log("join room fail.", reason);
    //     });

    //     })
    //     .catch((reason) => {
    //       console.log("get room fail.", reason);
    //     });
    // }
    // }

    // Renders the UI.
    return (
        <KeyboardAvoidingView style={{ height: windowHeight }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 0.6, justifyContent: "flex-end" }}>
                    <View style={styles.inputCon}>
                        <TextInput
                            multiline
                            style={styles.inputBox}
                            placeholder="Enter username"
                            onChangeText={text => setUsername(text)}
                            value={username}
                        />
                    </View>
                    <View style={styles.inputCon}>
                        <TextInput
                            multiline
                            style={styles.inputBox}
                            placeholder="Enter chatToken"
                            onChangeText={text => setChatToken(text)}
                            value={chatToken}
                        />
                    </View>
                </View>
                <View style={{ flex: 0.3, justifyContent: "center" }}>

                    <View style={styles.buttonCon}>
                        <Text style={styles.eachBtn} onPress={login}>
                            SIGN IN
                        </Text>
                        {/* <Text style={styles.eachBtn} onPress={logout}>
            SIGN OUT
          </Text> */}
                    </View>
                </View>

                {/* <View style={styles.inputCon}>
          <TextInput
            multiline
            style={styles.inputBox}
            placeholder="Enter the username you want to send"
            onChangeText={text => setTargetId(text)}
            value={targetId}
          />
        </View>
        <View style={styles.inputCon}>
          <TextInput
            multiline
            style={styles.inputBox}
            placeholder="Enter content"
            onChangeText={text => setContent(text)}
            value={content}
          />
        </View>
        <View style={styles.buttonCon}>
          <Text style={styles.btn2} onPress={sendmsg}>
            SEND TEXT
          </Text>
        </View>
        <View style={styles.buttonCon}>
          <Text style={styles.btn2} onPress={onGroupJoin}>
            JOIN
          </Text>
        </View> */}
                {/* <View>
          <Text style={styles.logText} multiline={true}>
            {logText}
          </Text>
        </View>
        <View>
          <Text style={styles.logText}>{message}</Text>
        </View>
        <View>
          <Text style={styles.logText}>{ }</Text>
        </View> */}
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

// Sets UI styles.
const styles = StyleSheet.create({
    titleContainer: {
        height: 60,
        backgroundColor: '#6200ED',
    },
    title: {
        lineHeight: 60,
        paddingLeft: 15,
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    inputCon: {
        marginLeft: '5%',
        width: '90%',
        height: 60,
        marginBottom: "20%",
        borderRadius: 10,
        // paddingBottom: 6,
        borderWidth: 1,
        borderBottomColor: 'gray',
        justifyContent: "center"
    },
    inputBox: {
        // alignItems:"center",
        // marginTop: 15,
        paddingLeft: 10,
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
        justifyContent: "center"
    },
    buttonCon: {
        marginLeft: '2%',
        width: '96%',
        flexDirection: 'row',
        marginTop: 20,
        height: 26,
        justifyContent: 'space-around',
        alignItems: 'center',
        // justifyContent:"center"

    },
    eachBtn: {
        height: 60,
        width: '70%',
        lineHeight: 60,
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        backgroundColor: '#FBAD28',
        borderRadius: 5,
    },
    btn2: {
        height: 40,
        width: '45%',
        lineHeight: 40,
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        backgroundColor: '#6200ED',
        borderRadius: 5,
    },
    logText: {
        padding: 10,
        marginTop: 10,
        color: '#000',
        fontSize: 14,
        lineHeight: 20,
    },
});

export default LoginScreen;