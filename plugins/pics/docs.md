## Plugin Details

This plugin retrieves pictures for actors, scenes, movies or studios

- You can configure an array of search configurations for every type.
- Each search configuration allows for searching for a single *type* of image.
- For every search configuration, the name of the current item the plugin is being run for will automatically be searched for. You may add extra terms to search for via `searchTerms` and prevent matches with `blacklistTerms`
- - 🚨 `WARNING`: make sure to add a search term for a configuration that searches in a folder that contains different types of images (hero, avatar...). Otherwise it may add an avatar image as a hero image or vice versa
- - The name, searchTerms and blackListTerms are all checked for, via `$matcher`:  the matcher configured by `matching.matcher.type` in your config file (config.json/config.yaml)
- - For a file to be considered a match, the name and all search terms must be found, with none of the blacklisted terms being found.
- - Files are searched for recursively from the given `path`
- -  🚨 `WARNING`: if you have a folder for a category/studio... that contains an image with it's own name and other sub categories/studios..., a "wrong" image may be found. Example: if you have a folder "evil-angel" that contains "blackmailed.png" and "evil-angel.png". When searching for "Evil Angel", the plugin might return "blackmailed.png".  
Make sure to use the `mustMatchInFilename` option for the search configuration. This ensures that only "evil-angel.png" will be returned.
- You may have multiple configurations of the same `'prop'`.
- - Only the **last** image found for a given `'prop'` will be created.
- - If you have multiple `'extra'` configurations, all images found across those configurations will be created.

Example with multiple configurations:

```javascript
---
{
  "plugins": {
    "register": {
      "pics": {
        "path": "./plugins/pics/main.ts",
        "args": {
          "dry": false,
          "actors": [
            {
              "prop": "thumbnail",
              "path": "./path/to/low/resolution/actor/pictures",
              "searchTerms": ["thumbnail"]
            },
            {
              "prop": "thumbnail",
              "path": "./path/to/high/resolution/actor/pictures",
              "searchTerms": ["thumbnail"]
            },
            {
              "prop": "altThumbnail",
              "path": "./path/to/alternate_thumbnail/actor/pictures",
              "searchTerms": ["alternate"]
            },
            {
              "prop": "hero",
              "path": "./path/to/all/hero/pictures",
              "searchTerms": ["wide"]
            },
            {
              "prop": "extra",
              "path": "./path/to/all/extra/pictures",
              "blacklistTerms": ["thumbnail", "hero", "avatar"],
              "max": -1
            }
          ]
        }
      }
    }
  }
}
---
```
