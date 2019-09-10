import * as Collections from 'typescript-collections';

export class IndexedDictionary<TKey, TValue> extends Collections.Dictionary<TKey, TValue> {

    private _replaceDuplicateKeys: boolean;
    private _throwErrorOnInvalidRemove: boolean;

    protected internalKeys: Set<TKey> = new Set<TKey>(); 

    constructor () {
        super();
    }

    /// <summary>
    /// Makes sure int is not used as dictionary key:
    /// </summary>
    // private ValidateKeyType()
    // {
    //     let x: TKey = new (): TKey;

    //     if (typeof x === "number")
    //     {
    //         throw new Error("Key of type int is not supported.");
    //     }
    // }

    public add(key:TKey, value: TValue): void {
        
    }

    public addAt(index: number, key:TKey, value: TValue): void {
        
    }

    public contains(key: TKey): boolean {
        return super.containsKey(this.transformKey(key));
    }

    protected transformKey(key: TKey)  {
        return key;
    }    

    public get replaceDuplicateKeys(): boolean {
        return this._replaceDuplicateKeys; 
    }

    public set replaceDuplicateKeys(value: boolean) {
        this._replaceDuplicateKeys = value;
    }

    public get ThrowErrorOnInvalidRemove(): boolean
    {
        return this._throwErrorOnInvalidRemove; 
    }

    public set ThrowErrorOnInvalidRemove(value: boolean) {
        this._throwErrorOnInvalidRemove = value;
    }

            

}