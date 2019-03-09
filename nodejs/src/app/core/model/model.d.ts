import * as $protobuf from 'protobufjs';
import { Long } from 'protobufjs';

/** EntityType enum. */
export enum EntityType {
    UNDEFINED = 0,
    SETTINGS = 7,
    CURRENCY = 1,
    ACCOUNT = 2,
    CATEGORY = 3,
    SUB_CATEGORY = 4,
    FAMILY_MEMBER = 5,
    TRANSACTION = 6
}

/** Properties of a Dump. */
export interface IDump {

    /** Dump settings */
    settings: ISettings;

    /** Dump currencies */
    currencies?: (ICurrency[]|null);

    /** Dump accounts */
    accounts?: (IAccount[]|null);

    /** Dump categories */
    categories?: (ICategory[]|null);

    /** Dump subCategories */
    subCategories?: (ISubCategory[]|null);

    /** Dump familyMembers */
    familyMembers?: (IFamilyMember[]|null);

    /** Dump transactions */
    transactions?: (ITransaction[]|null);
}

/** Represents a Dump. */
export class Dump implements IDump {

    /**
     * Constructs a new Dump.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDump);

    /** Dump settings. */
    public settings: ISettings;

    /** Dump currencies. */
    public currencies: ICurrency[];

    /** Dump accounts. */
    public accounts: IAccount[];

    /** Dump categories. */
    public categories: ICategory[];

    /** Dump subCategories. */
    public subCategories: ISubCategory[];

    /** Dump familyMembers. */
    public familyMembers: IFamilyMember[];

    /** Dump transactions. */
    public transactions: ITransaction[];

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

    /** Account isDeleted */
    isDeleted?: (boolean|null);

    /** Account isVisible */
    isVisible?: (boolean|null);

    /** Account transactionAmount */
    transactionAmount?: (number|Long|null);

    /** Account name */
    name: string;

    /** Account balance */
    balance?: (number|Long|null);

    /** Account currencyId */
    currencyId: (number|Long);
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

    /** Account isDeleted. */
    public isDeleted: boolean;

    /** Account isVisible. */
    public isVisible: boolean;

    /** Account transactionAmount. */
    public transactionAmount: (number|Long);

    /** Account name. */
    public name: string;

    /** Account balance. */
    public balance: (number|Long);

    /** Account currencyId. */
    public currencyId: (number|Long);

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

/** Properties of a Category. */
export interface ICategory {

    /** Category id */
    id?: (number|Long|null);

    /** Category isDeleted */
    isDeleted?: (boolean|null);

    /** Category isVisible */
    isVisible?: (boolean|null);

    /** Category transactionAmount */
    transactionAmount?: (number|Long|null);

    /** Category name */
    name: string;

    /** Category isIncome */
    isIncome?: (boolean|null);

    /** Category isExpense */
    isExpense?: (boolean|null);
}

/** Represents a Category. */
export class Category implements ICategory {

    /**
     * Constructs a new Category.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICategory);

    /** Category id. */
    public id: (number|Long);

    /** Category isDeleted. */
    public isDeleted: boolean;

    /** Category isVisible. */
    public isVisible: boolean;

    /** Category transactionAmount. */
    public transactionAmount: (number|Long);

    /** Category name. */
    public name: string;

    /** Category isIncome. */
    public isIncome: boolean;

    /** Category isExpense. */
    public isExpense: boolean;

    /**
     * Creates a new Category instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Category instance
     */
    public static create(properties?: ICategory): Category;

    /**
     * Encodes the specified Category message. Does not implicitly {@link Category.verify|verify} messages.
     * @param message Category message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICategory, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Category message, length delimited. Does not implicitly {@link Category.verify|verify} messages.
     * @param message Category message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICategory, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Category message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Category
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Category;

    /**
     * Decodes a Category message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Category
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Category;

    /**
     * Verifies a Category message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Category message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Category
     */
    public static fromObject(object: { [k: string]: any }): Category;

    /**
     * Creates a plain object from a Category message. Also converts values to other types if specified.
     * @param message Category
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Category, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Category to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SubCategory. */
export interface ISubCategory {

    /** SubCategory id */
    id?: (number|Long|null);

    /** SubCategory isDeleted */
    isDeleted?: (boolean|null);

    /** SubCategory isVisible */
    isVisible?: (boolean|null);

    /** SubCategory transactionAmount */
    transactionAmount?: (number|Long|null);

    /** SubCategory name */
    name: string;

    /** SubCategory categoryId */
    categoryId: (number|Long);
}

/** Represents a SubCategory. */
export class SubCategory implements ISubCategory {

    /**
     * Constructs a new SubCategory.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISubCategory);

    /** SubCategory id. */
    public id: (number|Long);

    /** SubCategory isDeleted. */
    public isDeleted: boolean;

    /** SubCategory isVisible. */
    public isVisible: boolean;

    /** SubCategory transactionAmount. */
    public transactionAmount: (number|Long);

    /** SubCategory name. */
    public name: string;

    /** SubCategory categoryId. */
    public categoryId: (number|Long);

    /**
     * Creates a new SubCategory instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SubCategory instance
     */
    public static create(properties?: ISubCategory): SubCategory;

    /**
     * Encodes the specified SubCategory message. Does not implicitly {@link SubCategory.verify|verify} messages.
     * @param message SubCategory message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISubCategory, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SubCategory message, length delimited. Does not implicitly {@link SubCategory.verify|verify} messages.
     * @param message SubCategory message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISubCategory, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SubCategory message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SubCategory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SubCategory;

    /**
     * Decodes a SubCategory message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SubCategory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SubCategory;

    /**
     * Verifies a SubCategory message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SubCategory message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SubCategory
     */
    public static fromObject(object: { [k: string]: any }): SubCategory;

    /**
     * Creates a plain object from a SubCategory message. Also converts values to other types if specified.
     * @param message SubCategory
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SubCategory, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SubCategory to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a FamilyMember. */
export interface IFamilyMember {

    /** FamilyMember id */
    id?: (number|Long|null);

    /** FamilyMember isDeleted */
    isDeleted?: (boolean|null);

    /** FamilyMember isVisible */
    isVisible?: (boolean|null);

    /** FamilyMember transactionAmount */
    transactionAmount?: (number|Long|null);

    /** FamilyMember name */
    name: string;
}

/** Represents a FamilyMember. */
export class FamilyMember implements IFamilyMember {

    /**
     * Constructs a new FamilyMember.
     * @param [properties] Properties to set
     */
    constructor(properties?: IFamilyMember);

    /** FamilyMember id. */
    public id: (number|Long);

    /** FamilyMember isDeleted. */
    public isDeleted: boolean;

    /** FamilyMember isVisible. */
    public isVisible: boolean;

    /** FamilyMember transactionAmount. */
    public transactionAmount: (number|Long);

    /** FamilyMember name. */
    public name: string;

    /**
     * Creates a new FamilyMember instance using the specified properties.
     * @param [properties] Properties to set
     * @returns FamilyMember instance
     */
    public static create(properties?: IFamilyMember): FamilyMember;

    /**
     * Encodes the specified FamilyMember message. Does not implicitly {@link FamilyMember.verify|verify} messages.
     * @param message FamilyMember message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IFamilyMember, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified FamilyMember message, length delimited. Does not implicitly {@link FamilyMember.verify|verify} messages.
     * @param message FamilyMember message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IFamilyMember, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a FamilyMember message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns FamilyMember
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): FamilyMember;

    /**
     * Decodes a FamilyMember message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns FamilyMember
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): FamilyMember;

    /**
     * Verifies a FamilyMember message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a FamilyMember message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns FamilyMember
     */
    public static fromObject(object: { [k: string]: any }): FamilyMember;

    /**
     * Creates a plain object from a FamilyMember message. Also converts values to other types if specified.
     * @param message FamilyMember
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: FamilyMember, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this FamilyMember to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Transaction. */
export interface ITransaction {

    /** Transaction id */
    id?: (number|Long|null);

    /** Transaction isDeleted */
    isDeleted?: (boolean|null);

    /** Transaction created */
    created: string;

    /** Transaction accountIdFrom */
    accountIdFrom: (number|Long);

    /** Transaction accountIdTo */
    accountIdTo: (number|Long);

    /** Transaction amountFrom */
    amountFrom: (number|Long);

    /** Transaction amountTo */
    amountTo: (number|Long);

    /** Transaction categoryId */
    categoryId: (number|Long);

    /** Transaction subCategoryId */
    subCategoryId?: (number|Long|null);

    /** Transaction familyMemberId */
    familyMemberId?: (number|Long|null);

    /** Transaction comment */
    comment?: (string|null);
}

/** Represents a Transaction. */
export class Transaction implements ITransaction {

    /**
     * Constructs a new Transaction.
     * @param [properties] Properties to set
     */
    constructor(properties?: ITransaction);

    /** Transaction id. */
    public id: (number|Long);

    /** Transaction isDeleted. */
    public isDeleted: boolean;

    /** Transaction created. */
    public created: string;

    /** Transaction accountIdFrom. */
    public accountIdFrom: (number|Long);

    /** Transaction accountIdTo. */
    public accountIdTo: (number|Long);

    /** Transaction amountFrom. */
    public amountFrom: (number|Long);

    /** Transaction amountTo. */
    public amountTo: (number|Long);

    /** Transaction categoryId. */
    public categoryId: (number|Long);

    /** Transaction subCategoryId. */
    public subCategoryId: (number|Long);

    /** Transaction familyMemberId. */
    public familyMemberId: (number|Long);

    /** Transaction comment. */
    public comment: string;

    /**
     * Creates a new Transaction instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Transaction instance
     */
    public static create(properties?: ITransaction): Transaction;

    /**
     * Encodes the specified Transaction message. Does not implicitly {@link Transaction.verify|verify} messages.
     * @param message Transaction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ITransaction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Transaction message, length delimited. Does not implicitly {@link Transaction.verify|verify} messages.
     * @param message Transaction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ITransaction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Transaction message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Transaction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Transaction;

    /**
     * Decodes a Transaction message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Transaction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Transaction;

    /**
     * Verifies a Transaction message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Transaction message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Transaction
     */
    public static fromObject(object: { [k: string]: any }): Transaction;

    /**
     * Creates a plain object from a Transaction message. Also converts values to other types if specified.
     * @param message Transaction
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Transaction, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Transaction to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Transaction {

    /** Type enum. */
    enum Type {
        UNDEFINED = 0,
        INCOME = 1,
        EXPENSE = 2,
        TRANSFER = 3
    }
}

/** Properties of a Settings. */
export interface ISettings {

    /** Settings id */
    id?: (number|Long|null);

    /** Settings language */
    language?: (Settings.Language|null);

    /** Settings currencyId */
    currencyId?: (number|Long|null);
}

/** Represents a Settings. */
export class Settings implements ISettings {

    /**
     * Constructs a new Settings.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISettings);

    /** Settings id. */
    public id: (number|Long);

    /** Settings language. */
    public language: Settings.Language;

    /** Settings currencyId. */
    public currencyId: (number|Long);

    /**
     * Creates a new Settings instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Settings instance
     */
    public static create(properties?: ISettings): Settings;

    /**
     * Encodes the specified Settings message. Does not implicitly {@link Settings.verify|verify} messages.
     * @param message Settings message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISettings, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Settings message, length delimited. Does not implicitly {@link Settings.verify|verify} messages.
     * @param message Settings message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISettings, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Settings message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Settings
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Settings;

    /**
     * Decodes a Settings message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Settings
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Settings;

    /**
     * Verifies a Settings message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Settings message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Settings
     */
    public static fromObject(object: { [k: string]: any }): Settings;

    /**
     * Creates a plain object from a Settings message. Also converts values to other types if specified.
     * @param message Settings
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Settings, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Settings to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Settings {

    /** Language enum. */
    enum Language {
        RU = 0,
        EN = 1
    }
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

/** Properties of a CategorySummary. */
export interface ICategorySummary {

    /** CategorySummary category */
    category: ICategory;

    /** CategorySummary amount */
    amount?: ((number|Long)[]|null);
}

/** Represents a CategorySummary. */
export class CategorySummary implements ICategorySummary {

    /**
     * Constructs a new CategorySummary.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICategorySummary);

    /** CategorySummary category. */
    public category: ICategory;

    /** CategorySummary amount. */
    public amount: (number|Long)[];

    /**
     * Creates a new CategorySummary instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CategorySummary instance
     */
    public static create(properties?: ICategorySummary): CategorySummary;

    /**
     * Encodes the specified CategorySummary message. Does not implicitly {@link CategorySummary.verify|verify} messages.
     * @param message CategorySummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICategorySummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CategorySummary message, length delimited. Does not implicitly {@link CategorySummary.verify|verify} messages.
     * @param message CategorySummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICategorySummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CategorySummary message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CategorySummary;

    /**
     * Decodes a CategorySummary message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CategorySummary;

    /**
     * Verifies a CategorySummary message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CategorySummary message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CategorySummary
     */
    public static fromObject(object: { [k: string]: any }): CategorySummary;

    /**
     * Creates a plain object from a CategorySummary message. Also converts values to other types if specified.
     * @param message CategorySummary
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CategorySummary, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CategorySummary to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SubCategorySummary. */
export interface ISubCategorySummary {

    /** SubCategorySummary subCategory */
    subCategory: ISubCategory;

    /** SubCategorySummary amount */
    amount?: ((number|Long)[]|null);
}

/** Represents a SubCategorySummary. */
export class SubCategorySummary implements ISubCategorySummary {

    /**
     * Constructs a new SubCategorySummary.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISubCategorySummary);

    /** SubCategorySummary subCategory. */
    public subCategory: ISubCategory;

    /** SubCategorySummary amount. */
    public amount: (number|Long)[];

    /**
     * Creates a new SubCategorySummary instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SubCategorySummary instance
     */
    public static create(properties?: ISubCategorySummary): SubCategorySummary;

    /**
     * Encodes the specified SubCategorySummary message. Does not implicitly {@link SubCategorySummary.verify|verify} messages.
     * @param message SubCategorySummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISubCategorySummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SubCategorySummary message, length delimited. Does not implicitly {@link SubCategorySummary.verify|verify} messages.
     * @param message SubCategorySummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISubCategorySummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SubCategorySummary message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SubCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SubCategorySummary;

    /**
     * Decodes a SubCategorySummary message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SubCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SubCategorySummary;

    /**
     * Verifies a SubCategorySummary message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SubCategorySummary message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SubCategorySummary
     */
    public static fromObject(object: { [k: string]: any }): SubCategorySummary;

    /**
     * Creates a plain object from a SubCategorySummary message. Also converts values to other types if specified.
     * @param message SubCategorySummary
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SubCategorySummary, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SubCategorySummary to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Date_. */
export interface IDate_ {

    /** Date_ year */
    year: number;

    /** Date_ month */
    month: number;

    /** Date_ day */
    day: number;
}

/** Represents a Date_. */
export class Date_ implements IDate_ {

    /**
     * Constructs a new Date_.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDate_);

    /** Date_ year. */
    public year: number;

    /** Date_ month. */
    public month: number;

    /** Date_ day. */
    public day: number;

    /**
     * Creates a new Date_ instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Date_ instance
     */
    public static create(properties?: IDate_): Date_;

    /**
     * Encodes the specified Date_ message. Does not implicitly {@link Date_.verify|verify} messages.
     * @param message Date_ message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDate_, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Date_ message, length delimited. Does not implicitly {@link Date_.verify|verify} messages.
     * @param message Date_ message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDate_, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Date_ message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Date_
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Date_;

    /**
     * Decodes a Date_ message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Date_
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Date_;

    /**
     * Verifies a Date_ message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Date_ message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Date_
     */
    public static fromObject(object: { [k: string]: any }): Date_;

    /**
     * Creates a plain object from a Date_ message. Also converts values to other types if specified.
     * @param message Date_
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Date_, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Date_ to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Month. */
export interface IMonth {

    /** Month year */
    year: number;

    /** Month month */
    month: number;
}

/** Represents a Month. */
export class Month implements IMonth {

    /**
     * Constructs a new Month.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMonth);

    /** Month year. */
    public year: number;

    /** Month month. */
    public month: number;

    /**
     * Creates a new Month instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Month instance
     */
    public static create(properties?: IMonth): Month;

    /**
     * Encodes the specified Month message. Does not implicitly {@link Month.verify|verify} messages.
     * @param message Month message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMonth, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Month message, length delimited. Does not implicitly {@link Month.verify|verify} messages.
     * @param message Month message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMonth, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Month message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Month
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Month;

    /**
     * Decodes a Month message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Month
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Month;

    /**
     * Verifies a Month message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Month message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Month
     */
    public static fromObject(object: { [k: string]: any }): Month;

    /**
     * Creates a plain object from a Month message. Also converts values to other types if specified.
     * @param message Month
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Month, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Month to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Year. */
export interface IYear {

    /** Year value */
    value: number;
}

/** Represents a Year. */
export class Year implements IYear {

    /**
     * Constructs a new Year.
     * @param [properties] Properties to set
     */
    constructor(properties?: IYear);

    /** Year value. */
    public value: number;

    /**
     * Creates a new Year instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Year instance
     */
    public static create(properties?: IYear): Year;

    /**
     * Encodes the specified Year message. Does not implicitly {@link Year.verify|verify} messages.
     * @param message Year message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IYear, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Year message, length delimited. Does not implicitly {@link Year.verify|verify} messages.
     * @param message Year message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IYear, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Year message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Year
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Year;

    /**
     * Decodes a Year message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Year
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Year;

    /**
     * Verifies a Year message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Year message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Year
     */
    public static fromObject(object: { [k: string]: any }): Year;

    /**
     * Creates a plain object from a Year message. Also converts values to other types if specified.
     * @param message Year
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Year, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Year to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a DateSummary. */
export interface IDateSummary {

    /** DateSummary date */
    date: IDate_;

    /** DateSummary amount */
    amount?: ((number|Long)[]|null);
}

/** Represents a DateSummary. */
export class DateSummary implements IDateSummary {

    /**
     * Constructs a new DateSummary.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDateSummary);

    /** DateSummary date. */
    public date: IDate_;

    /** DateSummary amount. */
    public amount: (number|Long)[];

    /**
     * Creates a new DateSummary instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DateSummary instance
     */
    public static create(properties?: IDateSummary): DateSummary;

    /**
     * Encodes the specified DateSummary message. Does not implicitly {@link DateSummary.verify|verify} messages.
     * @param message DateSummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDateSummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DateSummary message, length delimited. Does not implicitly {@link DateSummary.verify|verify} messages.
     * @param message DateSummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDateSummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DateSummary message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DateSummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DateSummary;

    /**
     * Decodes a DateSummary message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DateSummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DateSummary;

    /**
     * Verifies a DateSummary message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DateSummary message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DateSummary
     */
    public static fromObject(object: { [k: string]: any }): DateSummary;

    /**
     * Creates a plain object from a DateSummary message. Also converts values to other types if specified.
     * @param message DateSummary
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DateSummary, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DateSummary to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a DateCategorySummary. */
export interface IDateCategorySummary {

    /** DateCategorySummary date */
    date: IDate_;

    /** DateCategorySummary category */
    category: ICategory;

    /** DateCategorySummary amount */
    amount?: ((number|Long)[]|null);
}

/** Represents a DateCategorySummary. */
export class DateCategorySummary implements IDateCategorySummary {

    /**
     * Constructs a new DateCategorySummary.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDateCategorySummary);

    /** DateCategorySummary date. */
    public date: IDate_;

    /** DateCategorySummary category. */
    public category: ICategory;

    /** DateCategorySummary amount. */
    public amount: (number|Long)[];

    /**
     * Creates a new DateCategorySummary instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DateCategorySummary instance
     */
    public static create(properties?: IDateCategorySummary): DateCategorySummary;

    /**
     * Encodes the specified DateCategorySummary message. Does not implicitly {@link DateCategorySummary.verify|verify} messages.
     * @param message DateCategorySummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDateCategorySummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DateCategorySummary message, length delimited. Does not implicitly {@link DateCategorySummary.verify|verify} messages.
     * @param message DateCategorySummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDateCategorySummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DateCategorySummary message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DateCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DateCategorySummary;

    /**
     * Decodes a DateCategorySummary message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DateCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DateCategorySummary;

    /**
     * Verifies a DateCategorySummary message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DateCategorySummary message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DateCategorySummary
     */
    public static fromObject(object: { [k: string]: any }): DateCategorySummary;

    /**
     * Creates a plain object from a DateCategorySummary message. Also converts values to other types if specified.
     * @param message DateCategorySummary
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DateCategorySummary, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DateCategorySummary to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a DateCategorySummaries. */
export interface IDateCategorySummaries {

    /** DateCategorySummaries currency */
    currency: ICurrency;

    /** DateCategorySummaries categories */
    categories?: (ICategory[]|null);

    /** DateCategorySummaries dates */
    dates?: (IDate_[]|null);

    /** DateCategorySummaries dateSummaries */
    dateSummaries?: (IDateSummary[]|null);

    /** DateCategorySummaries categorySummaries */
    categorySummaries?: (ICategorySummary[]|null);

    /** DateCategorySummaries dateCategorySummaries */
    dateCategorySummaries?: (IDateCategorySummary[]|null);

    /** DateCategorySummaries income */
    income: (number|Long);

    /** DateCategorySummaries expense */
    expense: (number|Long);
}

/** Represents a DateCategorySummaries. */
export class DateCategorySummaries implements IDateCategorySummaries {

    /**
     * Constructs a new DateCategorySummaries.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDateCategorySummaries);

    /** DateCategorySummaries currency. */
    public currency: ICurrency;

    /** DateCategorySummaries categories. */
    public categories: ICategory[];

    /** DateCategorySummaries dates. */
    public dates: IDate_[];

    /** DateCategorySummaries dateSummaries. */
    public dateSummaries: IDateSummary[];

    /** DateCategorySummaries categorySummaries. */
    public categorySummaries: ICategorySummary[];

    /** DateCategorySummaries dateCategorySummaries. */
    public dateCategorySummaries: IDateCategorySummary[];

    /** DateCategorySummaries income. */
    public income: (number|Long);

    /** DateCategorySummaries expense. */
    public expense: (number|Long);

    /**
     * Creates a new DateCategorySummaries instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DateCategorySummaries instance
     */
    public static create(properties?: IDateCategorySummaries): DateCategorySummaries;

    /**
     * Encodes the specified DateCategorySummaries message. Does not implicitly {@link DateCategorySummaries.verify|verify} messages.
     * @param message DateCategorySummaries message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDateCategorySummaries, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DateCategorySummaries message, length delimited. Does not implicitly {@link DateCategorySummaries.verify|verify} messages.
     * @param message DateCategorySummaries message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDateCategorySummaries, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DateCategorySummaries message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DateCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DateCategorySummaries;

    /**
     * Decodes a DateCategorySummaries message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DateCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DateCategorySummaries;

    /**
     * Verifies a DateCategorySummaries message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DateCategorySummaries message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DateCategorySummaries
     */
    public static fromObject(object: { [k: string]: any }): DateCategorySummaries;

    /**
     * Creates a plain object from a DateCategorySummaries message. Also converts values to other types if specified.
     * @param message DateCategorySummaries
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DateCategorySummaries, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DateCategorySummaries to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a DateSubCategorySummary. */
export interface IDateSubCategorySummary {

    /** DateSubCategorySummary date */
    date: IDate_;

    /** DateSubCategorySummary subCategory */
    subCategory: ISubCategory;

    /** DateSubCategorySummary amount */
    amount?: ((number|Long)[]|null);
}

/** Represents a DateSubCategorySummary. */
export class DateSubCategorySummary implements IDateSubCategorySummary {

    /**
     * Constructs a new DateSubCategorySummary.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDateSubCategorySummary);

    /** DateSubCategorySummary date. */
    public date: IDate_;

    /** DateSubCategorySummary subCategory. */
    public subCategory: ISubCategory;

    /** DateSubCategorySummary amount. */
    public amount: (number|Long)[];

    /**
     * Creates a new DateSubCategorySummary instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DateSubCategorySummary instance
     */
    public static create(properties?: IDateSubCategorySummary): DateSubCategorySummary;

    /**
     * Encodes the specified DateSubCategorySummary message. Does not implicitly {@link DateSubCategorySummary.verify|verify} messages.
     * @param message DateSubCategorySummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDateSubCategorySummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DateSubCategorySummary message, length delimited. Does not implicitly {@link DateSubCategorySummary.verify|verify} messages.
     * @param message DateSubCategorySummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDateSubCategorySummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DateSubCategorySummary message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DateSubCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DateSubCategorySummary;

    /**
     * Decodes a DateSubCategorySummary message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DateSubCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DateSubCategorySummary;

    /**
     * Verifies a DateSubCategorySummary message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DateSubCategorySummary message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DateSubCategorySummary
     */
    public static fromObject(object: { [k: string]: any }): DateSubCategorySummary;

    /**
     * Creates a plain object from a DateSubCategorySummary message. Also converts values to other types if specified.
     * @param message DateSubCategorySummary
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DateSubCategorySummary, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DateSubCategorySummary to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a DateSubCategorySummaries. */
export interface IDateSubCategorySummaries {

    /** DateSubCategorySummaries currency */
    currency: ICurrency;

    /** DateSubCategorySummaries subCategories */
    subCategories?: (ISubCategory[]|null);

    /** DateSubCategorySummaries dates */
    dates?: (IDate_[]|null);

    /** DateSubCategorySummaries dateSummaries */
    dateSummaries?: (IDateSummary[]|null);

    /** DateSubCategorySummaries subCategorySummaries */
    subCategorySummaries?: (ISubCategorySummary[]|null);

    /** DateSubCategorySummaries dateSubCategorySummaries */
    dateSubCategorySummaries?: (IDateSubCategorySummary[]|null);

    /** DateSubCategorySummaries income */
    income: (number|Long);

    /** DateSubCategorySummaries expense */
    expense: (number|Long);
}

/** Represents a DateSubCategorySummaries. */
export class DateSubCategorySummaries implements IDateSubCategorySummaries {

    /**
     * Constructs a new DateSubCategorySummaries.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDateSubCategorySummaries);

    /** DateSubCategorySummaries currency. */
    public currency: ICurrency;

    /** DateSubCategorySummaries subCategories. */
    public subCategories: ISubCategory[];

    /** DateSubCategorySummaries dates. */
    public dates: IDate_[];

    /** DateSubCategorySummaries dateSummaries. */
    public dateSummaries: IDateSummary[];

    /** DateSubCategorySummaries subCategorySummaries. */
    public subCategorySummaries: ISubCategorySummary[];

    /** DateSubCategorySummaries dateSubCategorySummaries. */
    public dateSubCategorySummaries: IDateSubCategorySummary[];

    /** DateSubCategorySummaries income. */
    public income: (number|Long);

    /** DateSubCategorySummaries expense. */
    public expense: (number|Long);

    /**
     * Creates a new DateSubCategorySummaries instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DateSubCategorySummaries instance
     */
    public static create(properties?: IDateSubCategorySummaries): DateSubCategorySummaries;

    /**
     * Encodes the specified DateSubCategorySummaries message. Does not implicitly {@link DateSubCategorySummaries.verify|verify} messages.
     * @param message DateSubCategorySummaries message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDateSubCategorySummaries, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DateSubCategorySummaries message, length delimited. Does not implicitly {@link DateSubCategorySummaries.verify|verify} messages.
     * @param message DateSubCategorySummaries message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDateSubCategorySummaries, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DateSubCategorySummaries message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DateSubCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DateSubCategorySummaries;

    /**
     * Decodes a DateSubCategorySummaries message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DateSubCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DateSubCategorySummaries;

    /**
     * Verifies a DateSubCategorySummaries message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DateSubCategorySummaries message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DateSubCategorySummaries
     */
    public static fromObject(object: { [k: string]: any }): DateSubCategorySummaries;

    /**
     * Creates a plain object from a DateSubCategorySummaries message. Also converts values to other types if specified.
     * @param message DateSubCategorySummaries
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DateSubCategorySummaries, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DateSubCategorySummaries to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a MonthSummary. */
export interface IMonthSummary {

    /** MonthSummary month */
    month: IMonth;

    /** MonthSummary amount */
    amount?: ((number|Long)[]|null);
}

/** Represents a MonthSummary. */
export class MonthSummary implements IMonthSummary {

    /**
     * Constructs a new MonthSummary.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMonthSummary);

    /** MonthSummary month. */
    public month: IMonth;

    /** MonthSummary amount. */
    public amount: (number|Long)[];

    /**
     * Creates a new MonthSummary instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MonthSummary instance
     */
    public static create(properties?: IMonthSummary): MonthSummary;

    /**
     * Encodes the specified MonthSummary message. Does not implicitly {@link MonthSummary.verify|verify} messages.
     * @param message MonthSummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMonthSummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MonthSummary message, length delimited. Does not implicitly {@link MonthSummary.verify|verify} messages.
     * @param message MonthSummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMonthSummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MonthSummary message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MonthSummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MonthSummary;

    /**
     * Decodes a MonthSummary message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MonthSummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MonthSummary;

    /**
     * Verifies a MonthSummary message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MonthSummary message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MonthSummary
     */
    public static fromObject(object: { [k: string]: any }): MonthSummary;

    /**
     * Creates a plain object from a MonthSummary message. Also converts values to other types if specified.
     * @param message MonthSummary
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MonthSummary, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MonthSummary to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a MonthCategorySummary. */
export interface IMonthCategorySummary {

    /** MonthCategorySummary month */
    month: IMonth;

    /** MonthCategorySummary category */
    category: ICategory;

    /** MonthCategorySummary amount */
    amount?: ((number|Long)[]|null);
}

/** Represents a MonthCategorySummary. */
export class MonthCategorySummary implements IMonthCategorySummary {

    /**
     * Constructs a new MonthCategorySummary.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMonthCategorySummary);

    /** MonthCategorySummary month. */
    public month: IMonth;

    /** MonthCategorySummary category. */
    public category: ICategory;

    /** MonthCategorySummary amount. */
    public amount: (number|Long)[];

    /**
     * Creates a new MonthCategorySummary instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MonthCategorySummary instance
     */
    public static create(properties?: IMonthCategorySummary): MonthCategorySummary;

    /**
     * Encodes the specified MonthCategorySummary message. Does not implicitly {@link MonthCategorySummary.verify|verify} messages.
     * @param message MonthCategorySummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMonthCategorySummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MonthCategorySummary message, length delimited. Does not implicitly {@link MonthCategorySummary.verify|verify} messages.
     * @param message MonthCategorySummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMonthCategorySummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MonthCategorySummary message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MonthCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MonthCategorySummary;

    /**
     * Decodes a MonthCategorySummary message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MonthCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MonthCategorySummary;

    /**
     * Verifies a MonthCategorySummary message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MonthCategorySummary message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MonthCategorySummary
     */
    public static fromObject(object: { [k: string]: any }): MonthCategorySummary;

    /**
     * Creates a plain object from a MonthCategorySummary message. Also converts values to other types if specified.
     * @param message MonthCategorySummary
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MonthCategorySummary, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MonthCategorySummary to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a MonthCategorySummaries. */
export interface IMonthCategorySummaries {

    /** MonthCategorySummaries currency */
    currency: ICurrency;

    /** MonthCategorySummaries categories */
    categories?: (ICategory[]|null);

    /** MonthCategorySummaries months */
    months?: (IMonth[]|null);

    /** MonthCategorySummaries monthSummaries */
    monthSummaries?: (IMonthSummary[]|null);

    /** MonthCategorySummaries categorySummaries */
    categorySummaries?: (ICategorySummary[]|null);

    /** MonthCategorySummaries monthCategorySummaries */
    monthCategorySummaries?: (IMonthCategorySummary[]|null);

    /** MonthCategorySummaries income */
    income: (number|Long);

    /** MonthCategorySummaries expense */
    expense: (number|Long);
}

/** Represents a MonthCategorySummaries. */
export class MonthCategorySummaries implements IMonthCategorySummaries {

    /**
     * Constructs a new MonthCategorySummaries.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMonthCategorySummaries);

    /** MonthCategorySummaries currency. */
    public currency: ICurrency;

    /** MonthCategorySummaries categories. */
    public categories: ICategory[];

    /** MonthCategorySummaries months. */
    public months: IMonth[];

    /** MonthCategorySummaries monthSummaries. */
    public monthSummaries: IMonthSummary[];

    /** MonthCategorySummaries categorySummaries. */
    public categorySummaries: ICategorySummary[];

    /** MonthCategorySummaries monthCategorySummaries. */
    public monthCategorySummaries: IMonthCategorySummary[];

    /** MonthCategorySummaries income. */
    public income: (number|Long);

    /** MonthCategorySummaries expense. */
    public expense: (number|Long);

    /**
     * Creates a new MonthCategorySummaries instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MonthCategorySummaries instance
     */
    public static create(properties?: IMonthCategorySummaries): MonthCategorySummaries;

    /**
     * Encodes the specified MonthCategorySummaries message. Does not implicitly {@link MonthCategorySummaries.verify|verify} messages.
     * @param message MonthCategorySummaries message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMonthCategorySummaries, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MonthCategorySummaries message, length delimited. Does not implicitly {@link MonthCategorySummaries.verify|verify} messages.
     * @param message MonthCategorySummaries message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMonthCategorySummaries, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MonthCategorySummaries message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MonthCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MonthCategorySummaries;

    /**
     * Decodes a MonthCategorySummaries message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MonthCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MonthCategorySummaries;

    /**
     * Verifies a MonthCategorySummaries message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MonthCategorySummaries message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MonthCategorySummaries
     */
    public static fromObject(object: { [k: string]: any }): MonthCategorySummaries;

    /**
     * Creates a plain object from a MonthCategorySummaries message. Also converts values to other types if specified.
     * @param message MonthCategorySummaries
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MonthCategorySummaries, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MonthCategorySummaries to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a MonthSubCategorySummary. */
export interface IMonthSubCategorySummary {

    /** MonthSubCategorySummary month */
    month: IMonth;

    /** MonthSubCategorySummary subCategory */
    subCategory: ISubCategory;

    /** MonthSubCategorySummary amount */
    amount?: ((number|Long)[]|null);
}

/** Represents a MonthSubCategorySummary. */
export class MonthSubCategorySummary implements IMonthSubCategorySummary {

    /**
     * Constructs a new MonthSubCategorySummary.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMonthSubCategorySummary);

    /** MonthSubCategorySummary month. */
    public month: IMonth;

    /** MonthSubCategorySummary subCategory. */
    public subCategory: ISubCategory;

    /** MonthSubCategorySummary amount. */
    public amount: (number|Long)[];

    /**
     * Creates a new MonthSubCategorySummary instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MonthSubCategorySummary instance
     */
    public static create(properties?: IMonthSubCategorySummary): MonthSubCategorySummary;

    /**
     * Encodes the specified MonthSubCategorySummary message. Does not implicitly {@link MonthSubCategorySummary.verify|verify} messages.
     * @param message MonthSubCategorySummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMonthSubCategorySummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MonthSubCategorySummary message, length delimited. Does not implicitly {@link MonthSubCategorySummary.verify|verify} messages.
     * @param message MonthSubCategorySummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMonthSubCategorySummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MonthSubCategorySummary message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MonthSubCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MonthSubCategorySummary;

    /**
     * Decodes a MonthSubCategorySummary message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MonthSubCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MonthSubCategorySummary;

    /**
     * Verifies a MonthSubCategorySummary message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MonthSubCategorySummary message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MonthSubCategorySummary
     */
    public static fromObject(object: { [k: string]: any }): MonthSubCategorySummary;

    /**
     * Creates a plain object from a MonthSubCategorySummary message. Also converts values to other types if specified.
     * @param message MonthSubCategorySummary
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MonthSubCategorySummary, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MonthSubCategorySummary to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a MonthSubCategorySummaries. */
export interface IMonthSubCategorySummaries {

    /** MonthSubCategorySummaries currency */
    currency: ICurrency;

    /** MonthSubCategorySummaries subCategories */
    subCategories?: (ISubCategory[]|null);

    /** MonthSubCategorySummaries month */
    month?: (IMonth[]|null);

    /** MonthSubCategorySummaries monthSummaries */
    monthSummaries?: (IMonthSummary[]|null);

    /** MonthSubCategorySummaries subCategorySummaries */
    subCategorySummaries?: (ISubCategorySummary[]|null);

    /** MonthSubCategorySummaries monthSubCategorySummaries */
    monthSubCategorySummaries?: (IMonthSubCategorySummary[]|null);

    /** MonthSubCategorySummaries income */
    income: (number|Long);

    /** MonthSubCategorySummaries expense */
    expense: (number|Long);
}

/** Represents a MonthSubCategorySummaries. */
export class MonthSubCategorySummaries implements IMonthSubCategorySummaries {

    /**
     * Constructs a new MonthSubCategorySummaries.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMonthSubCategorySummaries);

    /** MonthSubCategorySummaries currency. */
    public currency: ICurrency;

    /** MonthSubCategorySummaries subCategories. */
    public subCategories: ISubCategory[];

    /** MonthSubCategorySummaries month. */
    public month: IMonth[];

    /** MonthSubCategorySummaries monthSummaries. */
    public monthSummaries: IMonthSummary[];

    /** MonthSubCategorySummaries subCategorySummaries. */
    public subCategorySummaries: ISubCategorySummary[];

    /** MonthSubCategorySummaries monthSubCategorySummaries. */
    public monthSubCategorySummaries: IMonthSubCategorySummary[];

    /** MonthSubCategorySummaries income. */
    public income: (number|Long);

    /** MonthSubCategorySummaries expense. */
    public expense: (number|Long);

    /**
     * Creates a new MonthSubCategorySummaries instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MonthSubCategorySummaries instance
     */
    public static create(properties?: IMonthSubCategorySummaries): MonthSubCategorySummaries;

    /**
     * Encodes the specified MonthSubCategorySummaries message. Does not implicitly {@link MonthSubCategorySummaries.verify|verify} messages.
     * @param message MonthSubCategorySummaries message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMonthSubCategorySummaries, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MonthSubCategorySummaries message, length delimited. Does not implicitly {@link MonthSubCategorySummaries.verify|verify} messages.
     * @param message MonthSubCategorySummaries message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMonthSubCategorySummaries, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MonthSubCategorySummaries message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MonthSubCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MonthSubCategorySummaries;

    /**
     * Decodes a MonthSubCategorySummaries message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MonthSubCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MonthSubCategorySummaries;

    /**
     * Verifies a MonthSubCategorySummaries message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MonthSubCategorySummaries message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MonthSubCategorySummaries
     */
    public static fromObject(object: { [k: string]: any }): MonthSubCategorySummaries;

    /**
     * Creates a plain object from a MonthSubCategorySummaries message. Also converts values to other types if specified.
     * @param message MonthSubCategorySummaries
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MonthSubCategorySummaries, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MonthSubCategorySummaries to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a YearSummary. */
export interface IYearSummary {

    /** YearSummary year */
    year: IYear;

    /** YearSummary amount */
    amount?: ((number|Long)[]|null);
}

/** Represents a YearSummary. */
export class YearSummary implements IYearSummary {

    /**
     * Constructs a new YearSummary.
     * @param [properties] Properties to set
     */
    constructor(properties?: IYearSummary);

    /** YearSummary year. */
    public year: IYear;

    /** YearSummary amount. */
    public amount: (number|Long)[];

    /**
     * Creates a new YearSummary instance using the specified properties.
     * @param [properties] Properties to set
     * @returns YearSummary instance
     */
    public static create(properties?: IYearSummary): YearSummary;

    /**
     * Encodes the specified YearSummary message. Does not implicitly {@link YearSummary.verify|verify} messages.
     * @param message YearSummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IYearSummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified YearSummary message, length delimited. Does not implicitly {@link YearSummary.verify|verify} messages.
     * @param message YearSummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IYearSummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a YearSummary message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns YearSummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): YearSummary;

    /**
     * Decodes a YearSummary message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns YearSummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): YearSummary;

    /**
     * Verifies a YearSummary message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a YearSummary message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns YearSummary
     */
    public static fromObject(object: { [k: string]: any }): YearSummary;

    /**
     * Creates a plain object from a YearSummary message. Also converts values to other types if specified.
     * @param message YearSummary
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: YearSummary, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this YearSummary to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a YearCategorySummary. */
export interface IYearCategorySummary {

    /** YearCategorySummary year */
    year: IYear;

    /** YearCategorySummary category */
    category: ICategory;

    /** YearCategorySummary amount */
    amount?: ((number|Long)[]|null);
}

/** Represents a YearCategorySummary. */
export class YearCategorySummary implements IYearCategorySummary {

    /**
     * Constructs a new YearCategorySummary.
     * @param [properties] Properties to set
     */
    constructor(properties?: IYearCategorySummary);

    /** YearCategorySummary year. */
    public year: IYear;

    /** YearCategorySummary category. */
    public category: ICategory;

    /** YearCategorySummary amount. */
    public amount: (number|Long)[];

    /**
     * Creates a new YearCategorySummary instance using the specified properties.
     * @param [properties] Properties to set
     * @returns YearCategorySummary instance
     */
    public static create(properties?: IYearCategorySummary): YearCategorySummary;

    /**
     * Encodes the specified YearCategorySummary message. Does not implicitly {@link YearCategorySummary.verify|verify} messages.
     * @param message YearCategorySummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IYearCategorySummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified YearCategorySummary message, length delimited. Does not implicitly {@link YearCategorySummary.verify|verify} messages.
     * @param message YearCategorySummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IYearCategorySummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a YearCategorySummary message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns YearCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): YearCategorySummary;

    /**
     * Decodes a YearCategorySummary message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns YearCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): YearCategorySummary;

    /**
     * Verifies a YearCategorySummary message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a YearCategorySummary message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns YearCategorySummary
     */
    public static fromObject(object: { [k: string]: any }): YearCategorySummary;

    /**
     * Creates a plain object from a YearCategorySummary message. Also converts values to other types if specified.
     * @param message YearCategorySummary
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: YearCategorySummary, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this YearCategorySummary to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a YearCategorySummaries. */
export interface IYearCategorySummaries {

    /** YearCategorySummaries currency */
    currency: ICurrency;

    /** YearCategorySummaries categories */
    categories?: (ICategory[]|null);

    /** YearCategorySummaries years */
    years?: (IYear[]|null);

    /** YearCategorySummaries yearSummaries */
    yearSummaries?: (IYearSummary[]|null);

    /** YearCategorySummaries categorySummaries */
    categorySummaries?: (ICategorySummary[]|null);

    /** YearCategorySummaries yearCategorySummaries */
    yearCategorySummaries?: (IYearCategorySummary[]|null);

    /** YearCategorySummaries income */
    income: (number|Long);

    /** YearCategorySummaries expense */
    expense: (number|Long);
}

/** Represents a YearCategorySummaries. */
export class YearCategorySummaries implements IYearCategorySummaries {

    /**
     * Constructs a new YearCategorySummaries.
     * @param [properties] Properties to set
     */
    constructor(properties?: IYearCategorySummaries);

    /** YearCategorySummaries currency. */
    public currency: ICurrency;

    /** YearCategorySummaries categories. */
    public categories: ICategory[];

    /** YearCategorySummaries years. */
    public years: IYear[];

    /** YearCategorySummaries yearSummaries. */
    public yearSummaries: IYearSummary[];

    /** YearCategorySummaries categorySummaries. */
    public categorySummaries: ICategorySummary[];

    /** YearCategorySummaries yearCategorySummaries. */
    public yearCategorySummaries: IYearCategorySummary[];

    /** YearCategorySummaries income. */
    public income: (number|Long);

    /** YearCategorySummaries expense. */
    public expense: (number|Long);

    /**
     * Creates a new YearCategorySummaries instance using the specified properties.
     * @param [properties] Properties to set
     * @returns YearCategorySummaries instance
     */
    public static create(properties?: IYearCategorySummaries): YearCategorySummaries;

    /**
     * Encodes the specified YearCategorySummaries message. Does not implicitly {@link YearCategorySummaries.verify|verify} messages.
     * @param message YearCategorySummaries message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IYearCategorySummaries, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified YearCategorySummaries message, length delimited. Does not implicitly {@link YearCategorySummaries.verify|verify} messages.
     * @param message YearCategorySummaries message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IYearCategorySummaries, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a YearCategorySummaries message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns YearCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): YearCategorySummaries;

    /**
     * Decodes a YearCategorySummaries message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns YearCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): YearCategorySummaries;

    /**
     * Verifies a YearCategorySummaries message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a YearCategorySummaries message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns YearCategorySummaries
     */
    public static fromObject(object: { [k: string]: any }): YearCategorySummaries;

    /**
     * Creates a plain object from a YearCategorySummaries message. Also converts values to other types if specified.
     * @param message YearCategorySummaries
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: YearCategorySummaries, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this YearCategorySummaries to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a YearSubCategorySummary. */
export interface IYearSubCategorySummary {

    /** YearSubCategorySummary year */
    year: IYear;

    /** YearSubCategorySummary subCategory */
    subCategory: ISubCategory;

    /** YearSubCategorySummary amount */
    amount?: ((number|Long)[]|null);
}

/** Represents a YearSubCategorySummary. */
export class YearSubCategorySummary implements IYearSubCategorySummary {

    /**
     * Constructs a new YearSubCategorySummary.
     * @param [properties] Properties to set
     */
    constructor(properties?: IYearSubCategorySummary);

    /** YearSubCategorySummary year. */
    public year: IYear;

    /** YearSubCategorySummary subCategory. */
    public subCategory: ISubCategory;

    /** YearSubCategorySummary amount. */
    public amount: (number|Long)[];

    /**
     * Creates a new YearSubCategorySummary instance using the specified properties.
     * @param [properties] Properties to set
     * @returns YearSubCategorySummary instance
     */
    public static create(properties?: IYearSubCategorySummary): YearSubCategorySummary;

    /**
     * Encodes the specified YearSubCategorySummary message. Does not implicitly {@link YearSubCategorySummary.verify|verify} messages.
     * @param message YearSubCategorySummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IYearSubCategorySummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified YearSubCategorySummary message, length delimited. Does not implicitly {@link YearSubCategorySummary.verify|verify} messages.
     * @param message YearSubCategorySummary message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IYearSubCategorySummary, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a YearSubCategorySummary message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns YearSubCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): YearSubCategorySummary;

    /**
     * Decodes a YearSubCategorySummary message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns YearSubCategorySummary
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): YearSubCategorySummary;

    /**
     * Verifies a YearSubCategorySummary message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a YearSubCategorySummary message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns YearSubCategorySummary
     */
    public static fromObject(object: { [k: string]: any }): YearSubCategorySummary;

    /**
     * Creates a plain object from a YearSubCategorySummary message. Also converts values to other types if specified.
     * @param message YearSubCategorySummary
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: YearSubCategorySummary, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this YearSubCategorySummary to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a YearSubCategorySummaries. */
export interface IYearSubCategorySummaries {

    /** YearSubCategorySummaries currency */
    currency: ICurrency;

    /** YearSubCategorySummaries subcategories */
    subcategories?: (ISubCategory[]|null);

    /** YearSubCategorySummaries years */
    years?: (IYear[]|null);

    /** YearSubCategorySummaries yearSummaries */
    yearSummaries?: (IYearSummary[]|null);

    /** YearSubCategorySummaries subCategorySummaries */
    subCategorySummaries?: (ISubCategorySummary[]|null);

    /** YearSubCategorySummaries yearSubCategorySummaries */
    yearSubCategorySummaries?: (IYearSubCategorySummary[]|null);

    /** YearSubCategorySummaries income */
    income: (number|Long);

    /** YearSubCategorySummaries expense */
    expense: (number|Long);
}

/** Represents a YearSubCategorySummaries. */
export class YearSubCategorySummaries implements IYearSubCategorySummaries {

    /**
     * Constructs a new YearSubCategorySummaries.
     * @param [properties] Properties to set
     */
    constructor(properties?: IYearSubCategorySummaries);

    /** YearSubCategorySummaries currency. */
    public currency: ICurrency;

    /** YearSubCategorySummaries subcategories. */
    public subcategories: ISubCategory[];

    /** YearSubCategorySummaries years. */
    public years: IYear[];

    /** YearSubCategorySummaries yearSummaries. */
    public yearSummaries: IYearSummary[];

    /** YearSubCategorySummaries subCategorySummaries. */
    public subCategorySummaries: ISubCategorySummary[];

    /** YearSubCategorySummaries yearSubCategorySummaries. */
    public yearSubCategorySummaries: IYearSubCategorySummary[];

    /** YearSubCategorySummaries income. */
    public income: (number|Long);

    /** YearSubCategorySummaries expense. */
    public expense: (number|Long);

    /**
     * Creates a new YearSubCategorySummaries instance using the specified properties.
     * @param [properties] Properties to set
     * @returns YearSubCategorySummaries instance
     */
    public static create(properties?: IYearSubCategorySummaries): YearSubCategorySummaries;

    /**
     * Encodes the specified YearSubCategorySummaries message. Does not implicitly {@link YearSubCategorySummaries.verify|verify} messages.
     * @param message YearSubCategorySummaries message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IYearSubCategorySummaries, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified YearSubCategorySummaries message, length delimited. Does not implicitly {@link YearSubCategorySummaries.verify|verify} messages.
     * @param message YearSubCategorySummaries message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IYearSubCategorySummaries, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a YearSubCategorySummaries message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns YearSubCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): YearSubCategorySummaries;

    /**
     * Decodes a YearSubCategorySummaries message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns YearSubCategorySummaries
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): YearSubCategorySummaries;

    /**
     * Verifies a YearSubCategorySummaries message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a YearSubCategorySummaries message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns YearSubCategorySummaries
     */
    public static fromObject(object: { [k: string]: any }): YearSubCategorySummaries;

    /**
     * Creates a plain object from a YearSubCategorySummaries message. Also converts values to other types if specified.
     * @param message YearSubCategorySummaries
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: YearSubCategorySummaries, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this YearSubCategorySummaries to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
