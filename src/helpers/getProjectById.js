export const getProjectById = (id, projects) => {
    // eslint-disable-next-line
    return projects.find(project => project.id == id);
};