interface WithId {
    id: number;
}

export default function createMap<T extends WithId>(array: Array<T>) {
    return (
        array?.reduce(function (map: { [key: number]: T }, obj: T) {
            map[obj.id] = obj;
            return map;
        }, {}) ?? {}
    );
}
