import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    filter: "all",
    todos: []
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
    }
  },
  actions: {
    addTodo({ commit }, todo) {
      commit("addTodo", todo);
    },
    removeTodo({ commit }, id) {
      commit("removeTodo", id);
    },
    doneEdit({ commit }, todo) {
      commit("doneEdit", todo);
    },
    clearCompleted({ commit }) {
      commit("clearCompleted");
    },
    checkAll({ commit }, target) {
      commit("checkAll", target);
    },
    changeFilter({ commit }, filter) {
      commit("changeFilter", filter);
    }
  }
});
