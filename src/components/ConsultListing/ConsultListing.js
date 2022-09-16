// @refresh reset
import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import 'firebase/database';
import { getDatabase, set, ref, get, onValue, push, update } from "firebase/database";
import { useUserContext } from '../../UserContext/UserContextProvider';
import Users from '../Users';
import { GiftedChat } from 'react-native-gifted-chat';
import ChatScreen from '../../Screens/ChatScreen';
import CallingScreen from '../../Screens/CallingScreen';

const ChatList = ({navigation}) => {
    /////////




    const { trimmedUser } = useUserContext();
    const [currentPage, setCurrentPage] = useState('ChatList');
    // const [currentPage, setCurrentPage] = useState('login');
    const [username, setUsername] = useState(null);
    const [users, setUsers] = useState([]);
    const [userToAdd, setUserToAdd] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [myData, setMyData] = useState(null);


    useEffect(() => {
        onLoadScreen();
        // console.log("CHATLIST PROPS",props);

        console.log("CHATLIST LINE 27", trimmedUser);



    }, []);

    const onLoadScreen = async () => {
        try {
            const database = getDatabase();
            //first check if the user registered before

            const user = await findUser(trimmedUser);

            //create a new user if not registered
            if (user) {
                setMyData(user);
            }

            // set friends list change listener
            const myUserRef = ref(database, `users/${trimmedUser}`);
            onValue(myUserRef, snapshot => {

                const data = snapshot.val();
                setUsers(data.friends);
                setMyData(prevData => ({
                    ...prevData,
                    friends: data.friends,
                }));
            });
            // setCurrentPage('users');
        } catch (error) {
            console.error("CHATLIST LINE 58", error);
        }

    };

    const findUser = async name => {
        const database = getDatabase();

        const mySnapshot = await get(ref(database, `users/${name}`));

        return mySnapshot.val();
    };

    const onClickUser = user => {
        

        const sUser = user;
        const sData = myData;

        navigation.navigate('ChatScreen',{
            selectedUser : sUser,
            myData : sData
        });
    };

    const onAddFriend = async name => {
        try {
            //find user and add it to my friends and also add me to his friends
            const database = getDatabase();

            const user = await findUser(name);

            if (user) {
                if (user.username === myData.username) {
                    // don't let user add himself
                    return;
                }

                if (
                    myData.friends &&
                    myData.friends.findIndex(f => f.username === user.username) > 0
                ) {
                    // don't let user add a user twice
                    return;
                }

                // create a chatroom and store the chatroom id

                const newChatroomRef = push(ref(database, 'chatrooms'), {
                    firstUser: myData.username,
                    secondUser: user.username,
                    messages: [],
                });

                const newChatroomId = newChatroomRef.key;

                const userFriends = user.friends || [];
                //join myself to this user friend list
                update(ref(database, `users/${user.username}`), {
                    friends: [
                        ...userFriends,
                        {
                            username: myData.username,
                            // avatar: myData.avatar,
                            chatroomId: newChatroomId,
                        },
                    ],
                });

                const myFriends = myData.friends || [];
                //add this user to my friend list
                update(ref(database, `users/${myData.username}`), {
                    friends: [
                        ...myFriends,
                        {
                            username: user.username,
                            // avatar: user.avatar,
                            chatroomId: newChatroomId,
                        },
                    ],
                });
            }
        } catch (error) {
            console.error("CHATLST 134", error);
        }
    };

    const onBack = () => {
        setCurrentPage('ChatList');
    };




    switch (currentPage) {
       
        case 'ChatScreen':
            return (
                <ChatScreen myData={myData} selectedUser={selectedUser} onBack={onBack} navigation={navigation}/>
            )
        case 'ChatList':
            return (
                <>
                    <Users
                        users={users}
                        onClickUser={onClickUser}
                        userToAdd={userToAdd}
                        setUserToAdd={setUserToAdd}
                        onAddFriend={onAddFriend}
                    />

                    <FlatList
                        data={users}
                        // renderItem={renderUser}
                        keyExtractor={item => item.username.toString()}
                    />
                </>
            )
    }

}


export default ChatList;
