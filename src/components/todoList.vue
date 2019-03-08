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
      <todo-item
        @removedTodo="removeTodo"
        @finishedEdit="finishEdit"
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        :remaining="remaining"
      ></todo-item>
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
import todoItem from "./todoItem";
export default {
  name: "todo-list",
  components: {
    todoItem
  },
  data() {
    return {
      newTodo: "",
      filter: "all",
      index: 0,
      todos: []
    };
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
    removeTodo(id) {
      this.todos = this.todos.filter(x => x.id != id);
    },
    checkAll(e) {
      console.log(e.target.checked);
      this.todos.map(x => (x.isCompleted = e.target.checked));
    },
    clearCompleted() {
      this.todos = this.todos.filter(x => !x.isCompleted);
    },
    finishEdit(data) {
      // console.log(data);
      const index = this.todos.findIndex(x => x.id == data.id);
      this.todos.splice(index, 1, data);
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
