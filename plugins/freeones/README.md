## freeones 0.8.0

by boi123212321, john4valor, pizzyjohnny

Scrape data from freeones.xxx. Custom fields can only be named as follows (not case sensitive): Hair Color, Eye Color, Ethnicity, Height, Weight, Birthplace, Zodiac, Measurements, Chest Size, Waist Size, Hip Size, Cup Size, Bra Size, Bust Size

### Arguments

| Name                 | Type          | Required | Description                                                                                                                                                                                                |
| -------------------- | ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dry                  | Boolean       | false    | Whether to commit data changes                                                                                                                                                                             |
| whitelist            | Array&lt;String&gt; | false    | Array of data fields to pick (possible values: &#x27;nationality&#x27;, &#x27;zodiac&#x27;, &#x27;aliases&#x27;, &#x27;height&#x27;, &#x27;weight&#x27;, &#x27;avatar&#x27;, &#x27;bornOn&#x27;, &#x27;labels&#x27;, &#x27;hair color&#x27;, &#x27;eye color&#x27;, &#x27;ethnicity&#x27;, &#x27;birthplace&#x27;, &#x27;measurements&#x27;) |
| blacklist            | Array&lt;String&gt; | false    | Array of data fields to omit (for values see whitelist)                                                                                                                                                    |
| useImperial          | Boolean       | false    | Use imperial units for height and weight                                                                                                                                                                   |
| useAvatarAsThumbnail | Boolean       | false    | Use the discovered Actor Avatar as the Actor Thumbnail image                                                                                                                                               |

### Example installation with default arguments

`config.json`
```json
---
{
  "plugins": {
    "register": {
      "freeones": {
        "path": "./plugins/freeones/main.ts",
        "args": {
          "dry": false,
          "whitelist": [],
          "blacklist": [],
          "useImperial": false,
          "useAvatarAsThumbnail": false
        }
      }
    },
    "events": {
      "actorCreated": [
        "freeones"
      ],
      "actorCustom": [
        "freeones"
      ]
    }
  }
}
---
```

`config.yaml`
```yaml
---
plugins:
  register:
    freeones:
      path: ./plugins/freeones/main.ts
      args:
        dry: false
        whitelist: []
        blacklist: []
        useImperial: false
        useAvatarAsThumbnail: false
  events:
    actorCreated:
      - freeones
    actorCustom:
      - freeones

---
```
