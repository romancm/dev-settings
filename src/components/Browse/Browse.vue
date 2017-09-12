<template lang="html">
  <div>
      Browse
      List all users here

      <ul>
          <li v-for="{firstName, lastName, _id} in users">
              {{firstName}} {{lastName}} {{_id}}
          </li>
      </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { store } from '../../store';

export default {
    mounted() {
        this.load();
    },

    computed: {
        users() { return store.getters.users; },
    },

    methods: {
        load() {
            // TODO: enhance this logic so endpoint isn't hit every time
            axios.get('https://atom-settings-api.herokuapp.com/browse/')
                .then(({ data }) => {
                    store.commit('updateBrowseData', data);
                });
        },
    },
};
</script>

<style lang="css">
</style>
