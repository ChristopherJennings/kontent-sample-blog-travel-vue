<template>
  <div class="container">
    <div class="flags">
      <a class="flag-icon flag-icon-gb" href="/"></a>
      <a class="flag-icon flag-icon-cz" href="/cs"></a>
      <a class="flag-icon flag-icon-es" href="/es"></a><br>
    </div>
    <div class="search"><h3>Search</h3>
    <input v-model="query" /><button v-on:click="search()">Search</button><button v-on:click="clear()">Clear</button>
    <div class="results"><span v-if="query && hits != null">Searched for <strong>{{query}}</strong> and </span>
    <span v-if="query && hits != null"><strong>{{hits}}</strong> posts found</span>
    </div>
    </div>
    <post-list-item v-for="post in filteredPosts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import PostListItem from "./post-list-item";
import algoliasearch from "algoliasearch";

export default {
  name: "post-list",
  components: {
    PostListItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  watch: {
    posts: function(val){
      if(val) this.filteredPosts = val;
    }
  },
  data: function () {
    return {
      client: null,
      index: null,
      query: "",
      filteredPosts: [],
      hits: null
    };
  },
  mounted: function () {
    this.client = algoliasearch("", "");
    this.index = this.client.initIndex("");
  },
  methods: {
    search: function () {
      let language = this.$route.params.locale;
      if(!language) language = "default";
      this.index.search(this.query, { filters: "language:"+language}).then(({ hits }) => {
        this.filteredPosts = this.posts.filter(p => hits.map(h => h.codename).includes(p.codename));
        this.hits = hits.length;
      });
    },
    clear: function() {
      this.query = "";
      this.filteredPosts = this.posts;
      this.hits = null;
    }
  },
};
</script>
<style>
.flags {
  position: fixed;
  margin-top: -485px;
  margin-right: 150px;
  padding: 10px;
  z-index: 100;
}


.flags > a {
  margin: 5px;
  border: 1px solid black;
}

.results {
  margin: 10px;
  font-size: 18px;
}
.search {
  margin: 10px;
  margin-left: 100px;
  float: left;
  z-index: 101;
  position: absolute;
  text-decoration: none;
}
</style>
<style scoped>
h3 {
  margin-bottom: 0px;
}

button {
  border-radius: 18px;
  background-color: #f2f2f0;
  margin: 3px;  
  color: #8a9199;
  font-size: 15px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0px;
  padding-bottom: 0px;
  border: 1px solid #c2c7cc;
}
button:hover {
  color: #f26a3d;
  border: 1px solid #f26a3d;
}
button:active {
  color: white;
  background-color: #8a9199;
  border: 1px solid white;
}
input {
  font-size: 18px;
  border-radius: 18px;
  padding-left: 10px;
}
</style>