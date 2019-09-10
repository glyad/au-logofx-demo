import { BindingEngine, transient, View } from "aurelia-framework";
import { IModel, IEditableModel } from './../model';
import { IObjectViewModel } from 'logofx';
import * as Core from '../Core';

@transient()
export class WrappingCollection extends Array {

    public factoryMethod: (item: IModel<any> | IEditableModel<any> | any) => IObjectViewModel<IModel<any>> | any | null | undefined;

    //private _bindingEngine: BindingEngine = Core.getDefaultBindingEngine();
    private _source: Array<any>;
    private _internalMap: WeakMap<any, any> = new WeakMap();
    //private _selectedItems: any[] = [];
    
    private pushCore: (model: any, wrapped: any) => void = (model: any, wrapped: any) => {
        this._internalMap.set(model, wrapped);
        this.push(wrapped);
    }

    private containsWrapper: (model: any) => boolean = (model: any) => {
        return this._internalMap.has(model);
    }

    private addCore: (modelItem: any, wrappedItem: any, indexOfModelItem: number) => void = (modelItem: any, wrappedItem: any, indexOfModelItem: number) => {
        if (this.containsWrapper(modelItem))
            throw new Error('The duplications are not allowed for the model items.');
        
        this._internalMap.set(modelItem, wrappedItem);
        this.splice(indexOfModelItem, 0, wrappedItem);

    }

    private removeCore: (index: number, removedItem: any) => void = (index: number, removedItem: any) => {
        this._internalMap.delete(removedItem);
        this.splice(index, 1); 
    }

    private onSubscribe: (changes: any) => void = (changes: any) => {
        if ((<Array<any>>changes).length == 0)
                    return;

                let innerChanges = changes[0];

                if (innerChanges.addedCount == 1) {                         
                    //this.splice(innerChanges.index, 0, WrappingCollection.createWrapper(this._source[innerChanges.index], this.factoryMethod));
                    this.addCore(this._source[innerChanges.index], WrappingCollection.createWrapper(this._source[innerChanges.index], this.factoryMethod), innerChanges.index);
                } else if (innerChanges.addedCount > 1) {
                    for (let i = 0; i < innerChanges.addedCount; i++) {
                        this.addCore(this._source[innerChanges.index + i], WrappingCollection.createWrapper(this._source[innerChanges.index + i], this.factoryMethod), innerChanges.index + i);
                        //this.splice(innerChanges.index + i, 0, WrappingCollection.createWrapper(this._source[innerChanges.index + i], this.factoryMethod));
                    }
                } else if (innerChanges.removed.length == 1) {
                    //this.splice(innerChanges.index, 1);
                    this.removeCore(innerChanges.index, innerChanges.removed[0]);          
                } else if (innerChanges.removed.length > 1) {
                    innerChanges.removed.forEach(originalItem => {
                        let index = this.findIndex(item => { return item.model === originalItem});
                        //this.splice(index, 1);
                        this.removeCore(index, originalItem);
                    });
                }
    }


    constructor ( factoryMethod?: (item: IModel<any>) => IObjectViewModel<IModel<any>>
                , source?: Array<any> ) {
        super();
        Object.setPrototypeOf(this, new.target.prototype);

        if (factoryMethod === null || factoryMethod === undefined)
            factoryMethod = (item) => <any>item;
        
        this.factoryMethod = factoryMethod;

        if (source === null || source === undefined)
            this._source = new Array<any>();
        else 
            this._source = source;

        
        Core.getDefaultObserverLocator()
            .getArrayObserver(this._source)
            .subscribe('clbk', this.onSubscribe);

            for(const item of this._source) {
                this.pushCore(item, WrappingCollection.createWrapper(item, this.factoryMethod));
            }            
    }

    clbk(changes: any){        
        console.log('CHANGES 2:  ' + typeof changes);
    }

    
    private static createWrapper(item: any, factoryMethod): IObjectViewModel<IModel<any>> | any
    {
        return factoryMethod(item);
    }

    created(owningView: View, myView: View) {
        console.log('WrappingCollection.created called.');
    }

    attached() {
        console.log('WrappingCollection.attached called.');
    }

    canActivate(params, routeConfig, navigationInstruction) {
        console.log('WrappingCollection.canActivate called.');
    }

    activate(params, routeConfig, navigationInstruction) {
        console.log('WrappingCollection.activate called.');
    }

    canDeactivate() {
        console.log('WrappingCollection.canDeactivate called.');    
    }

    deactivate() {
        console.log('WrappingCollection.deactivate called.');
    }
    
    bind(bindingContext: Object,overrideContext: Object) {
        console.log('WrappingCollection.bimd called.');
    }

    unbind() {
        console.log('WrappingCollection.unbiind called.');
    }
    
    public getSelectedItems(): any[] {
        return super.filter(item => item.isSelected);
    }

    public canSelectAll(): boolean {
        return this.length > this.getSelectedItems().length;
    }

    public selectAll (): void {
        this.forEach(item => item.isSelected = true);
    }

    public canUnselectAll(): boolean {
        return this.getSelectedItems().length > 0;
    }

    public unselectAll(): void {
        this.forEach(item => item.isSelected = false);
    }
    
    // public filter(callbackfn: (value: any, index: number, array: any[]) => any, thisArg?: any): WrappingCollection {
    //   return <WrappingCollection>super.filter(callbackfn, this);
    // }
    
}

