<template>
  <div class="container">
    <h1 class="title">VTT External Actor Viewer</h1>
    <div class="row">
      <form @submit.prevent="getWorlds">
        <fieldset>
          <label for="siteURL">FoundryVTT instance URL:</label>
          <input
            id="siteURL"
            type="url"
            placeholder="https://example.com:3000/"
            v-model.trim="siteURL"
          />
          <input class="button-primary" type="submit" value="Load worlds" />
          <p v-if="!hasWorlds">
            Start by entering the URL of your FoundryVTT instance.
          </p>
        </fieldset>
      </form>
      <form @submit.prevent="getActors" v-if="hasWorlds">
        <fieldset>
          <label for="world">Select world:</label>
          <select id="world" v-model.trim="selectedWorld">
            <option
              v-for="world in worlds"
              :key="world.name"
              :value="world.name"
            >
              {{ world.title }}
            </option>
          </select>
          <input class="button-primary" type="submit" value="Load actors" />
        </fieldset>
      </form>
      <form @submit.prevent v-if="hasWorlds">
        <fieldset>
          <label for="showPC">Show PCs</label>
          <input type="checkbox" id="showPC" v-model="showPC" />
        </fieldset>
      </form>
      <form @submit.prevent v-if="hasWorlds">
        <fieldset>
          <label for="showNPC">Show NPCs</label>
          <input type="checkbox" id="showNPC" v-model="showNPC" />
        </fieldset>
      </form>
    </div>
    <div class="row">
      <div class="column">
        <div v-if="error" class="error">
          <span>{{ error }}</span>
        </div>
        <div v-if="loading" class="loading">
          <div class="lds-dual-ring"></div>
        </div>
      </div>
    </div>
    <List
      v-if="hasActors"
      :actors="actors"
      :siteURL="siteURL"
      :worldName="selectedWorld"
      :showPC="showPC"
      :showNPC="showNPC"
    />
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
          module.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { default as List } from "./List.vue";
import { ActorType } from "./Actor.vue";

export default defineComponent({
  name: "App",
  components: {
    List,
  },
  data() {
    return {
      siteURL: (null as unknown) as string,
      error: (null as unknown) as string,
      selectedWorld: (null as unknown) as string,
      worlds: [] as Array<string>,
      actors: [] as Array<ActorType>,
      showPC: true,
      showNPC: false,
      loading: false,
    };
  },
  created() {
    window.onpopstate = () => {
      this.parseURL(document.location);
    };
    this.parseURL(document.location);
  },
  computed: {
    hasWorlds(): Boolean {
      return this.worlds.length > 0;
    },
    hasActors(): Boolean {
      return this.actors.length > 0;
    },
  },
  methods: {
    parseURL(url: Location) {
      const params = new URLSearchParams(url.search.substring(1));
      let site = params.get("site") || "";
      if (site !== "") {
        try {
          let base = new window.URL(site);
          if (this.siteURL !== base.toString()) {
            this.siteURL = base.toString();
            this.getWorlds();
          }

          let world = params.get("world") || "";
          if (world !== "" && world !== this.selectedWorld) {
            this.selectedWorld = world;
            this.getActors();
          }
        } catch (e) {
          console.error('Invalid "site" value provided. Got:', site);
        }
      }
    },
    updateURL(key: string, value: string) {
      const url = new URL(window.location.toString());
      url.searchParams.set(key, value);
      window.history.pushState({}, "", url.toString());
    },
    getWorlds() {
      if (!this.siteURL) {
        return;
      }
      this.error = "";

      try {
        let base = new window.URL(this.siteURL);
        this.siteURL = base.toString();
      } catch (e) {
        this.error = `Error: invalid URL. ${e}`;
        return;
      }

      this.updateURL("site", this.siteURL);
      this.loading = true;
      const url = `https://cors-anywhere.ardittristan.workers.dev/corsproxy/?apiurl=${this.siteURL}actorAPI/worlds.json`;
      fetch(url)
        .then((response) => response.json())
        .then((worlds) => {
          this.worlds = worlds;
          this.loading = false;
        })
        .catch((error) => {
          this.error = `Error: ${error}. Could not access ${url}.`;
          this.loading = false;
        });
    },
    getActors() {
      if (!this.selectedWorld) {
        return;
      }
      this.error = "";

      this.updateURL("world", this.selectedWorld);
      this.loading = true;
      const url = `https://cors-anywhere.ardittristan.workers.dev/corsproxy/?apiurl=${this.siteURL}actorAPI/${this.selectedWorld}-actors.json`;
      fetch(url)
        .then((response) => response.json())
        .then((actors) => {
          this.actors = Object.values(actors);
          this.loading = false;
        })
        .catch((error) => {
          this.error = `Error: ${error}. Could not access ${url}.`;
          this.loading = false;
        });
    },
  },
});
</script>