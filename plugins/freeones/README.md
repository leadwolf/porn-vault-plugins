## freeones 0.8.1

by boi123212321, john4valor, pizzajohnny

Scrape data from freeones.com. Custom fields can only be named as follows (not case sensitive): Hair Color, Eye Color, Ethnicity, Height, Weight, Birthplace, Zodiac, Measurements, Chest Size, Waist Size, Hip Size, Cup Size, Bra Size, Bust Size

### Arguments

| Name                 | Type     | Required | Description                                                                                                                                                                                                |
| -------------------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dry                  | Boolean  | false    | Whether to commit data changes                                                                                                                                                                             |
| whitelist            | String[] | false    | Array of data fields to pick (possible values: 'nationality', 'zodiac', 'aliases', 'height', 'weight', 'avatar', 'bornOn', 'labels', 'hair color', 'eye color', 'ethnicity', 'birthplace', 'measurements') |
| blacklist            | String[] | false    | Array of data fields to omit (for values see whitelist)                                                                                                                                                    |
| useImperial          | Boolean  | false    | Use imperial units for height and weight                                                                                                                                                                   |
| useAvatarAsThumbnail | Boolean  | false    | Use the discovered Actor Avatar as the Actor Thumbnail image                                                                                                                                               |

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
