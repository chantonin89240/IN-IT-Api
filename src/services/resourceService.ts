import Resource from "../entities/resource";

export function getResource(id : number) : Resource {
    const resource : Resource = { id : 1, name : "Salle de réunion", description : "Cette salle est très grande et spacieuse"};
    return resource;
}

export function getResources() : Resource[]{
    const resources = new Array<Resource>;

    const resource1 : Resource = { id : 1, name : "Salle de réunion 1", description : "Cette salle est très grande et spacieuse"};
    const resource2 : Resource = { id : 2, name : "Salle de réunion 2", description : "Cette salle est très grande et spacieuse"};
    const resource3 : Resource = { id : 3, name : "Salle de réunion 3", description : "Cette salle est très grande et spacieuse"};
    const resource4 : Resource = { id : 4, name : "Salle de réunion 4", description : "Cette salle est très grande et spacieuse"};
    const resource5 : Resource = { id : 5, name : "Salle de réunion 5", description : "Cette salle est très grande et spacieuse"};
    const resource6 : Resource = { id : 6, name : "Salle de réunion 6", description : "Cette salle est très grande et spacieuse"};

    resources.push(resource1, resource2, resource3, resource4, resource5, resource6);
    return resources;
}