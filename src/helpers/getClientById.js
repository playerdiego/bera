export const getClientById = (id, clients) => {
    // eslint-disable-next-line
    return clients.find(client => client.id == id);
};