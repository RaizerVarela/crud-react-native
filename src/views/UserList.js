
import React from "react"
import {View, Text, FlatList, Alert} from 'react-native'
import { Button, Icon, ListItem } from "react-native-elements"
import users from "../data/users"

export default props=>{
  
  function confirmUserDeletion(user){
    Alert.alert('Exculir Usuário', 'Deseja excluir usuário?',[
      {
        text: 'Sim',
        onPress(){
          console.warn('delete' + user.id)
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
        data={users}
        renderItem={getUserItem}
      />
    </View>
  )
}