"use strict";

exports.__esModule = true;
exports.default = _default;

/**
 * Flattens a Contentful data response, extracting the fields from child
 * objects and setting them to the parent name.
 *
 * @param {Object} data
 * @return {Object}
 */
function _default(data) {
  /**
   * Check to see if the object passed is an object that contains only a `sys`
   * property and no feields. If so, either the model is empty, draft, or unpublished.
   *
   * @param  {Object} object
   * @return {boolean}
   */
  function emptyModel(object) {
    return typeof object === 'object' && object.sys && Object.keys(object).length === 1;
  }
  /**
   * Handle parsing non-field value objects, cleaning empty value objects that
   * contain no fields or filtering object arrays that contain empty objects with
   * just sys defined. Or, simply returning the value, unmanipulated.
   *
   * @param  {Object} object
   * @return {?any}
   */


  function parseValue(value) {
    if (!value) {
      return null;
    }

    if (emptyModel(value)) {
      return null;
    }

    if (Array.isArray(value)) {
      return value.filter(function (item) {
        return !emptyModel(item);
      }).map(function (item) {
        return item && typeof item === 'object' && item.fields ? parseFields(item.fields, item.sys) : parseValue(item);
      });
    }

    return value;
  }
  /**
   * Parse over a fields object, parsing child fields or building rest of object.
   *
   * @param  {Object} fieldsObject - fields object to iterate over and flatten into objectRef
   * @param  {Object} objectRef - Compiled object that flattens the field objects
   * @return {Object}
   */


  function parseFields(fieldsObject, sys, objectRef) {
    if (objectRef === void 0) {
      objectRef = {};
    }

    if (!fieldsObject || typeof fieldsObject !== 'object') {
      return objectRef;
    }

    Object.keys(fieldsObject).forEach(function (key) {
      objectRef[key] = fieldsObject[key].fields ? parseFields(fieldsObject[key].fields, objectRef[key]) : parseValue(fieldsObject[key]);
    }); // Apply typeNameKey/value to each fields object to define the Contentful model type

    if (sys && sys.contentType && sys.contentType.sys && sys.contentType.sys.id) {
      /* eslint-disable */
      objectRef['id'] = sys.id;
      objectRef['__typename'] = sys.contentType.sys.id;
      /* eslint-enable */
    }

    return objectRef;
  }

  return parseFields(data.fields, data.sys);
}