import {
    ChatClient,
    ChatOptions,
    ChatMessageChatType,
    ChatMessage,
} from 'react-native-agora-chat';

const chatClient = ChatClient.getInstance();
const chatManager = chatClient.chatManager;
const roomManager = chatClient.roomManager;
const appKey = '61855611#1047313';

// useEffect(() => {
// Registers listeners for messaging.
const setMessageListener = () => {
    let msgListener = {
        onMessagesReceived(messages) {
            console.log(messages, "messagesmessagesmessagesmessagesmessages")
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
export const init = () => {
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

// init();
// }, [chatClient, chatManager, appKey]);