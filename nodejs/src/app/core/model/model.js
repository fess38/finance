/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

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
 * @property {number} TRANSACTION_ARCHIVE=8 TRANSACTION_ARCHIVE value
 * @property {number} TRANSACTION_TEMPLATE=9 TRANSACTION_TEMPLATE value
 */
$root.EntityType = (function() {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNDEFINED"] = 0;
    values[valuesById[7] = "SETTINGS"] = 7;
    values[valuesById[1] = "CURRENCY"] = 1;
    values[valuesById[2] = "ACCOUNT"] = 2;
    values[valuesById[3] = "CATEGORY"] = 3;
    values[valuesById[4] = "SUB_CATEGORY"] = 4;
    values[valuesById[5] = "FAMILY_MEMBER"] = 5;
    values[valuesById[6] = "TRANSACTION"] = 6;
    values[valuesById[8] = "TRANSACTION_ARCHIVE"] = 8;
    values[valuesById[9] = "TRANSACTION_TEMPLATE"] = 9;
    return values;
})();

export const Dump = $root.Dump = (() => {

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
     * @property {Array.<ITransactionTemplate>|null} [transactionTemplates] Dump transactionTemplates
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
        this.transactionTemplates = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
     * Dump transactionTemplates.
     * @member {Array.<ITransactionTemplate>} transactionTemplates
     * @memberof Dump
     * @instance
     */
    Dump.prototype.transactionTemplates = $util.emptyArray;

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
            for (let i = 0; i < message.currencies.length; ++i)
                $root.Currency.encode(message.currencies[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.accounts != null && message.accounts.length)
            for (let i = 0; i < message.accounts.length; ++i)
                $root.Account.encode(message.accounts[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.categories != null && message.categories.length)
            for (let i = 0; i < message.categories.length; ++i)
                $root.Category.encode(message.categories[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.subCategories != null && message.subCategories.length)
            for (let i = 0; i < message.subCategories.length; ++i)
                $root.SubCategory.encode(message.subCategories[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.familyMembers != null && message.familyMembers.length)
            for (let i = 0; i < message.familyMembers.length; ++i)
                $root.FamilyMember.encode(message.familyMembers[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.transactions != null && message.transactions.length)
            for (let i = 0; i < message.transactions.length; ++i)
                $root.Transaction.encode(message.transactions[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        $root.Settings.encode(message.settings, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.transactionTemplates != null && message.transactionTemplates.length)
            for (let i = 0; i < message.transactionTemplates.length; ++i)
                $root.TransactionTemplate.encode(message.transactionTemplates[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        return writer;
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
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Dump();
        while (reader.pos < end) {
            let tag = reader.uint32();
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
            case 8:
                if (!(message.transactionTemplates && message.transactionTemplates.length))
                    message.transactionTemplates = [];
                message.transactionTemplates.push($root.TransactionTemplate.decode(reader, reader.uint32()));
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
        let message = new $root.Dump();
        if (object.settings != null) {
            if (typeof object.settings !== "object")
                throw TypeError(".Dump.settings: object expected");
            message.settings = $root.Settings.fromObject(object.settings);
        }
        if (object.currencies) {
            if (!Array.isArray(object.currencies))
                throw TypeError(".Dump.currencies: array expected");
            message.currencies = [];
            for (let i = 0; i < object.currencies.length; ++i) {
                if (typeof object.currencies[i] !== "object")
                    throw TypeError(".Dump.currencies: object expected");
                message.currencies[i] = $root.Currency.fromObject(object.currencies[i]);
            }
        }
        if (object.accounts) {
            if (!Array.isArray(object.accounts))
                throw TypeError(".Dump.accounts: array expected");
            message.accounts = [];
            for (let i = 0; i < object.accounts.length; ++i) {
                if (typeof object.accounts[i] !== "object")
                    throw TypeError(".Dump.accounts: object expected");
                message.accounts[i] = $root.Account.fromObject(object.accounts[i]);
            }
        }
        if (object.categories) {
            if (!Array.isArray(object.categories))
                throw TypeError(".Dump.categories: array expected");
            message.categories = [];
            for (let i = 0; i < object.categories.length; ++i) {
                if (typeof object.categories[i] !== "object")
                    throw TypeError(".Dump.categories: object expected");
                message.categories[i] = $root.Category.fromObject(object.categories[i]);
            }
        }
        if (object.subCategories) {
            if (!Array.isArray(object.subCategories))
                throw TypeError(".Dump.subCategories: array expected");
            message.subCategories = [];
            for (let i = 0; i < object.subCategories.length; ++i) {
                if (typeof object.subCategories[i] !== "object")
                    throw TypeError(".Dump.subCategories: object expected");
                message.subCategories[i] = $root.SubCategory.fromObject(object.subCategories[i]);
            }
        }
        if (object.familyMembers) {
            if (!Array.isArray(object.familyMembers))
                throw TypeError(".Dump.familyMembers: array expected");
            message.familyMembers = [];
            for (let i = 0; i < object.familyMembers.length; ++i) {
                if (typeof object.familyMembers[i] !== "object")
                    throw TypeError(".Dump.familyMembers: object expected");
                message.familyMembers[i] = $root.FamilyMember.fromObject(object.familyMembers[i]);
            }
        }
        if (object.transactions) {
            if (!Array.isArray(object.transactions))
                throw TypeError(".Dump.transactions: array expected");
            message.transactions = [];
            for (let i = 0; i < object.transactions.length; ++i) {
                if (typeof object.transactions[i] !== "object")
                    throw TypeError(".Dump.transactions: object expected");
                message.transactions[i] = $root.Transaction.fromObject(object.transactions[i]);
            }
        }
        if (object.transactionTemplates) {
            if (!Array.isArray(object.transactionTemplates))
                throw TypeError(".Dump.transactionTemplates: array expected");
            message.transactionTemplates = [];
            for (let i = 0; i < object.transactionTemplates.length; ++i) {
                if (typeof object.transactionTemplates[i] !== "object")
                    throw TypeError(".Dump.transactionTemplates: object expected");
                message.transactionTemplates[i] = $root.TransactionTemplate.fromObject(object.transactionTemplates[i]);
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
        let object = {};
        if (options.arrays || options.defaults) {
            object.currencies = [];
            object.accounts = [];
            object.categories = [];
            object.subCategories = [];
            object.familyMembers = [];
            object.transactions = [];
            object.transactionTemplates = [];
        }
        if (options.defaults)
            object.settings = null;
        if (message.currencies && message.currencies.length) {
            object.currencies = [];
            for (let j = 0; j < message.currencies.length; ++j)
                object.currencies[j] = $root.Currency.toObject(message.currencies[j], options);
        }
        if (message.accounts && message.accounts.length) {
            object.accounts = [];
            for (let j = 0; j < message.accounts.length; ++j)
                object.accounts[j] = $root.Account.toObject(message.accounts[j], options);
        }
        if (message.categories && message.categories.length) {
            object.categories = [];
            for (let j = 0; j < message.categories.length; ++j)
                object.categories[j] = $root.Category.toObject(message.categories[j], options);
        }
        if (message.subCategories && message.subCategories.length) {
            object.subCategories = [];
            for (let j = 0; j < message.subCategories.length; ++j)
                object.subCategories[j] = $root.SubCategory.toObject(message.subCategories[j], options);
        }
        if (message.familyMembers && message.familyMembers.length) {
            object.familyMembers = [];
            for (let j = 0; j < message.familyMembers.length; ++j)
                object.familyMembers[j] = $root.FamilyMember.toObject(message.familyMembers[j], options);
        }
        if (message.transactions && message.transactions.length) {
            object.transactions = [];
            for (let j = 0; j < message.transactions.length; ++j)
                object.transactions[j] = $root.Transaction.toObject(message.transactions[j], options);
        }
        if (message.settings != null && message.hasOwnProperty("settings"))
            object.settings = $root.Settings.toObject(message.settings, options);
        if (message.transactionTemplates && message.transactionTemplates.length) {
            object.transactionTemplates = [];
            for (let j = 0; j < message.transactionTemplates.length; ++j)
                object.transactionTemplates[j] = $root.TransactionTemplate.toObject(message.transactionTemplates[j], options);
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

export const Currency = $root.Currency = (() => {

    /**
     * Properties of a Currency.
     * @exports ICurrency
     * @interface ICurrency
     * @property {number} id Currency id
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
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Currency id.
     * @member {number} id
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
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Currency();
        while (reader.pos < end) {
            let tag = reader.uint32();
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
        let message = new $root.Currency();
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
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
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

export const Currencies = $root.Currencies = (() => {

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
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            for (let i = 0; i < message.items.length; ++i)
                $root.Currency.encode(message.items[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
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
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Currencies();
        while (reader.pos < end) {
            let tag = reader.uint32();
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
        let message = new $root.Currencies();
        if (object.items) {
            if (!Array.isArray(object.items))
                throw TypeError(".Currencies.items: array expected");
            message.items = [];
            for (let i = 0; i < object.items.length; ++i) {
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
        let object = {};
        if (options.arrays || options.defaults)
            object.items = [];
        if (message.items && message.items.length) {
            object.items = [];
            for (let j = 0; j < message.items.length; ++j)
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

export const Account = $root.Account = (() => {

    /**
     * Properties of an Account.
     * @exports IAccount
     * @interface IAccount
     * @property {number|null} [id] Account id
     * @property {boolean|null} [isDeleted] Account isDeleted
     * @property {boolean|null} [isVisible] Account isVisible
     * @property {number|null} [transactionAmount] Account transactionAmount
     * @property {string} name Account name
     * @property {number|null} [balance] Account balance
     * @property {number} currencyId Account currencyId
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
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Account id.
     * @member {number} id
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
     * @member {number} transactionAmount
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
     * @member {number} balance
     * @memberof Account
     * @instance
     */
    Account.prototype.balance = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Account currencyId.
     * @member {number} currencyId
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
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Account();
        while (reader.pos < end) {
            let tag = reader.uint32();
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
        let message = new $root.Account();
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
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.id = options.longs === String ? "0" : 0;
            object.isDeleted = false;
            object.name = "";
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.balance = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.balance = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.currencyId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.currencyId = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
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

export const Category = $root.Category = (() => {

    /**
     * Properties of a Category.
     * @exports ICategory
     * @interface ICategory
     * @property {number|null} [id] Category id
     * @property {boolean|null} [isDeleted] Category isDeleted
     * @property {boolean|null} [isVisible] Category isVisible
     * @property {number|null} [transactionAmount] Category transactionAmount
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
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Category id.
     * @member {number} id
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
     * @member {number} transactionAmount
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
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Category();
        while (reader.pos < end) {
            let tag = reader.uint32();
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
        let message = new $root.Category();
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
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.id = options.longs === String ? "0" : 0;
            object.isDeleted = false;
            object.name = "";
            object.isIncome = false;
            object.isExpense = false;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
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

export const SubCategory = $root.SubCategory = (() => {

    /**
     * Properties of a SubCategory.
     * @exports ISubCategory
     * @interface ISubCategory
     * @property {number|null} [id] SubCategory id
     * @property {boolean|null} [isDeleted] SubCategory isDeleted
     * @property {boolean|null} [isVisible] SubCategory isVisible
     * @property {number|null} [transactionAmount] SubCategory transactionAmount
     * @property {string} name SubCategory name
     * @property {number} categoryId SubCategory categoryId
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
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SubCategory id.
     * @member {number} id
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
     * @member {number} transactionAmount
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
     * @member {number} categoryId
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
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SubCategory();
        while (reader.pos < end) {
            let tag = reader.uint32();
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
        let message = new $root.SubCategory();
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
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.id = options.longs === String ? "0" : 0;
            object.isDeleted = false;
            object.name = "";
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.categoryId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.categoryId = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
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

export const FamilyMember = $root.FamilyMember = (() => {

    /**
     * Properties of a FamilyMember.
     * @exports IFamilyMember
     * @interface IFamilyMember
     * @property {number|null} [id] FamilyMember id
     * @property {boolean|null} [isDeleted] FamilyMember isDeleted
     * @property {boolean|null} [isVisible] FamilyMember isVisible
     * @property {number|null} [transactionAmount] FamilyMember transactionAmount
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
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * FamilyMember id.
     * @member {number} id
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
     * @member {number} transactionAmount
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
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.FamilyMember();
        while (reader.pos < end) {
            let tag = reader.uint32();
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
        let message = new $root.FamilyMember();
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
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.id = options.longs === String ? "0" : 0;
            object.isDeleted = false;
            object.name = "";
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
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

export const Transaction = $root.Transaction = (() => {

    /**
     * Properties of a Transaction.
     * @exports ITransaction
     * @interface ITransaction
     * @property {number|null} [id] Transaction id
     * @property {boolean|null} [isDeleted] Transaction isDeleted
     * @property {string} created Transaction created
     * @property {number} accountIdFrom Transaction accountIdFrom
     * @property {number} accountIdTo Transaction accountIdTo
     * @property {number} amountFrom Transaction amountFrom
     * @property {number} amountTo Transaction amountTo
     * @property {number} categoryId Transaction categoryId
     * @property {number|null} [subCategoryId] Transaction subCategoryId
     * @property {number|null} [familyMemberId] Transaction familyMemberId
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
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Transaction id.
     * @member {number} id
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
     * @member {number} accountIdFrom
     * @memberof Transaction
     * @instance
     */
    Transaction.prototype.accountIdFrom = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Transaction accountIdTo.
     * @member {number} accountIdTo
     * @memberof Transaction
     * @instance
     */
    Transaction.prototype.accountIdTo = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Transaction amountFrom.
     * @member {number} amountFrom
     * @memberof Transaction
     * @instance
     */
    Transaction.prototype.amountFrom = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Transaction amountTo.
     * @member {number} amountTo
     * @memberof Transaction
     * @instance
     */
    Transaction.prototype.amountTo = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Transaction categoryId.
     * @member {number} categoryId
     * @memberof Transaction
     * @instance
     */
    Transaction.prototype.categoryId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Transaction subCategoryId.
     * @member {number} subCategoryId
     * @memberof Transaction
     * @instance
     */
    Transaction.prototype.subCategoryId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Transaction familyMemberId.
     * @member {number} familyMemberId
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
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Transaction();
        while (reader.pos < end) {
            let tag = reader.uint32();
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
        let message = new $root.Transaction();
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
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.id = options.longs === String ? "0" : 0;
            object.isDeleted = false;
            object.created = "";
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.accountIdFrom = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.accountIdFrom = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.accountIdTo = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.accountIdTo = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.amountFrom = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.amountFrom = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.amountTo = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.amountTo = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.categoryId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.categoryId = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.subCategoryId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.subCategoryId = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
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
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNDEFINED"] = 0;
        values[valuesById[1] = "INCOME"] = 1;
        values[valuesById[2] = "EXPENSE"] = 2;
        values[valuesById[3] = "TRANSFER"] = 3;
        return values;
    })();

    return Transaction;
})();

export const TransactionTemplate = $root.TransactionTemplate = (() => {

    /**
     * Properties of a TransactionTemplate.
     * @exports ITransactionTemplate
     * @interface ITransactionTemplate
     * @property {number|null} [id] TransactionTemplate id
     * @property {boolean|null} [isDeleted] TransactionTemplate isDeleted
     * @property {string} name TransactionTemplate name
     * @property {ITransaction} transaction TransactionTemplate transaction
     * @property {number|null} [interval] TransactionTemplate interval
     * @property {Array.<number>|null} [daysOfWeek] TransactionTemplate daysOfWeek
     * @property {Array.<number>|null} [daysOfMonth] TransactionTemplate daysOfMonth
     */

    /**
     * Constructs a new TransactionTemplate.
     * @exports TransactionTemplate
     * @classdesc Represents a TransactionTemplate.
     * @implements ITransactionTemplate
     * @constructor
     * @param {ITransactionTemplate=} [properties] Properties to set
     */
    function TransactionTemplate(properties) {
        this.daysOfWeek = [];
        this.daysOfMonth = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * TransactionTemplate id.
     * @member {number} id
     * @memberof TransactionTemplate
     * @instance
     */
    TransactionTemplate.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * TransactionTemplate isDeleted.
     * @member {boolean} isDeleted
     * @memberof TransactionTemplate
     * @instance
     */
    TransactionTemplate.prototype.isDeleted = false;

    /**
     * TransactionTemplate name.
     * @member {string} name
     * @memberof TransactionTemplate
     * @instance
     */
    TransactionTemplate.prototype.name = "";

    /**
     * TransactionTemplate transaction.
     * @member {ITransaction} transaction
     * @memberof TransactionTemplate
     * @instance
     */
    TransactionTemplate.prototype.transaction = null;

    /**
     * TransactionTemplate interval.
     * @member {number} interval
     * @memberof TransactionTemplate
     * @instance
     */
    TransactionTemplate.prototype.interval = 0;

    /**
     * TransactionTemplate daysOfWeek.
     * @member {Array.<number>} daysOfWeek
     * @memberof TransactionTemplate
     * @instance
     */
    TransactionTemplate.prototype.daysOfWeek = $util.emptyArray;

    /**
     * TransactionTemplate daysOfMonth.
     * @member {Array.<number>} daysOfMonth
     * @memberof TransactionTemplate
     * @instance
     */
    TransactionTemplate.prototype.daysOfMonth = $util.emptyArray;

    /**
     * Creates a new TransactionTemplate instance using the specified properties.
     * @function create
     * @memberof TransactionTemplate
     * @static
     * @param {ITransactionTemplate=} [properties] Properties to set
     * @returns {TransactionTemplate} TransactionTemplate instance
     */
    TransactionTemplate.create = function create(properties) {
        return new TransactionTemplate(properties);
    };

    /**
     * Encodes the specified TransactionTemplate message. Does not implicitly {@link TransactionTemplate.verify|verify} messages.
     * @function encode
     * @memberof TransactionTemplate
     * @static
     * @param {ITransactionTemplate} message TransactionTemplate message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TransactionTemplate.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
        if (message.isDeleted != null && message.hasOwnProperty("isDeleted"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isDeleted);
        writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
        $root.Transaction.encode(message.transaction, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.interval != null && message.hasOwnProperty("interval"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.interval);
        if (message.daysOfWeek != null && message.daysOfWeek.length)
            for (let i = 0; i < message.daysOfWeek.length; ++i)
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.daysOfWeek[i]);
        if (message.daysOfMonth != null && message.daysOfMonth.length)
            for (let i = 0; i < message.daysOfMonth.length; ++i)
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.daysOfMonth[i]);
        return writer;
    };

    /**
     * Decodes a TransactionTemplate message from the specified reader or buffer.
     * @function decode
     * @memberof TransactionTemplate
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TransactionTemplate} TransactionTemplate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TransactionTemplate.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.TransactionTemplate();
        while (reader.pos < end) {
            let tag = reader.uint32();
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
                message.transaction = $root.Transaction.decode(reader, reader.uint32());
                break;
            case 5:
                message.interval = reader.int32();
                break;
            case 6:
                if (!(message.daysOfWeek && message.daysOfWeek.length))
                    message.daysOfWeek = [];
                if ((tag & 7) === 2) {
                    let end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.daysOfWeek.push(reader.int32());
                } else
                    message.daysOfWeek.push(reader.int32());
                break;
            case 7:
                if (!(message.daysOfMonth && message.daysOfMonth.length))
                    message.daysOfMonth = [];
                if ((tag & 7) === 2) {
                    let end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.daysOfMonth.push(reader.int32());
                } else
                    message.daysOfMonth.push(reader.int32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("name"))
            throw $util.ProtocolError("missing required 'name'", { instance: message });
        if (!message.hasOwnProperty("transaction"))
            throw $util.ProtocolError("missing required 'transaction'", { instance: message });
        return message;
    };

    /**
     * Creates a TransactionTemplate message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TransactionTemplate
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TransactionTemplate} TransactionTemplate
     */
    TransactionTemplate.fromObject = function fromObject(object) {
        if (object instanceof $root.TransactionTemplate)
            return object;
        let message = new $root.TransactionTemplate();
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
        if (object.transaction != null) {
            if (typeof object.transaction !== "object")
                throw TypeError(".TransactionTemplate.transaction: object expected");
            message.transaction = $root.Transaction.fromObject(object.transaction);
        }
        if (object.interval != null)
            message.interval = object.interval | 0;
        if (object.daysOfWeek) {
            if (!Array.isArray(object.daysOfWeek))
                throw TypeError(".TransactionTemplate.daysOfWeek: array expected");
            message.daysOfWeek = [];
            for (let i = 0; i < object.daysOfWeek.length; ++i)
                message.daysOfWeek[i] = object.daysOfWeek[i] | 0;
        }
        if (object.daysOfMonth) {
            if (!Array.isArray(object.daysOfMonth))
                throw TypeError(".TransactionTemplate.daysOfMonth: array expected");
            message.daysOfMonth = [];
            for (let i = 0; i < object.daysOfMonth.length; ++i)
                message.daysOfMonth[i] = object.daysOfMonth[i] | 0;
        }
        return message;
    };

    /**
     * Creates a plain object from a TransactionTemplate message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TransactionTemplate
     * @static
     * @param {TransactionTemplate} message TransactionTemplate
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TransactionTemplate.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults) {
            object.daysOfWeek = [];
            object.daysOfMonth = [];
        }
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.id = options.longs === String ? "0" : 0;
            object.isDeleted = false;
            object.name = "";
            object.transaction = null;
            object.interval = 0;
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
        if (message.transaction != null && message.hasOwnProperty("transaction"))
            object.transaction = $root.Transaction.toObject(message.transaction, options);
        if (message.interval != null && message.hasOwnProperty("interval"))
            object.interval = message.interval;
        if (message.daysOfWeek && message.daysOfWeek.length) {
            object.daysOfWeek = [];
            for (let j = 0; j < message.daysOfWeek.length; ++j)
                object.daysOfWeek[j] = message.daysOfWeek[j];
        }
        if (message.daysOfMonth && message.daysOfMonth.length) {
            object.daysOfMonth = [];
            for (let j = 0; j < message.daysOfMonth.length; ++j)
                object.daysOfMonth[j] = message.daysOfMonth[j];
        }
        return object;
    };

    /**
     * Converts this TransactionTemplate to JSON.
     * @function toJSON
     * @memberof TransactionTemplate
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TransactionTemplate.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return TransactionTemplate;
})();

export const TransactionArchive = $root.TransactionArchive = (() => {

    /**
     * Properties of a TransactionArchive.
     * @exports ITransactionArchive
     * @interface ITransactionArchive
     * @property {number|null} [id] TransactionArchive id
     * @property {boolean|null} [isDeleted] TransactionArchive isDeleted
     * @property {Array.<ITransaction>|null} [transactions] TransactionArchive transactions
     */

    /**
     * Constructs a new TransactionArchive.
     * @exports TransactionArchive
     * @classdesc Represents a TransactionArchive.
     * @implements ITransactionArchive
     * @constructor
     * @param {ITransactionArchive=} [properties] Properties to set
     */
    function TransactionArchive(properties) {
        this.transactions = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * TransactionArchive id.
     * @member {number} id
     * @memberof TransactionArchive
     * @instance
     */
    TransactionArchive.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * TransactionArchive isDeleted.
     * @member {boolean} isDeleted
     * @memberof TransactionArchive
     * @instance
     */
    TransactionArchive.prototype.isDeleted = false;

    /**
     * TransactionArchive transactions.
     * @member {Array.<ITransaction>} transactions
     * @memberof TransactionArchive
     * @instance
     */
    TransactionArchive.prototype.transactions = $util.emptyArray;

    /**
     * Creates a new TransactionArchive instance using the specified properties.
     * @function create
     * @memberof TransactionArchive
     * @static
     * @param {ITransactionArchive=} [properties] Properties to set
     * @returns {TransactionArchive} TransactionArchive instance
     */
    TransactionArchive.create = function create(properties) {
        return new TransactionArchive(properties);
    };

    /**
     * Encodes the specified TransactionArchive message. Does not implicitly {@link TransactionArchive.verify|verify} messages.
     * @function encode
     * @memberof TransactionArchive
     * @static
     * @param {ITransactionArchive} message TransactionArchive message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TransactionArchive.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
        if (message.isDeleted != null && message.hasOwnProperty("isDeleted"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isDeleted);
        if (message.transactions != null && message.transactions.length)
            for (let i = 0; i < message.transactions.length; ++i)
                $root.Transaction.encode(message.transactions[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Decodes a TransactionArchive message from the specified reader or buffer.
     * @function decode
     * @memberof TransactionArchive
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TransactionArchive} TransactionArchive
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TransactionArchive.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.TransactionArchive();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.int64();
                break;
            case 2:
                message.isDeleted = reader.bool();
                break;
            case 3:
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
     * Creates a TransactionArchive message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TransactionArchive
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TransactionArchive} TransactionArchive
     */
    TransactionArchive.fromObject = function fromObject(object) {
        if (object instanceof $root.TransactionArchive)
            return object;
        let message = new $root.TransactionArchive();
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
        if (object.transactions) {
            if (!Array.isArray(object.transactions))
                throw TypeError(".TransactionArchive.transactions: array expected");
            message.transactions = [];
            for (let i = 0; i < object.transactions.length; ++i) {
                if (typeof object.transactions[i] !== "object")
                    throw TypeError(".TransactionArchive.transactions: object expected");
                message.transactions[i] = $root.Transaction.fromObject(object.transactions[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a TransactionArchive message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TransactionArchive
     * @static
     * @param {TransactionArchive} message TransactionArchive
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TransactionArchive.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.transactions = [];
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.id = options.longs === String ? "0" : 0;
            object.isDeleted = false;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            if (typeof message.id === "number")
                object.id = options.longs === String ? String(message.id) : message.id;
            else
                object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
        if (message.isDeleted != null && message.hasOwnProperty("isDeleted"))
            object.isDeleted = message.isDeleted;
        if (message.transactions && message.transactions.length) {
            object.transactions = [];
            for (let j = 0; j < message.transactions.length; ++j)
                object.transactions[j] = $root.Transaction.toObject(message.transactions[j], options);
        }
        return object;
    };

    /**
     * Converts this TransactionArchive to JSON.
     * @function toJSON
     * @memberof TransactionArchive
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TransactionArchive.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return TransactionArchive;
})();

export const Settings = $root.Settings = (() => {

    /**
     * Properties of a Settings.
     * @exports ISettings
     * @interface ISettings
     * @property {number|null} [id] Settings id
     * @property {Settings.Language|null} [language] Settings language
     * @property {number|null} [currencyId] Settings currencyId
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
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Settings id.
     * @member {number} id
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
     * @member {number} currencyId
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
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Settings();
        while (reader.pos < end) {
            let tag = reader.uint32();
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
        let message = new $root.Settings();
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
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.id = options.longs === String ? "0" : 0;
            object.language = options.enums === String ? "RU" : 0;
            if ($util.Long) {
                let long = new $util.Long(1, 0, false);
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
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "RU"] = 0;
        values[valuesById[1] = "EN"] = 1;
        return values;
    })();

    return Settings;
})();

export const AccessToken = $root.AccessToken = (() => {

    /**
     * Properties of an AccessToken.
     * @exports IAccessToken
     * @interface IAccessToken
     * @property {string|null} [value] AccessToken value
     * @property {number|null} [expired] AccessToken expired
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
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
     * @member {number} expired
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
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccessToken();
        while (reader.pos < end) {
            let tag = reader.uint32();
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
        let message = new $root.AccessToken();
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
        let object = {};
        if (options.defaults) {
            object.value = "";
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
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

export const RefreshToken = $root.RefreshToken = (() => {

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
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RefreshToken();
        while (reader.pos < end) {
            let tag = reader.uint32();
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
        let message = new $root.RefreshToken();
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
        let object = {};
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
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNDEFINED"] = 0;
        values[valuesById[1] = "GOOGLE"] = 1;
        values[valuesById[2] = "FACEBOOK"] = 2;
        values[valuesById[3] = "VK"] = 3;
        return values;
    })();

    return RefreshToken;
})();

export const Date_ = $root.Date_ = (() => {

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
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Date_();
        while (reader.pos < end) {
            let tag = reader.uint32();
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
        let message = new $root.Date_();
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
        let object = {};
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

export const Month = $root.Month = (() => {

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
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Month();
        while (reader.pos < end) {
            let tag = reader.uint32();
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
        let message = new $root.Month();
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
        let object = {};
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

export const Year = $root.Year = (() => {

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
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Year();
        while (reader.pos < end) {
            let tag = reader.uint32();
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
        let message = new $root.Year();
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
        let object = {};
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

export const Summary = $root.Summary = (() => {

    /**
     * Properties of a Summary.
     * @exports ISummary
     * @interface ISummary
     * @property {number} amount Summary amount
     * @property {number} share Summary share
     * @property {boolean|null} [useInShare] Summary useInShare
     */

    /**
     * Constructs a new Summary.
     * @exports Summary
     * @classdesc Represents a Summary.
     * @implements ISummary
     * @constructor
     * @param {ISummary=} [properties] Properties to set
     */
    function Summary(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Summary amount.
     * @member {number} amount
     * @memberof Summary
     * @instance
     */
    Summary.prototype.amount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Summary share.
     * @member {number} share
     * @memberof Summary
     * @instance
     */
    Summary.prototype.share = 0;

    /**
     * Summary useInShare.
     * @member {boolean} useInShare
     * @memberof Summary
     * @instance
     */
    Summary.prototype.useInShare = true;

    /**
     * Creates a new Summary instance using the specified properties.
     * @function create
     * @memberof Summary
     * @static
     * @param {ISummary=} [properties] Properties to set
     * @returns {Summary} Summary instance
     */
    Summary.create = function create(properties) {
        return new Summary(properties);
    };

    /**
     * Encodes the specified Summary message. Does not implicitly {@link Summary.verify|verify} messages.
     * @function encode
     * @memberof Summary
     * @static
     * @param {ISummary} message Summary message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Summary.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int64(message.amount);
        writer.uint32(/* id 2, wireType 1 =*/17).double(message.share);
        if (message.useInShare != null && message.hasOwnProperty("useInShare"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.useInShare);
        return writer;
    };

    /**
     * Decodes a Summary message from the specified reader or buffer.
     * @function decode
     * @memberof Summary
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Summary} Summary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Summary.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Summary();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.amount = reader.int64();
                break;
            case 2:
                message.share = reader.double();
                break;
            case 3:
                message.useInShare = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("amount"))
            throw $util.ProtocolError("missing required 'amount'", { instance: message });
        if (!message.hasOwnProperty("share"))
            throw $util.ProtocolError("missing required 'share'", { instance: message });
        return message;
    };

    /**
     * Creates a Summary message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Summary
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Summary} Summary
     */
    Summary.fromObject = function fromObject(object) {
        if (object instanceof $root.Summary)
            return object;
        let message = new $root.Summary();
        if (object.amount != null)
            if ($util.Long)
                (message.amount = $util.Long.fromValue(object.amount)).unsigned = false;
            else if (typeof object.amount === "string")
                message.amount = parseInt(object.amount, 10);
            else if (typeof object.amount === "number")
                message.amount = object.amount;
            else if (typeof object.amount === "object")
                message.amount = new $util.LongBits(object.amount.low >>> 0, object.amount.high >>> 0).toNumber();
        if (object.share != null)
            message.share = Number(object.share);
        if (object.useInShare != null)
            message.useInShare = Boolean(object.useInShare);
        return message;
    };

    /**
     * Creates a plain object from a Summary message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Summary
     * @static
     * @param {Summary} message Summary
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Summary.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.amount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.amount = options.longs === String ? "0" : 0;
            object.share = 0;
            object.useInShare = true;
        }
        if (message.amount != null && message.hasOwnProperty("amount"))
            if (typeof message.amount === "number")
                object.amount = options.longs === String ? String(message.amount) : message.amount;
            else
                object.amount = options.longs === String ? $util.Long.prototype.toString.call(message.amount) : options.longs === Number ? new $util.LongBits(message.amount.low >>> 0, message.amount.high >>> 0).toNumber() : message.amount;
        if (message.share != null && message.hasOwnProperty("share"))
            object.share = options.json && !isFinite(message.share) ? String(message.share) : message.share;
        if (message.useInShare != null && message.hasOwnProperty("useInShare"))
            object.useInShare = message.useInShare;
        return object;
    };

    /**
     * Converts this Summary to JSON.
     * @function toJSON
     * @memberof Summary
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Summary.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Summary;
})();

export { $root as default };
