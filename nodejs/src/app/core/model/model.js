/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
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
 * @property {number} SETTINGS=7 SETTINGS value
 * @property {number} CURRENCY=1 CURRENCY value
 * @property {number} ACCOUNT=2 ACCOUNT value
 * @property {number} CATEGORY=3 CATEGORY value
 * @property {number} SUB_CATEGORY=4 SUB_CATEGORY value
 * @property {number} FAMILY_MEMBER=5 FAMILY_MEMBER value
 * @property {number} TRANSACTION=6 TRANSACTION value
 */
$root.EntityType = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNDEFINED"] = 0;
    values[valuesById[7] = "SETTINGS"] = 7;
    values[valuesById[1] = "CURRENCY"] = 1;
    values[valuesById[2] = "ACCOUNT"] = 2;
    values[valuesById[3] = "CATEGORY"] = 3;
    values[valuesById[4] = "SUB_CATEGORY"] = 4;
    values[valuesById[5] = "FAMILY_MEMBER"] = 5;
    values[valuesById[6] = "TRANSACTION"] = 6;
    return values;
})();

$root.Dump = (function() {

    /**
     * Properties of a Dump.
     * @exports IDump
     * @interface IDump
     * @property {ISettings} settings Dump settings
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
     * Dump settings.
     * @member {ISettings} settings
     * @memberof Dump
     * @instance
     */
    Dump.prototype.settings = null;

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
        if (message.currencies != null && message.currencies.length)
            for (var i = 0; i < message.currencies.length; ++i)
                $root.Currency.encode(message.currencies[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.accounts != null && message.accounts.length)
            for (var i = 0; i < message.accounts.length; ++i)
                $root.Account.encode(message.accounts[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.categories != null && message.categories.length)
            for (var i = 0; i < message.categories.length; ++i)
                $root.Category.encode(message.categories[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.subCategories != null && message.subCategories.length)
            for (var i = 0; i < message.subCategories.length; ++i)
                $root.SubCategory.encode(message.subCategories[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.familyMembers != null && message.familyMembers.length)
            for (var i = 0; i < message.familyMembers.length; ++i)
                $root.FamilyMember.encode(message.familyMembers[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.transactions != null && message.transactions.length)
            for (var i = 0; i < message.transactions.length; ++i)
                $root.Transaction.encode(message.transactions[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        $root.Settings.encode(message.settings, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
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
            case 7:
                message.settings = $root.Settings.decode(reader, reader.uint32());
                break;
            case 1:
                if (!(message.currencies && message.currencies.length))
                    message.currencies = [];
                message.currencies.push($root.Currency.decode(reader, reader.uint32()));
                break;
            case 2:
                if (!(message.accounts && message.accounts.length))
                    message.accounts = [];
                message.accounts.push($root.Account.decode(reader, reader.uint32()));
                break;
            case 3:
                if (!(message.categories && message.categories.length))
                    message.categories = [];
                message.categories.push($root.Category.decode(reader, reader.uint32()));
                break;
            case 4:
                if (!(message.subCategories && message.subCategories.length))
                    message.subCategories = [];
                message.subCategories.push($root.SubCategory.decode(reader, reader.uint32()));
                break;
            case 5:
                if (!(message.familyMembers && message.familyMembers.length))
                    message.familyMembers = [];
                message.familyMembers.push($root.FamilyMember.decode(reader, reader.uint32()));
                break;
            case 6:
                if (!(message.transactions && message.transactions.length))
                    message.transactions = [];
                message.transactions.push($root.Transaction.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("settings"))
            throw $util.ProtocolError("missing required 'settings'", { instance: message });
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
        {
            var error = $root.Settings.verify(message.settings);
            if (error)
                return "settings." + error;
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
        if (object.settings != null) {
            if (typeof object.settings !== "object")
                throw TypeError(".Dump.settings: object expected");
            message.settings = $root.Settings.fromObject(object.settings);
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
            object.settings = null;
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
        if (message.settings != null && message.hasOwnProperty("settings"))
            object.settings = $root.Settings.toObject(message.settings, options);
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
     * @property {boolean|null} [isVisible] Account isVisible
     * @property {number|Long|null} [transactionAmount] Account transactionAmount
     * @property {string} name Account name
     * @property {number|Long|null} [balance] Account balance
     * @property {number|Long} currencyId Account currencyId
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
     * Account isVisible.
     * @member {boolean} isVisible
     * @memberof Account
     * @instance
     */
    Account.prototype.isVisible = true;

    /**
     * Account transactionAmount.
     * @member {number|Long} transactionAmount
     * @memberof Account
     * @instance
     */
    Account.prototype.transactionAmount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

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
        if (message.isVisible != null && message.hasOwnProperty("isVisible"))
            writer.uint32(/* id 7, wireType 0 =*/56).bool(message.isVisible);
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
            case 7:
                message.isVisible = reader.bool();
                break;
            case 6:
                message.transactionAmount = reader.int64();
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
        if (message.isVisible != null && message.hasOwnProperty("isVisible"))
            if (typeof message.isVisible !== "boolean")
                return "isVisible: boolean expected";
        if (message.transactionAmount != null && message.hasOwnProperty("transactionAmount"))
            if (!$util.isInteger(message.transactionAmount) && !(message.transactionAmount && $util.isInteger(message.transactionAmount.low) && $util.isInteger(message.transactionAmount.high)))
                return "transactionAmount: integer|Long expected";
        if (!$util.isString(message.name))
            return "name: string expected";
        if (message.balance != null && message.hasOwnProperty("balance"))
            if (!$util.isInteger(message.balance) && !(message.balance && $util.isInteger(message.balance.low) && $util.isInteger(message.balance.high)))
                return "balance: integer|Long expected";
        if (!$util.isInteger(message.currencyId) && !(message.currencyId && $util.isInteger(message.currencyId.low) && $util.isInteger(message.currencyId.high)))
            return "currencyId: integer|Long expected";
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
        if (object.isVisible != null)
            message.isVisible = Boolean(object.isVisible);
        if (object.transactionAmount != null)
            if ($util.Long)
                (message.transactionAmount = $util.Long.fromValue(object.transactionAmount)).unsigned = false;
            else if (typeof object.transactionAmount === "string")
                message.transactionAmount = parseInt(object.transactionAmount, 10);
            else if (typeof object.transactionAmount === "number")
                message.transactionAmount = object.transactionAmount;
            else if (typeof object.transactionAmount === "object")
                message.transactionAmount = new $util.LongBits(object.transactionAmount.low >>> 0, object.transactionAmount.high >>> 0).toNumber();
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
            object.isVisible = true;
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
        if (message.isVisible != null && message.hasOwnProperty("isVisible"))
            object.isVisible = message.isVisible;
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
     * @property {boolean|null} [isVisible] Category isVisible
     * @property {number|Long|null} [transactionAmount] Category transactionAmount
     * @property {string} name Category name
     * @property {boolean|null} [isIncome] Category isIncome
     * @property {boolean|null} [isExpense] Category isExpense
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
     * Category isVisible.
     * @member {boolean} isVisible
     * @memberof Category
     * @instance
     */
    Category.prototype.isVisible = true;

    /**
     * Category transactionAmount.
     * @member {number|Long} transactionAmount
     * @memberof Category
     * @instance
     */
    Category.prototype.transactionAmount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

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
     * Category isExpense.
     * @member {boolean} isExpense
     * @memberof Category
     * @instance
     */
    Category.prototype.isExpense = false;

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
        if (message.isExpense != null && message.hasOwnProperty("isExpense"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isExpense);
        if (message.transactionAmount != null && message.hasOwnProperty("transactionAmount"))
            writer.uint32(/* id 6, wireType 0 =*/48).int64(message.transactionAmount);
        if (message.isVisible != null && message.hasOwnProperty("isVisible"))
            writer.uint32(/* id 7, wireType 0 =*/56).bool(message.isVisible);
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
            case 7:
                message.isVisible = reader.bool();
                break;
            case 6:
                message.transactionAmount = reader.int64();
                break;
            case 3:
                message.name = reader.string();
                break;
            case 4:
                message.isIncome = reader.bool();
                break;
            case 5:
                message.isExpense = reader.bool();
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
        if (message.isVisible != null && message.hasOwnProperty("isVisible"))
            if (typeof message.isVisible !== "boolean")
                return "isVisible: boolean expected";
        if (message.transactionAmount != null && message.hasOwnProperty("transactionAmount"))
            if (!$util.isInteger(message.transactionAmount) && !(message.transactionAmount && $util.isInteger(message.transactionAmount.low) && $util.isInteger(message.transactionAmount.high)))
                return "transactionAmount: integer|Long expected";
        if (!$util.isString(message.name))
            return "name: string expected";
        if (message.isIncome != null && message.hasOwnProperty("isIncome"))
            if (typeof message.isIncome !== "boolean")
                return "isIncome: boolean expected";
        if (message.isExpense != null && message.hasOwnProperty("isExpense"))
            if (typeof message.isExpense !== "boolean")
                return "isExpense: boolean expected";
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
        if (object.isVisible != null)
            message.isVisible = Boolean(object.isVisible);
        if (object.transactionAmount != null)
            if ($util.Long)
                (message.transactionAmount = $util.Long.fromValue(object.transactionAmount)).unsigned = false;
            else if (typeof object.transactionAmount === "string")
                message.transactionAmount = parseInt(object.transactionAmount, 10);
            else if (typeof object.transactionAmount === "number")
                message.transactionAmount = object.transactionAmount;
            else if (typeof object.transactionAmount === "object")
                message.transactionAmount = new $util.LongBits(object.transactionAmount.low >>> 0, object.transactionAmount.high >>> 0).toNumber();
        if (object.name != null)
            message.name = String(object.name);
        if (object.isIncome != null)
            message.isIncome = Boolean(object.isIncome);
        if (object.isExpense != null)
            message.isExpense = Boolean(object.isExpense);
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
            object.isExpense = false;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.transactionAmount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.transactionAmount = options.longs === String ? "0" : 0;
            object.isVisible = true;
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
        if (message.isExpense != null && message.hasOwnProperty("isExpense"))
            object.isExpense = message.isExpense;
        if (message.transactionAmount != null && message.hasOwnProperty("transactionAmount"))
            if (typeof message.transactionAmount === "number")
                object.transactionAmount = options.longs === String ? String(message.transactionAmount) : message.transactionAmount;
            else
                object.transactionAmount = options.longs === String ? $util.Long.prototype.toString.call(message.transactionAmount) : options.longs === Number ? new $util.LongBits(message.transactionAmount.low >>> 0, message.transactionAmount.high >>> 0).toNumber() : message.transactionAmount;
        if (message.isVisible != null && message.hasOwnProperty("isVisible"))
            object.isVisible = message.isVisible;
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
     * @property {boolean|null} [isVisible] SubCategory isVisible
     * @property {number|Long|null} [transactionAmount] SubCategory transactionAmount
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
     * SubCategory isVisible.
     * @member {boolean} isVisible
     * @memberof SubCategory
     * @instance
     */
    SubCategory.prototype.isVisible = true;

    /**
     * SubCategory transactionAmount.
     * @member {number|Long} transactionAmount
     * @memberof SubCategory
     * @instance
     */
    SubCategory.prototype.transactionAmount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

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
        if (message.transactionAmount != null && message.hasOwnProperty("transactionAmount"))
            writer.uint32(/* id 5, wireType 0 =*/40).int64(message.transactionAmount);
        if (message.isVisible != null && message.hasOwnProperty("isVisible"))
            writer.uint32(/* id 6, wireType 0 =*/48).bool(message.isVisible);
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
            case 6:
                message.isVisible = reader.bool();
                break;
            case 5:
                message.transactionAmount = reader.int64();
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
        if (message.isVisible != null && message.hasOwnProperty("isVisible"))
            if (typeof message.isVisible !== "boolean")
                return "isVisible: boolean expected";
        if (message.transactionAmount != null && message.hasOwnProperty("transactionAmount"))
            if (!$util.isInteger(message.transactionAmount) && !(message.transactionAmount && $util.isInteger(message.transactionAmount.low) && $util.isInteger(message.transactionAmount.high)))
                return "transactionAmount: integer|Long expected";
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
        if (object.isVisible != null)
            message.isVisible = Boolean(object.isVisible);
        if (object.transactionAmount != null)
            if ($util.Long)
                (message.transactionAmount = $util.Long.fromValue(object.transactionAmount)).unsigned = false;
            else if (typeof object.transactionAmount === "string")
                message.transactionAmount = parseInt(object.transactionAmount, 10);
            else if (typeof object.transactionAmount === "number")
                message.transactionAmount = object.transactionAmount;
            else if (typeof object.transactionAmount === "object")
                message.transactionAmount = new $util.LongBits(object.transactionAmount.low >>> 0, object.transactionAmount.high >>> 0).toNumber();
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
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.transactionAmount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.transactionAmount = options.longs === String ? "0" : 0;
            object.isVisible = true;
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
        if (message.transactionAmount != null && message.hasOwnProperty("transactionAmount"))
            if (typeof message.transactionAmount === "number")
                object.transactionAmount = options.longs === String ? String(message.transactionAmount) : message.transactionAmount;
            else
                object.transactionAmount = options.longs === String ? $util.Long.prototype.toString.call(message.transactionAmount) : options.longs === Number ? new $util.LongBits(message.transactionAmount.low >>> 0, message.transactionAmount.high >>> 0).toNumber() : message.transactionAmount;
        if (message.isVisible != null && message.hasOwnProperty("isVisible"))
            object.isVisible = message.isVisible;
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
     * @property {boolean|null} [isVisible] FamilyMember isVisible
     * @property {number|Long|null} [transactionAmount] FamilyMember transactionAmount
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
     * FamilyMember isVisible.
     * @member {boolean} isVisible
     * @memberof FamilyMember
     * @instance
     */
    FamilyMember.prototype.isVisible = true;

    /**
     * FamilyMember transactionAmount.
     * @member {number|Long} transactionAmount
     * @memberof FamilyMember
     * @instance
     */
    FamilyMember.prototype.transactionAmount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

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
        if (message.transactionAmount != null && message.hasOwnProperty("transactionAmount"))
            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.transactionAmount);
        if (message.isVisible != null && message.hasOwnProperty("isVisible"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isVisible);
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
            case 5:
                message.isVisible = reader.bool();
                break;
            case 4:
                message.transactionAmount = reader.int64();
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
        if (message.isVisible != null && message.hasOwnProperty("isVisible"))
            if (typeof message.isVisible !== "boolean")
                return "isVisible: boolean expected";
        if (message.transactionAmount != null && message.hasOwnProperty("transactionAmount"))
            if (!$util.isInteger(message.transactionAmount) && !(message.transactionAmount && $util.isInteger(message.transactionAmount.low) && $util.isInteger(message.transactionAmount.high)))
                return "transactionAmount: integer|Long expected";
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
        if (object.isVisible != null)
            message.isVisible = Boolean(object.isVisible);
        if (object.transactionAmount != null)
            if ($util.Long)
                (message.transactionAmount = $util.Long.fromValue(object.transactionAmount)).unsigned = false;
            else if (typeof object.transactionAmount === "string")
                message.transactionAmount = parseInt(object.transactionAmount, 10);
            else if (typeof object.transactionAmount === "number")
                message.transactionAmount = object.transactionAmount;
            else if (typeof object.transactionAmount === "object")
                message.transactionAmount = new $util.LongBits(object.transactionAmount.low >>> 0, object.transactionAmount.high >>> 0).toNumber();
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
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.transactionAmount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.transactionAmount = options.longs === String ? "0" : 0;
            object.isVisible = true;
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
        if (message.transactionAmount != null && message.hasOwnProperty("transactionAmount"))
            if (typeof message.transactionAmount === "number")
                object.transactionAmount = options.longs === String ? String(message.transactionAmount) : message.transactionAmount;
            else
                object.transactionAmount = options.longs === String ? $util.Long.prototype.toString.call(message.transactionAmount) : options.longs === Number ? new $util.LongBits(message.transactionAmount.low >>> 0, message.transactionAmount.high >>> 0).toNumber() : message.transactionAmount;
        if (message.isVisible != null && message.hasOwnProperty("isVisible"))
            object.isVisible = message.isVisible;
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
     * @property {string} created Transaction created
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
     * @member {string} created
     * @memberof Transaction
     * @instance
     */
    Transaction.prototype.created = "";

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
        writer.uint32(/* id 3, wireType 2 =*/26).string(message.created);
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
                message.created = reader.string();
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
        if (!$util.isString(message.created))
            return "created: string expected";
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
        if (object.created != null)
            message.created = String(object.created);
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
            object.created = "";
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
            object.created = message.created;
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

    /**
     * Type enum.
     * @name Transaction.Type
     * @enum {string}
     * @property {number} UNDEFINED=0 UNDEFINED value
     * @property {number} INCOME=1 INCOME value
     * @property {number} EXPENSE=2 EXPENSE value
     * @property {number} TRANSFER=3 TRANSFER value
     */
    Transaction.Type = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNDEFINED"] = 0;
        values[valuesById[1] = "INCOME"] = 1;
        values[valuesById[2] = "EXPENSE"] = 2;
        values[valuesById[3] = "TRANSFER"] = 3;
        return values;
    })();

    return Transaction;
})();

$root.Settings = (function() {

    /**
     * Properties of a Settings.
     * @exports ISettings
     * @interface ISettings
     * @property {number|Long|null} [id] Settings id
     * @property {Settings.Language|null} [language] Settings language
     * @property {number|Long|null} [currencyId] Settings currencyId
     */

    /**
     * Constructs a new Settings.
     * @exports Settings
     * @classdesc Represents a Settings.
     * @implements ISettings
     * @constructor
     * @param {ISettings=} [properties] Properties to set
     */
    function Settings(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Settings id.
     * @member {number|Long} id
     * @memberof Settings
     * @instance
     */
    Settings.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Settings language.
     * @member {Settings.Language} language
     * @memberof Settings
     * @instance
     */
    Settings.prototype.language = 0;

    /**
     * Settings currencyId.
     * @member {number|Long} currencyId
     * @memberof Settings
     * @instance
     */
    Settings.prototype.currencyId = $util.Long ? $util.Long.fromBits(1,0,false) : 1;

    /**
     * Creates a new Settings instance using the specified properties.
     * @function create
     * @memberof Settings
     * @static
     * @param {ISettings=} [properties] Properties to set
     * @returns {Settings} Settings instance
     */
    Settings.create = function create(properties) {
        return new Settings(properties);
    };

    /**
     * Encodes the specified Settings message. Does not implicitly {@link Settings.verify|verify} messages.
     * @function encode
     * @memberof Settings
     * @static
     * @param {ISettings} message Settings message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Settings.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
        if (message.language != null && message.hasOwnProperty("language"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.language);
        if (message.currencyId != null && message.hasOwnProperty("currencyId"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.currencyId);
        return writer;
    };

    /**
     * Encodes the specified Settings message, length delimited. Does not implicitly {@link Settings.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Settings
     * @static
     * @param {ISettings} message Settings message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Settings.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Settings message from the specified reader or buffer.
     * @function decode
     * @memberof Settings
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Settings} Settings
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Settings.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Settings();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.int64();
                break;
            case 2:
                message.language = reader.int32();
                break;
            case 3:
                message.currencyId = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Settings message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Settings
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Settings} Settings
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Settings.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Settings message.
     * @function verify
     * @memberof Settings
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Settings.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                return "id: integer|Long expected";
        if (message.language != null && message.hasOwnProperty("language"))
            switch (message.language) {
            default:
                return "language: enum value expected";
            case 0:
            case 1:
                break;
            }
        if (message.currencyId != null && message.hasOwnProperty("currencyId"))
            if (!$util.isInteger(message.currencyId) && !(message.currencyId && $util.isInteger(message.currencyId.low) && $util.isInteger(message.currencyId.high)))
                return "currencyId: integer|Long expected";
        return null;
    };

    /**
     * Creates a Settings message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Settings
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Settings} Settings
     */
    Settings.fromObject = function fromObject(object) {
        if (object instanceof $root.Settings)
            return object;
        var message = new $root.Settings();
        if (object.id != null)
            if ($util.Long)
                (message.id = $util.Long.fromValue(object.id)).unsigned = false;
            else if (typeof object.id === "string")
                message.id = parseInt(object.id, 10);
            else if (typeof object.id === "number")
                message.id = object.id;
            else if (typeof object.id === "object")
                message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
        switch (object.language) {
        case "RU":
        case 0:
            message.language = 0;
            break;
        case "EN":
        case 1:
            message.language = 1;
            break;
        }
        if (object.currencyId != null)
            if ($util.Long)
                (message.currencyId = $util.Long.fromValue(object.currencyId)).unsigned = false;
            else if (typeof object.currencyId === "string")
                message.currencyId = parseInt(object.currencyId, 10);
            else if (typeof object.currencyId === "number")
                message.currencyId = object.currencyId;
            else if (typeof object.currencyId === "object")
                message.currencyId = new $util.LongBits(object.currencyId.low >>> 0, object.currencyId.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a Settings message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Settings
     * @static
     * @param {Settings} message Settings
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Settings.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.id = options.longs === String ? "0" : 0;
            object.language = options.enums === String ? "RU" : 0;
            if ($util.Long) {
                var long = new $util.Long(1, 0, false);
                object.currencyId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.currencyId = options.longs === String ? "1" : 1;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            if (typeof message.id === "number")
                object.id = options.longs === String ? String(message.id) : message.id;
            else
                object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
        if (message.language != null && message.hasOwnProperty("language"))
            object.language = options.enums === String ? $root.Settings.Language[message.language] : message.language;
        if (message.currencyId != null && message.hasOwnProperty("currencyId"))
            if (typeof message.currencyId === "number")
                object.currencyId = options.longs === String ? String(message.currencyId) : message.currencyId;
            else
                object.currencyId = options.longs === String ? $util.Long.prototype.toString.call(message.currencyId) : options.longs === Number ? new $util.LongBits(message.currencyId.low >>> 0, message.currencyId.high >>> 0).toNumber() : message.currencyId;
        return object;
    };

    /**
     * Converts this Settings to JSON.
     * @function toJSON
     * @memberof Settings
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Settings.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Language enum.
     * @name Settings.Language
     * @enum {string}
     * @property {number} RU=0 RU value
     * @property {number} EN=1 EN value
     */
    Settings.Language = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "RU"] = 0;
        values[valuesById[1] = "EN"] = 1;
        return values;
    })();

    return Settings;
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

$root.CategorySummary = (function() {

    /**
     * Properties of a CategorySummary.
     * @exports ICategorySummary
     * @interface ICategorySummary
     * @property {ICategory} category CategorySummary category
     * @property {Array.<number|Long>|null} [amount] CategorySummary amount
     */

    /**
     * Constructs a new CategorySummary.
     * @exports CategorySummary
     * @classdesc Represents a CategorySummary.
     * @implements ICategorySummary
     * @constructor
     * @param {ICategorySummary=} [properties] Properties to set
     */
    function CategorySummary(properties) {
        this.amount = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CategorySummary category.
     * @member {ICategory} category
     * @memberof CategorySummary
     * @instance
     */
    CategorySummary.prototype.category = null;

    /**
     * CategorySummary amount.
     * @member {Array.<number|Long>} amount
     * @memberof CategorySummary
     * @instance
     */
    CategorySummary.prototype.amount = $util.emptyArray;

    /**
     * Creates a new CategorySummary instance using the specified properties.
     * @function create
     * @memberof CategorySummary
     * @static
     * @param {ICategorySummary=} [properties] Properties to set
     * @returns {CategorySummary} CategorySummary instance
     */
    CategorySummary.create = function create(properties) {
        return new CategorySummary(properties);
    };

    /**
     * Encodes the specified CategorySummary message. Does not implicitly {@link CategorySummary.verify|verify} messages.
     * @function encode
     * @memberof CategorySummary
     * @static
     * @param {ICategorySummary} message CategorySummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CategorySummary.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        $root.Category.encode(message.category, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.amount != null && message.amount.length)
            for (var i = 0; i < message.amount.length; ++i)
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.amount[i]);
        return writer;
    };

    /**
     * Encodes the specified CategorySummary message, length delimited. Does not implicitly {@link CategorySummary.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CategorySummary
     * @static
     * @param {ICategorySummary} message CategorySummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CategorySummary.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CategorySummary message from the specified reader or buffer.
     * @function decode
     * @memberof CategorySummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CategorySummary} CategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CategorySummary.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CategorySummary();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.category = $root.Category.decode(reader, reader.uint32());
                break;
            case 2:
                if (!(message.amount && message.amount.length))
                    message.amount = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.amount.push(reader.int64());
                } else
                    message.amount.push(reader.int64());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("category"))
            throw $util.ProtocolError("missing required 'category'", { instance: message });
        return message;
    };

    /**
     * Decodes a CategorySummary message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CategorySummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CategorySummary} CategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CategorySummary.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CategorySummary message.
     * @function verify
     * @memberof CategorySummary
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CategorySummary.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        {
            var error = $root.Category.verify(message.category);
            if (error)
                return "category." + error;
        }
        if (message.amount != null && message.hasOwnProperty("amount")) {
            if (!Array.isArray(message.amount))
                return "amount: array expected";
            for (var i = 0; i < message.amount.length; ++i)
                if (!$util.isInteger(message.amount[i]) && !(message.amount[i] && $util.isInteger(message.amount[i].low) && $util.isInteger(message.amount[i].high)))
                    return "amount: integer|Long[] expected";
        }
        return null;
    };

    /**
     * Creates a CategorySummary message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CategorySummary
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CategorySummary} CategorySummary
     */
    CategorySummary.fromObject = function fromObject(object) {
        if (object instanceof $root.CategorySummary)
            return object;
        var message = new $root.CategorySummary();
        if (object.category != null) {
            if (typeof object.category !== "object")
                throw TypeError(".CategorySummary.category: object expected");
            message.category = $root.Category.fromObject(object.category);
        }
        if (object.amount) {
            if (!Array.isArray(object.amount))
                throw TypeError(".CategorySummary.amount: array expected");
            message.amount = [];
            for (var i = 0; i < object.amount.length; ++i)
                if ($util.Long)
                    (message.amount[i] = $util.Long.fromValue(object.amount[i])).unsigned = false;
                else if (typeof object.amount[i] === "string")
                    message.amount[i] = parseInt(object.amount[i], 10);
                else if (typeof object.amount[i] === "number")
                    message.amount[i] = object.amount[i];
                else if (typeof object.amount[i] === "object")
                    message.amount[i] = new $util.LongBits(object.amount[i].low >>> 0, object.amount[i].high >>> 0).toNumber();
        }
        return message;
    };

    /**
     * Creates a plain object from a CategorySummary message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CategorySummary
     * @static
     * @param {CategorySummary} message CategorySummary
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CategorySummary.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.amount = [];
        if (options.defaults)
            object.category = null;
        if (message.category != null && message.hasOwnProperty("category"))
            object.category = $root.Category.toObject(message.category, options);
        if (message.amount && message.amount.length) {
            object.amount = [];
            for (var j = 0; j < message.amount.length; ++j)
                if (typeof message.amount[j] === "number")
                    object.amount[j] = options.longs === String ? String(message.amount[j]) : message.amount[j];
                else
                    object.amount[j] = options.longs === String ? $util.Long.prototype.toString.call(message.amount[j]) : options.longs === Number ? new $util.LongBits(message.amount[j].low >>> 0, message.amount[j].high >>> 0).toNumber() : message.amount[j];
        }
        return object;
    };

    /**
     * Converts this CategorySummary to JSON.
     * @function toJSON
     * @memberof CategorySummary
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CategorySummary.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CategorySummary;
})();

$root.SubCategorySummary = (function() {

    /**
     * Properties of a SubCategorySummary.
     * @exports ISubCategorySummary
     * @interface ISubCategorySummary
     * @property {ISubCategory} subCategory SubCategorySummary subCategory
     * @property {Array.<number|Long>|null} [amount] SubCategorySummary amount
     */

    /**
     * Constructs a new SubCategorySummary.
     * @exports SubCategorySummary
     * @classdesc Represents a SubCategorySummary.
     * @implements ISubCategorySummary
     * @constructor
     * @param {ISubCategorySummary=} [properties] Properties to set
     */
    function SubCategorySummary(properties) {
        this.amount = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SubCategorySummary subCategory.
     * @member {ISubCategory} subCategory
     * @memberof SubCategorySummary
     * @instance
     */
    SubCategorySummary.prototype.subCategory = null;

    /**
     * SubCategorySummary amount.
     * @member {Array.<number|Long>} amount
     * @memberof SubCategorySummary
     * @instance
     */
    SubCategorySummary.prototype.amount = $util.emptyArray;

    /**
     * Creates a new SubCategorySummary instance using the specified properties.
     * @function create
     * @memberof SubCategorySummary
     * @static
     * @param {ISubCategorySummary=} [properties] Properties to set
     * @returns {SubCategorySummary} SubCategorySummary instance
     */
    SubCategorySummary.create = function create(properties) {
        return new SubCategorySummary(properties);
    };

    /**
     * Encodes the specified SubCategorySummary message. Does not implicitly {@link SubCategorySummary.verify|verify} messages.
     * @function encode
     * @memberof SubCategorySummary
     * @static
     * @param {ISubCategorySummary} message SubCategorySummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SubCategorySummary.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        $root.SubCategory.encode(message.subCategory, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.amount != null && message.amount.length)
            for (var i = 0; i < message.amount.length; ++i)
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.amount[i]);
        return writer;
    };

    /**
     * Encodes the specified SubCategorySummary message, length delimited. Does not implicitly {@link SubCategorySummary.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SubCategorySummary
     * @static
     * @param {ISubCategorySummary} message SubCategorySummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SubCategorySummary.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SubCategorySummary message from the specified reader or buffer.
     * @function decode
     * @memberof SubCategorySummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SubCategorySummary} SubCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SubCategorySummary.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SubCategorySummary();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.subCategory = $root.SubCategory.decode(reader, reader.uint32());
                break;
            case 2:
                if (!(message.amount && message.amount.length))
                    message.amount = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.amount.push(reader.int64());
                } else
                    message.amount.push(reader.int64());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("subCategory"))
            throw $util.ProtocolError("missing required 'subCategory'", { instance: message });
        return message;
    };

    /**
     * Decodes a SubCategorySummary message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SubCategorySummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SubCategorySummary} SubCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SubCategorySummary.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SubCategorySummary message.
     * @function verify
     * @memberof SubCategorySummary
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SubCategorySummary.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        {
            var error = $root.SubCategory.verify(message.subCategory);
            if (error)
                return "subCategory." + error;
        }
        if (message.amount != null && message.hasOwnProperty("amount")) {
            if (!Array.isArray(message.amount))
                return "amount: array expected";
            for (var i = 0; i < message.amount.length; ++i)
                if (!$util.isInteger(message.amount[i]) && !(message.amount[i] && $util.isInteger(message.amount[i].low) && $util.isInteger(message.amount[i].high)))
                    return "amount: integer|Long[] expected";
        }
        return null;
    };

    /**
     * Creates a SubCategorySummary message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SubCategorySummary
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SubCategorySummary} SubCategorySummary
     */
    SubCategorySummary.fromObject = function fromObject(object) {
        if (object instanceof $root.SubCategorySummary)
            return object;
        var message = new $root.SubCategorySummary();
        if (object.subCategory != null) {
            if (typeof object.subCategory !== "object")
                throw TypeError(".SubCategorySummary.subCategory: object expected");
            message.subCategory = $root.SubCategory.fromObject(object.subCategory);
        }
        if (object.amount) {
            if (!Array.isArray(object.amount))
                throw TypeError(".SubCategorySummary.amount: array expected");
            message.amount = [];
            for (var i = 0; i < object.amount.length; ++i)
                if ($util.Long)
                    (message.amount[i] = $util.Long.fromValue(object.amount[i])).unsigned = false;
                else if (typeof object.amount[i] === "string")
                    message.amount[i] = parseInt(object.amount[i], 10);
                else if (typeof object.amount[i] === "number")
                    message.amount[i] = object.amount[i];
                else if (typeof object.amount[i] === "object")
                    message.amount[i] = new $util.LongBits(object.amount[i].low >>> 0, object.amount[i].high >>> 0).toNumber();
        }
        return message;
    };

    /**
     * Creates a plain object from a SubCategorySummary message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SubCategorySummary
     * @static
     * @param {SubCategorySummary} message SubCategorySummary
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SubCategorySummary.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.amount = [];
        if (options.defaults)
            object.subCategory = null;
        if (message.subCategory != null && message.hasOwnProperty("subCategory"))
            object.subCategory = $root.SubCategory.toObject(message.subCategory, options);
        if (message.amount && message.amount.length) {
            object.amount = [];
            for (var j = 0; j < message.amount.length; ++j)
                if (typeof message.amount[j] === "number")
                    object.amount[j] = options.longs === String ? String(message.amount[j]) : message.amount[j];
                else
                    object.amount[j] = options.longs === String ? $util.Long.prototype.toString.call(message.amount[j]) : options.longs === Number ? new $util.LongBits(message.amount[j].low >>> 0, message.amount[j].high >>> 0).toNumber() : message.amount[j];
        }
        return object;
    };

    /**
     * Converts this SubCategorySummary to JSON.
     * @function toJSON
     * @memberof SubCategorySummary
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SubCategorySummary.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SubCategorySummary;
})();

$root.Date_ = (function() {

    /**
     * Properties of a Date_.
     * @exports IDate_
     * @interface IDate_
     * @property {number} year Date_ year
     * @property {number} month Date_ month
     * @property {number} day Date_ day
     */

    /**
     * Constructs a new Date_.
     * @exports Date_
     * @classdesc Represents a Date_.
     * @implements IDate_
     * @constructor
     * @param {IDate_=} [properties] Properties to set
     */
    function Date_(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Date_ year.
     * @member {number} year
     * @memberof Date_
     * @instance
     */
    Date_.prototype.year = 0;

    /**
     * Date_ month.
     * @member {number} month
     * @memberof Date_
     * @instance
     */
    Date_.prototype.month = 0;

    /**
     * Date_ day.
     * @member {number} day
     * @memberof Date_
     * @instance
     */
    Date_.prototype.day = 0;

    /**
     * Creates a new Date_ instance using the specified properties.
     * @function create
     * @memberof Date_
     * @static
     * @param {IDate_=} [properties] Properties to set
     * @returns {Date_} Date_ instance
     */
    Date_.create = function create(properties) {
        return new Date_(properties);
    };

    /**
     * Encodes the specified Date_ message. Does not implicitly {@link Date_.verify|verify} messages.
     * @function encode
     * @memberof Date_
     * @static
     * @param {IDate_} message Date_ message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Date_.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.year);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.month);
        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.day);
        return writer;
    };

    /**
     * Encodes the specified Date_ message, length delimited. Does not implicitly {@link Date_.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Date_
     * @static
     * @param {IDate_} message Date_ message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Date_.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Date_ message from the specified reader or buffer.
     * @function decode
     * @memberof Date_
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Date_} Date_
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Date_.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Date_();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.year = reader.int32();
                break;
            case 2:
                message.month = reader.int32();
                break;
            case 3:
                message.day = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("year"))
            throw $util.ProtocolError("missing required 'year'", { instance: message });
        if (!message.hasOwnProperty("month"))
            throw $util.ProtocolError("missing required 'month'", { instance: message });
        if (!message.hasOwnProperty("day"))
            throw $util.ProtocolError("missing required 'day'", { instance: message });
        return message;
    };

    /**
     * Decodes a Date_ message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Date_
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Date_} Date_
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Date_.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Date_ message.
     * @function verify
     * @memberof Date_
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Date_.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.year))
            return "year: integer expected";
        if (!$util.isInteger(message.month))
            return "month: integer expected";
        if (!$util.isInteger(message.day))
            return "day: integer expected";
        return null;
    };

    /**
     * Creates a Date_ message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Date_
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Date_} Date_
     */
    Date_.fromObject = function fromObject(object) {
        if (object instanceof $root.Date_)
            return object;
        var message = new $root.Date_();
        if (object.year != null)
            message.year = object.year | 0;
        if (object.month != null)
            message.month = object.month | 0;
        if (object.day != null)
            message.day = object.day | 0;
        return message;
    };

    /**
     * Creates a plain object from a Date_ message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Date_
     * @static
     * @param {Date_} message Date_
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Date_.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.year = 0;
            object.month = 0;
            object.day = 0;
        }
        if (message.year != null && message.hasOwnProperty("year"))
            object.year = message.year;
        if (message.month != null && message.hasOwnProperty("month"))
            object.month = message.month;
        if (message.day != null && message.hasOwnProperty("day"))
            object.day = message.day;
        return object;
    };

    /**
     * Converts this Date_ to JSON.
     * @function toJSON
     * @memberof Date_
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Date_.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Date_;
})();

$root.Month = (function() {

    /**
     * Properties of a Month.
     * @exports IMonth
     * @interface IMonth
     * @property {number} year Month year
     * @property {number} month Month month
     */

    /**
     * Constructs a new Month.
     * @exports Month
     * @classdesc Represents a Month.
     * @implements IMonth
     * @constructor
     * @param {IMonth=} [properties] Properties to set
     */
    function Month(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Month year.
     * @member {number} year
     * @memberof Month
     * @instance
     */
    Month.prototype.year = 0;

    /**
     * Month month.
     * @member {number} month
     * @memberof Month
     * @instance
     */
    Month.prototype.month = 0;

    /**
     * Creates a new Month instance using the specified properties.
     * @function create
     * @memberof Month
     * @static
     * @param {IMonth=} [properties] Properties to set
     * @returns {Month} Month instance
     */
    Month.create = function create(properties) {
        return new Month(properties);
    };

    /**
     * Encodes the specified Month message. Does not implicitly {@link Month.verify|verify} messages.
     * @function encode
     * @memberof Month
     * @static
     * @param {IMonth} message Month message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Month.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.year);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.month);
        return writer;
    };

    /**
     * Encodes the specified Month message, length delimited. Does not implicitly {@link Month.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Month
     * @static
     * @param {IMonth} message Month message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Month.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Month message from the specified reader or buffer.
     * @function decode
     * @memberof Month
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Month} Month
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Month.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Month();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.year = reader.int32();
                break;
            case 2:
                message.month = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("year"))
            throw $util.ProtocolError("missing required 'year'", { instance: message });
        if (!message.hasOwnProperty("month"))
            throw $util.ProtocolError("missing required 'month'", { instance: message });
        return message;
    };

    /**
     * Decodes a Month message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Month
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Month} Month
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Month.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Month message.
     * @function verify
     * @memberof Month
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Month.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.year))
            return "year: integer expected";
        if (!$util.isInteger(message.month))
            return "month: integer expected";
        return null;
    };

    /**
     * Creates a Month message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Month
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Month} Month
     */
    Month.fromObject = function fromObject(object) {
        if (object instanceof $root.Month)
            return object;
        var message = new $root.Month();
        if (object.year != null)
            message.year = object.year | 0;
        if (object.month != null)
            message.month = object.month | 0;
        return message;
    };

    /**
     * Creates a plain object from a Month message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Month
     * @static
     * @param {Month} message Month
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Month.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.year = 0;
            object.month = 0;
        }
        if (message.year != null && message.hasOwnProperty("year"))
            object.year = message.year;
        if (message.month != null && message.hasOwnProperty("month"))
            object.month = message.month;
        return object;
    };

    /**
     * Converts this Month to JSON.
     * @function toJSON
     * @memberof Month
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Month.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Month;
})();

$root.Year = (function() {

    /**
     * Properties of a Year.
     * @exports IYear
     * @interface IYear
     * @property {number} value Year value
     */

    /**
     * Constructs a new Year.
     * @exports Year
     * @classdesc Represents a Year.
     * @implements IYear
     * @constructor
     * @param {IYear=} [properties] Properties to set
     */
    function Year(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Year value.
     * @member {number} value
     * @memberof Year
     * @instance
     */
    Year.prototype.value = 0;

    /**
     * Creates a new Year instance using the specified properties.
     * @function create
     * @memberof Year
     * @static
     * @param {IYear=} [properties] Properties to set
     * @returns {Year} Year instance
     */
    Year.create = function create(properties) {
        return new Year(properties);
    };

    /**
     * Encodes the specified Year message. Does not implicitly {@link Year.verify|verify} messages.
     * @function encode
     * @memberof Year
     * @static
     * @param {IYear} message Year message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Year.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.value);
        return writer;
    };

    /**
     * Encodes the specified Year message, length delimited. Does not implicitly {@link Year.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Year
     * @static
     * @param {IYear} message Year message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Year.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Year message from the specified reader or buffer.
     * @function decode
     * @memberof Year
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Year} Year
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Year.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Year();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.value = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("value"))
            throw $util.ProtocolError("missing required 'value'", { instance: message });
        return message;
    };

    /**
     * Decodes a Year message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Year
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Year} Year
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Year.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Year message.
     * @function verify
     * @memberof Year
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Year.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.value))
            return "value: integer expected";
        return null;
    };

    /**
     * Creates a Year message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Year
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Year} Year
     */
    Year.fromObject = function fromObject(object) {
        if (object instanceof $root.Year)
            return object;
        var message = new $root.Year();
        if (object.value != null)
            message.value = object.value | 0;
        return message;
    };

    /**
     * Creates a plain object from a Year message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Year
     * @static
     * @param {Year} message Year
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Year.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.value = 0;
        if (message.value != null && message.hasOwnProperty("value"))
            object.value = message.value;
        return object;
    };

    /**
     * Converts this Year to JSON.
     * @function toJSON
     * @memberof Year
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Year.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Year;
})();

$root.DateSummary = (function() {

    /**
     * Properties of a DateSummary.
     * @exports IDateSummary
     * @interface IDateSummary
     * @property {IDate_} date DateSummary date
     * @property {Array.<number|Long>|null} [amount] DateSummary amount
     */

    /**
     * Constructs a new DateSummary.
     * @exports DateSummary
     * @classdesc Represents a DateSummary.
     * @implements IDateSummary
     * @constructor
     * @param {IDateSummary=} [properties] Properties to set
     */
    function DateSummary(properties) {
        this.amount = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DateSummary date.
     * @member {IDate_} date
     * @memberof DateSummary
     * @instance
     */
    DateSummary.prototype.date = null;

    /**
     * DateSummary amount.
     * @member {Array.<number|Long>} amount
     * @memberof DateSummary
     * @instance
     */
    DateSummary.prototype.amount = $util.emptyArray;

    /**
     * Creates a new DateSummary instance using the specified properties.
     * @function create
     * @memberof DateSummary
     * @static
     * @param {IDateSummary=} [properties] Properties to set
     * @returns {DateSummary} DateSummary instance
     */
    DateSummary.create = function create(properties) {
        return new DateSummary(properties);
    };

    /**
     * Encodes the specified DateSummary message. Does not implicitly {@link DateSummary.verify|verify} messages.
     * @function encode
     * @memberof DateSummary
     * @static
     * @param {IDateSummary} message DateSummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DateSummary.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        $root.Date_.encode(message.date, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.amount != null && message.amount.length)
            for (var i = 0; i < message.amount.length; ++i)
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.amount[i]);
        return writer;
    };

    /**
     * Encodes the specified DateSummary message, length delimited. Does not implicitly {@link DateSummary.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DateSummary
     * @static
     * @param {IDateSummary} message DateSummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DateSummary.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DateSummary message from the specified reader or buffer.
     * @function decode
     * @memberof DateSummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DateSummary} DateSummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DateSummary.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DateSummary();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.date = $root.Date_.decode(reader, reader.uint32());
                break;
            case 2:
                if (!(message.amount && message.amount.length))
                    message.amount = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.amount.push(reader.int64());
                } else
                    message.amount.push(reader.int64());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("date"))
            throw $util.ProtocolError("missing required 'date'", { instance: message });
        return message;
    };

    /**
     * Decodes a DateSummary message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DateSummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DateSummary} DateSummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DateSummary.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DateSummary message.
     * @function verify
     * @memberof DateSummary
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DateSummary.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        {
            var error = $root.Date_.verify(message.date);
            if (error)
                return "date." + error;
        }
        if (message.amount != null && message.hasOwnProperty("amount")) {
            if (!Array.isArray(message.amount))
                return "amount: array expected";
            for (var i = 0; i < message.amount.length; ++i)
                if (!$util.isInteger(message.amount[i]) && !(message.amount[i] && $util.isInteger(message.amount[i].low) && $util.isInteger(message.amount[i].high)))
                    return "amount: integer|Long[] expected";
        }
        return null;
    };

    /**
     * Creates a DateSummary message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DateSummary
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DateSummary} DateSummary
     */
    DateSummary.fromObject = function fromObject(object) {
        if (object instanceof $root.DateSummary)
            return object;
        var message = new $root.DateSummary();
        if (object.date != null) {
            if (typeof object.date !== "object")
                throw TypeError(".DateSummary.date: object expected");
            message.date = $root.Date_.fromObject(object.date);
        }
        if (object.amount) {
            if (!Array.isArray(object.amount))
                throw TypeError(".DateSummary.amount: array expected");
            message.amount = [];
            for (var i = 0; i < object.amount.length; ++i)
                if ($util.Long)
                    (message.amount[i] = $util.Long.fromValue(object.amount[i])).unsigned = false;
                else if (typeof object.amount[i] === "string")
                    message.amount[i] = parseInt(object.amount[i], 10);
                else if (typeof object.amount[i] === "number")
                    message.amount[i] = object.amount[i];
                else if (typeof object.amount[i] === "object")
                    message.amount[i] = new $util.LongBits(object.amount[i].low >>> 0, object.amount[i].high >>> 0).toNumber();
        }
        return message;
    };

    /**
     * Creates a plain object from a DateSummary message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DateSummary
     * @static
     * @param {DateSummary} message DateSummary
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DateSummary.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.amount = [];
        if (options.defaults)
            object.date = null;
        if (message.date != null && message.hasOwnProperty("date"))
            object.date = $root.Date_.toObject(message.date, options);
        if (message.amount && message.amount.length) {
            object.amount = [];
            for (var j = 0; j < message.amount.length; ++j)
                if (typeof message.amount[j] === "number")
                    object.amount[j] = options.longs === String ? String(message.amount[j]) : message.amount[j];
                else
                    object.amount[j] = options.longs === String ? $util.Long.prototype.toString.call(message.amount[j]) : options.longs === Number ? new $util.LongBits(message.amount[j].low >>> 0, message.amount[j].high >>> 0).toNumber() : message.amount[j];
        }
        return object;
    };

    /**
     * Converts this DateSummary to JSON.
     * @function toJSON
     * @memberof DateSummary
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DateSummary.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DateSummary;
})();

$root.DateCategorySummary = (function() {

    /**
     * Properties of a DateCategorySummary.
     * @exports IDateCategorySummary
     * @interface IDateCategorySummary
     * @property {IDate_} date DateCategorySummary date
     * @property {ICategory} category DateCategorySummary category
     * @property {Array.<number|Long>|null} [amount] DateCategorySummary amount
     */

    /**
     * Constructs a new DateCategorySummary.
     * @exports DateCategorySummary
     * @classdesc Represents a DateCategorySummary.
     * @implements IDateCategorySummary
     * @constructor
     * @param {IDateCategorySummary=} [properties] Properties to set
     */
    function DateCategorySummary(properties) {
        this.amount = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DateCategorySummary date.
     * @member {IDate_} date
     * @memberof DateCategorySummary
     * @instance
     */
    DateCategorySummary.prototype.date = null;

    /**
     * DateCategorySummary category.
     * @member {ICategory} category
     * @memberof DateCategorySummary
     * @instance
     */
    DateCategorySummary.prototype.category = null;

    /**
     * DateCategorySummary amount.
     * @member {Array.<number|Long>} amount
     * @memberof DateCategorySummary
     * @instance
     */
    DateCategorySummary.prototype.amount = $util.emptyArray;

    /**
     * Creates a new DateCategorySummary instance using the specified properties.
     * @function create
     * @memberof DateCategorySummary
     * @static
     * @param {IDateCategorySummary=} [properties] Properties to set
     * @returns {DateCategorySummary} DateCategorySummary instance
     */
    DateCategorySummary.create = function create(properties) {
        return new DateCategorySummary(properties);
    };

    /**
     * Encodes the specified DateCategorySummary message. Does not implicitly {@link DateCategorySummary.verify|verify} messages.
     * @function encode
     * @memberof DateCategorySummary
     * @static
     * @param {IDateCategorySummary} message DateCategorySummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DateCategorySummary.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        $root.Date_.encode(message.date, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        $root.Category.encode(message.category, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.amount != null && message.amount.length)
            for (var i = 0; i < message.amount.length; ++i)
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.amount[i]);
        return writer;
    };

    /**
     * Encodes the specified DateCategorySummary message, length delimited. Does not implicitly {@link DateCategorySummary.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DateCategorySummary
     * @static
     * @param {IDateCategorySummary} message DateCategorySummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DateCategorySummary.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DateCategorySummary message from the specified reader or buffer.
     * @function decode
     * @memberof DateCategorySummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DateCategorySummary} DateCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DateCategorySummary.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DateCategorySummary();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.date = $root.Date_.decode(reader, reader.uint32());
                break;
            case 2:
                message.category = $root.Category.decode(reader, reader.uint32());
                break;
            case 3:
                if (!(message.amount && message.amount.length))
                    message.amount = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.amount.push(reader.int64());
                } else
                    message.amount.push(reader.int64());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("date"))
            throw $util.ProtocolError("missing required 'date'", { instance: message });
        if (!message.hasOwnProperty("category"))
            throw $util.ProtocolError("missing required 'category'", { instance: message });
        return message;
    };

    /**
     * Decodes a DateCategorySummary message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DateCategorySummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DateCategorySummary} DateCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DateCategorySummary.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DateCategorySummary message.
     * @function verify
     * @memberof DateCategorySummary
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DateCategorySummary.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        {
            var error = $root.Date_.verify(message.date);
            if (error)
                return "date." + error;
        }
        {
            var error = $root.Category.verify(message.category);
            if (error)
                return "category." + error;
        }
        if (message.amount != null && message.hasOwnProperty("amount")) {
            if (!Array.isArray(message.amount))
                return "amount: array expected";
            for (var i = 0; i < message.amount.length; ++i)
                if (!$util.isInteger(message.amount[i]) && !(message.amount[i] && $util.isInteger(message.amount[i].low) && $util.isInteger(message.amount[i].high)))
                    return "amount: integer|Long[] expected";
        }
        return null;
    };

    /**
     * Creates a DateCategorySummary message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DateCategorySummary
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DateCategorySummary} DateCategorySummary
     */
    DateCategorySummary.fromObject = function fromObject(object) {
        if (object instanceof $root.DateCategorySummary)
            return object;
        var message = new $root.DateCategorySummary();
        if (object.date != null) {
            if (typeof object.date !== "object")
                throw TypeError(".DateCategorySummary.date: object expected");
            message.date = $root.Date_.fromObject(object.date);
        }
        if (object.category != null) {
            if (typeof object.category !== "object")
                throw TypeError(".DateCategorySummary.category: object expected");
            message.category = $root.Category.fromObject(object.category);
        }
        if (object.amount) {
            if (!Array.isArray(object.amount))
                throw TypeError(".DateCategorySummary.amount: array expected");
            message.amount = [];
            for (var i = 0; i < object.amount.length; ++i)
                if ($util.Long)
                    (message.amount[i] = $util.Long.fromValue(object.amount[i])).unsigned = false;
                else if (typeof object.amount[i] === "string")
                    message.amount[i] = parseInt(object.amount[i], 10);
                else if (typeof object.amount[i] === "number")
                    message.amount[i] = object.amount[i];
                else if (typeof object.amount[i] === "object")
                    message.amount[i] = new $util.LongBits(object.amount[i].low >>> 0, object.amount[i].high >>> 0).toNumber();
        }
        return message;
    };

    /**
     * Creates a plain object from a DateCategorySummary message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DateCategorySummary
     * @static
     * @param {DateCategorySummary} message DateCategorySummary
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DateCategorySummary.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.amount = [];
        if (options.defaults) {
            object.date = null;
            object.category = null;
        }
        if (message.date != null && message.hasOwnProperty("date"))
            object.date = $root.Date_.toObject(message.date, options);
        if (message.category != null && message.hasOwnProperty("category"))
            object.category = $root.Category.toObject(message.category, options);
        if (message.amount && message.amount.length) {
            object.amount = [];
            for (var j = 0; j < message.amount.length; ++j)
                if (typeof message.amount[j] === "number")
                    object.amount[j] = options.longs === String ? String(message.amount[j]) : message.amount[j];
                else
                    object.amount[j] = options.longs === String ? $util.Long.prototype.toString.call(message.amount[j]) : options.longs === Number ? new $util.LongBits(message.amount[j].low >>> 0, message.amount[j].high >>> 0).toNumber() : message.amount[j];
        }
        return object;
    };

    /**
     * Converts this DateCategorySummary to JSON.
     * @function toJSON
     * @memberof DateCategorySummary
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DateCategorySummary.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DateCategorySummary;
})();

$root.DateCategorySummaries = (function() {

    /**
     * Properties of a DateCategorySummaries.
     * @exports IDateCategorySummaries
     * @interface IDateCategorySummaries
     * @property {ICurrency} currency DateCategorySummaries currency
     * @property {Array.<ICategory>|null} [categories] DateCategorySummaries categories
     * @property {Array.<IDate_>|null} [dates] DateCategorySummaries dates
     * @property {Array.<IDateSummary>|null} [dateSummaries] DateCategorySummaries dateSummaries
     * @property {Array.<ICategorySummary>|null} [categorySummaries] DateCategorySummaries categorySummaries
     * @property {Array.<IDateCategorySummary>|null} [dateCategorySummaries] DateCategorySummaries dateCategorySummaries
     * @property {number|Long} income DateCategorySummaries income
     * @property {number|Long} expense DateCategorySummaries expense
     */

    /**
     * Constructs a new DateCategorySummaries.
     * @exports DateCategorySummaries
     * @classdesc Represents a DateCategorySummaries.
     * @implements IDateCategorySummaries
     * @constructor
     * @param {IDateCategorySummaries=} [properties] Properties to set
     */
    function DateCategorySummaries(properties) {
        this.categories = [];
        this.dates = [];
        this.dateSummaries = [];
        this.categorySummaries = [];
        this.dateCategorySummaries = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DateCategorySummaries currency.
     * @member {ICurrency} currency
     * @memberof DateCategorySummaries
     * @instance
     */
    DateCategorySummaries.prototype.currency = null;

    /**
     * DateCategorySummaries categories.
     * @member {Array.<ICategory>} categories
     * @memberof DateCategorySummaries
     * @instance
     */
    DateCategorySummaries.prototype.categories = $util.emptyArray;

    /**
     * DateCategorySummaries dates.
     * @member {Array.<IDate_>} dates
     * @memberof DateCategorySummaries
     * @instance
     */
    DateCategorySummaries.prototype.dates = $util.emptyArray;

    /**
     * DateCategorySummaries dateSummaries.
     * @member {Array.<IDateSummary>} dateSummaries
     * @memberof DateCategorySummaries
     * @instance
     */
    DateCategorySummaries.prototype.dateSummaries = $util.emptyArray;

    /**
     * DateCategorySummaries categorySummaries.
     * @member {Array.<ICategorySummary>} categorySummaries
     * @memberof DateCategorySummaries
     * @instance
     */
    DateCategorySummaries.prototype.categorySummaries = $util.emptyArray;

    /**
     * DateCategorySummaries dateCategorySummaries.
     * @member {Array.<IDateCategorySummary>} dateCategorySummaries
     * @memberof DateCategorySummaries
     * @instance
     */
    DateCategorySummaries.prototype.dateCategorySummaries = $util.emptyArray;

    /**
     * DateCategorySummaries income.
     * @member {number|Long} income
     * @memberof DateCategorySummaries
     * @instance
     */
    DateCategorySummaries.prototype.income = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * DateCategorySummaries expense.
     * @member {number|Long} expense
     * @memberof DateCategorySummaries
     * @instance
     */
    DateCategorySummaries.prototype.expense = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new DateCategorySummaries instance using the specified properties.
     * @function create
     * @memberof DateCategorySummaries
     * @static
     * @param {IDateCategorySummaries=} [properties] Properties to set
     * @returns {DateCategorySummaries} DateCategorySummaries instance
     */
    DateCategorySummaries.create = function create(properties) {
        return new DateCategorySummaries(properties);
    };

    /**
     * Encodes the specified DateCategorySummaries message. Does not implicitly {@link DateCategorySummaries.verify|verify} messages.
     * @function encode
     * @memberof DateCategorySummaries
     * @static
     * @param {IDateCategorySummaries} message DateCategorySummaries message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DateCategorySummaries.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        $root.Currency.encode(message.currency, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.categories != null && message.categories.length)
            for (var i = 0; i < message.categories.length; ++i)
                $root.Category.encode(message.categories[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.dates != null && message.dates.length)
            for (var i = 0; i < message.dates.length; ++i)
                $root.Date_.encode(message.dates[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.dateSummaries != null && message.dateSummaries.length)
            for (var i = 0; i < message.dateSummaries.length; ++i)
                $root.DateSummary.encode(message.dateSummaries[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.categorySummaries != null && message.categorySummaries.length)
            for (var i = 0; i < message.categorySummaries.length; ++i)
                $root.CategorySummary.encode(message.categorySummaries[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.dateCategorySummaries != null && message.dateCategorySummaries.length)
            for (var i = 0; i < message.dateCategorySummaries.length; ++i)
                $root.DateCategorySummary.encode(message.dateCategorySummaries[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        writer.uint32(/* id 7, wireType 0 =*/56).int64(message.income);
        writer.uint32(/* id 8, wireType 0 =*/64).int64(message.expense);
        return writer;
    };

    /**
     * Encodes the specified DateCategorySummaries message, length delimited. Does not implicitly {@link DateCategorySummaries.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DateCategorySummaries
     * @static
     * @param {IDateCategorySummaries} message DateCategorySummaries message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DateCategorySummaries.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DateCategorySummaries message from the specified reader or buffer.
     * @function decode
     * @memberof DateCategorySummaries
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DateCategorySummaries} DateCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DateCategorySummaries.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DateCategorySummaries();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.currency = $root.Currency.decode(reader, reader.uint32());
                break;
            case 2:
                if (!(message.categories && message.categories.length))
                    message.categories = [];
                message.categories.push($root.Category.decode(reader, reader.uint32()));
                break;
            case 3:
                if (!(message.dates && message.dates.length))
                    message.dates = [];
                message.dates.push($root.Date_.decode(reader, reader.uint32()));
                break;
            case 4:
                if (!(message.dateSummaries && message.dateSummaries.length))
                    message.dateSummaries = [];
                message.dateSummaries.push($root.DateSummary.decode(reader, reader.uint32()));
                break;
            case 5:
                if (!(message.categorySummaries && message.categorySummaries.length))
                    message.categorySummaries = [];
                message.categorySummaries.push($root.CategorySummary.decode(reader, reader.uint32()));
                break;
            case 6:
                if (!(message.dateCategorySummaries && message.dateCategorySummaries.length))
                    message.dateCategorySummaries = [];
                message.dateCategorySummaries.push($root.DateCategorySummary.decode(reader, reader.uint32()));
                break;
            case 7:
                message.income = reader.int64();
                break;
            case 8:
                message.expense = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("currency"))
            throw $util.ProtocolError("missing required 'currency'", { instance: message });
        if (!message.hasOwnProperty("income"))
            throw $util.ProtocolError("missing required 'income'", { instance: message });
        if (!message.hasOwnProperty("expense"))
            throw $util.ProtocolError("missing required 'expense'", { instance: message });
        return message;
    };

    /**
     * Decodes a DateCategorySummaries message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DateCategorySummaries
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DateCategorySummaries} DateCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DateCategorySummaries.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DateCategorySummaries message.
     * @function verify
     * @memberof DateCategorySummaries
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DateCategorySummaries.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        {
            var error = $root.Currency.verify(message.currency);
            if (error)
                return "currency." + error;
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
        if (message.dates != null && message.hasOwnProperty("dates")) {
            if (!Array.isArray(message.dates))
                return "dates: array expected";
            for (var i = 0; i < message.dates.length; ++i) {
                var error = $root.Date_.verify(message.dates[i]);
                if (error)
                    return "dates." + error;
            }
        }
        if (message.dateSummaries != null && message.hasOwnProperty("dateSummaries")) {
            if (!Array.isArray(message.dateSummaries))
                return "dateSummaries: array expected";
            for (var i = 0; i < message.dateSummaries.length; ++i) {
                var error = $root.DateSummary.verify(message.dateSummaries[i]);
                if (error)
                    return "dateSummaries." + error;
            }
        }
        if (message.categorySummaries != null && message.hasOwnProperty("categorySummaries")) {
            if (!Array.isArray(message.categorySummaries))
                return "categorySummaries: array expected";
            for (var i = 0; i < message.categorySummaries.length; ++i) {
                var error = $root.CategorySummary.verify(message.categorySummaries[i]);
                if (error)
                    return "categorySummaries." + error;
            }
        }
        if (message.dateCategorySummaries != null && message.hasOwnProperty("dateCategorySummaries")) {
            if (!Array.isArray(message.dateCategorySummaries))
                return "dateCategorySummaries: array expected";
            for (var i = 0; i < message.dateCategorySummaries.length; ++i) {
                var error = $root.DateCategorySummary.verify(message.dateCategorySummaries[i]);
                if (error)
                    return "dateCategorySummaries." + error;
            }
        }
        if (!$util.isInteger(message.income) && !(message.income && $util.isInteger(message.income.low) && $util.isInteger(message.income.high)))
            return "income: integer|Long expected";
        if (!$util.isInteger(message.expense) && !(message.expense && $util.isInteger(message.expense.low) && $util.isInteger(message.expense.high)))
            return "expense: integer|Long expected";
        return null;
    };

    /**
     * Creates a DateCategorySummaries message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DateCategorySummaries
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DateCategorySummaries} DateCategorySummaries
     */
    DateCategorySummaries.fromObject = function fromObject(object) {
        if (object instanceof $root.DateCategorySummaries)
            return object;
        var message = new $root.DateCategorySummaries();
        if (object.currency != null) {
            if (typeof object.currency !== "object")
                throw TypeError(".DateCategorySummaries.currency: object expected");
            message.currency = $root.Currency.fromObject(object.currency);
        }
        if (object.categories) {
            if (!Array.isArray(object.categories))
                throw TypeError(".DateCategorySummaries.categories: array expected");
            message.categories = [];
            for (var i = 0; i < object.categories.length; ++i) {
                if (typeof object.categories[i] !== "object")
                    throw TypeError(".DateCategorySummaries.categories: object expected");
                message.categories[i] = $root.Category.fromObject(object.categories[i]);
            }
        }
        if (object.dates) {
            if (!Array.isArray(object.dates))
                throw TypeError(".DateCategorySummaries.dates: array expected");
            message.dates = [];
            for (var i = 0; i < object.dates.length; ++i) {
                if (typeof object.dates[i] !== "object")
                    throw TypeError(".DateCategorySummaries.dates: object expected");
                message.dates[i] = $root.Date_.fromObject(object.dates[i]);
            }
        }
        if (object.dateSummaries) {
            if (!Array.isArray(object.dateSummaries))
                throw TypeError(".DateCategorySummaries.dateSummaries: array expected");
            message.dateSummaries = [];
            for (var i = 0; i < object.dateSummaries.length; ++i) {
                if (typeof object.dateSummaries[i] !== "object")
                    throw TypeError(".DateCategorySummaries.dateSummaries: object expected");
                message.dateSummaries[i] = $root.DateSummary.fromObject(object.dateSummaries[i]);
            }
        }
        if (object.categorySummaries) {
            if (!Array.isArray(object.categorySummaries))
                throw TypeError(".DateCategorySummaries.categorySummaries: array expected");
            message.categorySummaries = [];
            for (var i = 0; i < object.categorySummaries.length; ++i) {
                if (typeof object.categorySummaries[i] !== "object")
                    throw TypeError(".DateCategorySummaries.categorySummaries: object expected");
                message.categorySummaries[i] = $root.CategorySummary.fromObject(object.categorySummaries[i]);
            }
        }
        if (object.dateCategorySummaries) {
            if (!Array.isArray(object.dateCategorySummaries))
                throw TypeError(".DateCategorySummaries.dateCategorySummaries: array expected");
            message.dateCategorySummaries = [];
            for (var i = 0; i < object.dateCategorySummaries.length; ++i) {
                if (typeof object.dateCategorySummaries[i] !== "object")
                    throw TypeError(".DateCategorySummaries.dateCategorySummaries: object expected");
                message.dateCategorySummaries[i] = $root.DateCategorySummary.fromObject(object.dateCategorySummaries[i]);
            }
        }
        if (object.income != null)
            if ($util.Long)
                (message.income = $util.Long.fromValue(object.income)).unsigned = false;
            else if (typeof object.income === "string")
                message.income = parseInt(object.income, 10);
            else if (typeof object.income === "number")
                message.income = object.income;
            else if (typeof object.income === "object")
                message.income = new $util.LongBits(object.income.low >>> 0, object.income.high >>> 0).toNumber();
        if (object.expense != null)
            if ($util.Long)
                (message.expense = $util.Long.fromValue(object.expense)).unsigned = false;
            else if (typeof object.expense === "string")
                message.expense = parseInt(object.expense, 10);
            else if (typeof object.expense === "number")
                message.expense = object.expense;
            else if (typeof object.expense === "object")
                message.expense = new $util.LongBits(object.expense.low >>> 0, object.expense.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a DateCategorySummaries message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DateCategorySummaries
     * @static
     * @param {DateCategorySummaries} message DateCategorySummaries
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DateCategorySummaries.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.categories = [];
            object.dates = [];
            object.dateSummaries = [];
            object.categorySummaries = [];
            object.dateCategorySummaries = [];
        }
        if (options.defaults) {
            object.currency = null;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.income = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.income = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.expense = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.expense = options.longs === String ? "0" : 0;
        }
        if (message.currency != null && message.hasOwnProperty("currency"))
            object.currency = $root.Currency.toObject(message.currency, options);
        if (message.categories && message.categories.length) {
            object.categories = [];
            for (var j = 0; j < message.categories.length; ++j)
                object.categories[j] = $root.Category.toObject(message.categories[j], options);
        }
        if (message.dates && message.dates.length) {
            object.dates = [];
            for (var j = 0; j < message.dates.length; ++j)
                object.dates[j] = $root.Date_.toObject(message.dates[j], options);
        }
        if (message.dateSummaries && message.dateSummaries.length) {
            object.dateSummaries = [];
            for (var j = 0; j < message.dateSummaries.length; ++j)
                object.dateSummaries[j] = $root.DateSummary.toObject(message.dateSummaries[j], options);
        }
        if (message.categorySummaries && message.categorySummaries.length) {
            object.categorySummaries = [];
            for (var j = 0; j < message.categorySummaries.length; ++j)
                object.categorySummaries[j] = $root.CategorySummary.toObject(message.categorySummaries[j], options);
        }
        if (message.dateCategorySummaries && message.dateCategorySummaries.length) {
            object.dateCategorySummaries = [];
            for (var j = 0; j < message.dateCategorySummaries.length; ++j)
                object.dateCategorySummaries[j] = $root.DateCategorySummary.toObject(message.dateCategorySummaries[j], options);
        }
        if (message.income != null && message.hasOwnProperty("income"))
            if (typeof message.income === "number")
                object.income = options.longs === String ? String(message.income) : message.income;
            else
                object.income = options.longs === String ? $util.Long.prototype.toString.call(message.income) : options.longs === Number ? new $util.LongBits(message.income.low >>> 0, message.income.high >>> 0).toNumber() : message.income;
        if (message.expense != null && message.hasOwnProperty("expense"))
            if (typeof message.expense === "number")
                object.expense = options.longs === String ? String(message.expense) : message.expense;
            else
                object.expense = options.longs === String ? $util.Long.prototype.toString.call(message.expense) : options.longs === Number ? new $util.LongBits(message.expense.low >>> 0, message.expense.high >>> 0).toNumber() : message.expense;
        return object;
    };

    /**
     * Converts this DateCategorySummaries to JSON.
     * @function toJSON
     * @memberof DateCategorySummaries
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DateCategorySummaries.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DateCategorySummaries;
})();

$root.DateSubCategorySummary = (function() {

    /**
     * Properties of a DateSubCategorySummary.
     * @exports IDateSubCategorySummary
     * @interface IDateSubCategorySummary
     * @property {IDate_} date DateSubCategorySummary date
     * @property {ISubCategory} subCategory DateSubCategorySummary subCategory
     * @property {Array.<number|Long>|null} [amount] DateSubCategorySummary amount
     */

    /**
     * Constructs a new DateSubCategorySummary.
     * @exports DateSubCategorySummary
     * @classdesc Represents a DateSubCategorySummary.
     * @implements IDateSubCategorySummary
     * @constructor
     * @param {IDateSubCategorySummary=} [properties] Properties to set
     */
    function DateSubCategorySummary(properties) {
        this.amount = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DateSubCategorySummary date.
     * @member {IDate_} date
     * @memberof DateSubCategorySummary
     * @instance
     */
    DateSubCategorySummary.prototype.date = null;

    /**
     * DateSubCategorySummary subCategory.
     * @member {ISubCategory} subCategory
     * @memberof DateSubCategorySummary
     * @instance
     */
    DateSubCategorySummary.prototype.subCategory = null;

    /**
     * DateSubCategorySummary amount.
     * @member {Array.<number|Long>} amount
     * @memberof DateSubCategorySummary
     * @instance
     */
    DateSubCategorySummary.prototype.amount = $util.emptyArray;

    /**
     * Creates a new DateSubCategorySummary instance using the specified properties.
     * @function create
     * @memberof DateSubCategorySummary
     * @static
     * @param {IDateSubCategorySummary=} [properties] Properties to set
     * @returns {DateSubCategorySummary} DateSubCategorySummary instance
     */
    DateSubCategorySummary.create = function create(properties) {
        return new DateSubCategorySummary(properties);
    };

    /**
     * Encodes the specified DateSubCategorySummary message. Does not implicitly {@link DateSubCategorySummary.verify|verify} messages.
     * @function encode
     * @memberof DateSubCategorySummary
     * @static
     * @param {IDateSubCategorySummary} message DateSubCategorySummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DateSubCategorySummary.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        $root.Date_.encode(message.date, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        $root.SubCategory.encode(message.subCategory, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.amount != null && message.amount.length)
            for (var i = 0; i < message.amount.length; ++i)
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.amount[i]);
        return writer;
    };

    /**
     * Encodes the specified DateSubCategorySummary message, length delimited. Does not implicitly {@link DateSubCategorySummary.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DateSubCategorySummary
     * @static
     * @param {IDateSubCategorySummary} message DateSubCategorySummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DateSubCategorySummary.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DateSubCategorySummary message from the specified reader or buffer.
     * @function decode
     * @memberof DateSubCategorySummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DateSubCategorySummary} DateSubCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DateSubCategorySummary.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DateSubCategorySummary();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.date = $root.Date_.decode(reader, reader.uint32());
                break;
            case 2:
                message.subCategory = $root.SubCategory.decode(reader, reader.uint32());
                break;
            case 3:
                if (!(message.amount && message.amount.length))
                    message.amount = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.amount.push(reader.int64());
                } else
                    message.amount.push(reader.int64());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("date"))
            throw $util.ProtocolError("missing required 'date'", { instance: message });
        if (!message.hasOwnProperty("subCategory"))
            throw $util.ProtocolError("missing required 'subCategory'", { instance: message });
        return message;
    };

    /**
     * Decodes a DateSubCategorySummary message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DateSubCategorySummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DateSubCategorySummary} DateSubCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DateSubCategorySummary.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DateSubCategorySummary message.
     * @function verify
     * @memberof DateSubCategorySummary
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DateSubCategorySummary.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        {
            var error = $root.Date_.verify(message.date);
            if (error)
                return "date." + error;
        }
        {
            var error = $root.SubCategory.verify(message.subCategory);
            if (error)
                return "subCategory." + error;
        }
        if (message.amount != null && message.hasOwnProperty("amount")) {
            if (!Array.isArray(message.amount))
                return "amount: array expected";
            for (var i = 0; i < message.amount.length; ++i)
                if (!$util.isInteger(message.amount[i]) && !(message.amount[i] && $util.isInteger(message.amount[i].low) && $util.isInteger(message.amount[i].high)))
                    return "amount: integer|Long[] expected";
        }
        return null;
    };

    /**
     * Creates a DateSubCategorySummary message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DateSubCategorySummary
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DateSubCategorySummary} DateSubCategorySummary
     */
    DateSubCategorySummary.fromObject = function fromObject(object) {
        if (object instanceof $root.DateSubCategorySummary)
            return object;
        var message = new $root.DateSubCategorySummary();
        if (object.date != null) {
            if (typeof object.date !== "object")
                throw TypeError(".DateSubCategorySummary.date: object expected");
            message.date = $root.Date_.fromObject(object.date);
        }
        if (object.subCategory != null) {
            if (typeof object.subCategory !== "object")
                throw TypeError(".DateSubCategorySummary.subCategory: object expected");
            message.subCategory = $root.SubCategory.fromObject(object.subCategory);
        }
        if (object.amount) {
            if (!Array.isArray(object.amount))
                throw TypeError(".DateSubCategorySummary.amount: array expected");
            message.amount = [];
            for (var i = 0; i < object.amount.length; ++i)
                if ($util.Long)
                    (message.amount[i] = $util.Long.fromValue(object.amount[i])).unsigned = false;
                else if (typeof object.amount[i] === "string")
                    message.amount[i] = parseInt(object.amount[i], 10);
                else if (typeof object.amount[i] === "number")
                    message.amount[i] = object.amount[i];
                else if (typeof object.amount[i] === "object")
                    message.amount[i] = new $util.LongBits(object.amount[i].low >>> 0, object.amount[i].high >>> 0).toNumber();
        }
        return message;
    };

    /**
     * Creates a plain object from a DateSubCategorySummary message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DateSubCategorySummary
     * @static
     * @param {DateSubCategorySummary} message DateSubCategorySummary
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DateSubCategorySummary.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.amount = [];
        if (options.defaults) {
            object.date = null;
            object.subCategory = null;
        }
        if (message.date != null && message.hasOwnProperty("date"))
            object.date = $root.Date_.toObject(message.date, options);
        if (message.subCategory != null && message.hasOwnProperty("subCategory"))
            object.subCategory = $root.SubCategory.toObject(message.subCategory, options);
        if (message.amount && message.amount.length) {
            object.amount = [];
            for (var j = 0; j < message.amount.length; ++j)
                if (typeof message.amount[j] === "number")
                    object.amount[j] = options.longs === String ? String(message.amount[j]) : message.amount[j];
                else
                    object.amount[j] = options.longs === String ? $util.Long.prototype.toString.call(message.amount[j]) : options.longs === Number ? new $util.LongBits(message.amount[j].low >>> 0, message.amount[j].high >>> 0).toNumber() : message.amount[j];
        }
        return object;
    };

    /**
     * Converts this DateSubCategorySummary to JSON.
     * @function toJSON
     * @memberof DateSubCategorySummary
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DateSubCategorySummary.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DateSubCategorySummary;
})();

$root.DateSubCategorySummaries = (function() {

    /**
     * Properties of a DateSubCategorySummaries.
     * @exports IDateSubCategorySummaries
     * @interface IDateSubCategorySummaries
     * @property {ICurrency} currency DateSubCategorySummaries currency
     * @property {Array.<ISubCategory>|null} [subCategories] DateSubCategorySummaries subCategories
     * @property {Array.<IDate_>|null} [dates] DateSubCategorySummaries dates
     * @property {Array.<IDateSummary>|null} [dateSummaries] DateSubCategorySummaries dateSummaries
     * @property {Array.<ISubCategorySummary>|null} [subCategorySummaries] DateSubCategorySummaries subCategorySummaries
     * @property {Array.<IDateSubCategorySummary>|null} [dateSubCategorySummaries] DateSubCategorySummaries dateSubCategorySummaries
     * @property {number|Long} income DateSubCategorySummaries income
     * @property {number|Long} expense DateSubCategorySummaries expense
     */

    /**
     * Constructs a new DateSubCategorySummaries.
     * @exports DateSubCategorySummaries
     * @classdesc Represents a DateSubCategorySummaries.
     * @implements IDateSubCategorySummaries
     * @constructor
     * @param {IDateSubCategorySummaries=} [properties] Properties to set
     */
    function DateSubCategorySummaries(properties) {
        this.subCategories = [];
        this.dates = [];
        this.dateSummaries = [];
        this.subCategorySummaries = [];
        this.dateSubCategorySummaries = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DateSubCategorySummaries currency.
     * @member {ICurrency} currency
     * @memberof DateSubCategorySummaries
     * @instance
     */
    DateSubCategorySummaries.prototype.currency = null;

    /**
     * DateSubCategorySummaries subCategories.
     * @member {Array.<ISubCategory>} subCategories
     * @memberof DateSubCategorySummaries
     * @instance
     */
    DateSubCategorySummaries.prototype.subCategories = $util.emptyArray;

    /**
     * DateSubCategorySummaries dates.
     * @member {Array.<IDate_>} dates
     * @memberof DateSubCategorySummaries
     * @instance
     */
    DateSubCategorySummaries.prototype.dates = $util.emptyArray;

    /**
     * DateSubCategorySummaries dateSummaries.
     * @member {Array.<IDateSummary>} dateSummaries
     * @memberof DateSubCategorySummaries
     * @instance
     */
    DateSubCategorySummaries.prototype.dateSummaries = $util.emptyArray;

    /**
     * DateSubCategorySummaries subCategorySummaries.
     * @member {Array.<ISubCategorySummary>} subCategorySummaries
     * @memberof DateSubCategorySummaries
     * @instance
     */
    DateSubCategorySummaries.prototype.subCategorySummaries = $util.emptyArray;

    /**
     * DateSubCategorySummaries dateSubCategorySummaries.
     * @member {Array.<IDateSubCategorySummary>} dateSubCategorySummaries
     * @memberof DateSubCategorySummaries
     * @instance
     */
    DateSubCategorySummaries.prototype.dateSubCategorySummaries = $util.emptyArray;

    /**
     * DateSubCategorySummaries income.
     * @member {number|Long} income
     * @memberof DateSubCategorySummaries
     * @instance
     */
    DateSubCategorySummaries.prototype.income = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * DateSubCategorySummaries expense.
     * @member {number|Long} expense
     * @memberof DateSubCategorySummaries
     * @instance
     */
    DateSubCategorySummaries.prototype.expense = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new DateSubCategorySummaries instance using the specified properties.
     * @function create
     * @memberof DateSubCategorySummaries
     * @static
     * @param {IDateSubCategorySummaries=} [properties] Properties to set
     * @returns {DateSubCategorySummaries} DateSubCategorySummaries instance
     */
    DateSubCategorySummaries.create = function create(properties) {
        return new DateSubCategorySummaries(properties);
    };

    /**
     * Encodes the specified DateSubCategorySummaries message. Does not implicitly {@link DateSubCategorySummaries.verify|verify} messages.
     * @function encode
     * @memberof DateSubCategorySummaries
     * @static
     * @param {IDateSubCategorySummaries} message DateSubCategorySummaries message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DateSubCategorySummaries.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        $root.Currency.encode(message.currency, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.subCategories != null && message.subCategories.length)
            for (var i = 0; i < message.subCategories.length; ++i)
                $root.SubCategory.encode(message.subCategories[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.dates != null && message.dates.length)
            for (var i = 0; i < message.dates.length; ++i)
                $root.Date_.encode(message.dates[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.dateSummaries != null && message.dateSummaries.length)
            for (var i = 0; i < message.dateSummaries.length; ++i)
                $root.DateSummary.encode(message.dateSummaries[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.subCategorySummaries != null && message.subCategorySummaries.length)
            for (var i = 0; i < message.subCategorySummaries.length; ++i)
                $root.SubCategorySummary.encode(message.subCategorySummaries[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.dateSubCategorySummaries != null && message.dateSubCategorySummaries.length)
            for (var i = 0; i < message.dateSubCategorySummaries.length; ++i)
                $root.DateSubCategorySummary.encode(message.dateSubCategorySummaries[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        writer.uint32(/* id 7, wireType 0 =*/56).int64(message.income);
        writer.uint32(/* id 8, wireType 0 =*/64).int64(message.expense);
        return writer;
    };

    /**
     * Encodes the specified DateSubCategorySummaries message, length delimited. Does not implicitly {@link DateSubCategorySummaries.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DateSubCategorySummaries
     * @static
     * @param {IDateSubCategorySummaries} message DateSubCategorySummaries message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DateSubCategorySummaries.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DateSubCategorySummaries message from the specified reader or buffer.
     * @function decode
     * @memberof DateSubCategorySummaries
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DateSubCategorySummaries} DateSubCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DateSubCategorySummaries.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DateSubCategorySummaries();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.currency = $root.Currency.decode(reader, reader.uint32());
                break;
            case 2:
                if (!(message.subCategories && message.subCategories.length))
                    message.subCategories = [];
                message.subCategories.push($root.SubCategory.decode(reader, reader.uint32()));
                break;
            case 3:
                if (!(message.dates && message.dates.length))
                    message.dates = [];
                message.dates.push($root.Date_.decode(reader, reader.uint32()));
                break;
            case 4:
                if (!(message.dateSummaries && message.dateSummaries.length))
                    message.dateSummaries = [];
                message.dateSummaries.push($root.DateSummary.decode(reader, reader.uint32()));
                break;
            case 5:
                if (!(message.subCategorySummaries && message.subCategorySummaries.length))
                    message.subCategorySummaries = [];
                message.subCategorySummaries.push($root.SubCategorySummary.decode(reader, reader.uint32()));
                break;
            case 6:
                if (!(message.dateSubCategorySummaries && message.dateSubCategorySummaries.length))
                    message.dateSubCategorySummaries = [];
                message.dateSubCategorySummaries.push($root.DateSubCategorySummary.decode(reader, reader.uint32()));
                break;
            case 7:
                message.income = reader.int64();
                break;
            case 8:
                message.expense = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("currency"))
            throw $util.ProtocolError("missing required 'currency'", { instance: message });
        if (!message.hasOwnProperty("income"))
            throw $util.ProtocolError("missing required 'income'", { instance: message });
        if (!message.hasOwnProperty("expense"))
            throw $util.ProtocolError("missing required 'expense'", { instance: message });
        return message;
    };

    /**
     * Decodes a DateSubCategorySummaries message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DateSubCategorySummaries
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DateSubCategorySummaries} DateSubCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DateSubCategorySummaries.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DateSubCategorySummaries message.
     * @function verify
     * @memberof DateSubCategorySummaries
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DateSubCategorySummaries.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        {
            var error = $root.Currency.verify(message.currency);
            if (error)
                return "currency." + error;
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
        if (message.dates != null && message.hasOwnProperty("dates")) {
            if (!Array.isArray(message.dates))
                return "dates: array expected";
            for (var i = 0; i < message.dates.length; ++i) {
                var error = $root.Date_.verify(message.dates[i]);
                if (error)
                    return "dates." + error;
            }
        }
        if (message.dateSummaries != null && message.hasOwnProperty("dateSummaries")) {
            if (!Array.isArray(message.dateSummaries))
                return "dateSummaries: array expected";
            for (var i = 0; i < message.dateSummaries.length; ++i) {
                var error = $root.DateSummary.verify(message.dateSummaries[i]);
                if (error)
                    return "dateSummaries." + error;
            }
        }
        if (message.subCategorySummaries != null && message.hasOwnProperty("subCategorySummaries")) {
            if (!Array.isArray(message.subCategorySummaries))
                return "subCategorySummaries: array expected";
            for (var i = 0; i < message.subCategorySummaries.length; ++i) {
                var error = $root.SubCategorySummary.verify(message.subCategorySummaries[i]);
                if (error)
                    return "subCategorySummaries." + error;
            }
        }
        if (message.dateSubCategorySummaries != null && message.hasOwnProperty("dateSubCategorySummaries")) {
            if (!Array.isArray(message.dateSubCategorySummaries))
                return "dateSubCategorySummaries: array expected";
            for (var i = 0; i < message.dateSubCategorySummaries.length; ++i) {
                var error = $root.DateSubCategorySummary.verify(message.dateSubCategorySummaries[i]);
                if (error)
                    return "dateSubCategorySummaries." + error;
            }
        }
        if (!$util.isInteger(message.income) && !(message.income && $util.isInteger(message.income.low) && $util.isInteger(message.income.high)))
            return "income: integer|Long expected";
        if (!$util.isInteger(message.expense) && !(message.expense && $util.isInteger(message.expense.low) && $util.isInteger(message.expense.high)))
            return "expense: integer|Long expected";
        return null;
    };

    /**
     * Creates a DateSubCategorySummaries message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DateSubCategorySummaries
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DateSubCategorySummaries} DateSubCategorySummaries
     */
    DateSubCategorySummaries.fromObject = function fromObject(object) {
        if (object instanceof $root.DateSubCategorySummaries)
            return object;
        var message = new $root.DateSubCategorySummaries();
        if (object.currency != null) {
            if (typeof object.currency !== "object")
                throw TypeError(".DateSubCategorySummaries.currency: object expected");
            message.currency = $root.Currency.fromObject(object.currency);
        }
        if (object.subCategories) {
            if (!Array.isArray(object.subCategories))
                throw TypeError(".DateSubCategorySummaries.subCategories: array expected");
            message.subCategories = [];
            for (var i = 0; i < object.subCategories.length; ++i) {
                if (typeof object.subCategories[i] !== "object")
                    throw TypeError(".DateSubCategorySummaries.subCategories: object expected");
                message.subCategories[i] = $root.SubCategory.fromObject(object.subCategories[i]);
            }
        }
        if (object.dates) {
            if (!Array.isArray(object.dates))
                throw TypeError(".DateSubCategorySummaries.dates: array expected");
            message.dates = [];
            for (var i = 0; i < object.dates.length; ++i) {
                if (typeof object.dates[i] !== "object")
                    throw TypeError(".DateSubCategorySummaries.dates: object expected");
                message.dates[i] = $root.Date_.fromObject(object.dates[i]);
            }
        }
        if (object.dateSummaries) {
            if (!Array.isArray(object.dateSummaries))
                throw TypeError(".DateSubCategorySummaries.dateSummaries: array expected");
            message.dateSummaries = [];
            for (var i = 0; i < object.dateSummaries.length; ++i) {
                if (typeof object.dateSummaries[i] !== "object")
                    throw TypeError(".DateSubCategorySummaries.dateSummaries: object expected");
                message.dateSummaries[i] = $root.DateSummary.fromObject(object.dateSummaries[i]);
            }
        }
        if (object.subCategorySummaries) {
            if (!Array.isArray(object.subCategorySummaries))
                throw TypeError(".DateSubCategorySummaries.subCategorySummaries: array expected");
            message.subCategorySummaries = [];
            for (var i = 0; i < object.subCategorySummaries.length; ++i) {
                if (typeof object.subCategorySummaries[i] !== "object")
                    throw TypeError(".DateSubCategorySummaries.subCategorySummaries: object expected");
                message.subCategorySummaries[i] = $root.SubCategorySummary.fromObject(object.subCategorySummaries[i]);
            }
        }
        if (object.dateSubCategorySummaries) {
            if (!Array.isArray(object.dateSubCategorySummaries))
                throw TypeError(".DateSubCategorySummaries.dateSubCategorySummaries: array expected");
            message.dateSubCategorySummaries = [];
            for (var i = 0; i < object.dateSubCategorySummaries.length; ++i) {
                if (typeof object.dateSubCategorySummaries[i] !== "object")
                    throw TypeError(".DateSubCategorySummaries.dateSubCategorySummaries: object expected");
                message.dateSubCategorySummaries[i] = $root.DateSubCategorySummary.fromObject(object.dateSubCategorySummaries[i]);
            }
        }
        if (object.income != null)
            if ($util.Long)
                (message.income = $util.Long.fromValue(object.income)).unsigned = false;
            else if (typeof object.income === "string")
                message.income = parseInt(object.income, 10);
            else if (typeof object.income === "number")
                message.income = object.income;
            else if (typeof object.income === "object")
                message.income = new $util.LongBits(object.income.low >>> 0, object.income.high >>> 0).toNumber();
        if (object.expense != null)
            if ($util.Long)
                (message.expense = $util.Long.fromValue(object.expense)).unsigned = false;
            else if (typeof object.expense === "string")
                message.expense = parseInt(object.expense, 10);
            else if (typeof object.expense === "number")
                message.expense = object.expense;
            else if (typeof object.expense === "object")
                message.expense = new $util.LongBits(object.expense.low >>> 0, object.expense.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a DateSubCategorySummaries message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DateSubCategorySummaries
     * @static
     * @param {DateSubCategorySummaries} message DateSubCategorySummaries
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DateSubCategorySummaries.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.subCategories = [];
            object.dates = [];
            object.dateSummaries = [];
            object.subCategorySummaries = [];
            object.dateSubCategorySummaries = [];
        }
        if (options.defaults) {
            object.currency = null;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.income = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.income = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.expense = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.expense = options.longs === String ? "0" : 0;
        }
        if (message.currency != null && message.hasOwnProperty("currency"))
            object.currency = $root.Currency.toObject(message.currency, options);
        if (message.subCategories && message.subCategories.length) {
            object.subCategories = [];
            for (var j = 0; j < message.subCategories.length; ++j)
                object.subCategories[j] = $root.SubCategory.toObject(message.subCategories[j], options);
        }
        if (message.dates && message.dates.length) {
            object.dates = [];
            for (var j = 0; j < message.dates.length; ++j)
                object.dates[j] = $root.Date_.toObject(message.dates[j], options);
        }
        if (message.dateSummaries && message.dateSummaries.length) {
            object.dateSummaries = [];
            for (var j = 0; j < message.dateSummaries.length; ++j)
                object.dateSummaries[j] = $root.DateSummary.toObject(message.dateSummaries[j], options);
        }
        if (message.subCategorySummaries && message.subCategorySummaries.length) {
            object.subCategorySummaries = [];
            for (var j = 0; j < message.subCategorySummaries.length; ++j)
                object.subCategorySummaries[j] = $root.SubCategorySummary.toObject(message.subCategorySummaries[j], options);
        }
        if (message.dateSubCategorySummaries && message.dateSubCategorySummaries.length) {
            object.dateSubCategorySummaries = [];
            for (var j = 0; j < message.dateSubCategorySummaries.length; ++j)
                object.dateSubCategorySummaries[j] = $root.DateSubCategorySummary.toObject(message.dateSubCategorySummaries[j], options);
        }
        if (message.income != null && message.hasOwnProperty("income"))
            if (typeof message.income === "number")
                object.income = options.longs === String ? String(message.income) : message.income;
            else
                object.income = options.longs === String ? $util.Long.prototype.toString.call(message.income) : options.longs === Number ? new $util.LongBits(message.income.low >>> 0, message.income.high >>> 0).toNumber() : message.income;
        if (message.expense != null && message.hasOwnProperty("expense"))
            if (typeof message.expense === "number")
                object.expense = options.longs === String ? String(message.expense) : message.expense;
            else
                object.expense = options.longs === String ? $util.Long.prototype.toString.call(message.expense) : options.longs === Number ? new $util.LongBits(message.expense.low >>> 0, message.expense.high >>> 0).toNumber() : message.expense;
        return object;
    };

    /**
     * Converts this DateSubCategorySummaries to JSON.
     * @function toJSON
     * @memberof DateSubCategorySummaries
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DateSubCategorySummaries.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DateSubCategorySummaries;
})();

$root.MonthSummary = (function() {

    /**
     * Properties of a MonthSummary.
     * @exports IMonthSummary
     * @interface IMonthSummary
     * @property {IMonth} month MonthSummary month
     * @property {Array.<number|Long>|null} [amount] MonthSummary amount
     */

    /**
     * Constructs a new MonthSummary.
     * @exports MonthSummary
     * @classdesc Represents a MonthSummary.
     * @implements IMonthSummary
     * @constructor
     * @param {IMonthSummary=} [properties] Properties to set
     */
    function MonthSummary(properties) {
        this.amount = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MonthSummary month.
     * @member {IMonth} month
     * @memberof MonthSummary
     * @instance
     */
    MonthSummary.prototype.month = null;

    /**
     * MonthSummary amount.
     * @member {Array.<number|Long>} amount
     * @memberof MonthSummary
     * @instance
     */
    MonthSummary.prototype.amount = $util.emptyArray;

    /**
     * Creates a new MonthSummary instance using the specified properties.
     * @function create
     * @memberof MonthSummary
     * @static
     * @param {IMonthSummary=} [properties] Properties to set
     * @returns {MonthSummary} MonthSummary instance
     */
    MonthSummary.create = function create(properties) {
        return new MonthSummary(properties);
    };

    /**
     * Encodes the specified MonthSummary message. Does not implicitly {@link MonthSummary.verify|verify} messages.
     * @function encode
     * @memberof MonthSummary
     * @static
     * @param {IMonthSummary} message MonthSummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MonthSummary.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        $root.Month.encode(message.month, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.amount != null && message.amount.length)
            for (var i = 0; i < message.amount.length; ++i)
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.amount[i]);
        return writer;
    };

    /**
     * Encodes the specified MonthSummary message, length delimited. Does not implicitly {@link MonthSummary.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MonthSummary
     * @static
     * @param {IMonthSummary} message MonthSummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MonthSummary.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MonthSummary message from the specified reader or buffer.
     * @function decode
     * @memberof MonthSummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MonthSummary} MonthSummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MonthSummary.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MonthSummary();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.month = $root.Month.decode(reader, reader.uint32());
                break;
            case 2:
                if (!(message.amount && message.amount.length))
                    message.amount = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.amount.push(reader.int64());
                } else
                    message.amount.push(reader.int64());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("month"))
            throw $util.ProtocolError("missing required 'month'", { instance: message });
        return message;
    };

    /**
     * Decodes a MonthSummary message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MonthSummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MonthSummary} MonthSummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MonthSummary.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MonthSummary message.
     * @function verify
     * @memberof MonthSummary
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MonthSummary.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        {
            var error = $root.Month.verify(message.month);
            if (error)
                return "month." + error;
        }
        if (message.amount != null && message.hasOwnProperty("amount")) {
            if (!Array.isArray(message.amount))
                return "amount: array expected";
            for (var i = 0; i < message.amount.length; ++i)
                if (!$util.isInteger(message.amount[i]) && !(message.amount[i] && $util.isInteger(message.amount[i].low) && $util.isInteger(message.amount[i].high)))
                    return "amount: integer|Long[] expected";
        }
        return null;
    };

    /**
     * Creates a MonthSummary message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MonthSummary
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MonthSummary} MonthSummary
     */
    MonthSummary.fromObject = function fromObject(object) {
        if (object instanceof $root.MonthSummary)
            return object;
        var message = new $root.MonthSummary();
        if (object.month != null) {
            if (typeof object.month !== "object")
                throw TypeError(".MonthSummary.month: object expected");
            message.month = $root.Month.fromObject(object.month);
        }
        if (object.amount) {
            if (!Array.isArray(object.amount))
                throw TypeError(".MonthSummary.amount: array expected");
            message.amount = [];
            for (var i = 0; i < object.amount.length; ++i)
                if ($util.Long)
                    (message.amount[i] = $util.Long.fromValue(object.amount[i])).unsigned = false;
                else if (typeof object.amount[i] === "string")
                    message.amount[i] = parseInt(object.amount[i], 10);
                else if (typeof object.amount[i] === "number")
                    message.amount[i] = object.amount[i];
                else if (typeof object.amount[i] === "object")
                    message.amount[i] = new $util.LongBits(object.amount[i].low >>> 0, object.amount[i].high >>> 0).toNumber();
        }
        return message;
    };

    /**
     * Creates a plain object from a MonthSummary message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MonthSummary
     * @static
     * @param {MonthSummary} message MonthSummary
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MonthSummary.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.amount = [];
        if (options.defaults)
            object.month = null;
        if (message.month != null && message.hasOwnProperty("month"))
            object.month = $root.Month.toObject(message.month, options);
        if (message.amount && message.amount.length) {
            object.amount = [];
            for (var j = 0; j < message.amount.length; ++j)
                if (typeof message.amount[j] === "number")
                    object.amount[j] = options.longs === String ? String(message.amount[j]) : message.amount[j];
                else
                    object.amount[j] = options.longs === String ? $util.Long.prototype.toString.call(message.amount[j]) : options.longs === Number ? new $util.LongBits(message.amount[j].low >>> 0, message.amount[j].high >>> 0).toNumber() : message.amount[j];
        }
        return object;
    };

    /**
     * Converts this MonthSummary to JSON.
     * @function toJSON
     * @memberof MonthSummary
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MonthSummary.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MonthSummary;
})();

$root.MonthCategorySummary = (function() {

    /**
     * Properties of a MonthCategorySummary.
     * @exports IMonthCategorySummary
     * @interface IMonthCategorySummary
     * @property {IMonth} month MonthCategorySummary month
     * @property {ICategory} category MonthCategorySummary category
     * @property {Array.<number|Long>|null} [amount] MonthCategorySummary amount
     */

    /**
     * Constructs a new MonthCategorySummary.
     * @exports MonthCategorySummary
     * @classdesc Represents a MonthCategorySummary.
     * @implements IMonthCategorySummary
     * @constructor
     * @param {IMonthCategorySummary=} [properties] Properties to set
     */
    function MonthCategorySummary(properties) {
        this.amount = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MonthCategorySummary month.
     * @member {IMonth} month
     * @memberof MonthCategorySummary
     * @instance
     */
    MonthCategorySummary.prototype.month = null;

    /**
     * MonthCategorySummary category.
     * @member {ICategory} category
     * @memberof MonthCategorySummary
     * @instance
     */
    MonthCategorySummary.prototype.category = null;

    /**
     * MonthCategorySummary amount.
     * @member {Array.<number|Long>} amount
     * @memberof MonthCategorySummary
     * @instance
     */
    MonthCategorySummary.prototype.amount = $util.emptyArray;

    /**
     * Creates a new MonthCategorySummary instance using the specified properties.
     * @function create
     * @memberof MonthCategorySummary
     * @static
     * @param {IMonthCategorySummary=} [properties] Properties to set
     * @returns {MonthCategorySummary} MonthCategorySummary instance
     */
    MonthCategorySummary.create = function create(properties) {
        return new MonthCategorySummary(properties);
    };

    /**
     * Encodes the specified MonthCategorySummary message. Does not implicitly {@link MonthCategorySummary.verify|verify} messages.
     * @function encode
     * @memberof MonthCategorySummary
     * @static
     * @param {IMonthCategorySummary} message MonthCategorySummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MonthCategorySummary.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        $root.Month.encode(message.month, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        $root.Category.encode(message.category, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.amount != null && message.amount.length)
            for (var i = 0; i < message.amount.length; ++i)
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.amount[i]);
        return writer;
    };

    /**
     * Encodes the specified MonthCategorySummary message, length delimited. Does not implicitly {@link MonthCategorySummary.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MonthCategorySummary
     * @static
     * @param {IMonthCategorySummary} message MonthCategorySummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MonthCategorySummary.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MonthCategorySummary message from the specified reader or buffer.
     * @function decode
     * @memberof MonthCategorySummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MonthCategorySummary} MonthCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MonthCategorySummary.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MonthCategorySummary();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.month = $root.Month.decode(reader, reader.uint32());
                break;
            case 2:
                message.category = $root.Category.decode(reader, reader.uint32());
                break;
            case 3:
                if (!(message.amount && message.amount.length))
                    message.amount = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.amount.push(reader.int64());
                } else
                    message.amount.push(reader.int64());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("month"))
            throw $util.ProtocolError("missing required 'month'", { instance: message });
        if (!message.hasOwnProperty("category"))
            throw $util.ProtocolError("missing required 'category'", { instance: message });
        return message;
    };

    /**
     * Decodes a MonthCategorySummary message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MonthCategorySummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MonthCategorySummary} MonthCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MonthCategorySummary.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MonthCategorySummary message.
     * @function verify
     * @memberof MonthCategorySummary
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MonthCategorySummary.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        {
            var error = $root.Month.verify(message.month);
            if (error)
                return "month." + error;
        }
        {
            var error = $root.Category.verify(message.category);
            if (error)
                return "category." + error;
        }
        if (message.amount != null && message.hasOwnProperty("amount")) {
            if (!Array.isArray(message.amount))
                return "amount: array expected";
            for (var i = 0; i < message.amount.length; ++i)
                if (!$util.isInteger(message.amount[i]) && !(message.amount[i] && $util.isInteger(message.amount[i].low) && $util.isInteger(message.amount[i].high)))
                    return "amount: integer|Long[] expected";
        }
        return null;
    };

    /**
     * Creates a MonthCategorySummary message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MonthCategorySummary
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MonthCategorySummary} MonthCategorySummary
     */
    MonthCategorySummary.fromObject = function fromObject(object) {
        if (object instanceof $root.MonthCategorySummary)
            return object;
        var message = new $root.MonthCategorySummary();
        if (object.month != null) {
            if (typeof object.month !== "object")
                throw TypeError(".MonthCategorySummary.month: object expected");
            message.month = $root.Month.fromObject(object.month);
        }
        if (object.category != null) {
            if (typeof object.category !== "object")
                throw TypeError(".MonthCategorySummary.category: object expected");
            message.category = $root.Category.fromObject(object.category);
        }
        if (object.amount) {
            if (!Array.isArray(object.amount))
                throw TypeError(".MonthCategorySummary.amount: array expected");
            message.amount = [];
            for (var i = 0; i < object.amount.length; ++i)
                if ($util.Long)
                    (message.amount[i] = $util.Long.fromValue(object.amount[i])).unsigned = false;
                else if (typeof object.amount[i] === "string")
                    message.amount[i] = parseInt(object.amount[i], 10);
                else if (typeof object.amount[i] === "number")
                    message.amount[i] = object.amount[i];
                else if (typeof object.amount[i] === "object")
                    message.amount[i] = new $util.LongBits(object.amount[i].low >>> 0, object.amount[i].high >>> 0).toNumber();
        }
        return message;
    };

    /**
     * Creates a plain object from a MonthCategorySummary message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MonthCategorySummary
     * @static
     * @param {MonthCategorySummary} message MonthCategorySummary
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MonthCategorySummary.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.amount = [];
        if (options.defaults) {
            object.month = null;
            object.category = null;
        }
        if (message.month != null && message.hasOwnProperty("month"))
            object.month = $root.Month.toObject(message.month, options);
        if (message.category != null && message.hasOwnProperty("category"))
            object.category = $root.Category.toObject(message.category, options);
        if (message.amount && message.amount.length) {
            object.amount = [];
            for (var j = 0; j < message.amount.length; ++j)
                if (typeof message.amount[j] === "number")
                    object.amount[j] = options.longs === String ? String(message.amount[j]) : message.amount[j];
                else
                    object.amount[j] = options.longs === String ? $util.Long.prototype.toString.call(message.amount[j]) : options.longs === Number ? new $util.LongBits(message.amount[j].low >>> 0, message.amount[j].high >>> 0).toNumber() : message.amount[j];
        }
        return object;
    };

    /**
     * Converts this MonthCategorySummary to JSON.
     * @function toJSON
     * @memberof MonthCategorySummary
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MonthCategorySummary.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MonthCategorySummary;
})();

$root.MonthCategorySummaries = (function() {

    /**
     * Properties of a MonthCategorySummaries.
     * @exports IMonthCategorySummaries
     * @interface IMonthCategorySummaries
     * @property {ICurrency} currency MonthCategorySummaries currency
     * @property {Array.<ICategory>|null} [categories] MonthCategorySummaries categories
     * @property {Array.<IMonth>|null} [months] MonthCategorySummaries months
     * @property {Array.<IMonthSummary>|null} [monthSummaries] MonthCategorySummaries monthSummaries
     * @property {Array.<ICategorySummary>|null} [categorySummaries] MonthCategorySummaries categorySummaries
     * @property {Array.<IMonthCategorySummary>|null} [monthCategorySummaries] MonthCategorySummaries monthCategorySummaries
     * @property {number|Long} income MonthCategorySummaries income
     * @property {number|Long} expense MonthCategorySummaries expense
     */

    /**
     * Constructs a new MonthCategorySummaries.
     * @exports MonthCategorySummaries
     * @classdesc Represents a MonthCategorySummaries.
     * @implements IMonthCategorySummaries
     * @constructor
     * @param {IMonthCategorySummaries=} [properties] Properties to set
     */
    function MonthCategorySummaries(properties) {
        this.categories = [];
        this.months = [];
        this.monthSummaries = [];
        this.categorySummaries = [];
        this.monthCategorySummaries = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MonthCategorySummaries currency.
     * @member {ICurrency} currency
     * @memberof MonthCategorySummaries
     * @instance
     */
    MonthCategorySummaries.prototype.currency = null;

    /**
     * MonthCategorySummaries categories.
     * @member {Array.<ICategory>} categories
     * @memberof MonthCategorySummaries
     * @instance
     */
    MonthCategorySummaries.prototype.categories = $util.emptyArray;

    /**
     * MonthCategorySummaries months.
     * @member {Array.<IMonth>} months
     * @memberof MonthCategorySummaries
     * @instance
     */
    MonthCategorySummaries.prototype.months = $util.emptyArray;

    /**
     * MonthCategorySummaries monthSummaries.
     * @member {Array.<IMonthSummary>} monthSummaries
     * @memberof MonthCategorySummaries
     * @instance
     */
    MonthCategorySummaries.prototype.monthSummaries = $util.emptyArray;

    /**
     * MonthCategorySummaries categorySummaries.
     * @member {Array.<ICategorySummary>} categorySummaries
     * @memberof MonthCategorySummaries
     * @instance
     */
    MonthCategorySummaries.prototype.categorySummaries = $util.emptyArray;

    /**
     * MonthCategorySummaries monthCategorySummaries.
     * @member {Array.<IMonthCategorySummary>} monthCategorySummaries
     * @memberof MonthCategorySummaries
     * @instance
     */
    MonthCategorySummaries.prototype.monthCategorySummaries = $util.emptyArray;

    /**
     * MonthCategorySummaries income.
     * @member {number|Long} income
     * @memberof MonthCategorySummaries
     * @instance
     */
    MonthCategorySummaries.prototype.income = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * MonthCategorySummaries expense.
     * @member {number|Long} expense
     * @memberof MonthCategorySummaries
     * @instance
     */
    MonthCategorySummaries.prototype.expense = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new MonthCategorySummaries instance using the specified properties.
     * @function create
     * @memberof MonthCategorySummaries
     * @static
     * @param {IMonthCategorySummaries=} [properties] Properties to set
     * @returns {MonthCategorySummaries} MonthCategorySummaries instance
     */
    MonthCategorySummaries.create = function create(properties) {
        return new MonthCategorySummaries(properties);
    };

    /**
     * Encodes the specified MonthCategorySummaries message. Does not implicitly {@link MonthCategorySummaries.verify|verify} messages.
     * @function encode
     * @memberof MonthCategorySummaries
     * @static
     * @param {IMonthCategorySummaries} message MonthCategorySummaries message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MonthCategorySummaries.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        $root.Currency.encode(message.currency, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.categories != null && message.categories.length)
            for (var i = 0; i < message.categories.length; ++i)
                $root.Category.encode(message.categories[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.months != null && message.months.length)
            for (var i = 0; i < message.months.length; ++i)
                $root.Month.encode(message.months[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.monthSummaries != null && message.monthSummaries.length)
            for (var i = 0; i < message.monthSummaries.length; ++i)
                $root.MonthSummary.encode(message.monthSummaries[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.categorySummaries != null && message.categorySummaries.length)
            for (var i = 0; i < message.categorySummaries.length; ++i)
                $root.CategorySummary.encode(message.categorySummaries[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.monthCategorySummaries != null && message.monthCategorySummaries.length)
            for (var i = 0; i < message.monthCategorySummaries.length; ++i)
                $root.MonthCategorySummary.encode(message.monthCategorySummaries[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        writer.uint32(/* id 7, wireType 0 =*/56).int64(message.income);
        writer.uint32(/* id 8, wireType 0 =*/64).int64(message.expense);
        return writer;
    };

    /**
     * Encodes the specified MonthCategorySummaries message, length delimited. Does not implicitly {@link MonthCategorySummaries.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MonthCategorySummaries
     * @static
     * @param {IMonthCategorySummaries} message MonthCategorySummaries message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MonthCategorySummaries.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MonthCategorySummaries message from the specified reader or buffer.
     * @function decode
     * @memberof MonthCategorySummaries
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MonthCategorySummaries} MonthCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MonthCategorySummaries.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MonthCategorySummaries();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.currency = $root.Currency.decode(reader, reader.uint32());
                break;
            case 2:
                if (!(message.categories && message.categories.length))
                    message.categories = [];
                message.categories.push($root.Category.decode(reader, reader.uint32()));
                break;
            case 3:
                if (!(message.months && message.months.length))
                    message.months = [];
                message.months.push($root.Month.decode(reader, reader.uint32()));
                break;
            case 4:
                if (!(message.monthSummaries && message.monthSummaries.length))
                    message.monthSummaries = [];
                message.monthSummaries.push($root.MonthSummary.decode(reader, reader.uint32()));
                break;
            case 5:
                if (!(message.categorySummaries && message.categorySummaries.length))
                    message.categorySummaries = [];
                message.categorySummaries.push($root.CategorySummary.decode(reader, reader.uint32()));
                break;
            case 6:
                if (!(message.monthCategorySummaries && message.monthCategorySummaries.length))
                    message.monthCategorySummaries = [];
                message.monthCategorySummaries.push($root.MonthCategorySummary.decode(reader, reader.uint32()));
                break;
            case 7:
                message.income = reader.int64();
                break;
            case 8:
                message.expense = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("currency"))
            throw $util.ProtocolError("missing required 'currency'", { instance: message });
        if (!message.hasOwnProperty("income"))
            throw $util.ProtocolError("missing required 'income'", { instance: message });
        if (!message.hasOwnProperty("expense"))
            throw $util.ProtocolError("missing required 'expense'", { instance: message });
        return message;
    };

    /**
     * Decodes a MonthCategorySummaries message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MonthCategorySummaries
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MonthCategorySummaries} MonthCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MonthCategorySummaries.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MonthCategorySummaries message.
     * @function verify
     * @memberof MonthCategorySummaries
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MonthCategorySummaries.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        {
            var error = $root.Currency.verify(message.currency);
            if (error)
                return "currency." + error;
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
        if (message.months != null && message.hasOwnProperty("months")) {
            if (!Array.isArray(message.months))
                return "months: array expected";
            for (var i = 0; i < message.months.length; ++i) {
                var error = $root.Month.verify(message.months[i]);
                if (error)
                    return "months." + error;
            }
        }
        if (message.monthSummaries != null && message.hasOwnProperty("monthSummaries")) {
            if (!Array.isArray(message.monthSummaries))
                return "monthSummaries: array expected";
            for (var i = 0; i < message.monthSummaries.length; ++i) {
                var error = $root.MonthSummary.verify(message.monthSummaries[i]);
                if (error)
                    return "monthSummaries." + error;
            }
        }
        if (message.categorySummaries != null && message.hasOwnProperty("categorySummaries")) {
            if (!Array.isArray(message.categorySummaries))
                return "categorySummaries: array expected";
            for (var i = 0; i < message.categorySummaries.length; ++i) {
                var error = $root.CategorySummary.verify(message.categorySummaries[i]);
                if (error)
                    return "categorySummaries." + error;
            }
        }
        if (message.monthCategorySummaries != null && message.hasOwnProperty("monthCategorySummaries")) {
            if (!Array.isArray(message.monthCategorySummaries))
                return "monthCategorySummaries: array expected";
            for (var i = 0; i < message.monthCategorySummaries.length; ++i) {
                var error = $root.MonthCategorySummary.verify(message.monthCategorySummaries[i]);
                if (error)
                    return "monthCategorySummaries." + error;
            }
        }
        if (!$util.isInteger(message.income) && !(message.income && $util.isInteger(message.income.low) && $util.isInteger(message.income.high)))
            return "income: integer|Long expected";
        if (!$util.isInteger(message.expense) && !(message.expense && $util.isInteger(message.expense.low) && $util.isInteger(message.expense.high)))
            return "expense: integer|Long expected";
        return null;
    };

    /**
     * Creates a MonthCategorySummaries message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MonthCategorySummaries
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MonthCategorySummaries} MonthCategorySummaries
     */
    MonthCategorySummaries.fromObject = function fromObject(object) {
        if (object instanceof $root.MonthCategorySummaries)
            return object;
        var message = new $root.MonthCategorySummaries();
        if (object.currency != null) {
            if (typeof object.currency !== "object")
                throw TypeError(".MonthCategorySummaries.currency: object expected");
            message.currency = $root.Currency.fromObject(object.currency);
        }
        if (object.categories) {
            if (!Array.isArray(object.categories))
                throw TypeError(".MonthCategorySummaries.categories: array expected");
            message.categories = [];
            for (var i = 0; i < object.categories.length; ++i) {
                if (typeof object.categories[i] !== "object")
                    throw TypeError(".MonthCategorySummaries.categories: object expected");
                message.categories[i] = $root.Category.fromObject(object.categories[i]);
            }
        }
        if (object.months) {
            if (!Array.isArray(object.months))
                throw TypeError(".MonthCategorySummaries.months: array expected");
            message.months = [];
            for (var i = 0; i < object.months.length; ++i) {
                if (typeof object.months[i] !== "object")
                    throw TypeError(".MonthCategorySummaries.months: object expected");
                message.months[i] = $root.Month.fromObject(object.months[i]);
            }
        }
        if (object.monthSummaries) {
            if (!Array.isArray(object.monthSummaries))
                throw TypeError(".MonthCategorySummaries.monthSummaries: array expected");
            message.monthSummaries = [];
            for (var i = 0; i < object.monthSummaries.length; ++i) {
                if (typeof object.monthSummaries[i] !== "object")
                    throw TypeError(".MonthCategorySummaries.monthSummaries: object expected");
                message.monthSummaries[i] = $root.MonthSummary.fromObject(object.monthSummaries[i]);
            }
        }
        if (object.categorySummaries) {
            if (!Array.isArray(object.categorySummaries))
                throw TypeError(".MonthCategorySummaries.categorySummaries: array expected");
            message.categorySummaries = [];
            for (var i = 0; i < object.categorySummaries.length; ++i) {
                if (typeof object.categorySummaries[i] !== "object")
                    throw TypeError(".MonthCategorySummaries.categorySummaries: object expected");
                message.categorySummaries[i] = $root.CategorySummary.fromObject(object.categorySummaries[i]);
            }
        }
        if (object.monthCategorySummaries) {
            if (!Array.isArray(object.monthCategorySummaries))
                throw TypeError(".MonthCategorySummaries.monthCategorySummaries: array expected");
            message.monthCategorySummaries = [];
            for (var i = 0; i < object.monthCategorySummaries.length; ++i) {
                if (typeof object.monthCategorySummaries[i] !== "object")
                    throw TypeError(".MonthCategorySummaries.monthCategorySummaries: object expected");
                message.monthCategorySummaries[i] = $root.MonthCategorySummary.fromObject(object.monthCategorySummaries[i]);
            }
        }
        if (object.income != null)
            if ($util.Long)
                (message.income = $util.Long.fromValue(object.income)).unsigned = false;
            else if (typeof object.income === "string")
                message.income = parseInt(object.income, 10);
            else if (typeof object.income === "number")
                message.income = object.income;
            else if (typeof object.income === "object")
                message.income = new $util.LongBits(object.income.low >>> 0, object.income.high >>> 0).toNumber();
        if (object.expense != null)
            if ($util.Long)
                (message.expense = $util.Long.fromValue(object.expense)).unsigned = false;
            else if (typeof object.expense === "string")
                message.expense = parseInt(object.expense, 10);
            else if (typeof object.expense === "number")
                message.expense = object.expense;
            else if (typeof object.expense === "object")
                message.expense = new $util.LongBits(object.expense.low >>> 0, object.expense.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a MonthCategorySummaries message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MonthCategorySummaries
     * @static
     * @param {MonthCategorySummaries} message MonthCategorySummaries
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MonthCategorySummaries.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.categories = [];
            object.months = [];
            object.monthSummaries = [];
            object.categorySummaries = [];
            object.monthCategorySummaries = [];
        }
        if (options.defaults) {
            object.currency = null;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.income = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.income = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.expense = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.expense = options.longs === String ? "0" : 0;
        }
        if (message.currency != null && message.hasOwnProperty("currency"))
            object.currency = $root.Currency.toObject(message.currency, options);
        if (message.categories && message.categories.length) {
            object.categories = [];
            for (var j = 0; j < message.categories.length; ++j)
                object.categories[j] = $root.Category.toObject(message.categories[j], options);
        }
        if (message.months && message.months.length) {
            object.months = [];
            for (var j = 0; j < message.months.length; ++j)
                object.months[j] = $root.Month.toObject(message.months[j], options);
        }
        if (message.monthSummaries && message.monthSummaries.length) {
            object.monthSummaries = [];
            for (var j = 0; j < message.monthSummaries.length; ++j)
                object.monthSummaries[j] = $root.MonthSummary.toObject(message.monthSummaries[j], options);
        }
        if (message.categorySummaries && message.categorySummaries.length) {
            object.categorySummaries = [];
            for (var j = 0; j < message.categorySummaries.length; ++j)
                object.categorySummaries[j] = $root.CategorySummary.toObject(message.categorySummaries[j], options);
        }
        if (message.monthCategorySummaries && message.monthCategorySummaries.length) {
            object.monthCategorySummaries = [];
            for (var j = 0; j < message.monthCategorySummaries.length; ++j)
                object.monthCategorySummaries[j] = $root.MonthCategorySummary.toObject(message.monthCategorySummaries[j], options);
        }
        if (message.income != null && message.hasOwnProperty("income"))
            if (typeof message.income === "number")
                object.income = options.longs === String ? String(message.income) : message.income;
            else
                object.income = options.longs === String ? $util.Long.prototype.toString.call(message.income) : options.longs === Number ? new $util.LongBits(message.income.low >>> 0, message.income.high >>> 0).toNumber() : message.income;
        if (message.expense != null && message.hasOwnProperty("expense"))
            if (typeof message.expense === "number")
                object.expense = options.longs === String ? String(message.expense) : message.expense;
            else
                object.expense = options.longs === String ? $util.Long.prototype.toString.call(message.expense) : options.longs === Number ? new $util.LongBits(message.expense.low >>> 0, message.expense.high >>> 0).toNumber() : message.expense;
        return object;
    };

    /**
     * Converts this MonthCategorySummaries to JSON.
     * @function toJSON
     * @memberof MonthCategorySummaries
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MonthCategorySummaries.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MonthCategorySummaries;
})();

$root.MonthSubCategorySummary = (function() {

    /**
     * Properties of a MonthSubCategorySummary.
     * @exports IMonthSubCategorySummary
     * @interface IMonthSubCategorySummary
     * @property {IMonth} month MonthSubCategorySummary month
     * @property {ISubCategory} subCategory MonthSubCategorySummary subCategory
     * @property {Array.<number|Long>|null} [amount] MonthSubCategorySummary amount
     */

    /**
     * Constructs a new MonthSubCategorySummary.
     * @exports MonthSubCategorySummary
     * @classdesc Represents a MonthSubCategorySummary.
     * @implements IMonthSubCategorySummary
     * @constructor
     * @param {IMonthSubCategorySummary=} [properties] Properties to set
     */
    function MonthSubCategorySummary(properties) {
        this.amount = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MonthSubCategorySummary month.
     * @member {IMonth} month
     * @memberof MonthSubCategorySummary
     * @instance
     */
    MonthSubCategorySummary.prototype.month = null;

    /**
     * MonthSubCategorySummary subCategory.
     * @member {ISubCategory} subCategory
     * @memberof MonthSubCategorySummary
     * @instance
     */
    MonthSubCategorySummary.prototype.subCategory = null;

    /**
     * MonthSubCategorySummary amount.
     * @member {Array.<number|Long>} amount
     * @memberof MonthSubCategorySummary
     * @instance
     */
    MonthSubCategorySummary.prototype.amount = $util.emptyArray;

    /**
     * Creates a new MonthSubCategorySummary instance using the specified properties.
     * @function create
     * @memberof MonthSubCategorySummary
     * @static
     * @param {IMonthSubCategorySummary=} [properties] Properties to set
     * @returns {MonthSubCategorySummary} MonthSubCategorySummary instance
     */
    MonthSubCategorySummary.create = function create(properties) {
        return new MonthSubCategorySummary(properties);
    };

    /**
     * Encodes the specified MonthSubCategorySummary message. Does not implicitly {@link MonthSubCategorySummary.verify|verify} messages.
     * @function encode
     * @memberof MonthSubCategorySummary
     * @static
     * @param {IMonthSubCategorySummary} message MonthSubCategorySummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MonthSubCategorySummary.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        $root.Month.encode(message.month, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        $root.SubCategory.encode(message.subCategory, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.amount != null && message.amount.length)
            for (var i = 0; i < message.amount.length; ++i)
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.amount[i]);
        return writer;
    };

    /**
     * Encodes the specified MonthSubCategorySummary message, length delimited. Does not implicitly {@link MonthSubCategorySummary.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MonthSubCategorySummary
     * @static
     * @param {IMonthSubCategorySummary} message MonthSubCategorySummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MonthSubCategorySummary.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MonthSubCategorySummary message from the specified reader or buffer.
     * @function decode
     * @memberof MonthSubCategorySummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MonthSubCategorySummary} MonthSubCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MonthSubCategorySummary.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MonthSubCategorySummary();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.month = $root.Month.decode(reader, reader.uint32());
                break;
            case 2:
                message.subCategory = $root.SubCategory.decode(reader, reader.uint32());
                break;
            case 3:
                if (!(message.amount && message.amount.length))
                    message.amount = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.amount.push(reader.int64());
                } else
                    message.amount.push(reader.int64());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("month"))
            throw $util.ProtocolError("missing required 'month'", { instance: message });
        if (!message.hasOwnProperty("subCategory"))
            throw $util.ProtocolError("missing required 'subCategory'", { instance: message });
        return message;
    };

    /**
     * Decodes a MonthSubCategorySummary message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MonthSubCategorySummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MonthSubCategorySummary} MonthSubCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MonthSubCategorySummary.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MonthSubCategorySummary message.
     * @function verify
     * @memberof MonthSubCategorySummary
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MonthSubCategorySummary.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        {
            var error = $root.Month.verify(message.month);
            if (error)
                return "month." + error;
        }
        {
            var error = $root.SubCategory.verify(message.subCategory);
            if (error)
                return "subCategory." + error;
        }
        if (message.amount != null && message.hasOwnProperty("amount")) {
            if (!Array.isArray(message.amount))
                return "amount: array expected";
            for (var i = 0; i < message.amount.length; ++i)
                if (!$util.isInteger(message.amount[i]) && !(message.amount[i] && $util.isInteger(message.amount[i].low) && $util.isInteger(message.amount[i].high)))
                    return "amount: integer|Long[] expected";
        }
        return null;
    };

    /**
     * Creates a MonthSubCategorySummary message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MonthSubCategorySummary
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MonthSubCategorySummary} MonthSubCategorySummary
     */
    MonthSubCategorySummary.fromObject = function fromObject(object) {
        if (object instanceof $root.MonthSubCategorySummary)
            return object;
        var message = new $root.MonthSubCategorySummary();
        if (object.month != null) {
            if (typeof object.month !== "object")
                throw TypeError(".MonthSubCategorySummary.month: object expected");
            message.month = $root.Month.fromObject(object.month);
        }
        if (object.subCategory != null) {
            if (typeof object.subCategory !== "object")
                throw TypeError(".MonthSubCategorySummary.subCategory: object expected");
            message.subCategory = $root.SubCategory.fromObject(object.subCategory);
        }
        if (object.amount) {
            if (!Array.isArray(object.amount))
                throw TypeError(".MonthSubCategorySummary.amount: array expected");
            message.amount = [];
            for (var i = 0; i < object.amount.length; ++i)
                if ($util.Long)
                    (message.amount[i] = $util.Long.fromValue(object.amount[i])).unsigned = false;
                else if (typeof object.amount[i] === "string")
                    message.amount[i] = parseInt(object.amount[i], 10);
                else if (typeof object.amount[i] === "number")
                    message.amount[i] = object.amount[i];
                else if (typeof object.amount[i] === "object")
                    message.amount[i] = new $util.LongBits(object.amount[i].low >>> 0, object.amount[i].high >>> 0).toNumber();
        }
        return message;
    };

    /**
     * Creates a plain object from a MonthSubCategorySummary message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MonthSubCategorySummary
     * @static
     * @param {MonthSubCategorySummary} message MonthSubCategorySummary
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MonthSubCategorySummary.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.amount = [];
        if (options.defaults) {
            object.month = null;
            object.subCategory = null;
        }
        if (message.month != null && message.hasOwnProperty("month"))
            object.month = $root.Month.toObject(message.month, options);
        if (message.subCategory != null && message.hasOwnProperty("subCategory"))
            object.subCategory = $root.SubCategory.toObject(message.subCategory, options);
        if (message.amount && message.amount.length) {
            object.amount = [];
            for (var j = 0; j < message.amount.length; ++j)
                if (typeof message.amount[j] === "number")
                    object.amount[j] = options.longs === String ? String(message.amount[j]) : message.amount[j];
                else
                    object.amount[j] = options.longs === String ? $util.Long.prototype.toString.call(message.amount[j]) : options.longs === Number ? new $util.LongBits(message.amount[j].low >>> 0, message.amount[j].high >>> 0).toNumber() : message.amount[j];
        }
        return object;
    };

    /**
     * Converts this MonthSubCategorySummary to JSON.
     * @function toJSON
     * @memberof MonthSubCategorySummary
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MonthSubCategorySummary.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MonthSubCategorySummary;
})();

$root.MonthSubCategorySummaries = (function() {

    /**
     * Properties of a MonthSubCategorySummaries.
     * @exports IMonthSubCategorySummaries
     * @interface IMonthSubCategorySummaries
     * @property {ICurrency} currency MonthSubCategorySummaries currency
     * @property {Array.<ISubCategory>|null} [subCategories] MonthSubCategorySummaries subCategories
     * @property {Array.<IMonth>|null} [month] MonthSubCategorySummaries month
     * @property {Array.<IMonthSummary>|null} [monthSummaries] MonthSubCategorySummaries monthSummaries
     * @property {Array.<ISubCategorySummary>|null} [subCategorySummaries] MonthSubCategorySummaries subCategorySummaries
     * @property {Array.<IMonthSubCategorySummary>|null} [monthSubCategorySummaries] MonthSubCategorySummaries monthSubCategorySummaries
     * @property {number|Long} income MonthSubCategorySummaries income
     * @property {number|Long} expense MonthSubCategorySummaries expense
     */

    /**
     * Constructs a new MonthSubCategorySummaries.
     * @exports MonthSubCategorySummaries
     * @classdesc Represents a MonthSubCategorySummaries.
     * @implements IMonthSubCategorySummaries
     * @constructor
     * @param {IMonthSubCategorySummaries=} [properties] Properties to set
     */
    function MonthSubCategorySummaries(properties) {
        this.subCategories = [];
        this.month = [];
        this.monthSummaries = [];
        this.subCategorySummaries = [];
        this.monthSubCategorySummaries = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MonthSubCategorySummaries currency.
     * @member {ICurrency} currency
     * @memberof MonthSubCategorySummaries
     * @instance
     */
    MonthSubCategorySummaries.prototype.currency = null;

    /**
     * MonthSubCategorySummaries subCategories.
     * @member {Array.<ISubCategory>} subCategories
     * @memberof MonthSubCategorySummaries
     * @instance
     */
    MonthSubCategorySummaries.prototype.subCategories = $util.emptyArray;

    /**
     * MonthSubCategorySummaries month.
     * @member {Array.<IMonth>} month
     * @memberof MonthSubCategorySummaries
     * @instance
     */
    MonthSubCategorySummaries.prototype.month = $util.emptyArray;

    /**
     * MonthSubCategorySummaries monthSummaries.
     * @member {Array.<IMonthSummary>} monthSummaries
     * @memberof MonthSubCategorySummaries
     * @instance
     */
    MonthSubCategorySummaries.prototype.monthSummaries = $util.emptyArray;

    /**
     * MonthSubCategorySummaries subCategorySummaries.
     * @member {Array.<ISubCategorySummary>} subCategorySummaries
     * @memberof MonthSubCategorySummaries
     * @instance
     */
    MonthSubCategorySummaries.prototype.subCategorySummaries = $util.emptyArray;

    /**
     * MonthSubCategorySummaries monthSubCategorySummaries.
     * @member {Array.<IMonthSubCategorySummary>} monthSubCategorySummaries
     * @memberof MonthSubCategorySummaries
     * @instance
     */
    MonthSubCategorySummaries.prototype.monthSubCategorySummaries = $util.emptyArray;

    /**
     * MonthSubCategorySummaries income.
     * @member {number|Long} income
     * @memberof MonthSubCategorySummaries
     * @instance
     */
    MonthSubCategorySummaries.prototype.income = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * MonthSubCategorySummaries expense.
     * @member {number|Long} expense
     * @memberof MonthSubCategorySummaries
     * @instance
     */
    MonthSubCategorySummaries.prototype.expense = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new MonthSubCategorySummaries instance using the specified properties.
     * @function create
     * @memberof MonthSubCategorySummaries
     * @static
     * @param {IMonthSubCategorySummaries=} [properties] Properties to set
     * @returns {MonthSubCategorySummaries} MonthSubCategorySummaries instance
     */
    MonthSubCategorySummaries.create = function create(properties) {
        return new MonthSubCategorySummaries(properties);
    };

    /**
     * Encodes the specified MonthSubCategorySummaries message. Does not implicitly {@link MonthSubCategorySummaries.verify|verify} messages.
     * @function encode
     * @memberof MonthSubCategorySummaries
     * @static
     * @param {IMonthSubCategorySummaries} message MonthSubCategorySummaries message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MonthSubCategorySummaries.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        $root.Currency.encode(message.currency, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.subCategories != null && message.subCategories.length)
            for (var i = 0; i < message.subCategories.length; ++i)
                $root.SubCategory.encode(message.subCategories[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.month != null && message.month.length)
            for (var i = 0; i < message.month.length; ++i)
                $root.Month.encode(message.month[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.monthSummaries != null && message.monthSummaries.length)
            for (var i = 0; i < message.monthSummaries.length; ++i)
                $root.MonthSummary.encode(message.monthSummaries[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.subCategorySummaries != null && message.subCategorySummaries.length)
            for (var i = 0; i < message.subCategorySummaries.length; ++i)
                $root.SubCategorySummary.encode(message.subCategorySummaries[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.monthSubCategorySummaries != null && message.monthSubCategorySummaries.length)
            for (var i = 0; i < message.monthSubCategorySummaries.length; ++i)
                $root.MonthSubCategorySummary.encode(message.monthSubCategorySummaries[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        writer.uint32(/* id 7, wireType 0 =*/56).int64(message.income);
        writer.uint32(/* id 8, wireType 0 =*/64).int64(message.expense);
        return writer;
    };

    /**
     * Encodes the specified MonthSubCategorySummaries message, length delimited. Does not implicitly {@link MonthSubCategorySummaries.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MonthSubCategorySummaries
     * @static
     * @param {IMonthSubCategorySummaries} message MonthSubCategorySummaries message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MonthSubCategorySummaries.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MonthSubCategorySummaries message from the specified reader or buffer.
     * @function decode
     * @memberof MonthSubCategorySummaries
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MonthSubCategorySummaries} MonthSubCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MonthSubCategorySummaries.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MonthSubCategorySummaries();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.currency = $root.Currency.decode(reader, reader.uint32());
                break;
            case 2:
                if (!(message.subCategories && message.subCategories.length))
                    message.subCategories = [];
                message.subCategories.push($root.SubCategory.decode(reader, reader.uint32()));
                break;
            case 3:
                if (!(message.month && message.month.length))
                    message.month = [];
                message.month.push($root.Month.decode(reader, reader.uint32()));
                break;
            case 4:
                if (!(message.monthSummaries && message.monthSummaries.length))
                    message.monthSummaries = [];
                message.monthSummaries.push($root.MonthSummary.decode(reader, reader.uint32()));
                break;
            case 5:
                if (!(message.subCategorySummaries && message.subCategorySummaries.length))
                    message.subCategorySummaries = [];
                message.subCategorySummaries.push($root.SubCategorySummary.decode(reader, reader.uint32()));
                break;
            case 6:
                if (!(message.monthSubCategorySummaries && message.monthSubCategorySummaries.length))
                    message.monthSubCategorySummaries = [];
                message.monthSubCategorySummaries.push($root.MonthSubCategorySummary.decode(reader, reader.uint32()));
                break;
            case 7:
                message.income = reader.int64();
                break;
            case 8:
                message.expense = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("currency"))
            throw $util.ProtocolError("missing required 'currency'", { instance: message });
        if (!message.hasOwnProperty("income"))
            throw $util.ProtocolError("missing required 'income'", { instance: message });
        if (!message.hasOwnProperty("expense"))
            throw $util.ProtocolError("missing required 'expense'", { instance: message });
        return message;
    };

    /**
     * Decodes a MonthSubCategorySummaries message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MonthSubCategorySummaries
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MonthSubCategorySummaries} MonthSubCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MonthSubCategorySummaries.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MonthSubCategorySummaries message.
     * @function verify
     * @memberof MonthSubCategorySummaries
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MonthSubCategorySummaries.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        {
            var error = $root.Currency.verify(message.currency);
            if (error)
                return "currency." + error;
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
        if (message.month != null && message.hasOwnProperty("month")) {
            if (!Array.isArray(message.month))
                return "month: array expected";
            for (var i = 0; i < message.month.length; ++i) {
                var error = $root.Month.verify(message.month[i]);
                if (error)
                    return "month." + error;
            }
        }
        if (message.monthSummaries != null && message.hasOwnProperty("monthSummaries")) {
            if (!Array.isArray(message.monthSummaries))
                return "monthSummaries: array expected";
            for (var i = 0; i < message.monthSummaries.length; ++i) {
                var error = $root.MonthSummary.verify(message.monthSummaries[i]);
                if (error)
                    return "monthSummaries." + error;
            }
        }
        if (message.subCategorySummaries != null && message.hasOwnProperty("subCategorySummaries")) {
            if (!Array.isArray(message.subCategorySummaries))
                return "subCategorySummaries: array expected";
            for (var i = 0; i < message.subCategorySummaries.length; ++i) {
                var error = $root.SubCategorySummary.verify(message.subCategorySummaries[i]);
                if (error)
                    return "subCategorySummaries." + error;
            }
        }
        if (message.monthSubCategorySummaries != null && message.hasOwnProperty("monthSubCategorySummaries")) {
            if (!Array.isArray(message.monthSubCategorySummaries))
                return "monthSubCategorySummaries: array expected";
            for (var i = 0; i < message.monthSubCategorySummaries.length; ++i) {
                var error = $root.MonthSubCategorySummary.verify(message.monthSubCategorySummaries[i]);
                if (error)
                    return "monthSubCategorySummaries." + error;
            }
        }
        if (!$util.isInteger(message.income) && !(message.income && $util.isInteger(message.income.low) && $util.isInteger(message.income.high)))
            return "income: integer|Long expected";
        if (!$util.isInteger(message.expense) && !(message.expense && $util.isInteger(message.expense.low) && $util.isInteger(message.expense.high)))
            return "expense: integer|Long expected";
        return null;
    };

    /**
     * Creates a MonthSubCategorySummaries message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MonthSubCategorySummaries
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MonthSubCategorySummaries} MonthSubCategorySummaries
     */
    MonthSubCategorySummaries.fromObject = function fromObject(object) {
        if (object instanceof $root.MonthSubCategorySummaries)
            return object;
        var message = new $root.MonthSubCategorySummaries();
        if (object.currency != null) {
            if (typeof object.currency !== "object")
                throw TypeError(".MonthSubCategorySummaries.currency: object expected");
            message.currency = $root.Currency.fromObject(object.currency);
        }
        if (object.subCategories) {
            if (!Array.isArray(object.subCategories))
                throw TypeError(".MonthSubCategorySummaries.subCategories: array expected");
            message.subCategories = [];
            for (var i = 0; i < object.subCategories.length; ++i) {
                if (typeof object.subCategories[i] !== "object")
                    throw TypeError(".MonthSubCategorySummaries.subCategories: object expected");
                message.subCategories[i] = $root.SubCategory.fromObject(object.subCategories[i]);
            }
        }
        if (object.month) {
            if (!Array.isArray(object.month))
                throw TypeError(".MonthSubCategorySummaries.month: array expected");
            message.month = [];
            for (var i = 0; i < object.month.length; ++i) {
                if (typeof object.month[i] !== "object")
                    throw TypeError(".MonthSubCategorySummaries.month: object expected");
                message.month[i] = $root.Month.fromObject(object.month[i]);
            }
        }
        if (object.monthSummaries) {
            if (!Array.isArray(object.monthSummaries))
                throw TypeError(".MonthSubCategorySummaries.monthSummaries: array expected");
            message.monthSummaries = [];
            for (var i = 0; i < object.monthSummaries.length; ++i) {
                if (typeof object.monthSummaries[i] !== "object")
                    throw TypeError(".MonthSubCategorySummaries.monthSummaries: object expected");
                message.monthSummaries[i] = $root.MonthSummary.fromObject(object.monthSummaries[i]);
            }
        }
        if (object.subCategorySummaries) {
            if (!Array.isArray(object.subCategorySummaries))
                throw TypeError(".MonthSubCategorySummaries.subCategorySummaries: array expected");
            message.subCategorySummaries = [];
            for (var i = 0; i < object.subCategorySummaries.length; ++i) {
                if (typeof object.subCategorySummaries[i] !== "object")
                    throw TypeError(".MonthSubCategorySummaries.subCategorySummaries: object expected");
                message.subCategorySummaries[i] = $root.SubCategorySummary.fromObject(object.subCategorySummaries[i]);
            }
        }
        if (object.monthSubCategorySummaries) {
            if (!Array.isArray(object.monthSubCategorySummaries))
                throw TypeError(".MonthSubCategorySummaries.monthSubCategorySummaries: array expected");
            message.monthSubCategorySummaries = [];
            for (var i = 0; i < object.monthSubCategorySummaries.length; ++i) {
                if (typeof object.monthSubCategorySummaries[i] !== "object")
                    throw TypeError(".MonthSubCategorySummaries.monthSubCategorySummaries: object expected");
                message.monthSubCategorySummaries[i] = $root.MonthSubCategorySummary.fromObject(object.monthSubCategorySummaries[i]);
            }
        }
        if (object.income != null)
            if ($util.Long)
                (message.income = $util.Long.fromValue(object.income)).unsigned = false;
            else if (typeof object.income === "string")
                message.income = parseInt(object.income, 10);
            else if (typeof object.income === "number")
                message.income = object.income;
            else if (typeof object.income === "object")
                message.income = new $util.LongBits(object.income.low >>> 0, object.income.high >>> 0).toNumber();
        if (object.expense != null)
            if ($util.Long)
                (message.expense = $util.Long.fromValue(object.expense)).unsigned = false;
            else if (typeof object.expense === "string")
                message.expense = parseInt(object.expense, 10);
            else if (typeof object.expense === "number")
                message.expense = object.expense;
            else if (typeof object.expense === "object")
                message.expense = new $util.LongBits(object.expense.low >>> 0, object.expense.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a MonthSubCategorySummaries message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MonthSubCategorySummaries
     * @static
     * @param {MonthSubCategorySummaries} message MonthSubCategorySummaries
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MonthSubCategorySummaries.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.subCategories = [];
            object.month = [];
            object.monthSummaries = [];
            object.subCategorySummaries = [];
            object.monthSubCategorySummaries = [];
        }
        if (options.defaults) {
            object.currency = null;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.income = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.income = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.expense = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.expense = options.longs === String ? "0" : 0;
        }
        if (message.currency != null && message.hasOwnProperty("currency"))
            object.currency = $root.Currency.toObject(message.currency, options);
        if (message.subCategories && message.subCategories.length) {
            object.subCategories = [];
            for (var j = 0; j < message.subCategories.length; ++j)
                object.subCategories[j] = $root.SubCategory.toObject(message.subCategories[j], options);
        }
        if (message.month && message.month.length) {
            object.month = [];
            for (var j = 0; j < message.month.length; ++j)
                object.month[j] = $root.Month.toObject(message.month[j], options);
        }
        if (message.monthSummaries && message.monthSummaries.length) {
            object.monthSummaries = [];
            for (var j = 0; j < message.monthSummaries.length; ++j)
                object.monthSummaries[j] = $root.MonthSummary.toObject(message.monthSummaries[j], options);
        }
        if (message.subCategorySummaries && message.subCategorySummaries.length) {
            object.subCategorySummaries = [];
            for (var j = 0; j < message.subCategorySummaries.length; ++j)
                object.subCategorySummaries[j] = $root.SubCategorySummary.toObject(message.subCategorySummaries[j], options);
        }
        if (message.monthSubCategorySummaries && message.monthSubCategorySummaries.length) {
            object.monthSubCategorySummaries = [];
            for (var j = 0; j < message.monthSubCategorySummaries.length; ++j)
                object.monthSubCategorySummaries[j] = $root.MonthSubCategorySummary.toObject(message.monthSubCategorySummaries[j], options);
        }
        if (message.income != null && message.hasOwnProperty("income"))
            if (typeof message.income === "number")
                object.income = options.longs === String ? String(message.income) : message.income;
            else
                object.income = options.longs === String ? $util.Long.prototype.toString.call(message.income) : options.longs === Number ? new $util.LongBits(message.income.low >>> 0, message.income.high >>> 0).toNumber() : message.income;
        if (message.expense != null && message.hasOwnProperty("expense"))
            if (typeof message.expense === "number")
                object.expense = options.longs === String ? String(message.expense) : message.expense;
            else
                object.expense = options.longs === String ? $util.Long.prototype.toString.call(message.expense) : options.longs === Number ? new $util.LongBits(message.expense.low >>> 0, message.expense.high >>> 0).toNumber() : message.expense;
        return object;
    };

    /**
     * Converts this MonthSubCategorySummaries to JSON.
     * @function toJSON
     * @memberof MonthSubCategorySummaries
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MonthSubCategorySummaries.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MonthSubCategorySummaries;
})();

$root.YearSummary = (function() {

    /**
     * Properties of a YearSummary.
     * @exports IYearSummary
     * @interface IYearSummary
     * @property {IYear} year YearSummary year
     * @property {Array.<number|Long>|null} [amount] YearSummary amount
     */

    /**
     * Constructs a new YearSummary.
     * @exports YearSummary
     * @classdesc Represents a YearSummary.
     * @implements IYearSummary
     * @constructor
     * @param {IYearSummary=} [properties] Properties to set
     */
    function YearSummary(properties) {
        this.amount = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * YearSummary year.
     * @member {IYear} year
     * @memberof YearSummary
     * @instance
     */
    YearSummary.prototype.year = null;

    /**
     * YearSummary amount.
     * @member {Array.<number|Long>} amount
     * @memberof YearSummary
     * @instance
     */
    YearSummary.prototype.amount = $util.emptyArray;

    /**
     * Creates a new YearSummary instance using the specified properties.
     * @function create
     * @memberof YearSummary
     * @static
     * @param {IYearSummary=} [properties] Properties to set
     * @returns {YearSummary} YearSummary instance
     */
    YearSummary.create = function create(properties) {
        return new YearSummary(properties);
    };

    /**
     * Encodes the specified YearSummary message. Does not implicitly {@link YearSummary.verify|verify} messages.
     * @function encode
     * @memberof YearSummary
     * @static
     * @param {IYearSummary} message YearSummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    YearSummary.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        $root.Year.encode(message.year, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.amount != null && message.amount.length)
            for (var i = 0; i < message.amount.length; ++i)
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.amount[i]);
        return writer;
    };

    /**
     * Encodes the specified YearSummary message, length delimited. Does not implicitly {@link YearSummary.verify|verify} messages.
     * @function encodeDelimited
     * @memberof YearSummary
     * @static
     * @param {IYearSummary} message YearSummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    YearSummary.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a YearSummary message from the specified reader or buffer.
     * @function decode
     * @memberof YearSummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {YearSummary} YearSummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    YearSummary.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.YearSummary();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.year = $root.Year.decode(reader, reader.uint32());
                break;
            case 2:
                if (!(message.amount && message.amount.length))
                    message.amount = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.amount.push(reader.int64());
                } else
                    message.amount.push(reader.int64());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("year"))
            throw $util.ProtocolError("missing required 'year'", { instance: message });
        return message;
    };

    /**
     * Decodes a YearSummary message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof YearSummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {YearSummary} YearSummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    YearSummary.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a YearSummary message.
     * @function verify
     * @memberof YearSummary
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    YearSummary.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        {
            var error = $root.Year.verify(message.year);
            if (error)
                return "year." + error;
        }
        if (message.amount != null && message.hasOwnProperty("amount")) {
            if (!Array.isArray(message.amount))
                return "amount: array expected";
            for (var i = 0; i < message.amount.length; ++i)
                if (!$util.isInteger(message.amount[i]) && !(message.amount[i] && $util.isInteger(message.amount[i].low) && $util.isInteger(message.amount[i].high)))
                    return "amount: integer|Long[] expected";
        }
        return null;
    };

    /**
     * Creates a YearSummary message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof YearSummary
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {YearSummary} YearSummary
     */
    YearSummary.fromObject = function fromObject(object) {
        if (object instanceof $root.YearSummary)
            return object;
        var message = new $root.YearSummary();
        if (object.year != null) {
            if (typeof object.year !== "object")
                throw TypeError(".YearSummary.year: object expected");
            message.year = $root.Year.fromObject(object.year);
        }
        if (object.amount) {
            if (!Array.isArray(object.amount))
                throw TypeError(".YearSummary.amount: array expected");
            message.amount = [];
            for (var i = 0; i < object.amount.length; ++i)
                if ($util.Long)
                    (message.amount[i] = $util.Long.fromValue(object.amount[i])).unsigned = false;
                else if (typeof object.amount[i] === "string")
                    message.amount[i] = parseInt(object.amount[i], 10);
                else if (typeof object.amount[i] === "number")
                    message.amount[i] = object.amount[i];
                else if (typeof object.amount[i] === "object")
                    message.amount[i] = new $util.LongBits(object.amount[i].low >>> 0, object.amount[i].high >>> 0).toNumber();
        }
        return message;
    };

    /**
     * Creates a plain object from a YearSummary message. Also converts values to other types if specified.
     * @function toObject
     * @memberof YearSummary
     * @static
     * @param {YearSummary} message YearSummary
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    YearSummary.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.amount = [];
        if (options.defaults)
            object.year = null;
        if (message.year != null && message.hasOwnProperty("year"))
            object.year = $root.Year.toObject(message.year, options);
        if (message.amount && message.amount.length) {
            object.amount = [];
            for (var j = 0; j < message.amount.length; ++j)
                if (typeof message.amount[j] === "number")
                    object.amount[j] = options.longs === String ? String(message.amount[j]) : message.amount[j];
                else
                    object.amount[j] = options.longs === String ? $util.Long.prototype.toString.call(message.amount[j]) : options.longs === Number ? new $util.LongBits(message.amount[j].low >>> 0, message.amount[j].high >>> 0).toNumber() : message.amount[j];
        }
        return object;
    };

    /**
     * Converts this YearSummary to JSON.
     * @function toJSON
     * @memberof YearSummary
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    YearSummary.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return YearSummary;
})();

$root.YearCategorySummary = (function() {

    /**
     * Properties of a YearCategorySummary.
     * @exports IYearCategorySummary
     * @interface IYearCategorySummary
     * @property {IYear} year YearCategorySummary year
     * @property {ICategory} category YearCategorySummary category
     * @property {Array.<number|Long>|null} [amount] YearCategorySummary amount
     */

    /**
     * Constructs a new YearCategorySummary.
     * @exports YearCategorySummary
     * @classdesc Represents a YearCategorySummary.
     * @implements IYearCategorySummary
     * @constructor
     * @param {IYearCategorySummary=} [properties] Properties to set
     */
    function YearCategorySummary(properties) {
        this.amount = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * YearCategorySummary year.
     * @member {IYear} year
     * @memberof YearCategorySummary
     * @instance
     */
    YearCategorySummary.prototype.year = null;

    /**
     * YearCategorySummary category.
     * @member {ICategory} category
     * @memberof YearCategorySummary
     * @instance
     */
    YearCategorySummary.prototype.category = null;

    /**
     * YearCategorySummary amount.
     * @member {Array.<number|Long>} amount
     * @memberof YearCategorySummary
     * @instance
     */
    YearCategorySummary.prototype.amount = $util.emptyArray;

    /**
     * Creates a new YearCategorySummary instance using the specified properties.
     * @function create
     * @memberof YearCategorySummary
     * @static
     * @param {IYearCategorySummary=} [properties] Properties to set
     * @returns {YearCategorySummary} YearCategorySummary instance
     */
    YearCategorySummary.create = function create(properties) {
        return new YearCategorySummary(properties);
    };

    /**
     * Encodes the specified YearCategorySummary message. Does not implicitly {@link YearCategorySummary.verify|verify} messages.
     * @function encode
     * @memberof YearCategorySummary
     * @static
     * @param {IYearCategorySummary} message YearCategorySummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    YearCategorySummary.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        $root.Year.encode(message.year, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        $root.Category.encode(message.category, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.amount != null && message.amount.length)
            for (var i = 0; i < message.amount.length; ++i)
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.amount[i]);
        return writer;
    };

    /**
     * Encodes the specified YearCategorySummary message, length delimited. Does not implicitly {@link YearCategorySummary.verify|verify} messages.
     * @function encodeDelimited
     * @memberof YearCategorySummary
     * @static
     * @param {IYearCategorySummary} message YearCategorySummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    YearCategorySummary.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a YearCategorySummary message from the specified reader or buffer.
     * @function decode
     * @memberof YearCategorySummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {YearCategorySummary} YearCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    YearCategorySummary.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.YearCategorySummary();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.year = $root.Year.decode(reader, reader.uint32());
                break;
            case 2:
                message.category = $root.Category.decode(reader, reader.uint32());
                break;
            case 3:
                if (!(message.amount && message.amount.length))
                    message.amount = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.amount.push(reader.int64());
                } else
                    message.amount.push(reader.int64());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("year"))
            throw $util.ProtocolError("missing required 'year'", { instance: message });
        if (!message.hasOwnProperty("category"))
            throw $util.ProtocolError("missing required 'category'", { instance: message });
        return message;
    };

    /**
     * Decodes a YearCategorySummary message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof YearCategorySummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {YearCategorySummary} YearCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    YearCategorySummary.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a YearCategorySummary message.
     * @function verify
     * @memberof YearCategorySummary
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    YearCategorySummary.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        {
            var error = $root.Year.verify(message.year);
            if (error)
                return "year." + error;
        }
        {
            var error = $root.Category.verify(message.category);
            if (error)
                return "category." + error;
        }
        if (message.amount != null && message.hasOwnProperty("amount")) {
            if (!Array.isArray(message.amount))
                return "amount: array expected";
            for (var i = 0; i < message.amount.length; ++i)
                if (!$util.isInteger(message.amount[i]) && !(message.amount[i] && $util.isInteger(message.amount[i].low) && $util.isInteger(message.amount[i].high)))
                    return "amount: integer|Long[] expected";
        }
        return null;
    };

    /**
     * Creates a YearCategorySummary message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof YearCategorySummary
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {YearCategorySummary} YearCategorySummary
     */
    YearCategorySummary.fromObject = function fromObject(object) {
        if (object instanceof $root.YearCategorySummary)
            return object;
        var message = new $root.YearCategorySummary();
        if (object.year != null) {
            if (typeof object.year !== "object")
                throw TypeError(".YearCategorySummary.year: object expected");
            message.year = $root.Year.fromObject(object.year);
        }
        if (object.category != null) {
            if (typeof object.category !== "object")
                throw TypeError(".YearCategorySummary.category: object expected");
            message.category = $root.Category.fromObject(object.category);
        }
        if (object.amount) {
            if (!Array.isArray(object.amount))
                throw TypeError(".YearCategorySummary.amount: array expected");
            message.amount = [];
            for (var i = 0; i < object.amount.length; ++i)
                if ($util.Long)
                    (message.amount[i] = $util.Long.fromValue(object.amount[i])).unsigned = false;
                else if (typeof object.amount[i] === "string")
                    message.amount[i] = parseInt(object.amount[i], 10);
                else if (typeof object.amount[i] === "number")
                    message.amount[i] = object.amount[i];
                else if (typeof object.amount[i] === "object")
                    message.amount[i] = new $util.LongBits(object.amount[i].low >>> 0, object.amount[i].high >>> 0).toNumber();
        }
        return message;
    };

    /**
     * Creates a plain object from a YearCategorySummary message. Also converts values to other types if specified.
     * @function toObject
     * @memberof YearCategorySummary
     * @static
     * @param {YearCategorySummary} message YearCategorySummary
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    YearCategorySummary.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.amount = [];
        if (options.defaults) {
            object.year = null;
            object.category = null;
        }
        if (message.year != null && message.hasOwnProperty("year"))
            object.year = $root.Year.toObject(message.year, options);
        if (message.category != null && message.hasOwnProperty("category"))
            object.category = $root.Category.toObject(message.category, options);
        if (message.amount && message.amount.length) {
            object.amount = [];
            for (var j = 0; j < message.amount.length; ++j)
                if (typeof message.amount[j] === "number")
                    object.amount[j] = options.longs === String ? String(message.amount[j]) : message.amount[j];
                else
                    object.amount[j] = options.longs === String ? $util.Long.prototype.toString.call(message.amount[j]) : options.longs === Number ? new $util.LongBits(message.amount[j].low >>> 0, message.amount[j].high >>> 0).toNumber() : message.amount[j];
        }
        return object;
    };

    /**
     * Converts this YearCategorySummary to JSON.
     * @function toJSON
     * @memberof YearCategorySummary
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    YearCategorySummary.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return YearCategorySummary;
})();

$root.YearCategorySummaries = (function() {

    /**
     * Properties of a YearCategorySummaries.
     * @exports IYearCategorySummaries
     * @interface IYearCategorySummaries
     * @property {ICurrency} currency YearCategorySummaries currency
     * @property {Array.<ICategory>|null} [categories] YearCategorySummaries categories
     * @property {Array.<IYear>|null} [years] YearCategorySummaries years
     * @property {Array.<IYearSummary>|null} [yearSummaries] YearCategorySummaries yearSummaries
     * @property {Array.<ICategorySummary>|null} [categorySummaries] YearCategorySummaries categorySummaries
     * @property {Array.<IYearCategorySummary>|null} [yearCategorySummaries] YearCategorySummaries yearCategorySummaries
     * @property {number|Long} income YearCategorySummaries income
     * @property {number|Long} expense YearCategorySummaries expense
     */

    /**
     * Constructs a new YearCategorySummaries.
     * @exports YearCategorySummaries
     * @classdesc Represents a YearCategorySummaries.
     * @implements IYearCategorySummaries
     * @constructor
     * @param {IYearCategorySummaries=} [properties] Properties to set
     */
    function YearCategorySummaries(properties) {
        this.categories = [];
        this.years = [];
        this.yearSummaries = [];
        this.categorySummaries = [];
        this.yearCategorySummaries = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * YearCategorySummaries currency.
     * @member {ICurrency} currency
     * @memberof YearCategorySummaries
     * @instance
     */
    YearCategorySummaries.prototype.currency = null;

    /**
     * YearCategorySummaries categories.
     * @member {Array.<ICategory>} categories
     * @memberof YearCategorySummaries
     * @instance
     */
    YearCategorySummaries.prototype.categories = $util.emptyArray;

    /**
     * YearCategorySummaries years.
     * @member {Array.<IYear>} years
     * @memberof YearCategorySummaries
     * @instance
     */
    YearCategorySummaries.prototype.years = $util.emptyArray;

    /**
     * YearCategorySummaries yearSummaries.
     * @member {Array.<IYearSummary>} yearSummaries
     * @memberof YearCategorySummaries
     * @instance
     */
    YearCategorySummaries.prototype.yearSummaries = $util.emptyArray;

    /**
     * YearCategorySummaries categorySummaries.
     * @member {Array.<ICategorySummary>} categorySummaries
     * @memberof YearCategorySummaries
     * @instance
     */
    YearCategorySummaries.prototype.categorySummaries = $util.emptyArray;

    /**
     * YearCategorySummaries yearCategorySummaries.
     * @member {Array.<IYearCategorySummary>} yearCategorySummaries
     * @memberof YearCategorySummaries
     * @instance
     */
    YearCategorySummaries.prototype.yearCategorySummaries = $util.emptyArray;

    /**
     * YearCategorySummaries income.
     * @member {number|Long} income
     * @memberof YearCategorySummaries
     * @instance
     */
    YearCategorySummaries.prototype.income = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * YearCategorySummaries expense.
     * @member {number|Long} expense
     * @memberof YearCategorySummaries
     * @instance
     */
    YearCategorySummaries.prototype.expense = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new YearCategorySummaries instance using the specified properties.
     * @function create
     * @memberof YearCategorySummaries
     * @static
     * @param {IYearCategorySummaries=} [properties] Properties to set
     * @returns {YearCategorySummaries} YearCategorySummaries instance
     */
    YearCategorySummaries.create = function create(properties) {
        return new YearCategorySummaries(properties);
    };

    /**
     * Encodes the specified YearCategorySummaries message. Does not implicitly {@link YearCategorySummaries.verify|verify} messages.
     * @function encode
     * @memberof YearCategorySummaries
     * @static
     * @param {IYearCategorySummaries} message YearCategorySummaries message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    YearCategorySummaries.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        $root.Currency.encode(message.currency, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.categories != null && message.categories.length)
            for (var i = 0; i < message.categories.length; ++i)
                $root.Category.encode(message.categories[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.years != null && message.years.length)
            for (var i = 0; i < message.years.length; ++i)
                $root.Year.encode(message.years[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.yearSummaries != null && message.yearSummaries.length)
            for (var i = 0; i < message.yearSummaries.length; ++i)
                $root.YearSummary.encode(message.yearSummaries[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.categorySummaries != null && message.categorySummaries.length)
            for (var i = 0; i < message.categorySummaries.length; ++i)
                $root.CategorySummary.encode(message.categorySummaries[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.yearCategorySummaries != null && message.yearCategorySummaries.length)
            for (var i = 0; i < message.yearCategorySummaries.length; ++i)
                $root.YearCategorySummary.encode(message.yearCategorySummaries[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        writer.uint32(/* id 7, wireType 0 =*/56).int64(message.income);
        writer.uint32(/* id 8, wireType 0 =*/64).int64(message.expense);
        return writer;
    };

    /**
     * Encodes the specified YearCategorySummaries message, length delimited. Does not implicitly {@link YearCategorySummaries.verify|verify} messages.
     * @function encodeDelimited
     * @memberof YearCategorySummaries
     * @static
     * @param {IYearCategorySummaries} message YearCategorySummaries message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    YearCategorySummaries.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a YearCategorySummaries message from the specified reader or buffer.
     * @function decode
     * @memberof YearCategorySummaries
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {YearCategorySummaries} YearCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    YearCategorySummaries.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.YearCategorySummaries();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.currency = $root.Currency.decode(reader, reader.uint32());
                break;
            case 2:
                if (!(message.categories && message.categories.length))
                    message.categories = [];
                message.categories.push($root.Category.decode(reader, reader.uint32()));
                break;
            case 3:
                if (!(message.years && message.years.length))
                    message.years = [];
                message.years.push($root.Year.decode(reader, reader.uint32()));
                break;
            case 4:
                if (!(message.yearSummaries && message.yearSummaries.length))
                    message.yearSummaries = [];
                message.yearSummaries.push($root.YearSummary.decode(reader, reader.uint32()));
                break;
            case 5:
                if (!(message.categorySummaries && message.categorySummaries.length))
                    message.categorySummaries = [];
                message.categorySummaries.push($root.CategorySummary.decode(reader, reader.uint32()));
                break;
            case 6:
                if (!(message.yearCategorySummaries && message.yearCategorySummaries.length))
                    message.yearCategorySummaries = [];
                message.yearCategorySummaries.push($root.YearCategorySummary.decode(reader, reader.uint32()));
                break;
            case 7:
                message.income = reader.int64();
                break;
            case 8:
                message.expense = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("currency"))
            throw $util.ProtocolError("missing required 'currency'", { instance: message });
        if (!message.hasOwnProperty("income"))
            throw $util.ProtocolError("missing required 'income'", { instance: message });
        if (!message.hasOwnProperty("expense"))
            throw $util.ProtocolError("missing required 'expense'", { instance: message });
        return message;
    };

    /**
     * Decodes a YearCategorySummaries message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof YearCategorySummaries
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {YearCategorySummaries} YearCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    YearCategorySummaries.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a YearCategorySummaries message.
     * @function verify
     * @memberof YearCategorySummaries
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    YearCategorySummaries.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        {
            var error = $root.Currency.verify(message.currency);
            if (error)
                return "currency." + error;
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
        if (message.years != null && message.hasOwnProperty("years")) {
            if (!Array.isArray(message.years))
                return "years: array expected";
            for (var i = 0; i < message.years.length; ++i) {
                var error = $root.Year.verify(message.years[i]);
                if (error)
                    return "years." + error;
            }
        }
        if (message.yearSummaries != null && message.hasOwnProperty("yearSummaries")) {
            if (!Array.isArray(message.yearSummaries))
                return "yearSummaries: array expected";
            for (var i = 0; i < message.yearSummaries.length; ++i) {
                var error = $root.YearSummary.verify(message.yearSummaries[i]);
                if (error)
                    return "yearSummaries." + error;
            }
        }
        if (message.categorySummaries != null && message.hasOwnProperty("categorySummaries")) {
            if (!Array.isArray(message.categorySummaries))
                return "categorySummaries: array expected";
            for (var i = 0; i < message.categorySummaries.length; ++i) {
                var error = $root.CategorySummary.verify(message.categorySummaries[i]);
                if (error)
                    return "categorySummaries." + error;
            }
        }
        if (message.yearCategorySummaries != null && message.hasOwnProperty("yearCategorySummaries")) {
            if (!Array.isArray(message.yearCategorySummaries))
                return "yearCategorySummaries: array expected";
            for (var i = 0; i < message.yearCategorySummaries.length; ++i) {
                var error = $root.YearCategorySummary.verify(message.yearCategorySummaries[i]);
                if (error)
                    return "yearCategorySummaries." + error;
            }
        }
        if (!$util.isInteger(message.income) && !(message.income && $util.isInteger(message.income.low) && $util.isInteger(message.income.high)))
            return "income: integer|Long expected";
        if (!$util.isInteger(message.expense) && !(message.expense && $util.isInteger(message.expense.low) && $util.isInteger(message.expense.high)))
            return "expense: integer|Long expected";
        return null;
    };

    /**
     * Creates a YearCategorySummaries message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof YearCategorySummaries
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {YearCategorySummaries} YearCategorySummaries
     */
    YearCategorySummaries.fromObject = function fromObject(object) {
        if (object instanceof $root.YearCategorySummaries)
            return object;
        var message = new $root.YearCategorySummaries();
        if (object.currency != null) {
            if (typeof object.currency !== "object")
                throw TypeError(".YearCategorySummaries.currency: object expected");
            message.currency = $root.Currency.fromObject(object.currency);
        }
        if (object.categories) {
            if (!Array.isArray(object.categories))
                throw TypeError(".YearCategorySummaries.categories: array expected");
            message.categories = [];
            for (var i = 0; i < object.categories.length; ++i) {
                if (typeof object.categories[i] !== "object")
                    throw TypeError(".YearCategorySummaries.categories: object expected");
                message.categories[i] = $root.Category.fromObject(object.categories[i]);
            }
        }
        if (object.years) {
            if (!Array.isArray(object.years))
                throw TypeError(".YearCategorySummaries.years: array expected");
            message.years = [];
            for (var i = 0; i < object.years.length; ++i) {
                if (typeof object.years[i] !== "object")
                    throw TypeError(".YearCategorySummaries.years: object expected");
                message.years[i] = $root.Year.fromObject(object.years[i]);
            }
        }
        if (object.yearSummaries) {
            if (!Array.isArray(object.yearSummaries))
                throw TypeError(".YearCategorySummaries.yearSummaries: array expected");
            message.yearSummaries = [];
            for (var i = 0; i < object.yearSummaries.length; ++i) {
                if (typeof object.yearSummaries[i] !== "object")
                    throw TypeError(".YearCategorySummaries.yearSummaries: object expected");
                message.yearSummaries[i] = $root.YearSummary.fromObject(object.yearSummaries[i]);
            }
        }
        if (object.categorySummaries) {
            if (!Array.isArray(object.categorySummaries))
                throw TypeError(".YearCategorySummaries.categorySummaries: array expected");
            message.categorySummaries = [];
            for (var i = 0; i < object.categorySummaries.length; ++i) {
                if (typeof object.categorySummaries[i] !== "object")
                    throw TypeError(".YearCategorySummaries.categorySummaries: object expected");
                message.categorySummaries[i] = $root.CategorySummary.fromObject(object.categorySummaries[i]);
            }
        }
        if (object.yearCategorySummaries) {
            if (!Array.isArray(object.yearCategorySummaries))
                throw TypeError(".YearCategorySummaries.yearCategorySummaries: array expected");
            message.yearCategorySummaries = [];
            for (var i = 0; i < object.yearCategorySummaries.length; ++i) {
                if (typeof object.yearCategorySummaries[i] !== "object")
                    throw TypeError(".YearCategorySummaries.yearCategorySummaries: object expected");
                message.yearCategorySummaries[i] = $root.YearCategorySummary.fromObject(object.yearCategorySummaries[i]);
            }
        }
        if (object.income != null)
            if ($util.Long)
                (message.income = $util.Long.fromValue(object.income)).unsigned = false;
            else if (typeof object.income === "string")
                message.income = parseInt(object.income, 10);
            else if (typeof object.income === "number")
                message.income = object.income;
            else if (typeof object.income === "object")
                message.income = new $util.LongBits(object.income.low >>> 0, object.income.high >>> 0).toNumber();
        if (object.expense != null)
            if ($util.Long)
                (message.expense = $util.Long.fromValue(object.expense)).unsigned = false;
            else if (typeof object.expense === "string")
                message.expense = parseInt(object.expense, 10);
            else if (typeof object.expense === "number")
                message.expense = object.expense;
            else if (typeof object.expense === "object")
                message.expense = new $util.LongBits(object.expense.low >>> 0, object.expense.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a YearCategorySummaries message. Also converts values to other types if specified.
     * @function toObject
     * @memberof YearCategorySummaries
     * @static
     * @param {YearCategorySummaries} message YearCategorySummaries
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    YearCategorySummaries.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.categories = [];
            object.years = [];
            object.yearSummaries = [];
            object.categorySummaries = [];
            object.yearCategorySummaries = [];
        }
        if (options.defaults) {
            object.currency = null;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.income = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.income = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.expense = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.expense = options.longs === String ? "0" : 0;
        }
        if (message.currency != null && message.hasOwnProperty("currency"))
            object.currency = $root.Currency.toObject(message.currency, options);
        if (message.categories && message.categories.length) {
            object.categories = [];
            for (var j = 0; j < message.categories.length; ++j)
                object.categories[j] = $root.Category.toObject(message.categories[j], options);
        }
        if (message.years && message.years.length) {
            object.years = [];
            for (var j = 0; j < message.years.length; ++j)
                object.years[j] = $root.Year.toObject(message.years[j], options);
        }
        if (message.yearSummaries && message.yearSummaries.length) {
            object.yearSummaries = [];
            for (var j = 0; j < message.yearSummaries.length; ++j)
                object.yearSummaries[j] = $root.YearSummary.toObject(message.yearSummaries[j], options);
        }
        if (message.categorySummaries && message.categorySummaries.length) {
            object.categorySummaries = [];
            for (var j = 0; j < message.categorySummaries.length; ++j)
                object.categorySummaries[j] = $root.CategorySummary.toObject(message.categorySummaries[j], options);
        }
        if (message.yearCategorySummaries && message.yearCategorySummaries.length) {
            object.yearCategorySummaries = [];
            for (var j = 0; j < message.yearCategorySummaries.length; ++j)
                object.yearCategorySummaries[j] = $root.YearCategorySummary.toObject(message.yearCategorySummaries[j], options);
        }
        if (message.income != null && message.hasOwnProperty("income"))
            if (typeof message.income === "number")
                object.income = options.longs === String ? String(message.income) : message.income;
            else
                object.income = options.longs === String ? $util.Long.prototype.toString.call(message.income) : options.longs === Number ? new $util.LongBits(message.income.low >>> 0, message.income.high >>> 0).toNumber() : message.income;
        if (message.expense != null && message.hasOwnProperty("expense"))
            if (typeof message.expense === "number")
                object.expense = options.longs === String ? String(message.expense) : message.expense;
            else
                object.expense = options.longs === String ? $util.Long.prototype.toString.call(message.expense) : options.longs === Number ? new $util.LongBits(message.expense.low >>> 0, message.expense.high >>> 0).toNumber() : message.expense;
        return object;
    };

    /**
     * Converts this YearCategorySummaries to JSON.
     * @function toJSON
     * @memberof YearCategorySummaries
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    YearCategorySummaries.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return YearCategorySummaries;
})();

$root.YearSubCategorySummary = (function() {

    /**
     * Properties of a YearSubCategorySummary.
     * @exports IYearSubCategorySummary
     * @interface IYearSubCategorySummary
     * @property {IYear} year YearSubCategorySummary year
     * @property {ISubCategory} subCategory YearSubCategorySummary subCategory
     * @property {Array.<number|Long>|null} [amount] YearSubCategorySummary amount
     */

    /**
     * Constructs a new YearSubCategorySummary.
     * @exports YearSubCategorySummary
     * @classdesc Represents a YearSubCategorySummary.
     * @implements IYearSubCategorySummary
     * @constructor
     * @param {IYearSubCategorySummary=} [properties] Properties to set
     */
    function YearSubCategorySummary(properties) {
        this.amount = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * YearSubCategorySummary year.
     * @member {IYear} year
     * @memberof YearSubCategorySummary
     * @instance
     */
    YearSubCategorySummary.prototype.year = null;

    /**
     * YearSubCategorySummary subCategory.
     * @member {ISubCategory} subCategory
     * @memberof YearSubCategorySummary
     * @instance
     */
    YearSubCategorySummary.prototype.subCategory = null;

    /**
     * YearSubCategorySummary amount.
     * @member {Array.<number|Long>} amount
     * @memberof YearSubCategorySummary
     * @instance
     */
    YearSubCategorySummary.prototype.amount = $util.emptyArray;

    /**
     * Creates a new YearSubCategorySummary instance using the specified properties.
     * @function create
     * @memberof YearSubCategorySummary
     * @static
     * @param {IYearSubCategorySummary=} [properties] Properties to set
     * @returns {YearSubCategorySummary} YearSubCategorySummary instance
     */
    YearSubCategorySummary.create = function create(properties) {
        return new YearSubCategorySummary(properties);
    };

    /**
     * Encodes the specified YearSubCategorySummary message. Does not implicitly {@link YearSubCategorySummary.verify|verify} messages.
     * @function encode
     * @memberof YearSubCategorySummary
     * @static
     * @param {IYearSubCategorySummary} message YearSubCategorySummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    YearSubCategorySummary.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        $root.Year.encode(message.year, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        $root.SubCategory.encode(message.subCategory, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.amount != null && message.amount.length)
            for (var i = 0; i < message.amount.length; ++i)
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.amount[i]);
        return writer;
    };

    /**
     * Encodes the specified YearSubCategorySummary message, length delimited. Does not implicitly {@link YearSubCategorySummary.verify|verify} messages.
     * @function encodeDelimited
     * @memberof YearSubCategorySummary
     * @static
     * @param {IYearSubCategorySummary} message YearSubCategorySummary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    YearSubCategorySummary.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a YearSubCategorySummary message from the specified reader or buffer.
     * @function decode
     * @memberof YearSubCategorySummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {YearSubCategorySummary} YearSubCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    YearSubCategorySummary.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.YearSubCategorySummary();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.year = $root.Year.decode(reader, reader.uint32());
                break;
            case 2:
                message.subCategory = $root.SubCategory.decode(reader, reader.uint32());
                break;
            case 3:
                if (!(message.amount && message.amount.length))
                    message.amount = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.amount.push(reader.int64());
                } else
                    message.amount.push(reader.int64());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("year"))
            throw $util.ProtocolError("missing required 'year'", { instance: message });
        if (!message.hasOwnProperty("subCategory"))
            throw $util.ProtocolError("missing required 'subCategory'", { instance: message });
        return message;
    };

    /**
     * Decodes a YearSubCategorySummary message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof YearSubCategorySummary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {YearSubCategorySummary} YearSubCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    YearSubCategorySummary.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a YearSubCategorySummary message.
     * @function verify
     * @memberof YearSubCategorySummary
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    YearSubCategorySummary.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        {
            var error = $root.Year.verify(message.year);
            if (error)
                return "year." + error;
        }
        {
            var error = $root.SubCategory.verify(message.subCategory);
            if (error)
                return "subCategory." + error;
        }
        if (message.amount != null && message.hasOwnProperty("amount")) {
            if (!Array.isArray(message.amount))
                return "amount: array expected";
            for (var i = 0; i < message.amount.length; ++i)
                if (!$util.isInteger(message.amount[i]) && !(message.amount[i] && $util.isInteger(message.amount[i].low) && $util.isInteger(message.amount[i].high)))
                    return "amount: integer|Long[] expected";
        }
        return null;
    };

    /**
     * Creates a YearSubCategorySummary message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof YearSubCategorySummary
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {YearSubCategorySummary} YearSubCategorySummary
     */
    YearSubCategorySummary.fromObject = function fromObject(object) {
        if (object instanceof $root.YearSubCategorySummary)
            return object;
        var message = new $root.YearSubCategorySummary();
        if (object.year != null) {
            if (typeof object.year !== "object")
                throw TypeError(".YearSubCategorySummary.year: object expected");
            message.year = $root.Year.fromObject(object.year);
        }
        if (object.subCategory != null) {
            if (typeof object.subCategory !== "object")
                throw TypeError(".YearSubCategorySummary.subCategory: object expected");
            message.subCategory = $root.SubCategory.fromObject(object.subCategory);
        }
        if (object.amount) {
            if (!Array.isArray(object.amount))
                throw TypeError(".YearSubCategorySummary.amount: array expected");
            message.amount = [];
            for (var i = 0; i < object.amount.length; ++i)
                if ($util.Long)
                    (message.amount[i] = $util.Long.fromValue(object.amount[i])).unsigned = false;
                else if (typeof object.amount[i] === "string")
                    message.amount[i] = parseInt(object.amount[i], 10);
                else if (typeof object.amount[i] === "number")
                    message.amount[i] = object.amount[i];
                else if (typeof object.amount[i] === "object")
                    message.amount[i] = new $util.LongBits(object.amount[i].low >>> 0, object.amount[i].high >>> 0).toNumber();
        }
        return message;
    };

    /**
     * Creates a plain object from a YearSubCategorySummary message. Also converts values to other types if specified.
     * @function toObject
     * @memberof YearSubCategorySummary
     * @static
     * @param {YearSubCategorySummary} message YearSubCategorySummary
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    YearSubCategorySummary.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.amount = [];
        if (options.defaults) {
            object.year = null;
            object.subCategory = null;
        }
        if (message.year != null && message.hasOwnProperty("year"))
            object.year = $root.Year.toObject(message.year, options);
        if (message.subCategory != null && message.hasOwnProperty("subCategory"))
            object.subCategory = $root.SubCategory.toObject(message.subCategory, options);
        if (message.amount && message.amount.length) {
            object.amount = [];
            for (var j = 0; j < message.amount.length; ++j)
                if (typeof message.amount[j] === "number")
                    object.amount[j] = options.longs === String ? String(message.amount[j]) : message.amount[j];
                else
                    object.amount[j] = options.longs === String ? $util.Long.prototype.toString.call(message.amount[j]) : options.longs === Number ? new $util.LongBits(message.amount[j].low >>> 0, message.amount[j].high >>> 0).toNumber() : message.amount[j];
        }
        return object;
    };

    /**
     * Converts this YearSubCategorySummary to JSON.
     * @function toJSON
     * @memberof YearSubCategorySummary
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    YearSubCategorySummary.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return YearSubCategorySummary;
})();

$root.YearSubCategorySummaries = (function() {

    /**
     * Properties of a YearSubCategorySummaries.
     * @exports IYearSubCategorySummaries
     * @interface IYearSubCategorySummaries
     * @property {ICurrency} currency YearSubCategorySummaries currency
     * @property {Array.<ISubCategory>|null} [subcategories] YearSubCategorySummaries subcategories
     * @property {Array.<IYear>|null} [years] YearSubCategorySummaries years
     * @property {Array.<IYearSummary>|null} [yearSummaries] YearSubCategorySummaries yearSummaries
     * @property {Array.<ISubCategorySummary>|null} [subCategorySummaries] YearSubCategorySummaries subCategorySummaries
     * @property {Array.<IYearSubCategorySummary>|null} [yearSubCategorySummaries] YearSubCategorySummaries yearSubCategorySummaries
     * @property {number|Long} income YearSubCategorySummaries income
     * @property {number|Long} expense YearSubCategorySummaries expense
     */

    /**
     * Constructs a new YearSubCategorySummaries.
     * @exports YearSubCategorySummaries
     * @classdesc Represents a YearSubCategorySummaries.
     * @implements IYearSubCategorySummaries
     * @constructor
     * @param {IYearSubCategorySummaries=} [properties] Properties to set
     */
    function YearSubCategorySummaries(properties) {
        this.subcategories = [];
        this.years = [];
        this.yearSummaries = [];
        this.subCategorySummaries = [];
        this.yearSubCategorySummaries = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * YearSubCategorySummaries currency.
     * @member {ICurrency} currency
     * @memberof YearSubCategorySummaries
     * @instance
     */
    YearSubCategorySummaries.prototype.currency = null;

    /**
     * YearSubCategorySummaries subcategories.
     * @member {Array.<ISubCategory>} subcategories
     * @memberof YearSubCategorySummaries
     * @instance
     */
    YearSubCategorySummaries.prototype.subcategories = $util.emptyArray;

    /**
     * YearSubCategorySummaries years.
     * @member {Array.<IYear>} years
     * @memberof YearSubCategorySummaries
     * @instance
     */
    YearSubCategorySummaries.prototype.years = $util.emptyArray;

    /**
     * YearSubCategorySummaries yearSummaries.
     * @member {Array.<IYearSummary>} yearSummaries
     * @memberof YearSubCategorySummaries
     * @instance
     */
    YearSubCategorySummaries.prototype.yearSummaries = $util.emptyArray;

    /**
     * YearSubCategorySummaries subCategorySummaries.
     * @member {Array.<ISubCategorySummary>} subCategorySummaries
     * @memberof YearSubCategorySummaries
     * @instance
     */
    YearSubCategorySummaries.prototype.subCategorySummaries = $util.emptyArray;

    /**
     * YearSubCategorySummaries yearSubCategorySummaries.
     * @member {Array.<IYearSubCategorySummary>} yearSubCategorySummaries
     * @memberof YearSubCategorySummaries
     * @instance
     */
    YearSubCategorySummaries.prototype.yearSubCategorySummaries = $util.emptyArray;

    /**
     * YearSubCategorySummaries income.
     * @member {number|Long} income
     * @memberof YearSubCategorySummaries
     * @instance
     */
    YearSubCategorySummaries.prototype.income = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * YearSubCategorySummaries expense.
     * @member {number|Long} expense
     * @memberof YearSubCategorySummaries
     * @instance
     */
    YearSubCategorySummaries.prototype.expense = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new YearSubCategorySummaries instance using the specified properties.
     * @function create
     * @memberof YearSubCategorySummaries
     * @static
     * @param {IYearSubCategorySummaries=} [properties] Properties to set
     * @returns {YearSubCategorySummaries} YearSubCategorySummaries instance
     */
    YearSubCategorySummaries.create = function create(properties) {
        return new YearSubCategorySummaries(properties);
    };

    /**
     * Encodes the specified YearSubCategorySummaries message. Does not implicitly {@link YearSubCategorySummaries.verify|verify} messages.
     * @function encode
     * @memberof YearSubCategorySummaries
     * @static
     * @param {IYearSubCategorySummaries} message YearSubCategorySummaries message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    YearSubCategorySummaries.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        $root.Currency.encode(message.currency, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.subcategories != null && message.subcategories.length)
            for (var i = 0; i < message.subcategories.length; ++i)
                $root.SubCategory.encode(message.subcategories[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.years != null && message.years.length)
            for (var i = 0; i < message.years.length; ++i)
                $root.Year.encode(message.years[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.yearSummaries != null && message.yearSummaries.length)
            for (var i = 0; i < message.yearSummaries.length; ++i)
                $root.YearSummary.encode(message.yearSummaries[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.subCategorySummaries != null && message.subCategorySummaries.length)
            for (var i = 0; i < message.subCategorySummaries.length; ++i)
                $root.SubCategorySummary.encode(message.subCategorySummaries[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.yearSubCategorySummaries != null && message.yearSubCategorySummaries.length)
            for (var i = 0; i < message.yearSubCategorySummaries.length; ++i)
                $root.YearSubCategorySummary.encode(message.yearSubCategorySummaries[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        writer.uint32(/* id 7, wireType 0 =*/56).int64(message.income);
        writer.uint32(/* id 8, wireType 0 =*/64).int64(message.expense);
        return writer;
    };

    /**
     * Encodes the specified YearSubCategorySummaries message, length delimited. Does not implicitly {@link YearSubCategorySummaries.verify|verify} messages.
     * @function encodeDelimited
     * @memberof YearSubCategorySummaries
     * @static
     * @param {IYearSubCategorySummaries} message YearSubCategorySummaries message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    YearSubCategorySummaries.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a YearSubCategorySummaries message from the specified reader or buffer.
     * @function decode
     * @memberof YearSubCategorySummaries
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {YearSubCategorySummaries} YearSubCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    YearSubCategorySummaries.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.YearSubCategorySummaries();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.currency = $root.Currency.decode(reader, reader.uint32());
                break;
            case 2:
                if (!(message.subcategories && message.subcategories.length))
                    message.subcategories = [];
                message.subcategories.push($root.SubCategory.decode(reader, reader.uint32()));
                break;
            case 3:
                if (!(message.years && message.years.length))
                    message.years = [];
                message.years.push($root.Year.decode(reader, reader.uint32()));
                break;
            case 4:
                if (!(message.yearSummaries && message.yearSummaries.length))
                    message.yearSummaries = [];
                message.yearSummaries.push($root.YearSummary.decode(reader, reader.uint32()));
                break;
            case 5:
                if (!(message.subCategorySummaries && message.subCategorySummaries.length))
                    message.subCategorySummaries = [];
                message.subCategorySummaries.push($root.SubCategorySummary.decode(reader, reader.uint32()));
                break;
            case 6:
                if (!(message.yearSubCategorySummaries && message.yearSubCategorySummaries.length))
                    message.yearSubCategorySummaries = [];
                message.yearSubCategorySummaries.push($root.YearSubCategorySummary.decode(reader, reader.uint32()));
                break;
            case 7:
                message.income = reader.int64();
                break;
            case 8:
                message.expense = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("currency"))
            throw $util.ProtocolError("missing required 'currency'", { instance: message });
        if (!message.hasOwnProperty("income"))
            throw $util.ProtocolError("missing required 'income'", { instance: message });
        if (!message.hasOwnProperty("expense"))
            throw $util.ProtocolError("missing required 'expense'", { instance: message });
        return message;
    };

    /**
     * Decodes a YearSubCategorySummaries message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof YearSubCategorySummaries
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {YearSubCategorySummaries} YearSubCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    YearSubCategorySummaries.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a YearSubCategorySummaries message.
     * @function verify
     * @memberof YearSubCategorySummaries
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    YearSubCategorySummaries.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        {
            var error = $root.Currency.verify(message.currency);
            if (error)
                return "currency." + error;
        }
        if (message.subcategories != null && message.hasOwnProperty("subcategories")) {
            if (!Array.isArray(message.subcategories))
                return "subcategories: array expected";
            for (var i = 0; i < message.subcategories.length; ++i) {
                var error = $root.SubCategory.verify(message.subcategories[i]);
                if (error)
                    return "subcategories." + error;
            }
        }
        if (message.years != null && message.hasOwnProperty("years")) {
            if (!Array.isArray(message.years))
                return "years: array expected";
            for (var i = 0; i < message.years.length; ++i) {
                var error = $root.Year.verify(message.years[i]);
                if (error)
                    return "years." + error;
            }
        }
        if (message.yearSummaries != null && message.hasOwnProperty("yearSummaries")) {
            if (!Array.isArray(message.yearSummaries))
                return "yearSummaries: array expected";
            for (var i = 0; i < message.yearSummaries.length; ++i) {
                var error = $root.YearSummary.verify(message.yearSummaries[i]);
                if (error)
                    return "yearSummaries." + error;
            }
        }
        if (message.subCategorySummaries != null && message.hasOwnProperty("subCategorySummaries")) {
            if (!Array.isArray(message.subCategorySummaries))
                return "subCategorySummaries: array expected";
            for (var i = 0; i < message.subCategorySummaries.length; ++i) {
                var error = $root.SubCategorySummary.verify(message.subCategorySummaries[i]);
                if (error)
                    return "subCategorySummaries." + error;
            }
        }
        if (message.yearSubCategorySummaries != null && message.hasOwnProperty("yearSubCategorySummaries")) {
            if (!Array.isArray(message.yearSubCategorySummaries))
                return "yearSubCategorySummaries: array expected";
            for (var i = 0; i < message.yearSubCategorySummaries.length; ++i) {
                var error = $root.YearSubCategorySummary.verify(message.yearSubCategorySummaries[i]);
                if (error)
                    return "yearSubCategorySummaries." + error;
            }
        }
        if (!$util.isInteger(message.income) && !(message.income && $util.isInteger(message.income.low) && $util.isInteger(message.income.high)))
            return "income: integer|Long expected";
        if (!$util.isInteger(message.expense) && !(message.expense && $util.isInteger(message.expense.low) && $util.isInteger(message.expense.high)))
            return "expense: integer|Long expected";
        return null;
    };

    /**
     * Creates a YearSubCategorySummaries message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof YearSubCategorySummaries
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {YearSubCategorySummaries} YearSubCategorySummaries
     */
    YearSubCategorySummaries.fromObject = function fromObject(object) {
        if (object instanceof $root.YearSubCategorySummaries)
            return object;
        var message = new $root.YearSubCategorySummaries();
        if (object.currency != null) {
            if (typeof object.currency !== "object")
                throw TypeError(".YearSubCategorySummaries.currency: object expected");
            message.currency = $root.Currency.fromObject(object.currency);
        }
        if (object.subcategories) {
            if (!Array.isArray(object.subcategories))
                throw TypeError(".YearSubCategorySummaries.subcategories: array expected");
            message.subcategories = [];
            for (var i = 0; i < object.subcategories.length; ++i) {
                if (typeof object.subcategories[i] !== "object")
                    throw TypeError(".YearSubCategorySummaries.subcategories: object expected");
                message.subcategories[i] = $root.SubCategory.fromObject(object.subcategories[i]);
            }
        }
        if (object.years) {
            if (!Array.isArray(object.years))
                throw TypeError(".YearSubCategorySummaries.years: array expected");
            message.years = [];
            for (var i = 0; i < object.years.length; ++i) {
                if (typeof object.years[i] !== "object")
                    throw TypeError(".YearSubCategorySummaries.years: object expected");
                message.years[i] = $root.Year.fromObject(object.years[i]);
            }
        }
        if (object.yearSummaries) {
            if (!Array.isArray(object.yearSummaries))
                throw TypeError(".YearSubCategorySummaries.yearSummaries: array expected");
            message.yearSummaries = [];
            for (var i = 0; i < object.yearSummaries.length; ++i) {
                if (typeof object.yearSummaries[i] !== "object")
                    throw TypeError(".YearSubCategorySummaries.yearSummaries: object expected");
                message.yearSummaries[i] = $root.YearSummary.fromObject(object.yearSummaries[i]);
            }
        }
        if (object.subCategorySummaries) {
            if (!Array.isArray(object.subCategorySummaries))
                throw TypeError(".YearSubCategorySummaries.subCategorySummaries: array expected");
            message.subCategorySummaries = [];
            for (var i = 0; i < object.subCategorySummaries.length; ++i) {
                if (typeof object.subCategorySummaries[i] !== "object")
                    throw TypeError(".YearSubCategorySummaries.subCategorySummaries: object expected");
                message.subCategorySummaries[i] = $root.SubCategorySummary.fromObject(object.subCategorySummaries[i]);
            }
        }
        if (object.yearSubCategorySummaries) {
            if (!Array.isArray(object.yearSubCategorySummaries))
                throw TypeError(".YearSubCategorySummaries.yearSubCategorySummaries: array expected");
            message.yearSubCategorySummaries = [];
            for (var i = 0; i < object.yearSubCategorySummaries.length; ++i) {
                if (typeof object.yearSubCategorySummaries[i] !== "object")
                    throw TypeError(".YearSubCategorySummaries.yearSubCategorySummaries: object expected");
                message.yearSubCategorySummaries[i] = $root.YearSubCategorySummary.fromObject(object.yearSubCategorySummaries[i]);
            }
        }
        if (object.income != null)
            if ($util.Long)
                (message.income = $util.Long.fromValue(object.income)).unsigned = false;
            else if (typeof object.income === "string")
                message.income = parseInt(object.income, 10);
            else if (typeof object.income === "number")
                message.income = object.income;
            else if (typeof object.income === "object")
                message.income = new $util.LongBits(object.income.low >>> 0, object.income.high >>> 0).toNumber();
        if (object.expense != null)
            if ($util.Long)
                (message.expense = $util.Long.fromValue(object.expense)).unsigned = false;
            else if (typeof object.expense === "string")
                message.expense = parseInt(object.expense, 10);
            else if (typeof object.expense === "number")
                message.expense = object.expense;
            else if (typeof object.expense === "object")
                message.expense = new $util.LongBits(object.expense.low >>> 0, object.expense.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a YearSubCategorySummaries message. Also converts values to other types if specified.
     * @function toObject
     * @memberof YearSubCategorySummaries
     * @static
     * @param {YearSubCategorySummaries} message YearSubCategorySummaries
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    YearSubCategorySummaries.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.subcategories = [];
            object.years = [];
            object.yearSummaries = [];
            object.subCategorySummaries = [];
            object.yearSubCategorySummaries = [];
        }
        if (options.defaults) {
            object.currency = null;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.income = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.income = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.expense = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.expense = options.longs === String ? "0" : 0;
        }
        if (message.currency != null && message.hasOwnProperty("currency"))
            object.currency = $root.Currency.toObject(message.currency, options);
        if (message.subcategories && message.subcategories.length) {
            object.subcategories = [];
            for (var j = 0; j < message.subcategories.length; ++j)
                object.subcategories[j] = $root.SubCategory.toObject(message.subcategories[j], options);
        }
        if (message.years && message.years.length) {
            object.years = [];
            for (var j = 0; j < message.years.length; ++j)
                object.years[j] = $root.Year.toObject(message.years[j], options);
        }
        if (message.yearSummaries && message.yearSummaries.length) {
            object.yearSummaries = [];
            for (var j = 0; j < message.yearSummaries.length; ++j)
                object.yearSummaries[j] = $root.YearSummary.toObject(message.yearSummaries[j], options);
        }
        if (message.subCategorySummaries && message.subCategorySummaries.length) {
            object.subCategorySummaries = [];
            for (var j = 0; j < message.subCategorySummaries.length; ++j)
                object.subCategorySummaries[j] = $root.SubCategorySummary.toObject(message.subCategorySummaries[j], options);
        }
        if (message.yearSubCategorySummaries && message.yearSubCategorySummaries.length) {
            object.yearSubCategorySummaries = [];
            for (var j = 0; j < message.yearSubCategorySummaries.length; ++j)
                object.yearSubCategorySummaries[j] = $root.YearSubCategorySummary.toObject(message.yearSubCategorySummaries[j], options);
        }
        if (message.income != null && message.hasOwnProperty("income"))
            if (typeof message.income === "number")
                object.income = options.longs === String ? String(message.income) : message.income;
            else
                object.income = options.longs === String ? $util.Long.prototype.toString.call(message.income) : options.longs === Number ? new $util.LongBits(message.income.low >>> 0, message.income.high >>> 0).toNumber() : message.income;
        if (message.expense != null && message.hasOwnProperty("expense"))
            if (typeof message.expense === "number")
                object.expense = options.longs === String ? String(message.expense) : message.expense;
            else
                object.expense = options.longs === String ? $util.Long.prototype.toString.call(message.expense) : options.longs === Number ? new $util.LongBits(message.expense.low >>> 0, message.expense.high >>> 0).toNumber() : message.expense;
        return object;
    };

    /**
     * Converts this YearSubCategorySummaries to JSON.
     * @function toJSON
     * @memberof YearSubCategorySummaries
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    YearSubCategorySummaries.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return YearSubCategorySummaries;
})();

module.exports = $root;
