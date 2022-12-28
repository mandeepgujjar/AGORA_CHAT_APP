import React, { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Alert
} from 'react-native';
import {
  ChatClient,
  ChatOptions,
  ChatMessageChatType,
  ChatMessage,
} from 'react-native-agora-chat';
import AXIOS_INSTANCE from '../AxiosInstance/Axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RegistrationScreen = (props) => {
  console.log(props,"propspropspropspropspropsprops")

    const [nickname, setNickname] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

  const Register = () => {
    const data = {
      nickname: nickname,
      username: username,
      password: password
    }
    AXIOS_INSTANCE.post('users', data).then(async (response) => {
      // console.log("datadatadatadatadatadata", response?.status);
      
      if (response?.status === 200){
               props?.navigation?.navigate("UserListScreen");
                Alert.alert(
                    "User registered successfully."
                )
            // console.log("responseresponseresponseresponse", response);
      } else {
        Alert.alert("User registration failed");
            }
        }).catch((error) => {
            Alert.alert("User already registered")
            // console.log("errdgdhor", error);
        })
}
  return (
    <KeyboardAvoidingView style={{height: windowHeight}}>
    <SafeAreaView style={{flex:1}}>
              <View style={{flex:0.6,justifyContent:"flex-end"}}>
        <View style={styles.inputCon}>
          <TextInput
            multiline
            style={styles.inputBox}
            placeholder="Enter nickname"
            onChangeText={text => setNickname(text)}
            value={nickname}
          />
          </View>
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
            placeholder="Enter password"
            onChangeText={text => setPassword(text)}
            value={password}
          />
          </View>
          </View>
          <View style={{flex:0.3,justifyContent:"center"}}>

        <View style={styles.buttonCon}>
          <Text style={styles.eachBtn} onPress={Register}>
          Register
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
  )
}

export default RegistrationScreen;

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
        marginBottom: "10%",
      borderRadius:10,
      // paddingBottom: 6,
      borderWidth: 1,
      borderBottomColor: 'gray',
      justifyContent:"center"
    },
    inputBox: {
      // alignItems:"center",
      // marginTop: 15,
      paddingLeft:10,
      width: '100%',
      fontSize: 16,
      fontWeight: 'bold',
      justifyContent:"center"
    },
    buttonCon: {
      marginLeft: '2%',
      width: '96%',
      flexDirection: 'row',
      marginTop: 10,
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