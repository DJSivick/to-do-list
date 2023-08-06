import { api } from "./axiosConfigs"
import { defineCancelApiObject } from "./axiosUtils"

const {v4 : uuidv4} = require('uuid') 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


export const API = {
  getToDo: async function (email, cancel = false) {
    const response = await api.request({
      url: `/ToDo/:${email}`,
      method: "GET",
      params: {
        email: email
      },
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.getToDo.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
    return response.data
  },

  createToDo: async function (todo, cancel = false) {
    const response = await api.request({
      url: "/ToDo/",
      method: "POST",
      params:{
            todo: todo
      },
      data:todo,
      signal: cancel ? cancelApiObject[this.createToDo.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  
  updateToDo: async function (id, todo, cancel = false) {
    const response = await api.request({
      url: `/ToDo/:${id}`,
      method: "PUT",
      params: {
        id:id,
        todo: todo,  
      },
      data: todo,
      signal: cancel ? cancelApiObject[this.updateToDo.name].handleRequestCancellation().signal : undefined,
    })

    return response.data.products
  },

  deleteToDo: async function (id, cancel = false) {
    await api.request({
      url: `/ToDo/:${id}`,
      method: "DELETE",
      params:{
        id: id
      },
      signal: cancel ? cancelApiObject[this.deleteToDo.name].handleRequestCancellation().signal : undefined,
    })
  },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(API)