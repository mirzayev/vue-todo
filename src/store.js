import Vue from "vue";
import Vuex from "vuex";
import db from "./firebase";
import { stat } from "fs";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    filter: "all",
    todos: [],
    loading: true
  },
  getters: {
    remaining(state) {
      return state.todos.filter(x => x.isCompleted == false).length;
    },
    filteredTodos(state) {
      if (state.filter == "all") {
        return state.todos;
      } else if (state.filter == "active") {
        return state.todos.filter(x => !x.isCompleted);
      } else if (state.filter == "completed") {
        return state.todos.filter(x => x.isCompleted);
      }
    },
    clearBtn(state) {
      return state.todos.filter(x => x.isCompleted).length;
    },
    filter(state) {
      return state.filter;
    },
    loading(state) {
      return state.loading;
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    removeTodo(state, id) {
      state.todos = state.todos.filter(x => x.id != id);
    },
    doneEdit(state, todo) {
      const index = state.todos.findIndex(x => x.id == todo.id);
      state.todos.splice(index, 1, todo);
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(x => !x.isCompleted);
    },
    checkAll(state, target) {
      state.todos.map(x => (x.isCompleted = target.checked));
    },
    changeFilter(state, filter) {
      state.filter = filter;
    },
    GET_TODOS(state, todos) {
      state.todos = todos;
    }
  },
  actions: {
    getTodos({ commit, state }) {
      // state.loading = true;
      let tempTodos = [];
      db.collection("todos")
        .orderBy("timestamp", "desc")
        .get()
        .then(querySnap => {
          querySnap.forEach(doc =>
            tempTodos.push({
              id: doc.id,
              title: doc.data().title,
              isCompleted: doc.data().completed,
              timestamp: doc.data().timestamp,
              isEditing: false
            })
          );
        });
      commit("GET_TODOS", tempTodos);
    },
    addTodo({ commit }, todo) {
      db.collection("todos")
        .add({
          title: todo.title,
          completed: false,
          timestamp: new Date()
        })
        .then(docRef => {
          commit("addTodo", {
            id: docRef.id,
            title: todo.title,
            completed: false
          });
        });
    },
    removeTodo({ commit }, id) {
      db.collection("todos")
        .doc(id)
        .delete()
        .then(() => {
          commit("removeTodo", id);
        });
    },
    doneEdit({ commit }, todo) {
      db.collection("todos")
        .doc(todo.id)
        .update({
          title: todo.title,
          completed: todo.isCompleted,
          timestamp: new Date()
        })
        .then(() => {
          commit("doneEdit", todo);
        });
    },
    clearCompleted({ commit }) {
      db.collection("todos")
        .where("completed", "==", true)
        .get()
        .then(querySnap =>
          querySnap.forEach(doc =>
            doc.ref.delete().then(() => commit("clearCompleted"))
          )
        );
    },
    checkAll({ commit }, target) {
      db.collection("todos")
        .get()
        .then(querySnap => {
          querySnap.forEach(doc => {
            doc.ref
              .update({
                completed: target.checked
              })
              .then(() => {
                commit("checkAll", target);
              });
          });
        });
    },
    changeFilter({ commit }, filter) {
      commit("changeFilter", filter);
    }
  }
});
