import { IPaginationOpts } from '../interface/request';

const defaults: IPaginationOpts = {
    limit: 12,
    offset: 0,
    sortBy: 'id',
    sortOrder: 'asc'
};

export default defaults;
