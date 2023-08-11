import { api } from "./axiosConfigs"
import { defineCancelApiObject } from "./axiosUtils"


export const API = {
  getToDo: async function (email, cancel = false) {
    const response = await api.request({
      url: `/ToDo/${email}`,
      method: "GET",
      params:{
        email: email,
      },
      signal: cancel ? cancelApiObject[this.getToDo.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },

  createToDo: async function (todo, cancel = false) {
    const response = await api.request({
      url: "/ToDo/",
      method: "POST",
      data:todo,
      signal: cancel ? cancelApiObject[this.createToDo.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },

  updateToDo: async function (id, todo, cancel = false) {
    const response = await api.request({
      url: `/ToDo/${id}`,
      method: "PUT",
      params: {
        id:id,  
      },
      data: todo,
      signal: cancel ? cancelApiObject[this.updateToDo.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },

  deleteToDo: async function (id, cancel = false) {
    await api.request({
      url: `/ToDo/${id}`,
      method: "DELETE",
      params:{
        id: id
      },
      signal: cancel ? cancelApiObject[this.deleteToDo.name].handleRequestCancellation().signal : undefined,
    })
  },
}

const cancelApiObject = defineCancelApiObject(API)