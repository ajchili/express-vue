Vue.component('list-item', {
  props: ['id', 'item'],
  template: '<p>{{ item.title }} - {{ id }}</p>',
});
