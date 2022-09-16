// @refresh reset
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { getDatabase, get, ref, onValue, off, update } from 'firebase/database';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';


const ChatScreen = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const route = useRoute();
    const [selectedUser, setSelectedUser] = useState('');
    const [myData, setMyData] = useState('');






    useEffect(() => {

        setMyData(route.params.myData);
        setSelectedUser(route.params.selectedUser);

        if (myData !== '' && selectedUser !== '') {
            //load old messages
            const loadData = async () => {
                const myChatroom = await fetchMessages();
                setMessages(renderMessages(myChatroom.messages));
            };

            loadData();

            // set chatroom change listener
            const database = getDatabase();
            const chatroomRef = ref(database, `chatrooms/${selectedUser.chatroomId}`);
            onValue(chatroomRef, snapshot => {
                const data = snapshot.val();
                setMessages(renderMessages(data.messages));
            });

            return () => {
                //remove chatroom listener
                off(chatroomRef);
            };
        }
    }, [fetchMessages, renderMessages, selectedUser.chatroomId]);

    const renderMessages = useCallback(
        msgs => {

            return msgs
                ? msgs.reverse().map((msg, index) => ({
                    ...msg,
                    _id: index,
                    user: {
                        _id:
                            msg.sender === myData.username
                                ? myData.username
                                : selectedUser.username,
                        avatar:
                            msg.sender === myData.username
                                ? myData.avatar
                                : selectedUser.avatar,
                        name:
                            msg.sender === myData.username
                                ? myData.username
                                : selectedUser.username,
                    },
                }))
                : [];
        },
        [
            myData.avatar,
            myData.username,
            selectedUser.avatar,
            selectedUser.username,
        ],
    );

    const fetchMessages = useCallback(async () => {
        const database = getDatabase();

        const snapshot = await get(
            ref(database, `chatrooms/${selectedUser.chatroomId}`),
        );

        return snapshot.val();
    }, [selectedUser.chatroomId]);

    const onSend = useCallback(
        async (msg = []) => {
            //send the msg[0] to the other user
            const database = getDatabase();

            //fetch fresh messages from server
            const currentChatroom = await fetchMessages();

            const lastMessages = currentChatroom.messages || [];

            update(ref(database, `chatrooms/${selectedUser.chatroomId}`), {
                messages: [
                    ...lastMessages,
                    {
                        text: msg[0].text,
                        sender: myData.username,
                        createdAt: new Date(),
                    },
                ],
            });

            setMessages(prevMessages => GiftedChat.append(prevMessages, msg));
        },
        [fetchMessages, myData.username, selectedUser.chatroomId],
    );

    const onCall = () => {
        navigation.navigate('CallingScreen');
    }
    const onBack = () =>{
        navigation.navigate("ConsultListing");
    }




    return (

        <>
            <View style={styles.actionBar}>
                <View style={styles.backCont}>
                    <Pressable onPress={onBack} >
                        <Ionicons name="ios-caret-back" size={30} />

                    </Pressable>
                </View>
                <View style={styles.nameCont}>
                    <Text style={styles.recipient}>{selectedUser?.username}</Text>
                </View>
                <View style={styles.callCont}>
                    <Pressable onPress={onCall}>
                        <Ionicons name="call" size={30} />
                    </Pressable>
                </View>

            </View>

            <GiftedChat
                messages={messages}
                onSend={newMessage => onSend(newMessage)}
                user={{
                    _id: myData.username,
                }}
            />
        </>
    );
}
const styles = StyleSheet.create({
    nameCont: {

        // backgroundColor: 'blue',
        height: 50,
    },
    backCont: {
        // backgroundColor: 'red',
        height: 50,
        justifyContent: 'center',
        width: 50,
        alignItems: 'center'
    },
    callCont: {
        // backgroundColor: 'brown',
        height: 50,
        justifyContent: 'center',
        width: 50,
        alignItems: 'center'
    },
    actionBar: {

        justifyContent: 'space-around',
        backgroundColor: '#74DA74',
        height: 120,
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    recipient: {
        fontSize: 30,
        marginHorizontal: 20

    }
    
});
export default ChatScreen;