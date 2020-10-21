/*
config.json
---
{
  "plugins": {
    "register": {
      "dimension_labeler": {
        "path": "./plugins/dimension_labeler.js",
        "args": {
          "dry": false,
          "disableFilenameExtraction": false
        }
      }
    },
    "events": {
      "sceneCreated": [
        "dimension_labeler"
      ],
      "sceneCustom": [
        "dimension_labeler"
      ]
    }
  }
}
---
config.yaml

---
plugins:
  register:
    dimension_labeler:
      path: ./plugins/dimension_labeler.js
      args:
        dry: false
        disableFilenameExtraction: false
  events:
    sceneCreated:
      - dimension_labeler
    sceneCustom:
      - dimension_labeler

--- 
*/

const DIMENSION_MAPPING = [
  {
    height: 2160,
    label: "4k",
  },
  {
    height: 1080,
    label: "1080p",
  },
  {
    height: 720,
    label: "720p",
  },
  {
    height: 0,
    label: "SD",
  },
];

const REGEX_MAPPING = [
  {
    regex: /\b2160p\b/,
    label: "2160p",
  },
  {
    regex: /\b1080p\b/,
    label: "1080p",
  },
  {
    regex: /\b720p\b/,
    label: "720p",
  },
];

module.exports = ({ scene, scenePath, event, $throw, $log, data, $path, args }) => {
  if (event !== "sceneCreated" && event !== "sceneCustom") {
    $throw("[DIM] ERR: Uh oh. You shouldn't this plugin for this kind of event");
  }

  if (!scene) {
    $throw("[DIM] ERR: Did not receive scene object, cannot run plugin");
  }

  // Set 'dry' by default, just in case
  if (!args) {
    args = {
      dry: true,
    };
  } else if (args && typeof args === "object" && !Object.hasOwnProperty.call(args, "dry")) {
    args.dry = true;
  }

  const returnLabels = (...ourLabels) => {
    if (args && args.dry) {
      $log(`[DIM] MSG: is 'dry' mode, would've returned ${{ labels: [...ourLabels] }}`);
      return {};
    }

    if (data && data.labels && data.labels.length) {
      return {
        labels: [...data.labels, ...ourLabels],
      };
    } else {
      return {
        labels: [...ourLabels],
      };
    }
  };

  if (scene && scene.meta && scene.meta.dimensions) {
    const height = scene.meta.dimensions.height;

    $log(`[DIM] MSG: extracting dimensions, found height: ${height}`);
    const dimMapping = DIMENSION_MAPPING.find((singleMapping) => height >= singleMapping.height);

    if (dimMapping) {
      $log(`[DIM] MSG: found dimension mapping: ${dimMapping.height}, label: ${dimMapping.label}`);
      return returnLabels(dimMapping.label);
    }
  }

  if (args && args.disableFilenameExtraction) {
    $log(`[DIM] MSG: filename extraction is disabled, returning nothing`);
    return {};
  }

  $log(`[DIM] MSG: Did not find dimensions mapping, falling back to filename`);

  if (!scenePath) {
    $throw(`[DIM] MSG: Did not receive scene path, cannot extract dimension label`);
  }

  const baseName = $path.basename(scenePath);
  const regexMapping = REGEX_MAPPING.find((singleMapping) => singleMapping.regex.test(baseName));

  if (regexMapping) {
    $log(`[DIM] MSG: found regex mapping: ${regexMapping.height}, label: ${regexMapping.label}`);
    return returnLabels(regexMapping.label);
  }

  $log(`[DIM] MSG: Did not find any dimension`);

  return {};
};
