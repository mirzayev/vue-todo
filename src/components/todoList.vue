<template>
  <div>
    <input
      type="text"
      class="todo-input"
      v-model="newTodo"
      placeholder="Add new todo"
      @keyup.enter="addTodo"
    >
    <transition-group
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div v-for="todo in filteredTodos" :key="todo.id" class="todo-item">
        <div class="todo-item-left">
          <input type="checkbox" v-model="todo.isCompleted">
          <div
            title="For editing double click todo title"
            :class="{completed: todo.isCompleted}"
            @dblclick="editTodo(todo)"
            v-if="!todo.isEditing"
            class="todo-item-label"
          >{{todo.title}}</div>
          <input
            class="todo-item-edit"
            type="text"
            v-model="todo.title"
            v-if="todo.isEditing"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
            v-focus
          >
        </div>
        <div class="remove-item" @click="removeTodo(todo.id)">&times;</div>
      </div>
    </transition-group>
    <div class="extra-container">
      <div>
        <label>
          <input type="checkbox" :checked="remaining==0" @change="checkAll"> Check All
        </label>
      </div>
      <div>{{remaining}} todos left</div>
    </div>
    <div class="extra-container">
      <div>
        <button @click="filter = 'all'" :class="{active:filter=='all'}">All</button>
        <button @click="filter = 'active'" :class="{active:filter=='active'}">Active</button>
        <button @click="filter = 'completed'" :class="{active:filter=='completed'}">Completed</button>
      </div>
      <div>
        <transition name="fade">
          <button @click="clearCompleted" v-if="clearBtn">Clear Completed</button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "todo-list",
  data() {
    return {
      newTodo: "",
      todoCache: "",
      filter: "all",
      index: 0,
      todos: []
    };
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  computed: {
    remaining() {
      return this.todos.filter(x => x.isCompleted == false).length;
    },
    filteredTodos() {
      if (this.filter == "all") {
        return this.todos;
      } else if (this.filter == "active") {
        return this.todos.filter(x => !x.isCompleted);
      } else if (this.filter == "completed") {
        return this.todos.filter(x => x.isCompleted);
      }
    },
    clearBtn() {
      return this.todos.filter(x => x.isCompleted).length;
    }
  },
  methods: {
    addTodo() {
      if (!this.newTodo.trim()) {
        alert("Please add todo name");
        return;
      }
      this.todos.push({
        id: this.index,
        title: this.newTodo,
        isCompleted: false,
        isEditing: false
      });
      this.index++;
      this.newTodo = "";
    },
    editTodo(todo) {
      this.todoCache = todo.title;
      todo.isEditing = true;
    },
    doneEdit(todo) {
      if (todo.title.trim() == "") {
        todo.title = this.todoCache;
      }
      todo.isEditing = false;
    },
    cancelEdit(todo) {
      todo.title = this.todoCache;
      todo.isEditing = false;
    },
    removeTodo(id) {
      this.todos = this.todos.filter(x => x.id != id);
    },
    checkAll(e) {
      console.log(e.target.checked);
      this.todos.map(x => (x.isCompleted = e.target.checked));
    },
    clearCompleted() {
      this.todos = this.todos.filter(x => !x.isCompleted);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import url(https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css);
.todo-input {
  width: 100%;
  padding: 4px 10px;
  font-size: 18px;
  margin-bottom: 16px;
  border: 1px solid #ccc; //override defaults

  &:focus {
    outline: 0;
  }
}
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}
.remove-item {
  cursor: pointer;
  font-size: 18px;
  &:hover {
    color: #000;
  }
}
.todo-item-left {
  // later
  display: flex;
  align-items: center;
}
.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}
.todo-item-edit {
  font-size: 18px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 4px 10px;
  border: 1px solid #ccc; //override defaults
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  &:focus {
    outline: none;
  }
}
.completed {
  text-decoration: line-through;
  color: grey;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}
button {
  font-size: 14px;
  background-color: white;
  appearance: none;
  &:hover {
    background: lightgreen;
  }
  &:focus {
    outline: none;
  }
}
.active {
  background: lightgreen;
}
// CSS Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
