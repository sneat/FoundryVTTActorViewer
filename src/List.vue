<template>
  <div class="row">
    <div class="column">
      <table class="actors">
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
                <input v-model.trim="filterClass" type="search" class="medium"
              /></label>
            </th>
            <th width="12%">
              <label
                >Level
                <input v-model.number="filterLevel" type="number" class="small"
              /></label>
            </th>
          </tr>
        </thead>
        <tbody>
          <Actor
            v-for="actor in filteredActors"
            :actor="actor"
            :key="actor.data.id"
            :siteURL="siteURL"
            :worldName="worldName"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { default as Actor, ActorType } from "./Actor.vue";

export default defineComponent({
  name: "List",
  components: {
    Actor,
  },
  props: {
    actors: {
      type: Array as () => Array<ActorType>,
      required: true,
    },
    showPC: {
      type: Boolean,
      required: true,
    },
    showNPC: {
      type: Boolean,
      required: true,
    },
    siteURL: {
      type: String,
      required: true,
    },
    worldName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      filterClass: (null as unknown) as string,
      filterLevel: (null as unknown) as number,
      filterName: (null as unknown) as string,
      filterRace: (null as unknown) as string,
    };
  },
  computed: {
    filteredActors(): Array<ActorType> {
      return this.actors
        .filter(this.filterType)
        .filter(this.filterByLevel)
        .filter(this.filterByClass)
        .filter(this.filterByName)
        .filter(this.filterByRace)
        .sort(this.orderByLevel);
    },
  },
  methods: {
    filterType(actor: ActorType): boolean {
      if (this.showPC && actor.type === "character") {
        return true;
      }
      if (this.showNPC && actor.type === "npc") {
        return true;
      }
      return false;
    },
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
      if (a.type === "character" && b.type === "character") {
        return (a.data.details.level || 0) - (b.data.details.level || 0);
      }
      if (a.type === "npc" && b.type === "npc") {
        return (a.data.details.cr || 0) - (b.data.details.cr || 0);
      }
      if (a.type === "npc" && b.type === "character") {
        return 1;
      }
      if (a.type === "character" && b.type === "npc") {
        return -1;
      }

      return 0;
    },
  },
});
</script>