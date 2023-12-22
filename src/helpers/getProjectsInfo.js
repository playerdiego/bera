
export const getTasksLenght = (projects) => {
    let tasks = 0;
    
    projects.forEach(project => {
        tasks += project.tasks.length
    });

    return tasks;
};

export const getProjectsBudget = (projects) => {
    let budget = 0;
    
    projects.forEach(project => {
        budget += project.budget
    });
    
    return budget;
}

export const getProjectPercentage = (project, projects) => {

    const total = getProjectsBudget(projects);

    const percentage = (project.budget / total) * 100;


    return percentage;
}

export const getProjectsPaid = (projects) => {

    let paid = [];
    let total = 0;

    // Obetenemos el procentaje que representa cada formulario
    const percentages = projects.map(project => getProjectPercentage(project, projects));
    
    // Obtenemos el porcentaje pagado de cada formulario
    for (let i = 0; i < projects.length; i++) paid.push( percentages[i] * (projects[i].paid / 100));
    
    // Sumamos el total del porcentaje pagado
    for (let i = 0; i < paid.length; i++) total += paid[i];   

    return total;
    
}