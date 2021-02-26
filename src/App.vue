<template>
  <div class="container">
    <div class="row">
      <div class="column">
        <h1>Available Actors</h1>
        <p>
          This is a list of actors available within this intance of FoundryVTT.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <div v-if="error" class="error">
          <span>{{ error }}</span>
        </div>
        <div v-else-if="loading" class="loading">
          <div class="lds-dual-ring"></div>
        </div>
        <table v-else class="u-full-width">
          <thead>
            <tr>
              <th width="4em"><label for="filterName">Name</label></th>
              <th>
                <input
                  v-model.trim="filterName"
                  id="filterName"
                  type="search"
                  class="x-large"
                />
              </th>
              <th width="25%">
                <label
                  >Race
                  <input v-model.trim="filterRace" type="search" class="medium"
                /></label>
              </th>
              <th width="23%">
                <label
                  >Class
                  <input
                    v-model.trim="filterClass"
                    type="search"
                    class="medium"
                /></label>
              </th>
              <th width="12%">
                <label
                  >Level
                  <input
                    v-model.number="filterLevel"
                    type="number"
                    class="small"
                /></label>
              </th>
            </tr>
          </thead>
          <tbody>
            <Actor
              v-for="actor in filteredActors"
              :actor="actor"
              :key="actor.data.id"
              :config="config"
            />
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="column footer">
        <p>
          Built to make it easier to view actors in your
          <a href="https://foundryvtt.com/" target="_blank">FoundryVTT</a>
          instance. Uses the
          <a
            href="https://foundryvtt.com/packages/externalactor/"
            target="_blank"
            >VTT External Actor Viewer</a
          >
          module. View the
          <a
            href="https://github.com/sneat/FoundryVTTActorViewer/blob/master/README.md"
            target="_blank"
            >Readme</a
          >.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { default as Actor, ActorType } from "./Actor.vue";
import { default as getConfig, Config } from "./config";

export default defineComponent({
  name: "App",
  components: {
    Actor,
  },
  data() {
    return {
      actors: [] as Array<ActorType>,
      config: (null as unknown) as Config,
      filterClass: (null as unknown) as string,
      filterLevel: (null as unknown) as number,
      filterName: (null as unknown) as string,
      filterRace: (null as unknown) as string,
      error: (null as unknown) as string,
      loading: true,
    };
  },
  created() {
    getConfig().then((config) => {
      const url = `${config.siteURL}actorAPI/${config.worldName}-actors.json`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.actors = Object.values(data);
          this.config = config;
          this.loading = false;
        })
        .catch((error) => {
          this.error = `Error: ${error}. Could not access ${url}.`;
        });
    });
  },
  computed: {
    filteredActors(): Array<ActorType> {
      return this.actors
        .filter(this.filterByLevel)
        .filter(this.filterByClass)
        .filter(this.filterByName)
        .filter(this.filterByRace)
        .sort(this.orderByLevel);
    },
  },
  methods: {
    filterByClass(actor: ActorType): boolean {
      // no search, don't filter
      if (!this.filterClass) {
        return true;
      }
      let value = "";
      if (Actor.methods) {
        value = Actor.methods.getClass(actor);
      }
      return value.toLowerCase().includes(this.filterClass.toLowerCase());
    },
    filterByLevel(actor: ActorType): boolean {
      // no search, don't filter
      if (!this.filterLevel) {
        return true;
      }
      return actor?.data?.details?.level == this.filterLevel;
    },
    filterByName(actor: ActorType): boolean {
      // no search, don't filter
      if (!this.filterName) {
        return true;
      }
      let value = "";
      if (Actor.methods) {
        value = Actor.methods.getName(actor);
      }
      return value.toLowerCase().includes(this.filterName.toLowerCase());
    },
    filterByRace(actor: ActorType): boolean {
      // no search, don't filter
      if (!this.filterRace) {
        return true;
      }
      let value = "";
      if (Actor.methods) {
        value = Actor.methods.getRace(actor);
      }
      return value.toLowerCase().includes(this.filterRace.toLowerCase());
    },
    orderByLevel(a: ActorType, b: ActorType) {
      return a.data.details.level - b.data.details.level;
    },
  },
});
</script>