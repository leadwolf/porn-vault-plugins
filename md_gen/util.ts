const ARRAY_PROP_REGEX = /^\[(\d+)\]$/;

const normalizeName = (name: string): string | number => {
  const isArrProp = ARRAY_PROP_REGEX.test(name);
  if (!isArrProp) {
    return name;
  }
  const arrIndex = isArrProp ? parseInt(ARRAY_PROP_REGEX.exec(name)?.[1] || "NaN", 10) : Number.NaN;
  if (isArrProp && Number.isNaN(arrIndex)) {
    throw new Error(`Expect array prop for "${name}" but got Nan"`);
  }
  return arrIndex;
};

/**
 * Sets a value for a path in an object
 *
 * @param object the object to set in
 * @param path the path to the value to set
 * @param value the value to set
 */
export function setIn(object: Record<string, any>, path: string, value: any) {
  if (!object || (typeof object !== "object" && !Array.isArray(object))) {
    throw new Error(`${JSON.stringify(object)} is not an object or array`);
  }

  const stack = path.split(".");
  let name = stack.shift();
  let currentName = normalizeName(name || "");
  let currentObject = object;

  // Go up to the before last path
  while (name && stack.length) {
    // Set an empty object if no value exists
    if (!Object.hasOwnProperty.call(currentObject, currentName)) {
      const nextIsArr = typeof normalizeName(stack[0]) === "number";
      currentObject[currentName] = typeof currentName === "number" || nextIsArr ? [] : {};
    } else if (typeof currentObject[currentName] !== "object" || !currentObject[currentName]) {
      throw new Error(
        `${JSON.stringify(
          currentObject
        )} already has non object property "${name}": ${JSON.stringify(
          currentObject[currentName]
        )}. Cannot set nested value for ${JSON.stringify(path)}`
      );
    }

    // Save the current value
    currentObject = currentObject[currentName];

    name = stack.shift();
    currentName = name ? normalizeName(name || "") : "";
  }

  // For the final name in the path, set the value
  if (currentName === 0 || currentName) {
    currentObject[currentName] = value;
  }
}
