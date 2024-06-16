export const insertPlan = (model, data) => {
    const returned = model.create(data)
    return returned

}

export const receivePlan = (model, id) => {
    const plan = model.findAll({where: {id}})
}

export const updatePlan = (model, id, data) => {
    const plan = model.update(data, {where: {id}})
    return plan;
}

export const deletePlan = (model, id) => {
    const returned = model.destroy({where: {id}})
    return returned
}