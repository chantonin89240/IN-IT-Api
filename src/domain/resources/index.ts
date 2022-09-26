var Request = require('tedious').Request;

export interface Resource {
    id : number;
    name: string;
    description: string;
    picture: string; 
    typeId: number;
    maxCapacity: number;
    position: string;
}

export const listResource = (): Resource[] => {
    var request = new Request("select * from Resource", function(err: any) {
        if (err) {
            console.log(err);
        } else {
            console.log("request ok"); 
        }
    })
    return request;
};

// export const findResource = (id: number): Resource | undefined => {

// };