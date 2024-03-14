var _ = require('lodash')

export const rejectUndefinedOrNull = (id: string) => _.isUndefined(id) || _.isNull(id) || _.isEmpty(id);
