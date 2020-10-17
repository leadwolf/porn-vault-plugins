## tpdb 0.1.0

by leadwolf

Scrape data from tpdb

### Arguments

| Name                     | Type    | Required | Description                                                           |
| ------------------------ | ------- | -------- | --------------------------------------------------------------------- |
| dry                      | Boolean | false    | Whether to commit data changes                                        |
| studios.cacheStudiosPath | String  | true     | Where to store the downloaded studios                                 |
| studios.cacheDays        | Number  | true     | How long to reuse downloaded studios before refreshing the whole list |

### Example installation with default arguments

`config.json`
```json
---
{
  "plugins": {
    "register": {
      "tpdb": {
        "path": "./plugins/tpdb/main.js",
        "args": {
          "dry": false,
          "studios": {
            "cacheStudiosPath": "./plugins/tpdb/cached_sites.json",
            "cacheDays": 7
          }
        }
      }
    },
    "events": {
      "studioCreated": [
        "tpdb"
      ],
      "studioCustom": [
        "tpdb"
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
    tpdb:
      path: ./plugins/tpdb/main.js
      args:
        dry: false
        studios:
          cacheStudiosPath: ./plugins/tpdb/cached_sites.json
          cacheDays: 7
  events:
    studioCreated:
      - tpdb
    studioCustom:
      - tpdb

---
```
