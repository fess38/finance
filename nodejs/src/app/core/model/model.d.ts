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
