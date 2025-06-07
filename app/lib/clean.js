"use strict"

function isIn(elem, array) {
  return array.some((value, index, array) => {
    return elem === value
  });
}

function hasFields(json, fields) {
  if (!json || typeof json !== "object") return false;

  if (Array.isArray(fields)) {
    return fields.every(key => json[key] !== undefined && !/^\s*$/.test(json[key]));
  } else if (typeof fields === "object") {
    return Object.keys(fields).every(key => json[key] === fields[key]);
  } else {
    return json[fields] !== undefined && !/^\s*$/.test(json[fields]);
  }
}

module.exports = {
  // removes texts that don"t have the specified fields
  forFields: function(json, fields) {
    if (((typeof json) === "object") && !Array.isArray(json)) {
      return hasFields(json, fields) ? json : false;
    } else if (Array.isArray(json)) {
      const filtered = json.filter(item => hasFields(item, fields))
      return filtered.length ? filtered : false
    }
    return console.error(new Error("Bad data passed to clean.forFields()"))
  },
  // removes duplicate texts from an array of libgen json objects
  dups: function(array) {
    const seen = new Set()
    return array.filter(item => {
      if (seen.has(item.id)) {
        return false
      }
      seen.add(item.id)
      return true
    })
  }
};
