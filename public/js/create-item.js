Vue.component('create-item', {
  data: function () {
    return {
      creating: false,
      title: '',
    };
  },
  methods: {
    createTodoItem: function () {
      console.log(this);
      if (this.title.length === 0) {
        alert('Cannot create task, title must be at least 1 character long!');
        return;
      }
      this.creating = true;
      fetch('/todo', {
        body: JSON.stringify({ title: this.title }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
        .then((response) => response.json())
        .then((json) => {
          this.title = '';
          this.onCreate(json);
        })
        .catch(console.error)
        .finally(() => (this.creating = false));
    },
  },
  props: ['onCreate'],
  template:
    '<div><h3>Add Task</h3><input v-model="title" placeholder="New Task Title" v-bind:disabled="creating"/><button v-on:click="createTodoItem">Add Task</button></div>',
});
