import { slugify } from "./slugify"

export interface Config {
    /**
     * Full domain address (including trailing slash) of where your FoundryVTT instance is running.
     * Must be a HTTPS domain due to CORS requirements for [VTT External Actor Viewer](https://foundryvtt.com/packages/externalactor/).
     */
    siteURL: string;
    /**
     * The name of the world that contains all of your actors and also has the [VTT External Actor Viewer](https://foundryvtt.com/packages/externalactor/) module installed and enabled.
     * This must be the "Data Path" format of the world (slugified version), for example "shared-characters" rather than "Shared Characters".
     */
    worldName: string;
}

export default async function(): Promise<Config> {
    return fetch('config.json')
        .then((response) => response.json())
        .then((config) => {
            if (Object.keys(config).length === 0) {
                throw new Error('"config.json" is empty. Check "config.json.example" for an example.')
            }

            // Ensure trailing slash
            if (config.siteURL.slice(-1) !== "/") {
                console.warn('config.json', `Expected "siteURL" to end in a slash ("/"). Got ${config.siteURL}`);
                config.siteURL += '/';
            }

            // Check world name
            let slugWorld = slugify(config.worldName)
            if (slugWorld !== config.worldName) {
                console.warn('config.json', `Expected "worldName" to be the slug format like "${slugWorld}" but got "${config.worldName}".`)
            }

            return config;
        });
}