module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      // Disable `no-console` rule
      "no-console": 0,
      // Give a warning if identifiers contain underscores
      "no-underscore-dangle": 1,
      // Default to single quotes and raise an error if something
      // else is used
      "quotes": [2, "single"],
      "react/jsx-filename-extension": 0,
      "object-shorthand": 0
    }
};