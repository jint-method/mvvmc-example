class Store{
    private worker: Worker;

    constructor(){
        this.worker = new Worker(`${location.origin}/assets/worker.mjs`);
        this.worker.onmessage = this.workerInbox.bind(this);
    }

    private workerInbox(e:MessageEvent){
        const message = e.data;
        switch (message.type){
            default:
                console.warn(`Unknown store inbox message type: ${message.type}`);
                break;
        }
    }

    private sendMessage(type:string, data:any):void{
        this.worker.postMessage({
            type: type,
            data: data,
        });
    }

    public search(query:string):void{
        if (query.length){
            this.sendMessage("search", query.trim());
        }
    }

    public sort(sort:string):void{
        this.sendMessage("sort", sort);
    }

    public updateCategory(category:string):void{
        this.sendMessage("category", category);
    }
}
const store = new Store();
const search:(query:string)=>void = store.search.bind(store);
const sort:(sortType:"price-hl" | "price-lh" | "rating-hl" | "rating-lh")=>void = store.sort.bind(store);
const updateCategory:(category: "dairy" | "fruit" | "vegetable" | "bakery" | "meat")=>void = store.updateCategory.bind(store);
export { store, search, sort, updateCategory };