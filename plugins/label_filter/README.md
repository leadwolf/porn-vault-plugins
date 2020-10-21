## label_filter 0.0.1

by boi123212321

Filter labels returned by other plugins

### Arguments

| Name      | Type          | Required | Description       |
| --------- | ------------- | -------- | ----------------- |
| whitelist | Array&lt;String&gt; | false    | Labels to include |
| blacklist | Array&lt;String&gt; | false    | Labels to exclude |

### Example installation with default arguments

`config.json`
```json
---
{
  "plugins": {
    "register": {
      "label_filter": {
        "path": "./plugins/label_filter/main.ts",
        "args": {
          "whitelist": [],
          "blacklist": []
        }
      }
    },
    "events": {
      "actorCreated": [
        "label_filter"
      ],
      "actorCustom": [
        "label_filter"
      ],
      "sceneCreated": [
        "label_filter"
      ],
      "sceneCustom": [
        "label_filter"
      ],
      "studioCreated": [
        "label_filter"
      ],
      "studioCustom": [
        "label_filter"
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
    label_filter:
      path: ./plugins/label_filter/main.ts
      args:
        whitelist: []
        blacklist: []
  events:
    actorCreated:
      - label_filter
    actorCustom:
      - label_filter
    sceneCreated:
      - label_filter
    sceneCustom:
      - label_filter
    studioCreated:
      - label_filter
    studioCustom:
      - label_filter

---
```
