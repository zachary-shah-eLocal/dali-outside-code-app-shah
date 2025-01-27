// This is used to tell react-query which key to invalidate after a mutation so the new data will fetch
export function queryKeyFactory(queryKey: string) {
    const factoryKeys = {
      all: [queryKey], // invalidates everything that has that query key no matter if its a list or single record
      lists: () => [...factoryKeys.all, 'list'], // invalidates all lists no matter what the filters are
      list: (filters: any) => [...factoryKeys.lists(), { ...filters }], // This invalidates all queries that use these exact filters
      details: () => [...factoryKeys.all, 'detail'], // This invalidates all queires that used an id to fetch a single record
      detail: (id: any) => [...factoryKeys.details(), id] // This invalidates only the record with the matching id
    }
    return factoryKeys
  }