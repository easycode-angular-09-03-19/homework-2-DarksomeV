//Первая задача

function addItemInfoDecorator(target: Object, method: string, descriptor: PropertyDescriptor) {
    let origFunc = descriptor.value;
    descriptor.value = function () {
        let resOrigFunc = origFunc.apply(this);
        //Мои новые дополнения
        let newobj = resOrigFunc;
        newobj.info = `${newobj.name} - $${newobj.price}`;
        newobj.date = new Date().toLocaleTimeString();
        return newobj;
    }
}
//Это так, чисто пробовал, экспериментировал, решил не удалять все таки. В одном месте ниже оставил использование даного интерфейсв
interface CustomItem{
    name: string;
    price: number;
    info?: string;
    date?: string;
}

class Item {
    public price: number;
    public name: string;

    constructor(name: string ,price: number) {
        this.name = name;
        this.price = price;
    }

    @addItemInfoDecorator
    public getItemInfo() : CustomItem { //Не уверен, что здесь нужно делать так. Точнее полностью уверен что не нужно, но хочется же все же указать что метод должен возвращать
        return {
            name: this.name,
            price: this.price
        };
    }
}

let item = new Item('Apple', 100);
console.log(item.getItemInfo());

//Вторая задача

function UserType(type: string) {
    return function(targetClass) {
        return class {
            public type:string = type;
            public createDate: string = new Date().toLocaleTimeString();
            //если бы просто new Date(), то было бы createDate: Date


            getType(): void {
                console.log(`TYPE IS: ${this.type} ********* DATE IS: ${this.createDate}`);
            }
        }
    }
}

@UserType('user')
class PublicUser {
    getType():void | string {}
}

const pubUser = new PublicUser();
console.log(pubUser.getType());



//Третья задача

// News api USA
namespace USA {
    export interface INews {
        id: number;
        title: string;
        text: string;
        author: string;
    }

    export class NewsService {
        protected apiurl: string = 'https://news_api_usa_url'

        public getNews() {
        } // method
    }
}

// News api Ukraine
namespace Ukraine {
    export interface INews {
        uuid: string;
        title: string;
        body: string;
        author: string;
        date: string;
        imgUrl: string;
    }

    export class NewsService {
        protected apiurl: string = 'https://news_api_2_url'

        public getNews() {
        } // method get all news
        public addToFavorite() {
        } // method add to favorites
    }
}

const myNewsService = new Ukraine.NewsService();
let news: Ukraine.INews[];


//Четвертая задача
class Junior {
    doTasks() {
        console.log('Actions!!!');
    }
}

class Middle {
    createApp() {
        console.log('Creating!!!');
    }
}

class Senior implements Junior, Middle{
    public doTasks(): void {}
    public createApp(): void {}
    public createArchitecture(architecture: number): number {
        return architecture;
    }
}

function applyMixin(targetClass, baseClasses) {
    baseClasses.forEach((baseClass) => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach((propName) => {
            targetClass.prototype[propName] = baseClass.prototype[propName];
        });
    });
}

applyMixin(Senior, [Junior, Middle]);

const user = new Senior();
user.createApp();
let numberOfMyArchitecture:number = user.createArchitecture(4);
console.log(numberOfMyArchitecture);


