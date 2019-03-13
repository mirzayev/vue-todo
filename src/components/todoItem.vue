<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="isCompleted" @change="doneEdit">
      <div
        title="For editing double click todo title"
        :class="{completed: isCompleted}"
        @dblclick="editTodo"
        v-if="!isEditing"
        class="todo-item-label"
      >{{title}}</div>
      <input
        class="todo-item-edit"
        type="text"
        v-model="title"
        v-if="isEditing"
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        v-focus
      >
    </div>
    <div class="remove-item" @click="removeTodo">&times;</div>
  </div>
</template>
<script>
export default {
  name: "todoItem",
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      todoCache: "",
      id: this.todo.id,
      title: this.todo.title,
      isEditing: this.todo.isEditing,
      isCompleted: this.todo.isCompleted
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
      return this.$store.getters.remaining;
    }
  },
  methods: {
    editTodo() {
      this.todoCache = this.title;
      this.isEditing = true;
    },
    doneEdit() {
      if (this.title.trim() == "") {
        this.title = this.todoCache;
      }
      this.isEditing = false;

      this.$store.dispatch("doneEdit", {
        id: this.id,
        title: this.title,
        isCompleted: this.isCompleted,
        isEditing: this.isEditing
      });
    },
    cancelEdit() {
      this.title = this.todoCache;
      this.isEditing = false;
    },
    removeTodo() {
      this.$store.dispatch("removeTodo", this.id);
    }
  },
  watch: {
    remaining() {
      if (this.remaining == 0) {
        this.isCompleted = true;
      } else {
        this.isCompleted = this.todo.isCompleted;
      }
    }
  }
};
</script>
