"use strict";

const fs = require("fs-extra");

const ContentArticleState = require('./ContentArticleState');
const ReferenceArticleState = require('./ReferenceArticleState');

const {

  STATE_PATH,
  STATE_LOCK_PATH,

} = require("../constants");

class StateSession {
  constructor() {
    if (fs.existsSync(STATE_LOCK_PATH)) {
      throw new Error(`State is currently in use`);
    }
    fs.writeFileSync(STATE_LOCK_PATH, '1');
    this._data = fs.readJsonSync(STATE_PATH);
  }

  _iter(levels) {
    let data = this._data;
    while (levels.length && data) {
      data = data[levels.shift()];
    }
    return data || null;
  }

  _dig(levels) {
    let data = this._data;
    while (levels.length) {
      let lvl = levels.shift();
      if (!data[lvl]) {
        data[lvl] = {};
      }
      data = data[lvl];
    }
  }

  getState(project, major, minor, category, entry) {
    let state = this._iter([project, major, minor, category, entry]);
    if (!state) return null;

    let objType = state.__objtype;

    switch (objType) {
      case "ContentArticleState":
        return new ContentArticleState(state);

      case "ReferenceArticleState":
        return new ReferenceArticleState(state);

      default:
        throw new Error(`Unknown state object type: ${objType}`);
    }
  }

  setState(project, major, minor, category, entry, state) {
    this._dig([project, major, minor, category, entry]);
    this._data[project][major][minor][category][entry] = state.toObject();
  }

  categoryEntryNames(project, major, minor, category) {
    return new Set(Object.keys(this._iter([project, major, minor, category]) || {}));
  }

  deleteState(project, major, minor, category, entry) {
    let data = this._iter([project, major, minor, category]);
    if (!data) return false;

    return delete data[entry];
  }

  end() {
    fs.writeJsonSync(STATE_PATH, this._data);
    this._data = null;
    fs.unlinkSync(STATE_LOCK_PATH);
  }
}

module.exports = StateSession;
