
import React, { useContext } from "react"
import {View, FlatList, Alert} from 'react-native'
import { Button, Icon, ListItem } from "react-native-elements"
import usersContext from "../context/UsersContext"

export default props=>{
  
  const {state, dispatch} = useContext(usersContext)

  function confirmUserDeletion(user){
    Alert.alert('Exculir Usuário', 'Deseja excluir usuário?',[
      {
        text: 'Sim',
        onPress(){
          dispatch({
            type: 'deleteUser',
            payload: user,
          })
        }
      },
      {
        text: 'Não'
      }
    ])
  }
  
  function getActions(user){
    return(
      <>
        <Button
          onPress={()=>props.navigation.navigate('UserForm', user)}
          type='clear'
          icon={<Icon name='edit' size={25} color='orange'/>}
        />
        <Button
          onPress={()=> confirmUserDeletion(user)}
          type='clear'
          icon={<Icon name='delete' size={25} color='red'/>}
        />
      </>
    )
  }
  
  function getUserItem({item: user}){
    return (
      <ListItem
        leftAvatar={{source: {uri: user.avatarUrl}}}
        key={user.id}
        title={user.name}
        subtitle={user.email}
        bottomDivider
        rightElement={getActions(user)}
        onPress={()=>props.navigation.navigate('UserForm', user)}
      />
    )
  }
  
  return(
    <View>
      <FlatList
        keyExtractor={user=>user.id.toString()}
        data={state.users}
        renderItem={getUserItem}
      />
    </View>
  )
}