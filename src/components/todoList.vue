<template>
  <div>
    <input
      type="text"
      class="todo-input"
      v-model="newTodo"
      placeholder="Add new todo"
      @keyup.enter="addTodo"
    >
    <div v-if="1>2" class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <transition-group
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <todoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo"></todoItem>
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
        <button @click="changeFilter('all')" :class="{active:filter=='all'}">All</button>
        <button @click="changeFilter('active')" :class="{active:filter=='active'}">Active</button>
        <button @click="changeFilter('completed')" :class="{active:filter=='completed'}">Completed</button>
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
import { mapGetters } from "vuex";
export default {
  name: "todo-list",
  components: {
    todoItem
  },
  data() {
    return {
      newTodo: "",
      index: 0
    };
  },
  computed: {
    ...mapGetters([
      "remaining",
      "filteredTodos",
      "clearBtn",
      "filter",
      "loading"
    ])
  },
  created() {
    this.$store.dispatch("getTodos");
  },
  methods: {
    addTodo() {
      if (!this.newTodo.trim()) {
        alert("Please add todo name");
        return;
      }
      this.$store.dispatch("addTodo", {
        id: this.index,
        title: this.newTodo,
        isCompleted: false,
        isEditing: false
      });
      this.index++;
      this.newTodo = "";
    },
    checkAll(e) {
      this.$store.dispatch("checkAll", e.target);
    },
    clearCompleted() {
      this.$store.dispatch("clearCompleted");
    },
    changeFilter(filter) {
      this.$store.dispatch("changeFilter", filter);
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

.lds-ellipsis {
  display: block;
  position: relative;
  width: 64px;
  height: 64px;
  margin: auto;
}
.lds-ellipsis div {
  position: absolute;
  top: 27px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #2c3e50;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 6px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 6px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 26px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 45px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}
</style>
