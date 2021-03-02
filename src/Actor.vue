<template>
  <tr>
    <td class="avatar">
      <img
        v-if="hasAvatarURL(actor)"
        :src="getAvatarURL(actor)"
        class="avatar"
      />
    </td>
    <td>
      <a :href="getActorSheetURL(actor)" target="_blank">
        {{ getName(actor) }}
      </a>
    </td>
    <td>{{ getRace(actor) }}</td>
    <td>{{ getClass(actor) }}</td>
    <td>{{ getLevel(actor) }}</td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface ActorType {
  _id: string;
  name: string;
  img: string;
  type: string;
  data: ActorData;
  [propName: string]: any;
}

interface ActorData {
  details: ActorDetails;
  [propName: string]: any;
}

interface ActorDetails {
  race: string;
  type?: string;
  alignment?: string;
  level?: number;
  cr?: number;
  [propName: string]: any;
}

export interface Item {
  type: string;
  data: ItemData;
  [propName: string]: any;
}

interface ItemData {
  levels?: number;
  [propName: string]: any;
}

export default defineComponent({
  name: "Actor",
  props: {
    actor: {
      type: Object as PropType<ActorType>,
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
  methods: {
    hasAvatarURL(actor: ActorType): boolean {
      return !!actor?.img;
    },
    getAvatarURL(actor: ActorType): string {
      let url = actor.img;
      try {
        new URL(actor.img);
      } catch (e) {
        url = `${this.siteURL}${actor.img}`;
      }
      return url;
    },
    getActorSheetURL(actor: ActorType): string {
      return `https://ardittristan.github.io/VTTExternalActorSite/?${this.siteURL}actorAPI/${this.worldName}-actors.json${actor._id}`;
    },
    getName(actor: ActorType): string {
      return actor?.name || "Unknown";
    },
    getRace(actor: ActorType): string {
      if (actor.type === "npc") {
        return actor?.data?.details?.type || "Unknown";
      }
      return actor?.data?.details?.race || "Unknown";
    },
    getLevel(actor: ActorType): number | string {
      if (actor.type === "npc") {
        return actor?.data?.details?.cr || "Unknown";
      }
      return actor?.data?.details?.level || "Unknown";
    },
    getClass(actor: ActorType) {
      if (actor.type === "npc") {
        return actor?.data?.details?.alignment || "-";
      }
      let names = [] as Array<string>;
      let classes = actor.items.filter((item: Item) => item.type === "class");
      classes.forEach((c: Item) => {
        if (c?.data?.levels === actor?.data?.details?.level) {
          names.push(c.name);
        } else {
          names.push(`${c.name} (${c?.data?.levels})`);
        }
      });
      return names.length ? names.join(" / ") : "Unknown";
    },
  },
});
</script>