export default store => next => action => {
    const { withRandomId, ...rest} = action
    if (!withRandomId) return next(action)
    const { withRandomId, ...rest } = action;
    if (!withRandomId) return next(action);

    next({
        ...rest,
        randomId: Date.now() + Math.random()
    });
};
