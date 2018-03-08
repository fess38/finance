/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * EntityType enum.
 * @exports EntityType
 * @enum {string}
 * @property {number} UNDEFINED=0 UNDEFINED value
 * @property {number} DUMP=1 DUMP value
 * @property {number} CURRENCY=2 CURRENCY value
 * @property {number} ACCOUNT=3 ACCOUNT value
 */
$root.EntityType = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNDEFINED"] = 0;
    values[valuesById[1] = "DUMP"] = 1;
    values[valuesById[2] = "CURRENCY"] = 2;
    values[valuesById[3] = "ACCOUNT"] = 3;
    return values;
})();

$root.Dump = (function() {

    /**
     * Properties of a Dump.
     * @exports IDump
     * @interface IDump
     * @property {number|Long|null} [id] Dump id
     * @property {Array.<IAccount>|null} [accounts] Dump accounts
     * @property {Array.<ICurrency>|null} [currencies] Dump currencies
     */

    /**
     * Constructs a new Dump.
     * @exports Dump
     * @classdesc Represents a Dump.
     * @implements IDump
     * @constructor
     * @param {IDump=} [properties] Properties to set
     */
    function Dump(properties) {
        this.accounts = [];
        this.currencies = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Dump id.
     * @member {number|Long} id
     * @memberof Dump
     * @instance
     */
    Dump.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Dump accounts.
     * @member {Array.<IAccount>} accounts
     * @memberof Dump
     * @instance
     */
    Dump.prototype.accounts = $util.emptyArray;

    /**
     * Dump currencies.
     * @member {Array.<ICurrency>} currencies
     * @memberof Dump
     * @instance
     */
    Dump.prototype.currencies = $util.emptyArray;

    /**
     * Creates a new Dump instance using the specified properties.
     * @function create
     * @memberof Dump
     * @static
     * @param {IDump=} [properties] Properties to set
     * @returns {Dump} Dump instance
     */
    Dump.create = function create(properties) {
        return new Dump(properties);
    };

    /**
     * Encodes the specified Dump message. Does not implicitly {@link Dump.verify|verify} messages.
     * @function encode
     * @memberof Dump
     * @static
     * @param {IDump} message Dump message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Dump.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
        if (message.accounts != null && message.accounts.length)
            for (var i = 0; i < message.accounts.length; ++i)
                $root.Account.encode(message.accounts[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.currencies != null && message.currencies.length)
            for (var i = 0; i < message.currencies.length; ++i)
                $root.Currency.encode(message.currencies[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Dump message, length delimited. Does not implicitly {@link Dump.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Dump
     * @static
     * @param {IDump} message Dump message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Dump.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Dump message from the specified reader or buffer.
     * @function decode
     * @memberof Dump
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Dump} Dump
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Dump.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Dump();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.int64();
                break;
            case 2:
                if (!(message.accounts && message.accounts.length))
                    message.accounts = [];
                message.accounts.push($root.Account.decode(reader, reader.uint32()));
                break;
            case 3:
                if (!(message.currencies && message.currencies.length))
                    message.currencies = [];
                message.currencies.push($root.Currency.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Dump message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Dump
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Dump} Dump
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Dump.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Dump message.
     * @function verify
     * @memberof Dump
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Dump.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                return "id: integer|Long expected";
        if (message.accounts != null && message.hasOwnProperty("accounts")) {
            if (!Array.isArray(message.accounts))
                return "accounts: array expected";
            for (var i = 0; i < message.accounts.length; ++i) {
                var error = $root.Account.verify(message.accounts[i]);
                if (error)
                    return "accounts." + error;
            }
        }
        if (message.currencies != null && message.hasOwnProperty("currencies")) {
            if (!Array.isArray(message.currencies))
                return "currencies: array expected";
            for (var i = 0; i < message.currencies.length; ++i) {
                var error = $root.Currency.verify(message.currencies[i]);
                if (error)
                    return "currencies." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Dump message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Dump
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Dump} Dump
     */
    Dump.fromObject = function fromObject(object) {
        if (object instanceof $root.Dump)
            return object;
        var message = new $root.Dump();
        if (object.id != null)
            if ($util.Long)
                (message.id = $util.Long.fromValue(object.id)).unsigned = false;
            else if (typeof object.id === "string")
                message.id = parseInt(object.id, 10);
            else if (typeof object.id === "number")
                message.id = object.id;
            else if (typeof object.id === "object")
                message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
        if (object.accounts) {
            if (!Array.isArray(object.accounts))
                throw TypeError(".Dump.accounts: array expected");
            message.accounts = [];
            for (var i = 0; i < object.accounts.length; ++i) {
                if (typeof object.accounts[i] !== "object")
                    throw TypeError(".Dump.accounts: object expected");
                message.accounts[i] = $root.Account.fromObject(object.accounts[i]);
            }
        }
        if (object.currencies) {
            if (!Array.isArray(object.currencies))
                throw TypeError(".Dump.currencies: array expected");
            message.currencies = [];
            for (var i = 0; i < object.currencies.length; ++i) {
                if (typeof object.currencies[i] !== "object")
                    throw TypeError(".Dump.currencies: object expected");
                message.currencies[i] = $root.Currency.fromObject(object.currencies[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a Dump message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Dump
     * @static
     * @param {Dump} message Dump
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Dump.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.accounts = [];
            object.currencies = [];
        }
        if (options.defaults)
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.id = options.longs === String ? "0" : 0;
        if (message.id != null && message.hasOwnProperty("id"))
            if (typeof message.id === "number")
                object.id = options.longs === String ? String(message.id) : message.id;
            else
                object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
        if (message.accounts && message.accounts.length) {
            object.accounts = [];
            for (var j = 0; j < message.accounts.length; ++j)
                object.accounts[j] = $root.Account.toObject(message.accounts[j], options);
        }
        if (message.currencies && message.currencies.length) {
            object.currencies = [];
            for (var j = 0; j < message.currencies.length; ++j)
                object.currencies[j] = $root.Currency.toObject(message.currencies[j], options);
        }
        return object;
    };

    /**
     * Converts this Dump to JSON.
     * @function toJSON
     * @memberof Dump
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Dump.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Dump;
})();

$root.Currency = (function() {

    /**
     * Properties of a Currency.
     * @exports ICurrency
     * @interface ICurrency
     * @property {number|Long} id Currency id
     * @property {string} nameRu Currency nameRu
     * @property {string} nameEn Currency nameEn
     * @property {string} symbol Currency symbol
     * @property {string} code Currency code
     */

    /**
     * Constructs a new Currency.
     * @exports Currency
     * @classdesc Represents a Currency.
     * @implements ICurrency
     * @constructor
     * @param {ICurrency=} [properties] Properties to set
     */
    function Currency(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Currency id.
     * @member {number|Long} id
     * @memberof Currency
     * @instance
     */
    Currency.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Currency nameRu.
     * @member {string} nameRu
     * @memberof Currency
     * @instance
     */
    Currency.prototype.nameRu = "";

    /**
     * Currency nameEn.
     * @member {string} nameEn
     * @memberof Currency
     * @instance
     */
    Currency.prototype.nameEn = "";

    /**
     * Currency symbol.
     * @member {string} symbol
     * @memberof Currency
     * @instance
     */
    Currency.prototype.symbol = "";

    /**
     * Currency code.
     * @member {string} code
     * @memberof Currency
     * @instance
     */
    Currency.prototype.code = "";

    /**
     * Creates a new Currency instance using the specified properties.
     * @function create
     * @memberof Currency
     * @static
     * @param {ICurrency=} [properties] Properties to set
     * @returns {Currency} Currency instance
     */
    Currency.create = function create(properties) {
        return new Currency(properties);
    };

    /**
     * Encodes the specified Currency message. Does not implicitly {@link Currency.verify|verify} messages.
     * @function encode
     * @memberof Currency
     * @static
     * @param {ICurrency} message Currency message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Currency.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.nameRu);
        writer.uint32(/* id 3, wireType 2 =*/26).string(message.nameEn);
        writer.uint32(/* id 4, wireType 2 =*/34).string(message.symbol);
        writer.uint32(/* id 5, wireType 2 =*/42).string(message.code);
        return writer;
    };

    /**
     * Encodes the specified Currency message, length delimited. Does not implicitly {@link Currency.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Currency
     * @static
     * @param {ICurrency} message Currency message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Currency.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Currency message from the specified reader or buffer.
     * @function decode
     * @memberof Currency
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Currency} Currency
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Currency.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Currency();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.int64();
                break;
            case 2:
                message.nameRu = reader.string();
                break;
            case 3:
                message.nameEn = reader.string();
                break;
            case 4:
                message.symbol = reader.string();
                break;
            case 5:
                message.code = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("id"))
            throw $util.ProtocolError("missing required 'id'", { instance: message });
        if (!message.hasOwnProperty("nameRu"))
            throw $util.ProtocolError("missing required 'nameRu'", { instance: message });
        if (!message.hasOwnProperty("nameEn"))
            throw $util.ProtocolError("missing required 'nameEn'", { instance: message });
        if (!message.hasOwnProperty("symbol"))
            throw $util.ProtocolError("missing required 'symbol'", { instance: message });
        if (!message.hasOwnProperty("code"))
            throw $util.ProtocolError("missing required 'code'", { instance: message });
        return message;
    };

    /**
     * Decodes a Currency message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Currency
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Currency} Currency
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Currency.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Currency message.
     * @function verify
     * @memberof Currency
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Currency.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
            return "id: integer|Long expected";
        if (!$util.isString(message.nameRu))
            return "nameRu: string expected";
        if (!$util.isString(message.nameEn))
            return "nameEn: string expected";
        if (!$util.isString(message.symbol))
            return "symbol: string expected";
        if (!$util.isString(message.code))
            return "code: string expected";
        return null;
    };

    /**
     * Creates a Currency message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Currency
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Currency} Currency
     */
    Currency.fromObject = function fromObject(object) {
        if (object instanceof $root.Currency)
            return object;
        var message = new $root.Currency();
        if (object.id != null)
            if ($util.Long)
                (message.id = $util.Long.fromValue(object.id)).unsigned = false;
            else if (typeof object.id === "string")
                message.id = parseInt(object.id, 10);
            else if (typeof object.id === "number")
                message.id = object.id;
            else if (typeof object.id === "object")
                message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
        if (object.nameRu != null)
            message.nameRu = String(object.nameRu);
        if (object.nameEn != null)
            message.nameEn = String(object.nameEn);
        if (object.symbol != null)
            message.symbol = String(object.symbol);
        if (object.code != null)
            message.code = String(object.code);
        return message;
    };

    /**
     * Creates a plain object from a Currency message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Currency
     * @static
     * @param {Currency} message Currency
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Currency.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.id = options.longs === String ? "0" : 0;
            object.nameRu = "";
            object.nameEn = "";
            object.symbol = "";
            object.code = "";
        }
        if (message.id != null && message.hasOwnProperty("id"))
            if (typeof message.id === "number")
                object.id = options.longs === String ? String(message.id) : message.id;
            else
                object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
        if (message.nameRu != null && message.hasOwnProperty("nameRu"))
            object.nameRu = message.nameRu;
        if (message.nameEn != null && message.hasOwnProperty("nameEn"))
            object.nameEn = message.nameEn;
        if (message.symbol != null && message.hasOwnProperty("symbol"))
            object.symbol = message.symbol;
        if (message.code != null && message.hasOwnProperty("code"))
            object.code = message.code;
        return object;
    };

    /**
     * Converts this Currency to JSON.
     * @function toJSON
     * @memberof Currency
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Currency.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Currency;
})();

$root.Currencies = (function() {

    /**
     * Properties of a Currencies.
     * @exports ICurrencies
     * @interface ICurrencies
     * @property {Array.<ICurrency>|null} [items] Currencies items
     */

    /**
     * Constructs a new Currencies.
     * @exports Currencies
     * @classdesc Represents a Currencies.
     * @implements ICurrencies
     * @constructor
     * @param {ICurrencies=} [properties] Properties to set
     */
    function Currencies(properties) {
        this.items = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Currencies items.
     * @member {Array.<ICurrency>} items
     * @memberof Currencies
     * @instance
     */
    Currencies.prototype.items = $util.emptyArray;

    /**
     * Creates a new Currencies instance using the specified properties.
     * @function create
     * @memberof Currencies
     * @static
     * @param {ICurrencies=} [properties] Properties to set
     * @returns {Currencies} Currencies instance
     */
    Currencies.create = function create(properties) {
        return new Currencies(properties);
    };

    /**
     * Encodes the specified Currencies message. Does not implicitly {@link Currencies.verify|verify} messages.
     * @function encode
     * @memberof Currencies
     * @static
     * @param {ICurrencies} message Currencies message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Currencies.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.items != null && message.items.length)
            for (var i = 0; i < message.items.length; ++i)
                $root.Currency.encode(message.items[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Currencies message, length delimited. Does not implicitly {@link Currencies.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Currencies
     * @static
     * @param {ICurrencies} message Currencies message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Currencies.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Currencies message from the specified reader or buffer.
     * @function decode
     * @memberof Currencies
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Currencies} Currencies
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Currencies.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Currencies();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.items && message.items.length))
                    message.items = [];
                message.items.push($root.Currency.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Currencies message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Currencies
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Currencies} Currencies
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Currencies.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Currencies message.
     * @function verify
     * @memberof Currencies
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Currencies.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.items != null && message.hasOwnProperty("items")) {
            if (!Array.isArray(message.items))
                return "items: array expected";
            for (var i = 0; i < message.items.length; ++i) {
                var error = $root.Currency.verify(message.items[i]);
                if (error)
                    return "items." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Currencies message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Currencies
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Currencies} Currencies
     */
    Currencies.fromObject = function fromObject(object) {
        if (object instanceof $root.Currencies)
            return object;
        var message = new $root.Currencies();
        if (object.items) {
            if (!Array.isArray(object.items))
                throw TypeError(".Currencies.items: array expected");
            message.items = [];
            for (var i = 0; i < object.items.length; ++i) {
                if (typeof object.items[i] !== "object")
                    throw TypeError(".Currencies.items: object expected");
                message.items[i] = $root.Currency.fromObject(object.items[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a Currencies message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Currencies
     * @static
     * @param {Currencies} message Currencies
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Currencies.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.items = [];
        if (message.items && message.items.length) {
            object.items = [];
            for (var j = 0; j < message.items.length; ++j)
                object.items[j] = $root.Currency.toObject(message.items[j], options);
        }
        return object;
    };

    /**
     * Converts this Currencies to JSON.
     * @function toJSON
     * @memberof Currencies
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Currencies.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Currencies;
})();

$root.Account = (function() {

    /**
     * Properties of an Account.
     * @exports IAccount
     * @interface IAccount
     * @property {number|Long|null} [id] Account id
     * @property {string} name Account name
     * @property {number|Long|null} [balance] Account balance
     * @property {number|Long} currencyId Account currencyId
     * @property {number|Long|null} [transactionAmount] Account transactionAmount
     */

    /**
     * Constructs a new Account.
     * @exports Account
     * @classdesc Represents an Account.
     * @implements IAccount
     * @constructor
     * @param {IAccount=} [properties] Properties to set
     */
    function Account(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Account id.
     * @member {number|Long} id
     * @memberof Account
     * @instance
     */
    Account.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Account name.
     * @member {string} name
     * @memberof Account
     * @instance
     */
    Account.prototype.name = "";

    /**
     * Account balance.
     * @member {number|Long} balance
     * @memberof Account
     * @instance
     */
    Account.prototype.balance = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Account currencyId.
     * @member {number|Long} currencyId
     * @memberof Account
     * @instance
     */
    Account.prototype.currencyId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Account transactionAmount.
     * @member {number|Long} transactionAmount
     * @memberof Account
     * @instance
     */
    Account.prototype.transactionAmount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new Account instance using the specified properties.
     * @function create
     * @memberof Account
     * @static
     * @param {IAccount=} [properties] Properties to set
     * @returns {Account} Account instance
     */
    Account.create = function create(properties) {
        return new Account(properties);
    };

    /**
     * Encodes the specified Account message. Does not implicitly {@link Account.verify|verify} messages.
     * @function encode
     * @memberof Account
     * @static
     * @param {IAccount} message Account message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Account.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
        if (message.balance != null && message.hasOwnProperty("balance"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.balance);
        writer.uint32(/* id 4, wireType 0 =*/32).int64(message.currencyId);
        if (message.transactionAmount != null && message.hasOwnProperty("transactionAmount"))
            writer.uint32(/* id 5, wireType 0 =*/40).int64(message.transactionAmount);
        return writer;
    };

    /**
     * Encodes the specified Account message, length delimited. Does not implicitly {@link Account.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Account
     * @static
     * @param {IAccount} message Account message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Account.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Account message from the specified reader or buffer.
     * @function decode
     * @memberof Account
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Account} Account
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Account.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Account();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.int64();
                break;
            case 2:
                message.name = reader.string();
                break;
            case 3:
                message.balance = reader.int64();
                break;
            case 4:
                message.currencyId = reader.int64();
                break;
            case 5:
                message.transactionAmount = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("name"))
            throw $util.ProtocolError("missing required 'name'", { instance: message });
        if (!message.hasOwnProperty("currencyId"))
            throw $util.ProtocolError("missing required 'currencyId'", { instance: message });
        return message;
    };

    /**
     * Decodes an Account message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Account
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Account} Account
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Account.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Account message.
     * @function verify
     * @memberof Account
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Account.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                return "id: integer|Long expected";
        if (!$util.isString(message.name))
            return "name: string expected";
        if (message.balance != null && message.hasOwnProperty("balance"))
            if (!$util.isInteger(message.balance) && !(message.balance && $util.isInteger(message.balance.low) && $util.isInteger(message.balance.high)))
                return "balance: integer|Long expected";
        if (!$util.isInteger(message.currencyId) && !(message.currencyId && $util.isInteger(message.currencyId.low) && $util.isInteger(message.currencyId.high)))
            return "currencyId: integer|Long expected";
        if (message.transactionAmount != null && message.hasOwnProperty("transactionAmount"))
            if (!$util.isInteger(message.transactionAmount) && !(message.transactionAmount && $util.isInteger(message.transactionAmount.low) && $util.isInteger(message.transactionAmount.high)))
                return "transactionAmount: integer|Long expected";
        return null;
    };

    /**
     * Creates an Account message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Account
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Account} Account
     */
    Account.fromObject = function fromObject(object) {
        if (object instanceof $root.Account)
            return object;
        var message = new $root.Account();
        if (object.id != null)
            if ($util.Long)
                (message.id = $util.Long.fromValue(object.id)).unsigned = false;
            else if (typeof object.id === "string")
                message.id = parseInt(object.id, 10);
            else if (typeof object.id === "number")
                message.id = object.id;
            else if (typeof object.id === "object")
                message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
        if (object.name != null)
            message.name = String(object.name);
        if (object.balance != null)
            if ($util.Long)
                (message.balance = $util.Long.fromValue(object.balance)).unsigned = false;
            else if (typeof object.balance === "string")
                message.balance = parseInt(object.balance, 10);
            else if (typeof object.balance === "number")
                message.balance = object.balance;
            else if (typeof object.balance === "object")
                message.balance = new $util.LongBits(object.balance.low >>> 0, object.balance.high >>> 0).toNumber();
        if (object.currencyId != null)
            if ($util.Long)
                (message.currencyId = $util.Long.fromValue(object.currencyId)).unsigned = false;
            else if (typeof object.currencyId === "string")
                message.currencyId = parseInt(object.currencyId, 10);
            else if (typeof object.currencyId === "number")
                message.currencyId = object.currencyId;
            else if (typeof object.currencyId === "object")
                message.currencyId = new $util.LongBits(object.currencyId.low >>> 0, object.currencyId.high >>> 0).toNumber();
        if (object.transactionAmount != null)
            if ($util.Long)
                (message.transactionAmount = $util.Long.fromValue(object.transactionAmount)).unsigned = false;
            else if (typeof object.transactionAmount === "string")
                message.transactionAmount = parseInt(object.transactionAmount, 10);
            else if (typeof object.transactionAmount === "number")
                message.transactionAmount = object.transactionAmount;
            else if (typeof object.transactionAmount === "object")
                message.transactionAmount = new $util.LongBits(object.transactionAmount.low >>> 0, object.transactionAmount.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from an Account message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Account
     * @static
     * @param {Account} message Account
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Account.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.id = options.longs === String ? "0" : 0;
            object.name = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.balance = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.balance = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.currencyId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.currencyId = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.transactionAmount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.transactionAmount = options.longs === String ? "0" : 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            if (typeof message.id === "number")
                object.id = options.longs === String ? String(message.id) : message.id;
            else
                object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.balance != null && message.hasOwnProperty("balance"))
            if (typeof message.balance === "number")
                object.balance = options.longs === String ? String(message.balance) : message.balance;
            else
                object.balance = options.longs === String ? $util.Long.prototype.toString.call(message.balance) : options.longs === Number ? new $util.LongBits(message.balance.low >>> 0, message.balance.high >>> 0).toNumber() : message.balance;
        if (message.currencyId != null && message.hasOwnProperty("currencyId"))
            if (typeof message.currencyId === "number")
                object.currencyId = options.longs === String ? String(message.currencyId) : message.currencyId;
            else
                object.currencyId = options.longs === String ? $util.Long.prototype.toString.call(message.currencyId) : options.longs === Number ? new $util.LongBits(message.currencyId.low >>> 0, message.currencyId.high >>> 0).toNumber() : message.currencyId;
        if (message.transactionAmount != null && message.hasOwnProperty("transactionAmount"))
            if (typeof message.transactionAmount === "number")
                object.transactionAmount = options.longs === String ? String(message.transactionAmount) : message.transactionAmount;
            else
                object.transactionAmount = options.longs === String ? $util.Long.prototype.toString.call(message.transactionAmount) : options.longs === Number ? new $util.LongBits(message.transactionAmount.low >>> 0, message.transactionAmount.high >>> 0).toNumber() : message.transactionAmount;
        return object;
    };

    /**
     * Converts this Account to JSON.
     * @function toJSON
     * @memberof Account
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Account.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Account;
})();

$root.AccessToken = (function() {

    /**
     * Properties of an AccessToken.
     * @exports IAccessToken
     * @interface IAccessToken
     * @property {string|null} [value] AccessToken value
     * @property {number|Long|null} [expired] AccessToken expired
     */

    /**
     * Constructs a new AccessToken.
     * @exports AccessToken
     * @classdesc Represents an AccessToken.
     * @implements IAccessToken
     * @constructor
     * @param {IAccessToken=} [properties] Properties to set
     */
    function AccessToken(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AccessToken value.
     * @member {string} value
     * @memberof AccessToken
     * @instance
     */
    AccessToken.prototype.value = "";

    /**
     * AccessToken expired.
     * @member {number|Long} expired
     * @memberof AccessToken
     * @instance
     */
    AccessToken.prototype.expired = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new AccessToken instance using the specified properties.
     * @function create
     * @memberof AccessToken
     * @static
     * @param {IAccessToken=} [properties] Properties to set
     * @returns {AccessToken} AccessToken instance
     */
    AccessToken.create = function create(properties) {
        return new AccessToken(properties);
    };

    /**
     * Encodes the specified AccessToken message. Does not implicitly {@link AccessToken.verify|verify} messages.
     * @function encode
     * @memberof AccessToken
     * @static
     * @param {IAccessToken} message AccessToken message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AccessToken.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.value != null && message.hasOwnProperty("value"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.value);
        if (message.expired != null && message.hasOwnProperty("expired"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.expired);
        return writer;
    };

    /**
     * Encodes the specified AccessToken message, length delimited. Does not implicitly {@link AccessToken.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AccessToken
     * @static
     * @param {IAccessToken} message AccessToken message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AccessToken.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AccessToken message from the specified reader or buffer.
     * @function decode
     * @memberof AccessToken
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AccessToken} AccessToken
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AccessToken.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccessToken();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.value = reader.string();
                break;
            case 2:
                message.expired = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AccessToken message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AccessToken
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AccessToken} AccessToken
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AccessToken.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AccessToken message.
     * @function verify
     * @memberof AccessToken
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AccessToken.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.value != null && message.hasOwnProperty("value"))
            if (!$util.isString(message.value))
                return "value: string expected";
        if (message.expired != null && message.hasOwnProperty("expired"))
            if (!$util.isInteger(message.expired) && !(message.expired && $util.isInteger(message.expired.low) && $util.isInteger(message.expired.high)))
                return "expired: integer|Long expected";
        return null;
    };

    /**
     * Creates an AccessToken message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AccessToken
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AccessToken} AccessToken
     */
    AccessToken.fromObject = function fromObject(object) {
        if (object instanceof $root.AccessToken)
            return object;
        var message = new $root.AccessToken();
        if (object.value != null)
            message.value = String(object.value);
        if (object.expired != null)
            if ($util.Long)
                (message.expired = $util.Long.fromValue(object.expired)).unsigned = false;
            else if (typeof object.expired === "string")
                message.expired = parseInt(object.expired, 10);
            else if (typeof object.expired === "number")
                message.expired = object.expired;
            else if (typeof object.expired === "object")
                message.expired = new $util.LongBits(object.expired.low >>> 0, object.expired.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from an AccessToken message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AccessToken
     * @static
     * @param {AccessToken} message AccessToken
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AccessToken.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.value = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.expired = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.expired = options.longs === String ? "0" : 0;
        }
        if (message.value != null && message.hasOwnProperty("value"))
            object.value = message.value;
        if (message.expired != null && message.hasOwnProperty("expired"))
            if (typeof message.expired === "number")
                object.expired = options.longs === String ? String(message.expired) : message.expired;
            else
                object.expired = options.longs === String ? $util.Long.prototype.toString.call(message.expired) : options.longs === Number ? new $util.LongBits(message.expired.low >>> 0, message.expired.high >>> 0).toNumber() : message.expired;
        return object;
    };

    /**
     * Converts this AccessToken to JSON.
     * @function toJSON
     * @memberof AccessToken
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AccessToken.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AccessToken;
})();

$root.RefreshToken = (function() {

    /**
     * Properties of a RefreshToken.
     * @exports IRefreshToken
     * @interface IRefreshToken
     * @property {string} value RefreshToken value
     * @property {RefreshToken.AuthType} type RefreshToken type
     */

    /**
     * Constructs a new RefreshToken.
     * @exports RefreshToken
     * @classdesc Represents a RefreshToken.
     * @implements IRefreshToken
     * @constructor
     * @param {IRefreshToken=} [properties] Properties to set
     */
    function RefreshToken(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RefreshToken value.
     * @member {string} value
     * @memberof RefreshToken
     * @instance
     */
    RefreshToken.prototype.value = "";

    /**
     * RefreshToken type.
     * @member {RefreshToken.AuthType} type
     * @memberof RefreshToken
     * @instance
     */
    RefreshToken.prototype.type = 0;

    /**
     * Creates a new RefreshToken instance using the specified properties.
     * @function create
     * @memberof RefreshToken
     * @static
     * @param {IRefreshToken=} [properties] Properties to set
     * @returns {RefreshToken} RefreshToken instance
     */
    RefreshToken.create = function create(properties) {
        return new RefreshToken(properties);
    };

    /**
     * Encodes the specified RefreshToken message. Does not implicitly {@link RefreshToken.verify|verify} messages.
     * @function encode
     * @memberof RefreshToken
     * @static
     * @param {IRefreshToken} message RefreshToken message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RefreshToken.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.value);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
        return writer;
    };

    /**
     * Encodes the specified RefreshToken message, length delimited. Does not implicitly {@link RefreshToken.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RefreshToken
     * @static
     * @param {IRefreshToken} message RefreshToken message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RefreshToken.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RefreshToken message from the specified reader or buffer.
     * @function decode
     * @memberof RefreshToken
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RefreshToken} RefreshToken
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RefreshToken.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RefreshToken();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.value = reader.string();
                break;
            case 2:
                message.type = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("value"))
            throw $util.ProtocolError("missing required 'value'", { instance: message });
        if (!message.hasOwnProperty("type"))
            throw $util.ProtocolError("missing required 'type'", { instance: message });
        return message;
    };

    /**
     * Decodes a RefreshToken message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RefreshToken
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RefreshToken} RefreshToken
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RefreshToken.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RefreshToken message.
     * @function verify
     * @memberof RefreshToken
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RefreshToken.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isString(message.value))
            return "value: string expected";
        switch (message.type) {
        default:
            return "type: enum value expected";
        case 0:
        case 1:
        case 2:
        case 3:
            break;
        }
        return null;
    };

    /**
     * Creates a RefreshToken message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RefreshToken
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RefreshToken} RefreshToken
     */
    RefreshToken.fromObject = function fromObject(object) {
        if (object instanceof $root.RefreshToken)
            return object;
        var message = new $root.RefreshToken();
        if (object.value != null)
            message.value = String(object.value);
        switch (object.type) {
        case "UNDEFINED":
        case 0:
            message.type = 0;
            break;
        case "GOOGLE":
        case 1:
            message.type = 1;
            break;
        case "FACEBOOK":
        case 2:
            message.type = 2;
            break;
        case "VK":
        case 3:
            message.type = 3;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a RefreshToken message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RefreshToken
     * @static
     * @param {RefreshToken} message RefreshToken
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RefreshToken.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.value = "";
            object.type = options.enums === String ? "UNDEFINED" : 0;
        }
        if (message.value != null && message.hasOwnProperty("value"))
            object.value = message.value;
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = options.enums === String ? $root.RefreshToken.AuthType[message.type] : message.type;
        return object;
    };

    /**
     * Converts this RefreshToken to JSON.
     * @function toJSON
     * @memberof RefreshToken
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RefreshToken.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * AuthType enum.
     * @name RefreshToken.AuthType
     * @enum {string}
     * @property {number} UNDEFINED=0 UNDEFINED value
     * @property {number} GOOGLE=1 GOOGLE value
     * @property {number} FACEBOOK=2 FACEBOOK value
     * @property {number} VK=3 VK value
     */
    RefreshToken.AuthType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNDEFINED"] = 0;
        values[valuesById[1] = "GOOGLE"] = 1;
        values[valuesById[2] = "FACEBOOK"] = 2;
        values[valuesById[3] = "VK"] = 3;
        return values;
    })();

    return RefreshToken;
})();

module.exports = $root;
