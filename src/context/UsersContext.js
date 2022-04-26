import React, {createContext, useReducer} from "react";
import users from "../data/users";

const initialState = {users}
const UsersContext = createContext({})

const actions = {
  deleteUser(state, action){
    const users = action.payload
    return{
      ...state, // opcional caso tenha outros atributos deve ser usado para não perder os dados
      users: state.users.filter(u=> u.id !== users.id)
    }
  }
}

export const UsersProvider = props =>{

  function reducer(state, action) {
    const fn = actions[action.type]
    return fn ? fn(state, action) : state
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return(
    <UsersContext.Provider value={{
      state, dispatch
    }}>
      {props.children}
    </UsersContext.Provider>
  )
}

export default UsersContext
