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
 * @property {number} CATEGORY=4 CATEGORY value
 * @property {number} SUB_CATEGORY=5 SUB_CATEGORY value
 * @property {number} FAMILY_MEMBER=6 FAMILY_MEMBER value
 * @property {number} TRANSACTION=7 TRANSACTION value
 */
$root.EntityType = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNDEFINED"] = 0;
    values[valuesById[1] = "DUMP"] = 1;
    values[valuesById[2] = "CURRENCY"] = 2;
    values[valuesById[3] = "ACCOUNT"] = 3;
    values[valuesById[4] = "CATEGORY"] = 4;
    values[valuesById[5] = "SUB_CATEGORY"] = 5;
    values[valuesById[6] = "FAMILY_MEMBER"] = 6;
    values[valuesById[7] = "TRANSACTION"] = 7;
    return values;
})();

$root.Dump = (function() {

    /**
     * Properties of a Dump.
     * @exports IDump
     * @interface IDump
     * @property {number|Long|null} [id] Dump id
     * @property {Array.<ICurrency>|null} [currencies] Dump currencies
     * @property {Array.<IAccount>|null} [accounts] Dump accounts
     * @property {Array.<ICategory>|null} [categories] Dump categories
     * @property {Array.<ISubCategory>|null} [subCategories] Dump subCategories
     * @property {Array.<IFamilyMember>|null} [familyMembers] Dump familyMembers
     * @property {Array.<ITransaction>|null} [transactions] Dump transactions
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
        this.currencies = [];
        this.accounts = [];
        this.categories = [];
        this.subCategories = [];
        this.familyMembers = [];
        this.transactions = [];
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
     * Dump currencies.
     * @member {Array.<ICurrency>} currencies
     * @memberof Dump
     * @instance
     */
    Dump.prototype.currencies = $util.emptyArray;

    /**
     * Dump accounts.
     * @member {Array.<IAccount>} accounts
     * @memberof Dump
     * @instance
     */
    Dump.prototype.accounts = $util.emptyArray;

    /**
     * Dump categories.
     * @member {Array.<ICategory>} categories
     * @memberof Dump
     * @instance
     */
    Dump.prototype.categories = $util.emptyArray;

    /**
     * Dump subCategories.
     * @member {Array.<ISubCategory>} subCategories
     * @memberof Dump
     * @instance
     */
    Dump.prototype.subCategories = $util.emptyArray;

    /**
     * Dump familyMembers.
     * @member {Array.<IFamilyMember>} familyMembers
     * @memberof Dump
     * @instance
     */
    Dump.prototype.familyMembers = $util.emptyArray;

    /**
     * Dump transactions.
     * @member {Array.<ITransaction>} transactions
     * @memberof Dump
     * @instance
     */
    Dump.prototype.transactions = $util.emptyArray;

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
        if (message.currencies != null && message.currencies.length)
            for (var i = 0; i < message.currencies.length; ++i)
                $root.Currency.encode(message.currencies[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.accounts != null && message.accounts.length)
            for (var i = 0; i < message.accounts.length; ++i)
                $root.Account.encode(message.accounts[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.categories != null && message.categories.length)
            for (var i = 0; i < message.categories.length; ++i)
                $root.Category.encode(message.categories[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.subCategories != null && message.subCategories.length)
            for (var i = 0; i < message.subCategories.length; ++i)
                $root.SubCategory.encode(message.subCategories[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.familyMembers != null && message.familyMembers.length)
            for (var i = 0; i < message.familyMembers.length; ++i)
                $root.FamilyMember.encode(message.familyMembers[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.transactions != null && message.transactions.length)
            for (var i = 0; i < message.transactions.length; ++i)
                $root.Transaction.encode(message.transactions[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
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
                if (!(message.currencies && message.currencies.length))
                    message.currencies = [];
                message.currencies.push($root.Currency.decode(reader, reader.uint32()));
                break;
            case 3:
                if (!(message.accounts && message.accounts.length))
                    message.accounts = [];
                message.accounts.push($root.Account.decode(reader, reader.uint32()));
                break;
            case 4:
                if (!(message.categories && message.categories.length))
                    message.categories = [];
                message.categories.push($root.Category.decode(reader, reader.uint32()));
                break;
            case 5:
                if (!(message.subCategories && message.subCategories.length))
                    message.subCategories = [];
                message.subCategories.push($root.SubCategory.decode(reader, reader.uint32()));
                break;
            case 6:
                if (!(message.familyMembers && message.familyMembers.length))
                    message.familyMembers = [];
                message.familyMembers.push($root.FamilyMember.decode(reader, reader.uint32()));
                break;
            case 7:
                if (!(message.transactions && message.transactions.length))
                    message.transactions = [];
                message.transactions.push($root.Transaction.decode(reader, reader.uint32()));
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
        if (message.currencies != null && message.hasOwnProperty("currencies")) {
            if (!Array.isArray(message.currencies))
                return "currencies: array expected";
            for (var i = 0; i < message.currencies.length; ++i) {
                var error = $root.Currency.verify(message.currencies[i]);
                if (error)
                    return "currencies." + error;
            }
        }
        if (message.accounts != null && message.hasOwnProperty("accounts")) {
            if (!Array.isArray(message.accounts))
                return "accounts: array expected";
            for (var i = 0; i < message.accounts.length; ++i) {
                var error = $root.Account.verify(message.accounts[i]);
                if (error)
                    return "accounts." + error;
            }
        }
        if (message.categories != null && message.hasOwnProperty("categories")) {
            if (!Array.isArray(message.categories))
                return "categories: array expected";
            for (var i = 0; i < message.categories.length; ++i) {
                var error = $root.Category.verify(message.categories[i]);
                if (error)
                    return "categories." + error;
            }
        }
        if (message.subCategories != null && message.hasOwnProperty("subCategories")) {
            if (!Array.isArray(message.subCategories))
                return "subCategories: array expected";
            for (var i = 0; i < message.subCategories.length; ++i) {
                var error = $root.SubCategory.verify(message.subCategories[i]);
                if (error)
                    return "subCategories." + error;
            }
        }
        if (message.familyMembers != null && message.hasOwnProperty("familyMembers")) {
            if (!Array.isArray(message.familyMembers))
                return "familyMembers: array expected";
            for (var i = 0; i < message.familyMembers.length; ++i) {
                var error = $root.FamilyMember.verify(message.familyMembers[i]);
                if (error)
                    return "familyMembers." + error;
            }
        }
        if (message.transactions != null && message.hasOwnProperty("transactions")) {
            if (!Array.isArray(message.transactions))
                return "transactions: array expected";
            for (var i = 0; i < message.transactions.length; ++i) {
                var error = $root.Transaction.verify(message.transactions[i]);
                if (error)
                    return "transactions." + error;
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
        if (object.categories) {
            if (!Array.isArray(object.categories))
                throw TypeError(".Dump.categories: array expected");
            message.categories = [];
            for (var i = 0; i < object.categories.length; ++i) {
                if (typeof object.categories[i] !== "object")
                    throw TypeError(".Dump.categories: object expected");
                message.categories[i] = $root.Category.fromObject(object.categories[i]);
            }
        }
        if (object.subCategories) {
            if (!Array.isArray(object.subCategories))
                throw TypeError(".Dump.subCategories: array expected");
            message.subCategories = [];
            for (var i = 0; i < object.subCategories.length; ++i) {
                if (typeof object.subCategories[i] !== "object")
                    throw TypeError(".Dump.subCategories: object expected");
                message.subCategories[i] = $root.SubCategory.fromObject(object.subCategories[i]);
            }
        }
        if (object.familyMembers) {
            if (!Array.isArray(object.familyMembers))
                throw TypeError(".Dump.familyMembers: array expected");
            message.familyMembers = [];
            for (var i = 0; i < object.familyMembers.length; ++i) {
                if (typeof object.familyMembers[i] !== "object")
                    throw TypeError(".Dump.familyMembers: object expected");
                message.familyMembers[i] = $root.FamilyMember.fromObject(object.familyMembers[i]);
            }
        }
        if (object.transactions) {
            if (!Array.isArray(object.transactions))
                throw TypeError(".Dump.transactions: array expected");
            message.transactions = [];
            for (var i = 0; i < object.transactions.length; ++i) {
                if (typeof object.transactions[i] !== "object")
                    throw TypeError(".Dump.transactions: object expected");
                message.transactions[i] = $root.Transaction.fromObject(object.transactions[i]);
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
            object.currencies = [];
            object.accounts = [];
            object.categories = [];
            object.subCategories = [];
            object.familyMembers = [];
            object.transactions = [];
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
        if (message.currencies && message.currencies.length) {
            object.currencies = [];
            for (var j = 0; j < message.currencies.length; ++j)
                object.currencies[j] = $root.Currency.toObject(message.currencies[j], options);
        }
        if (message.accounts && message.accounts.length) {
            object.accounts = [];
            for (var j = 0; j < message.accounts.length; ++j)
                object.accounts[j] = $root.Account.toObject(message.accounts[j], options);
        }
        if (message.categories && message.categories.length) {
            object.categories = [];
            for (var j = 0; j < message.categories.length; ++j)
                object.categories[j] = $root.Category.toObject(message.categories[j], options);
        }
        if (message.subCategories && message.subCategories.length) {
            object.subCategories = [];
            for (var j = 0; j < message.subCategories.length; ++j)
                object.subCategories[j] = $root.SubCategory.toObject(message.subCategories[j], options);
        }
        if (message.familyMembers && message.familyMembers.length) {
            object.familyMembers = [];
            for (var j = 0; j < message.familyMembers.length; ++j)
                object.familyMembers[j] = $root.FamilyMember.toObject(message.familyMembers[j], options);
        }
        if (message.transactions && message.transactions.length) {
            object.transactions = [];
            for (var j = 0; j < message.transactions.length; ++j)
                object.transactions[j] = $root.Transaction.toObject(message.transactions[j], options);
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
     * @property {boolean|null} [isDeleted] Account isDeleted
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
     * Account isDeleted.
     * @member {boolean} isDeleted
     * @memberof Account
     * @instance
     */
    Account.prototype.isDeleted = false;

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
        if (message.isDeleted != null && message.hasOwnProperty("isDeleted"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isDeleted);
        writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
        if (message.balance != null && message.hasOwnProperty("balance"))
            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.balance);
        writer.uint32(/* id 5, wireType 0 =*/40).int64(message.currencyId);
        if (message.transactionAmount != null && message.hasOwnProperty("transactionAmount"))
            writer.uint32(/* id 6, wireType 0 =*/48).int64(message.transactionAmount);
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
                message.isDeleted = reader.bool();
                break;
            case 3:
                message.name = reader.string();
                break;
            case 4:
                message.balance = reader.int64();
                break;
            case 5:
                message.currencyId = reader.int64();
                break;
            case 6:
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
        if (message.isDeleted != null && message.hasOwnProperty("isDeleted"))
            if (typeof message.isDeleted !== "boolean")
                return "isDeleted: boolean expected";
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
        if (object.isDeleted != null)
            message.isDeleted = Boolean(object.isDeleted);
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
            object.isDeleted = false;
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
        if (message.isDeleted != null && message.hasOwnProperty("isDeleted"))
            object.isDeleted = message.isDeleted;
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

$root.Category = (function() {

    /**
     * Properties of a Category.
     * @exports ICategory
     * @interface ICategory
     * @property {number|Long|null} [id] Category id
     * @property {boolean|null} [isDeleted] Category isDeleted
     * @property {string} name Category name
     * @property {boolean|null} [isIncome] Category isIncome
     * @property {boolean|null} [isExpence] Category isExpence
     */

    /**
     * Constructs a new Category.
     * @exports Category
     * @classdesc Represents a Category.
     * @implements ICategory
     * @constructor
     * @param {ICategory=} [properties] Properties to set
     */
    function Category(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Category id.
     * @member {number|Long} id
     * @memberof Category
     * @instance
     */
    Category.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Category isDeleted.
     * @member {boolean} isDeleted
     * @memberof Category
     * @instance
     */
    Category.prototype.isDeleted = false;

    /**
     * Category name.
     * @member {string} name
     * @memberof Category
     * @instance
     */
    Category.prototype.name = "";

    /**
     * Category isIncome.
     * @member {boolean} isIncome
     * @memberof Category
     * @instance
     */
    Category.prototype.isIncome = false;

    /**
     * Category isExpence.
     * @member {boolean} isExpence
     * @memberof Category
     * @instance
     */
    Category.prototype.isExpence = false;

    /**
     * Creates a new Category instance using the specified properties.
     * @function create
     * @memberof Category
     * @static
     * @param {ICategory=} [properties] Properties to set
     * @returns {Category} Category instance
     */
    Category.create = function create(properties) {
        return new Category(properties);
    };

    /**
     * Encodes the specified Category message. Does not implicitly {@link Category.verify|verify} messages.
     * @function encode
     * @memberof Category
     * @static
     * @param {ICategory} message Category message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Category.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
        if (message.isDeleted != null && message.hasOwnProperty("isDeleted"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isDeleted);
        writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
        if (message.isIncome != null && message.hasOwnProperty("isIncome"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isIncome);
        if (message.isExpence != null && message.hasOwnProperty("isExpence"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isExpence);
        return writer;
    };

    /**
     * Encodes the specified Category message, length delimited. Does not implicitly {@link Category.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Category
     * @static
     * @param {ICategory} message Category message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Category.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Category message from the specified reader or buffer.
     * @function decode
     * @memberof Category
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Category} Category
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Category.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Category();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.int64();
                break;
            case 2:
                message.isDeleted = reader.bool();
                break;
            case 3:
                message.name = reader.string();
                break;
            case 4:
                message.isIncome = reader.bool();
                break;
            case 5:
                message.isExpence = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("name"))
            throw $util.ProtocolError("missing required 'name'", { instance: message });
        return message;
    };

    /**
     * Decodes a Category message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Category
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Category} Category
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Category.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Category message.
     * @function verify
     * @memberof Category
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Category.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                return "id: integer|Long expected";
        if (message.isDeleted != null && message.hasOwnProperty("isDeleted"))
            if (typeof message.isDeleted !== "boolean")
                return "isDeleted: boolean expected";
        if (!$util.isString(message.name))
            return "name: string expected";
        if (message.isIncome != null && message.hasOwnProperty("isIncome"))
            if (typeof message.isIncome !== "boolean")
                return "isIncome: boolean expected";
        if (message.isExpence != null && message.hasOwnProperty("isExpence"))
            if (typeof message.isExpence !== "boolean")
                return "isExpence: boolean expected";
        return null;
    };

    /**
     * Creates a Category message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Category
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Category} Category
     */
    Category.fromObject = function fromObject(object) {
        if (object instanceof $root.Category)
            return object;
        var message = new $root.Category();
        if (object.id != null)
            if ($util.Long)
                (message.id = $util.Long.fromValue(object.id)).unsigned = false;
            else if (typeof object.id === "string")
                message.id = parseInt(object.id, 10);
            else if (typeof object.id === "number")
                message.id = object.id;
            else if (typeof object.id === "object")
                message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
        if (object.isDeleted != null)
            message.isDeleted = Boolean(object.isDeleted);
        if (object.name != null)
            message.name = String(object.name);
        if (object.isIncome != null)
            message.isIncome = Boolean(object.isIncome);
        if (object.isExpence != null)
            message.isExpence = Boolean(object.isExpence);
        return message;
    };

    /**
     * Creates a plain object from a Category message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Category
     * @static
     * @param {Category} message Category
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Category.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.id = options.longs === String ? "0" : 0;
            object.isDeleted = false;
            object.name = "";
            object.isIncome = false;
            object.isExpence = false;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            if (typeof message.id === "number")
                object.id = options.longs === String ? String(message.id) : message.id;
            else
                object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
        if (message.isDeleted != null && message.hasOwnProperty("isDeleted"))
            object.isDeleted = message.isDeleted;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.isIncome != null && message.hasOwnProperty("isIncome"))
            object.isIncome = message.isIncome;
        if (message.isExpence != null && message.hasOwnProperty("isExpence"))
            object.isExpence = message.isExpence;
        return object;
    };

    /**
     * Converts this Category to JSON.
     * @function toJSON
     * @memberof Category
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Category.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Category;
})();

$root.SubCategory = (function() {

    /**
     * Properties of a SubCategory.
     * @exports ISubCategory
     * @interface ISubCategory
     * @property {number|Long|null} [id] SubCategory id
     * @property {boolean|null} [isDeleted] SubCategory isDeleted
     * @property {string} name SubCategory name
     * @property {number|Long} categoryId SubCategory categoryId
     */

    /**
     * Constructs a new SubCategory.
     * @exports SubCategory
     * @classdesc Represents a SubCategory.
     * @implements ISubCategory
     * @constructor
     * @param {ISubCategory=} [properties] Properties to set
     */
    function SubCategory(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SubCategory id.
     * @member {number|Long} id
     * @memberof SubCategory
     * @instance
     */
    SubCategory.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * SubCategory isDeleted.
     * @member {boolean} isDeleted
     * @memberof SubCategory
     * @instance
     */
    SubCategory.prototype.isDeleted = false;

    /**
     * SubCategory name.
     * @member {string} name
     * @memberof SubCategory
     * @instance
     */
    SubCategory.prototype.name = "";

    /**
     * SubCategory categoryId.
     * @member {number|Long} categoryId
     * @memberof SubCategory
     * @instance
     */
    SubCategory.prototype.categoryId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new SubCategory instance using the specified properties.
     * @function create
     * @memberof SubCategory
     * @static
     * @param {ISubCategory=} [properties] Properties to set
     * @returns {SubCategory} SubCategory instance
     */
    SubCategory.create = function create(properties) {
        return new SubCategory(properties);
    };

    /**
     * Encodes the specified SubCategory message. Does not implicitly {@link SubCategory.verify|verify} messages.
     * @function encode
     * @memberof SubCategory
     * @static
     * @param {ISubCategory} message SubCategory message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SubCategory.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
        if (message.isDeleted != null && message.hasOwnProperty("isDeleted"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isDeleted);
        writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
        writer.uint32(/* id 4, wireType 0 =*/32).int64(message.categoryId);
        return writer;
    };

    /**
     * Encodes the specified SubCategory message, length delimited. Does not implicitly {@link SubCategory.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SubCategory
     * @static
     * @param {ISubCategory} message SubCategory message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SubCategory.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SubCategory message from the specified reader or buffer.
     * @function decode
     * @memberof SubCategory
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SubCategory} SubCategory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SubCategory.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SubCategory();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.int64();
                break;
            case 2:
                message.isDeleted = reader.bool();
                break;
            case 3:
                message.name = reader.string();
                break;
            case 4:
                message.categoryId = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("name"))
            throw $util.ProtocolError("missing required 'name'", { instance: message });
        if (!message.hasOwnProperty("categoryId"))
            throw $util.ProtocolError("missing required 'categoryId'", { instance: message });
        return message;
    };

    /**
     * Decodes a SubCategory message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SubCategory
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SubCategory} SubCategory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SubCategory.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SubCategory message.
     * @function verify
     * @memberof SubCategory
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SubCategory.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                return "id: integer|Long expected";
        if (message.isDeleted != null && message.hasOwnProperty("isDeleted"))
            if (typeof message.isDeleted !== "boolean")
                return "isDeleted: boolean expected";
        if (!$util.isString(message.name))
            return "name: string expected";
        if (!$util.isInteger(message.categoryId) && !(message.categoryId && $util.isInteger(message.categoryId.low) && $util.isInteger(message.categoryId.high)))
            return "categoryId: integer|Long expected";
        return null;
    };

    /**
     * Creates a SubCategory message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SubCategory
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SubCategory} SubCategory
     */
    SubCategory.fromObject = function fromObject(object) {
        if (object instanceof $root.SubCategory)
            return object;
        var message = new $root.SubCategory();
        if (object.id != null)
            if ($util.Long)
                (message.id = $util.Long.fromValue(object.id)).unsigned = false;
            else if (typeof object.id === "string")
                message.id = parseInt(object.id, 10);
            else if (typeof object.id === "number")
                message.id = object.id;
            else if (typeof object.id === "object")
                message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
        if (object.isDeleted != null)
            message.isDeleted = Boolean(object.isDeleted);
        if (object.name != null)
            message.name = String(object.name);
        if (object.categoryId != null)
            if ($util.Long)
                (message.categoryId = $util.Long.fromValue(object.categoryId)).unsigned = false;
            else if (typeof object.categoryId === "string")
                message.categoryId = parseInt(object.categoryId, 10);
            else if (typeof object.categoryId === "number")
                message.categoryId = object.categoryId;
            else if (typeof object.categoryId === "object")
                message.categoryId = new $util.LongBits(object.categoryId.low >>> 0, object.categoryId.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a SubCategory message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SubCategory
     * @static
     * @param {SubCategory} message SubCategory
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SubCategory.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.id = options.longs === String ? "0" : 0;
            object.isDeleted = false;
            object.name = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.categoryId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.categoryId = options.longs === String ? "0" : 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            if (typeof message.id === "number")
                object.id = options.longs === String ? String(message.id) : message.id;
            else
                object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
        if (message.isDeleted != null && message.hasOwnProperty("isDeleted"))
            object.isDeleted = message.isDeleted;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.categoryId != null && message.hasOwnProperty("categoryId"))
            if (typeof message.categoryId === "number")
                object.categoryId = options.longs === String ? String(message.categoryId) : message.categoryId;
            else
                object.categoryId = options.longs === String ? $util.Long.prototype.toString.call(message.categoryId) : options.longs === Number ? new $util.LongBits(message.categoryId.low >>> 0, message.categoryId.high >>> 0).toNumber() : message.categoryId;
        return object;
    };

    /**
     * Converts this SubCategory to JSON.
     * @function toJSON
     * @memberof SubCategory
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SubCategory.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SubCategory;
})();

$root.FamilyMember = (function() {

    /**
     * Properties of a FamilyMember.
     * @exports IFamilyMember
     * @interface IFamilyMember
     * @property {number|Long|null} [id] FamilyMember id
     * @property {boolean|null} [isDeleted] FamilyMember isDeleted
     * @property {string} name FamilyMember name
     */

    /**
     * Constructs a new FamilyMember.
     * @exports FamilyMember
     * @classdesc Represents a FamilyMember.
     * @implements IFamilyMember
     * @constructor
     * @param {IFamilyMember=} [properties] Properties to set
     */
    function FamilyMember(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * FamilyMember id.
     * @member {number|Long} id
     * @memberof FamilyMember
     * @instance
     */
    FamilyMember.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * FamilyMember isDeleted.
     * @member {boolean} isDeleted
     * @memberof FamilyMember
     * @instance
     */
    FamilyMember.prototype.isDeleted = false;

    /**
     * FamilyMember name.
     * @member {string} name
     * @memberof FamilyMember
     * @instance
     */
    FamilyMember.prototype.name = "";

    /**
     * Creates a new FamilyMember instance using the specified properties.
     * @function create
     * @memberof FamilyMember
     * @static
     * @param {IFamilyMember=} [properties] Properties to set
     * @returns {FamilyMember} FamilyMember instance
     */
    FamilyMember.create = function create(properties) {
        return new FamilyMember(properties);
    };

    /**
     * Encodes the specified FamilyMember message. Does not implicitly {@link FamilyMember.verify|verify} messages.
     * @function encode
     * @memberof FamilyMember
     * @static
     * @param {IFamilyMember} message FamilyMember message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FamilyMember.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
        if (message.isDeleted != null && message.hasOwnProperty("isDeleted"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isDeleted);
        writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
        return writer;
    };

    /**
     * Encodes the specified FamilyMember message, length delimited. Does not implicitly {@link FamilyMember.verify|verify} messages.
     * @function encodeDelimited
     * @memberof FamilyMember
     * @static
     * @param {IFamilyMember} message FamilyMember message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FamilyMember.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a FamilyMember message from the specified reader or buffer.
     * @function decode
     * @memberof FamilyMember
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {FamilyMember} FamilyMember
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FamilyMember.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.FamilyMember();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.int64();
                break;
            case 2:
                message.isDeleted = reader.bool();
                break;
            case 3:
                message.name = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("name"))
            throw $util.ProtocolError("missing required 'name'", { instance: message });
        return message;
    };

    /**
     * Decodes a FamilyMember message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof FamilyMember
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {FamilyMember} FamilyMember
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FamilyMember.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a FamilyMember message.
     * @function verify
     * @memberof FamilyMember
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    FamilyMember.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                return "id: integer|Long expected";
        if (message.isDeleted != null && message.hasOwnProperty("isDeleted"))
            if (typeof message.isDeleted !== "boolean")
                return "isDeleted: boolean expected";
        if (!$util.isString(message.name))
            return "name: string expected";
        return null;
    };

    /**
     * Creates a FamilyMember message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof FamilyMember
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {FamilyMember} FamilyMember
     */
    FamilyMember.fromObject = function fromObject(object) {
        if (object instanceof $root.FamilyMember)
            return object;
        var message = new $root.FamilyMember();
        if (object.id != null)
            if ($util.Long)
                (message.id = $util.Long.fromValue(object.id)).unsigned = false;
            else if (typeof object.id === "string")
                message.id = parseInt(object.id, 10);
            else if (typeof object.id === "number")
                message.id = object.id;
            else if (typeof object.id === "object")
                message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
        if (object.isDeleted != null)
            message.isDeleted = Boolean(object.isDeleted);
        if (object.name != null)
            message.name = String(object.name);
        return message;
    };

    /**
     * Creates a plain object from a FamilyMember message. Also converts values to other types if specified.
     * @function toObject
     * @memberof FamilyMember
     * @static
     * @param {FamilyMember} message FamilyMember
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    FamilyMember.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.id = options.longs === String ? "0" : 0;
            object.isDeleted = false;
            object.name = "";
        }
        if (message.id != null && message.hasOwnProperty("id"))
            if (typeof message.id === "number")
                object.id = options.longs === String ? String(message.id) : message.id;
            else
                object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
        if (message.isDeleted != null && message.hasOwnProperty("isDeleted"))
            object.isDeleted = message.isDeleted;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        return object;
    };

    /**
     * Converts this FamilyMember to JSON.
     * @function toJSON
     * @memberof FamilyMember
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    FamilyMember.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return FamilyMember;
})();

$root.Transaction = (function() {

    /**
     * Properties of a Transaction.
     * @exports ITransaction
     * @interface ITransaction
     * @property {number|Long|null} [id] Transaction id
     * @property {boolean|null} [isDeleted] Transaction isDeleted
     * @property {google.protobuf.ITimestamp} created Transaction created
     * @property {number|Long} accountIdFrom Transaction accountIdFrom
     * @property {number|Long} accountIdTo Transaction accountIdTo
     * @property {number|Long} amountFrom Transaction amountFrom
     * @property {number|Long} amountTo Transaction amountTo
     * @property {number|Long} categoryId Transaction categoryId
     * @property {number|Long|null} [subCategoryId] Transaction subCategoryId
     * @property {number|Long|null} [familyMemberId] Transaction familyMemberId
     * @property {string|null} [comment] Transaction comment
     */

    /**
     * Constructs a new Transaction.
     * @exports Transaction
     * @classdesc Represents a Transaction.
     * @implements ITransaction
     * @constructor
     * @param {ITransaction=} [properties] Properties to set
     */
    function Transaction(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Transaction id.
     * @member {number|Long} id
     * @memberof Transaction
     * @instance
     */
    Transaction.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Transaction isDeleted.
     * @member {boolean} isDeleted
     * @memberof Transaction
     * @instance
     */
    Transaction.prototype.isDeleted = false;

    /**
     * Transaction created.
     * @member {google.protobuf.ITimestamp} created
     * @memberof Transaction
     * @instance
     */
    Transaction.prototype.created = null;

    /**
     * Transaction accountIdFrom.
     * @member {number|Long} accountIdFrom
     * @memberof Transaction
     * @instance
     */
    Transaction.prototype.accountIdFrom = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Transaction accountIdTo.
     * @member {number|Long} accountIdTo
     * @memberof Transaction
     * @instance
     */
    Transaction.prototype.accountIdTo = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Transaction amountFrom.
     * @member {number|Long} amountFrom
     * @memberof Transaction
     * @instance
     */
    Transaction.prototype.amountFrom = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Transaction amountTo.
     * @member {number|Long} amountTo
     * @memberof Transaction
     * @instance
     */
    Transaction.prototype.amountTo = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Transaction categoryId.
     * @member {number|Long} categoryId
     * @memberof Transaction
     * @instance
     */
    Transaction.prototype.categoryId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Transaction subCategoryId.
     * @member {number|Long} subCategoryId
     * @memberof Transaction
     * @instance
     */
    Transaction.prototype.subCategoryId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Transaction familyMemberId.
     * @member {number|Long} familyMemberId
     * @memberof Transaction
     * @instance
     */
    Transaction.prototype.familyMemberId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Transaction comment.
     * @member {string} comment
     * @memberof Transaction
     * @instance
     */
    Transaction.prototype.comment = "";

    /**
     * Creates a new Transaction instance using the specified properties.
     * @function create
     * @memberof Transaction
     * @static
     * @param {ITransaction=} [properties] Properties to set
     * @returns {Transaction} Transaction instance
     */
    Transaction.create = function create(properties) {
        return new Transaction(properties);
    };

    /**
     * Encodes the specified Transaction message. Does not implicitly {@link Transaction.verify|verify} messages.
     * @function encode
     * @memberof Transaction
     * @static
     * @param {ITransaction} message Transaction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Transaction.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
        if (message.isDeleted != null && message.hasOwnProperty("isDeleted"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isDeleted);
        $root.google.protobuf.Timestamp.encode(message.created, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        writer.uint32(/* id 4, wireType 0 =*/32).int64(message.accountIdFrom);
        writer.uint32(/* id 5, wireType 0 =*/40).int64(message.accountIdTo);
        writer.uint32(/* id 6, wireType 0 =*/48).int64(message.amountFrom);
        writer.uint32(/* id 7, wireType 0 =*/56).int64(message.amountTo);
        writer.uint32(/* id 8, wireType 0 =*/64).int64(message.categoryId);
        if (message.subCategoryId != null && message.hasOwnProperty("subCategoryId"))
            writer.uint32(/* id 9, wireType 0 =*/72).int64(message.subCategoryId);
        if (message.familyMemberId != null && message.hasOwnProperty("familyMemberId"))
            writer.uint32(/* id 10, wireType 0 =*/80).int64(message.familyMemberId);
        if (message.comment != null && message.hasOwnProperty("comment"))
            writer.uint32(/* id 11, wireType 2 =*/90).string(message.comment);
        return writer;
    };

    /**
     * Encodes the specified Transaction message, length delimited. Does not implicitly {@link Transaction.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Transaction
     * @static
     * @param {ITransaction} message Transaction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Transaction.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Transaction message from the specified reader or buffer.
     * @function decode
     * @memberof Transaction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Transaction} Transaction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Transaction.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Transaction();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.int64();
                break;
            case 2:
                message.isDeleted = reader.bool();
                break;
            case 3:
                message.created = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                break;
            case 4:
                message.accountIdFrom = reader.int64();
                break;
            case 5:
                message.accountIdTo = reader.int64();
                break;
            case 6:
                message.amountFrom = reader.int64();
                break;
            case 7:
                message.amountTo = reader.int64();
                break;
            case 8:
                message.categoryId = reader.int64();
                break;
            case 9:
                message.subCategoryId = reader.int64();
                break;
            case 10:
                message.familyMemberId = reader.int64();
                break;
            case 11:
                message.comment = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("created"))
            throw $util.ProtocolError("missing required 'created'", { instance: message });
        if (!message.hasOwnProperty("accountIdFrom"))
            throw $util.ProtocolError("missing required 'accountIdFrom'", { instance: message });
        if (!message.hasOwnProperty("accountIdTo"))
            throw $util.ProtocolError("missing required 'accountIdTo'", { instance: message });
        if (!message.hasOwnProperty("amountFrom"))
            throw $util.ProtocolError("missing required 'amountFrom'", { instance: message });
        if (!message.hasOwnProperty("amountTo"))
            throw $util.ProtocolError("missing required 'amountTo'", { instance: message });
        if (!message.hasOwnProperty("categoryId"))
            throw $util.ProtocolError("missing required 'categoryId'", { instance: message });
        return message;
    };

    /**
     * Decodes a Transaction message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Transaction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Transaction} Transaction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Transaction.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Transaction message.
     * @function verify
     * @memberof Transaction
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Transaction.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                return "id: integer|Long expected";
        if (message.isDeleted != null && message.hasOwnProperty("isDeleted"))
            if (typeof message.isDeleted !== "boolean")
                return "isDeleted: boolean expected";
        {
            var error = $root.google.protobuf.Timestamp.verify(message.created);
            if (error)
                return "created." + error;
        }
        if (!$util.isInteger(message.accountIdFrom) && !(message.accountIdFrom && $util.isInteger(message.accountIdFrom.low) && $util.isInteger(message.accountIdFrom.high)))
            return "accountIdFrom: integer|Long expected";
        if (!$util.isInteger(message.accountIdTo) && !(message.accountIdTo && $util.isInteger(message.accountIdTo.low) && $util.isInteger(message.accountIdTo.high)))
            return "accountIdTo: integer|Long expected";
        if (!$util.isInteger(message.amountFrom) && !(message.amountFrom && $util.isInteger(message.amountFrom.low) && $util.isInteger(message.amountFrom.high)))
            return "amountFrom: integer|Long expected";
        if (!$util.isInteger(message.amountTo) && !(message.amountTo && $util.isInteger(message.amountTo.low) && $util.isInteger(message.amountTo.high)))
            return "amountTo: integer|Long expected";
        if (!$util.isInteger(message.categoryId) && !(message.categoryId && $util.isInteger(message.categoryId.low) && $util.isInteger(message.categoryId.high)))
            return "categoryId: integer|Long expected";
        if (message.subCategoryId != null && message.hasOwnProperty("subCategoryId"))
            if (!$util.isInteger(message.subCategoryId) && !(message.subCategoryId && $util.isInteger(message.subCategoryId.low) && $util.isInteger(message.subCategoryId.high)))
                return "subCategoryId: integer|Long expected";
        if (message.familyMemberId != null && message.hasOwnProperty("familyMemberId"))
            if (!$util.isInteger(message.familyMemberId) && !(message.familyMemberId && $util.isInteger(message.familyMemberId.low) && $util.isInteger(message.familyMemberId.high)))
                return "familyMemberId: integer|Long expected";
        if (message.comment != null && message.hasOwnProperty("comment"))
            if (!$util.isString(message.comment))
                return "comment: string expected";
        return null;
    };

    /**
     * Creates a Transaction message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Transaction
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Transaction} Transaction
     */
    Transaction.fromObject = function fromObject(object) {
        if (object instanceof $root.Transaction)
            return object;
        var message = new $root.Transaction();
        if (object.id != null)
            if ($util.Long)
                (message.id = $util.Long.fromValue(object.id)).unsigned = false;
            else if (typeof object.id === "string")
                message.id = parseInt(object.id, 10);
            else if (typeof object.id === "number")
                message.id = object.id;
            else if (typeof object.id === "object")
                message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
        if (object.isDeleted != null)
            message.isDeleted = Boolean(object.isDeleted);
        if (object.created != null) {
            if (typeof object.created !== "object")
                throw TypeError(".Transaction.created: object expected");
            message.created = $root.google.protobuf.Timestamp.fromObject(object.created);
        }
        if (object.accountIdFrom != null)
            if ($util.Long)
                (message.accountIdFrom = $util.Long.fromValue(object.accountIdFrom)).unsigned = false;
            else if (typeof object.accountIdFrom === "string")
                message.accountIdFrom = parseInt(object.accountIdFrom, 10);
            else if (typeof object.accountIdFrom === "number")
                message.accountIdFrom = object.accountIdFrom;
            else if (typeof object.accountIdFrom === "object")
                message.accountIdFrom = new $util.LongBits(object.accountIdFrom.low >>> 0, object.accountIdFrom.high >>> 0).toNumber();
        if (object.accountIdTo != null)
            if ($util.Long)
                (message.accountIdTo = $util.Long.fromValue(object.accountIdTo)).unsigned = false;
            else if (typeof object.accountIdTo === "string")
                message.accountIdTo = parseInt(object.accountIdTo, 10);
            else if (typeof object.accountIdTo === "number")
                message.accountIdTo = object.accountIdTo;
            else if (typeof object.accountIdTo === "object")
                message.accountIdTo = new $util.LongBits(object.accountIdTo.low >>> 0, object.accountIdTo.high >>> 0).toNumber();
        if (object.amountFrom != null)
            if ($util.Long)
                (message.amountFrom = $util.Long.fromValue(object.amountFrom)).unsigned = false;
            else if (typeof object.amountFrom === "string")
                message.amountFrom = parseInt(object.amountFrom, 10);
            else if (typeof object.amountFrom === "number")
                message.amountFrom = object.amountFrom;
            else if (typeof object.amountFrom === "object")
                message.amountFrom = new $util.LongBits(object.amountFrom.low >>> 0, object.amountFrom.high >>> 0).toNumber();
        if (object.amountTo != null)
            if ($util.Long)
                (message.amountTo = $util.Long.fromValue(object.amountTo)).unsigned = false;
            else if (typeof object.amountTo === "string")
                message.amountTo = parseInt(object.amountTo, 10);
            else if (typeof object.amountTo === "number")
                message.amountTo = object.amountTo;
            else if (typeof object.amountTo === "object")
                message.amountTo = new $util.LongBits(object.amountTo.low >>> 0, object.amountTo.high >>> 0).toNumber();
        if (object.categoryId != null)
            if ($util.Long)
                (message.categoryId = $util.Long.fromValue(object.categoryId)).unsigned = false;
            else if (typeof object.categoryId === "string")
                message.categoryId = parseInt(object.categoryId, 10);
            else if (typeof object.categoryId === "number")
                message.categoryId = object.categoryId;
            else if (typeof object.categoryId === "object")
                message.categoryId = new $util.LongBits(object.categoryId.low >>> 0, object.categoryId.high >>> 0).toNumber();
        if (object.subCategoryId != null)
            if ($util.Long)
                (message.subCategoryId = $util.Long.fromValue(object.subCategoryId)).unsigned = false;
            else if (typeof object.subCategoryId === "string")
                message.subCategoryId = parseInt(object.subCategoryId, 10);
            else if (typeof object.subCategoryId === "number")
                message.subCategoryId = object.subCategoryId;
            else if (typeof object.subCategoryId === "object")
                message.subCategoryId = new $util.LongBits(object.subCategoryId.low >>> 0, object.subCategoryId.high >>> 0).toNumber();
        if (object.familyMemberId != null)
            if ($util.Long)
                (message.familyMemberId = $util.Long.fromValue(object.familyMemberId)).unsigned = false;
            else if (typeof object.familyMemberId === "string")
                message.familyMemberId = parseInt(object.familyMemberId, 10);
            else if (typeof object.familyMemberId === "number")
                message.familyMemberId = object.familyMemberId;
            else if (typeof object.familyMemberId === "object")
                message.familyMemberId = new $util.LongBits(object.familyMemberId.low >>> 0, object.familyMemberId.high >>> 0).toNumber();
        if (object.comment != null)
            message.comment = String(object.comment);
        return message;
    };

    /**
     * Creates a plain object from a Transaction message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Transaction
     * @static
     * @param {Transaction} message Transaction
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Transaction.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.id = options.longs === String ? "0" : 0;
            object.isDeleted = false;
            object.created = null;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.accountIdFrom = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.accountIdFrom = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.accountIdTo = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.accountIdTo = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.amountFrom = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.amountFrom = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.amountTo = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.amountTo = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.categoryId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.categoryId = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.subCategoryId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.subCategoryId = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.familyMemberId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.familyMemberId = options.longs === String ? "0" : 0;
            object.comment = "";
        }
        if (message.id != null && message.hasOwnProperty("id"))
            if (typeof message.id === "number")
                object.id = options.longs === String ? String(message.id) : message.id;
            else
                object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
        if (message.isDeleted != null && message.hasOwnProperty("isDeleted"))
            object.isDeleted = message.isDeleted;
        if (message.created != null && message.hasOwnProperty("created"))
            object.created = $root.google.protobuf.Timestamp.toObject(message.created, options);
        if (message.accountIdFrom != null && message.hasOwnProperty("accountIdFrom"))
            if (typeof message.accountIdFrom === "number")
                object.accountIdFrom = options.longs === String ? String(message.accountIdFrom) : message.accountIdFrom;
            else
                object.accountIdFrom = options.longs === String ? $util.Long.prototype.toString.call(message.accountIdFrom) : options.longs === Number ? new $util.LongBits(message.accountIdFrom.low >>> 0, message.accountIdFrom.high >>> 0).toNumber() : message.accountIdFrom;
        if (message.accountIdTo != null && message.hasOwnProperty("accountIdTo"))
            if (typeof message.accountIdTo === "number")
                object.accountIdTo = options.longs === String ? String(message.accountIdTo) : message.accountIdTo;
            else
                object.accountIdTo = options.longs === String ? $util.Long.prototype.toString.call(message.accountIdTo) : options.longs === Number ? new $util.LongBits(message.accountIdTo.low >>> 0, message.accountIdTo.high >>> 0).toNumber() : message.accountIdTo;
        if (message.amountFrom != null && message.hasOwnProperty("amountFrom"))
            if (typeof message.amountFrom === "number")
                object.amountFrom = options.longs === String ? String(message.amountFrom) : message.amountFrom;
            else
                object.amountFrom = options.longs === String ? $util.Long.prototype.toString.call(message.amountFrom) : options.longs === Number ? new $util.LongBits(message.amountFrom.low >>> 0, message.amountFrom.high >>> 0).toNumber() : message.amountFrom;
        if (message.amountTo != null && message.hasOwnProperty("amountTo"))
            if (typeof message.amountTo === "number")
                object.amountTo = options.longs === String ? String(message.amountTo) : message.amountTo;
            else
                object.amountTo = options.longs === String ? $util.Long.prototype.toString.call(message.amountTo) : options.longs === Number ? new $util.LongBits(message.amountTo.low >>> 0, message.amountTo.high >>> 0).toNumber() : message.amountTo;
        if (message.categoryId != null && message.hasOwnProperty("categoryId"))
            if (typeof message.categoryId === "number")
                object.categoryId = options.longs === String ? String(message.categoryId) : message.categoryId;
            else
                object.categoryId = options.longs === String ? $util.Long.prototype.toString.call(message.categoryId) : options.longs === Number ? new $util.LongBits(message.categoryId.low >>> 0, message.categoryId.high >>> 0).toNumber() : message.categoryId;
        if (message.subCategoryId != null && message.hasOwnProperty("subCategoryId"))
            if (typeof message.subCategoryId === "number")
                object.subCategoryId = options.longs === String ? String(message.subCategoryId) : message.subCategoryId;
            else
                object.subCategoryId = options.longs === String ? $util.Long.prototype.toString.call(message.subCategoryId) : options.longs === Number ? new $util.LongBits(message.subCategoryId.low >>> 0, message.subCategoryId.high >>> 0).toNumber() : message.subCategoryId;
        if (message.familyMemberId != null && message.hasOwnProperty("familyMemberId"))
            if (typeof message.familyMemberId === "number")
                object.familyMemberId = options.longs === String ? String(message.familyMemberId) : message.familyMemberId;
            else
                object.familyMemberId = options.longs === String ? $util.Long.prototype.toString.call(message.familyMemberId) : options.longs === Number ? new $util.LongBits(message.familyMemberId.low >>> 0, message.familyMemberId.high >>> 0).toNumber() : message.familyMemberId;
        if (message.comment != null && message.hasOwnProperty("comment"))
            object.comment = message.comment;
        return object;
    };

    /**
     * Converts this Transaction to JSON.
     * @function toJSON
     * @memberof Transaction
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Transaction.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Transaction;
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

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.seconds = reader.int64();
                        break;
                    case 2:
                        message.nanos = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                var message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Timestamp;
        })();

        return protobuf;
    })();

    return google;
})();

module.exports = $root;
