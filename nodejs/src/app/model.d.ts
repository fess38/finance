import { Long } from "protobufjs";import * as $protobuf from "protobufjs";

/** EntityType enum. */
export enum EntityType {
    UNDEFINED = 0,
    DUMP = 1,
    CURRENCY = 2,
    ACCOUNT = 3
}

/** Properties of a Dump. */
export interface IDump {

    /** Dump id */
    id?: (number|Long|null);

    /** Dump accounts */
    accounts?: (IAccount[]|null);

    /** Dump currencies */
    currencies?: (ICurrency[]|null);
}

/** Represents a Dump. */
export class Dump implements IDump {

    /**
     * Constructs a new Dump.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDump);

    /** Dump id. */
    public id: (number|Long);

    /** Dump accounts. */
    public accounts: IAccount[];

    /** Dump currencies. */
    public currencies: ICurrency[];

    /**
     * Creates a new Dump instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Dump instance
     */
    public static create(properties?: IDump): Dump;

    /**
     * Encodes the specified Dump message. Does not implicitly {@link Dump.verify|verify} messages.
     * @param message Dump message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDump, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Dump message, length delimited. Does not implicitly {@link Dump.verify|verify} messages.
     * @param message Dump message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDump, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Dump message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Dump
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Dump;

    /**
     * Decodes a Dump message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Dump
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Dump;

    /**
     * Verifies a Dump message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Dump message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Dump
     */
    public static fromObject(object: { [k: string]: any }): Dump;

    /**
     * Creates a plain object from a Dump message. Also converts values to other types if specified.
     * @param message Dump
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Dump, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Dump to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Currency. */
export interface ICurrency {

    /** Currency id */
    id: (number|Long);

    /** Currency nameRu */
    nameRu: string;

    /** Currency nameEn */
    nameEn: string;

    /** Currency symbol */
    symbol: string;

    /** Currency code */
    code: string;
}

/** Represents a Currency. */
export class Currency implements ICurrency {

    /**
     * Constructs a new Currency.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICurrency);

    /** Currency id. */
    public id: (number|Long);

    /** Currency nameRu. */
    public nameRu: string;

    /** Currency nameEn. */
    public nameEn: string;

    /** Currency symbol. */
    public symbol: string;

    /** Currency code. */
    public code: string;

    /**
     * Creates a new Currency instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Currency instance
     */
    public static create(properties?: ICurrency): Currency;

    /**
     * Encodes the specified Currency message. Does not implicitly {@link Currency.verify|verify} messages.
     * @param message Currency message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICurrency, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Currency message, length delimited. Does not implicitly {@link Currency.verify|verify} messages.
     * @param message Currency message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICurrency, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Currency message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Currency
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Currency;

    /**
     * Decodes a Currency message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Currency
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Currency;

    /**
     * Verifies a Currency message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Currency message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Currency
     */
    public static fromObject(object: { [k: string]: any }): Currency;

    /**
     * Creates a plain object from a Currency message. Also converts values to other types if specified.
     * @param message Currency
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Currency, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Currency to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Currencies. */
export interface ICurrencies {

    /** Currencies items */
    items?: (ICurrency[]|null);
}

/** Represents a Currencies. */
export class Currencies implements ICurrencies {

    /**
     * Constructs a new Currencies.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICurrencies);

    /** Currencies items. */
    public items: ICurrency[];

    /**
     * Creates a new Currencies instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Currencies instance
     */
    public static create(properties?: ICurrencies): Currencies;

    /**
     * Encodes the specified Currencies message. Does not implicitly {@link Currencies.verify|verify} messages.
     * @param message Currencies message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICurrencies, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Currencies message, length delimited. Does not implicitly {@link Currencies.verify|verify} messages.
     * @param message Currencies message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICurrencies, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Currencies message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Currencies
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Currencies;

    /**
     * Decodes a Currencies message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Currencies
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Currencies;

    /**
     * Verifies a Currencies message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Currencies message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Currencies
     */
    public static fromObject(object: { [k: string]: any }): Currencies;

    /**
     * Creates a plain object from a Currencies message. Also converts values to other types if specified.
     * @param message Currencies
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Currencies, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Currencies to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an Account. */
export interface IAccount {

    /** Account id */
    id?: (number|Long|null);

    /** Account name */
    name: string;

    /** Account balance */
    balance?: (number|Long|null);

    /** Account currencyId */
    currencyId: (number|Long);

    /** Account transactionAmount */
    transactionAmount?: (number|Long|null);
}

/** Represents an Account. */
export class Account implements IAccount {

    /**
     * Constructs a new Account.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAccount);

    /** Account id. */
    public id: (number|Long);

    /** Account name. */
    public name: string;

    /** Account balance. */
    public balance: (number|Long);

    /** Account currencyId. */
    public currencyId: (number|Long);

    /** Account transactionAmount. */
    public transactionAmount: (number|Long);

    /**
     * Creates a new Account instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Account instance
     */
    public static create(properties?: IAccount): Account;

    /**
     * Encodes the specified Account message. Does not implicitly {@link Account.verify|verify} messages.
     * @param message Account message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAccount, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Account message, length delimited. Does not implicitly {@link Account.verify|verify} messages.
     * @param message Account message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAccount, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Account message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Account
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Account;

    /**
     * Decodes an Account message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Account
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Account;

    /**
     * Verifies an Account message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an Account message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Account
     */
    public static fromObject(object: { [k: string]: any }): Account;

    /**
     * Creates a plain object from an Account message. Also converts values to other types if specified.
     * @param message Account
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Account, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Account to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an AccessToken. */
export interface IAccessToken {

    /** AccessToken value */
    value?: (string|null);

    /** AccessToken expired */
    expired?: (number|Long|null);
}

/** Represents an AccessToken. */
export class AccessToken implements IAccessToken {

    /**
     * Constructs a new AccessToken.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAccessToken);

    /** AccessToken value. */
    public value: string;

    /** AccessToken expired. */
    public expired: (number|Long);

    /**
     * Creates a new AccessToken instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AccessToken instance
     */
    public static create(properties?: IAccessToken): AccessToken;

    /**
     * Encodes the specified AccessToken message. Does not implicitly {@link AccessToken.verify|verify} messages.
     * @param message AccessToken message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAccessToken, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified AccessToken message, length delimited. Does not implicitly {@link AccessToken.verify|verify} messages.
     * @param message AccessToken message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAccessToken, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an AccessToken message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AccessToken
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AccessToken;

    /**
     * Decodes an AccessToken message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AccessToken
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AccessToken;

    /**
     * Verifies an AccessToken message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an AccessToken message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AccessToken
     */
    public static fromObject(object: { [k: string]: any }): AccessToken;

    /**
     * Creates a plain object from an AccessToken message. Also converts values to other types if specified.
     * @param message AccessToken
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: AccessToken, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this AccessToken to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a RefreshToken. */
export interface IRefreshToken {

    /** RefreshToken value */
    value: string;

    /** RefreshToken type */
    type: RefreshToken.AuthType;
}

/** Represents a RefreshToken. */
export class RefreshToken implements IRefreshToken {

    /**
     * Constructs a new RefreshToken.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRefreshToken);

    /** RefreshToken value. */
    public value: string;

    /** RefreshToken type. */
    public type: RefreshToken.AuthType;

    /**
     * Creates a new RefreshToken instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RefreshToken instance
     */
    public static create(properties?: IRefreshToken): RefreshToken;

    /**
     * Encodes the specified RefreshToken message. Does not implicitly {@link RefreshToken.verify|verify} messages.
     * @param message RefreshToken message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRefreshToken, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RefreshToken message, length delimited. Does not implicitly {@link RefreshToken.verify|verify} messages.
     * @param message RefreshToken message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRefreshToken, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RefreshToken message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RefreshToken
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RefreshToken;

    /**
     * Decodes a RefreshToken message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RefreshToken
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RefreshToken;

    /**
     * Verifies a RefreshToken message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RefreshToken message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RefreshToken
     */
    public static fromObject(object: { [k: string]: any }): RefreshToken;

    /**
     * Creates a plain object from a RefreshToken message. Also converts values to other types if specified.
     * @param message RefreshToken
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RefreshToken, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RefreshToken to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace RefreshToken {

    /** AuthType enum. */
    enum AuthType {
        UNDEFINED = 0,
        GOOGLE = 1,
        FACEBOOK = 2,
        VK = 3
    }
}
