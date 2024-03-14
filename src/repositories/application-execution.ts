import * as Sequelize from 'sequelize';

import { Database } from './../bootstrap/database';
import { Models } from '../models/index';
import { IApplicationExecutionInstance, IApplicationExecutionAttributes } from '../models/application-execution';
import { ApplicationExecutionStatus } from './../enum/application';
import {
    IGetExecutionSelect,
    IGetParticipatedUserSelect,
    IApplicationExecutionInProcessQuery
} from '../interface/application';

export const getAll = async (userId: string, applyCreatedBy: boolean = false) => {
    const where: any = {
        isActive: true
    };
    if (applyCreatedBy) {
        where.createdBy = userId;
    }
    return Models.ApplicationExecution.findAll({
        attributes: ['id', 'applicationId', 'startedAt', 'status', 'createdAt', 'updatedAt'],
        where,
        include: [{
            model: Models.ApplicationExecutionForm,
            attributes: ['id', 'applicationExecutionId', 'applicationFormFieldId', 'value', 'isActive'],
            where: {
                isActive: true
            },
            include: [{
                model: Models.ApplicationFormField,
            }],
        }, {
            model: Models.Application,
            where: {
                isActive: true
            }
        }, {
            model: Models.ApplicationExecutionWorkflow,
            include: [{
                model: Models.ApplicationWorkflow,
            }]
        }]
    });
};

export const getAllForParticipatedReport = async (userId: string, applyCreatedBy: boolean = false) => {
    const where: any = {
        isActive: true
    };
    if (applyCreatedBy) {
        where.createdBy = userId;
    }
    return Models.ApplicationExecution.findAll({
        attributes: ['id', 'applicationId', 'startedAt', 'status', 'createdAt', 'updatedAt'],
        where,
        include: [{
            model: Models.Application,
            where: {
                isActive: true
            }
        }]
    });
};

export const getByApplicationId = async (applicationId: string) => {
    return Models.ApplicationExecution.findAll({
        attributes: ['id', 'applicationId', 'startedAt', 'status', 'createdAt', 'updatedAt'],
        where: {
            isActive: true,
            applicationId
        },
        include: [{
            model: Models.ApplicationExecutionForm,
            attributes: ['id', 'applicationExecutionId', 'applicationFormFieldId', 'value', 'isActive'],
            where: {
                isActive: true
            },
            include: [{
                model: Models.ApplicationFormField,
            }],
        }, {
            model: Models.Application
        }]
    });
};

export const findByIdForValidation = async (id: string) => {
    return Models.ApplicationExecution.findOne({
        attributes: ['id', 'applicationId', 'startedAt', 'status',
            'createdAt', 'createdBy', 'updatedAt', 'latitude', 'longitude'],
        where: {
            isActive: true,
            id
        },
    });
};

export const findById = async (id: string) => {
    return Models.ApplicationExecution.findOne({
        attributes: ['id', 'applicationId', 'startedAt', 'status',
            'createdAt', 'createdBy', 'updatedAt', 'latitude', 'longitude'],
        where: {
            isActive: true,
            id
        },
        include: [{
            model: Models.User,
            as: 'createdByUser'
        }, {
            model: Models.Application,
            where: {
                isActive: true
            },
        }, {
            model: Models.ApplicationExecutionForm,
            include: [{
                model: Models.ApplicationFormField
            }],
            where: {
                isActive: true
            }
        }, {
            model: Models.ApplicationExecutionWorkflow,
            include: [{
                model: Models.ApplicationWorkflow,
                include: [{
                    model: Models.ApplicationWorkflowPermission,
                }]
            }]
        }]
    });
};

export const getApplicationExecutionsForApproval = async (type: string) => {
    return Models.ApplicationExecution.findAll({
        attributes: ['id', 'applicationId', 'title', 'startedAt', 'status', 'createdAt', 'updatedAt', 'createdBy'],
        where: {
            isActive: true,
        },
        include: [{
            model: Models.User,
            as: 'createdByUser'
        }, {
            model: Models.Application,
            where: {
                isActive: true
            },
        }, {
            model: Models.ApplicationExecutionForm,
            include: [{
                model: Models.ApplicationFormField
            }],
            where: {
                isActive: true
            }
        }, {
            model: Models.ApplicationExecutionWorkflow,
            where: {
                status: ApplicationExecutionStatus.DRAFT
            },
            include: [{
                model: Models.ApplicationWorkflow,
                where: {
                    type
                },
                include: [{
                    model: Models.ApplicationWorkflowPermission,
                }]
            }]
        }]
    });
};

export const getApplicationExecutionsForApprovalCount = async (userId: string, type: string) => {
    return Models.ApplicationExecution.count({
        where: {
            isActive: true,
        },
        include: [{
            model: Models.User,
            as: 'createdByUser'
        }, {
            model: Models.ApplicationExecutionWorkflow,
            where: {
                status: ApplicationExecutionStatus.DRAFT
            },
            include: [{
                model: Models.ApplicationWorkflow,
                where: {
                    type
                },
                include: [{
                    model: Models.ApplicationWorkflowPermission,
                    where: {
                        userId
                    }
                }]
            }]
        }]
    });
};

export const getDraftApplicationExecutions = async (userId: string) => {
    return Models.ApplicationExecution.findAll({
        attributes: ['id', 'applicationId', 'title', 'startedAt', 'status', 'createdAt', 'updatedAt', 'createdBy'],
        where: {
            isActive: true,
            createdBy: userId,
            status: ApplicationExecutionStatus.DRAFT
        },
        include: [{
            model: Models.Application,
            where: {
                isActive: true
            },
        }, {
            model: Models.ApplicationExecutionForm,
            include: [{
                model: Models.ApplicationFormField
            }],
            where: {
                isActive: true
            }
        }, {
            model: Models.ApplicationExecutionWorkflow,
            include: [{
                model: Models.ApplicationWorkflow,
            }]
        }]
    });
};

export const getApprovedApplicationExecutions = async (userId: string) => {
    return Models.ApplicationExecution.findAll({
        attributes: ['id', 'applicationId', 'title', 'startedAt', 'status', 'createdAt', 'updatedAt', 'createdBy'],
        where: {
            isActive: true,
            updatedBy: userId,
            status: ApplicationExecutionStatus.APPROVED
        },
        include: [{
            model: Models.Application,
            where: {
                isActive: true
            },
        }, {
            model: Models.ApplicationExecutionForm,
            include: [{
                model: Models.ApplicationFormField
            }],
            where: {
                isActive: true
            }
        }, {
            model: Models.ApplicationExecutionWorkflow,
            where: {
                status: ApplicationExecutionStatus.APPROVED
            },
            include: [{
                model: Models.ApplicationWorkflow,
            }]
        }]
    });
};

export const getDraftApplicationExecutionsCount = async (userId: string) => {
    return Models.ApplicationExecution.count({
        where: {
            isActive: true,
            createdBy: userId,
            status: ApplicationExecutionStatus.DRAFT
        },
        include: [{
            model: Models.Application,
            where: {
                isActive: true
            },
        }, {
            model: Models.ApplicationExecutionForm,
            where: {
                isActive: true
            }
        }]
    });
};

export const getApplicationExecutionInProcess = async (userId: string, status: string) => {
    return Models.ApplicationExecution.findAll({
        attributes: ['id', 'applicationId', 'title', 'startedAt', 'status', 'createdAt', 'updatedAt', 'createdBy'],
        where: {
            isActive: true,
            createdBy: userId
        },
        include: [{
            model: Models.Application,
            attributes: ['id', 'subject'],
            where: {
                isActive: true
            },
        }, {
            model: Models.ApplicationExecutionForm,
            attributes: ['id', 'applicationFormFieldId'],
            include: [{
                model: Models.ApplicationFormField
            }],
            where: {
                isActive: true
            }
        }, {
            model: Models.ApplicationExecutionWorkflow,
            attributes: ['id', 'applicationWorkflowId'],
            where: {
                status
            },
            include: [{
                model: Models.ApplicationWorkflow,
            }]
        }]
    });
};

export const getApplicationExecutionInProcessCount = async (userId: string, status: string) => {
    return Models.ApplicationExecution.count({
        where: {
            isActive: true,
            createdBy: userId
        },
        include: [{
            model: Models.ApplicationExecutionWorkflow,
            where: {
                status
            },
            include: [{
                model: Models.ApplicationWorkflow,
            }]
        }]
    });
};

export const getApplicationExecutionParticipatedIds = async (userId: string) => {
    return Database.query(`
        WITH
        A AS (
            SELECT
            "applicationExecutionId", jsonb_array_elements("comments") AS comments
            FROM "applicationExecutionWorkflow"
        )
        SELECT distinct("applicationExecutionId") as id
        FROM A
        WHERE (comments->>'userId') = '${userId}';
    `);
};

export const getApplicationExecutionsByIds = async (ids: string[]) => {
    return Models.ApplicationExecution.findAll({
        attributes: ['id', 'applicationId', 'title', 'startedAt', 'status', 'createdAt', 'updatedAt', 'createdBy'],
        where: {
            isActive: true,
            id: {
                [Sequelize.Op.in]: ids
            },
        },
        include: [{
            model: Models.Application,
            where: {
                isActive: true
            },
        }, {
            model: Models.ApplicationExecutionForm,
            include: [{
                model: Models.ApplicationFormField
            }],
            where: {
                isActive: true
            }
        }, {
            model: Models.ApplicationExecutionWorkflow,
            include: [{
                model: Models.ApplicationWorkflow,
            }]
        }]
    });
};

export const getApplicationExecutionsForTimeReport = async (
    applicationId: string, startDate: string, endDate: string) => {
    const result = await Database.query(`
        select distinct execution.id, execution.latitude, execution.longitude, execution."createdAt",
        execution."createdBy", app."name", execution."applicationId",
        (
            select REPLACE(app.subject, concat('{', ef."fieldId", '}'), ef.value) from "applicationExecutionForm" ef
            where ef."applicationExecutionId" = execution.id and
            app.subject ilike concat('%', ef."fieldId", '%') limit 1
        ) as title
        from "applicationExecution" execution
        inner join application app on execution."applicationId" = app.id and app."isActive" = true
        inner join "user" u on u.id = execution."createdBy"
        where execution."applicationId" = '${applicationId}' and execution."isActive" = true
        and execution."createdAt" >= '${startDate}' and execution."createdAt" < '${endDate}'
    `).then((res) => res[0]);
    return result;
};

// Raw query
export const getDraftApplicationExecutionQuery =
    async (userId: string, status: string, applicationId?: string,
        startDate?: string, endDate?: string): Promise<IGetExecutionSelect[]> => {
        let query = `select distinct execution.id, execution."createdAt", execution."createdBy", app."name",
        u."managerId", u."departmentId", u."officeLocationId", execution."applicationId", execution."updatedAt",
        u."firstName" as "createdByName", workflow."canWithdraw", ew."userPermissionId",
        workflow."assignTo", workflow."groupId",
        (
            select REPLACE(app.subject, concat('{', ef."fieldId", '}'), ef.value) from "applicationExecutionForm" ef
            where ef."applicationExecutionId" = execution.id and
            app.subject ilike concat('%', ef."fieldId", '%') limit 1
        ) as title
        from "applicationExecution" execution
        inner join application app on execution."applicationId" = app.id and app."isActive" = true
        inner join "user" u on u.id = execution."createdBy"
        left join "applicationExecutionWorkflow" ew on ew."applicationExecutionId" = execution.id
        and ew.status = 'draft'
        left join "applicationWorkflow" workflow on ew."applicationWorkflowId" = workflow.id
        and ew."isActive" = true
        where execution."createdBy" = '${userId}' and execution.status = '${status}'
        and execution."isActive" = true`;
        if (applicationId) {
            query += ` and execution."applicationId" = '${applicationId}'`;
        }
        if (startDate) {
            query += ` and execution."createdAt" >= '${startDate}'`;
        }
        if (endDate) {
            query += ` and execution."createdAt" < '${endDate}'`;
        }
        query += ` order by execution."updatedAt" desc`;
        const result = await Database.query(query).then((res) => res[0]);
        return result;
    };

export const getApplicationExecutionInProcessQuery =
    async (payload: IApplicationExecutionInProcessQuery): Promise<IGetExecutionSelect[]> => {
        let query = `select distinct execution.id, execution."createdAt", execution."createdBy", app."name",
        u."managerId", u."departmentId", u."officeLocationId", execution."applicationId", execution."updatedAt",
        ew."applicationWorkflowId", workflow."showMap", workflow."canWithdraw", workflow."assignTo", workflow."groupId",
        u."firstName" as "createdByName", workflow."name" as "applicationWorkflowName", ew."userPermissionId",
        (
            select REPLACE(app.subject, concat('{', ef."fieldId", '}'), ef.value) from "applicationExecutionForm" ef
            where ef."applicationExecutionId" = execution.id and
            app.subject ilike concat('%', ef."fieldId", '%') limit 1
        ) as title,
        row_number() over (partition
            by
                "ew"."applicationExecutionId"
            order by
                "ew"."createdAt" desc) as rank
        from "applicationExecution" execution
        inner join application app on execution."applicationId" = app.id and app."isActive" = true
        inner join "user" u on u.id = execution."createdBy"
        left join "applicationExecutionWorkflow" ew on ew."applicationExecutionId" = execution.id
        and ew.status = '${payload.status}'
        inner join "applicationWorkflow" workflow on ew."applicationWorkflowId" = workflow.id
        and ew."isActive" = true
        where execution."isActive" = true and execution."status" = '${payload.status}'`;
        if (!payload.isAdmin) {
            if (payload.isClarity) {
                query += ` and ew."clarificationUserId" = '${payload.userId}'`;
            } else {
                query += ` and execution."createdBy" = '${payload.userId}'`;
            }
        }
        if (payload.applicationId) {
            query += ` and execution."applicationId" = '${payload.applicationId}'`;
        }
        if (payload.startDate) {
            query += ` and execution."createdAt" >= '${payload.startDate}'`;
        }
        if (payload.endDate) {
            query += ` and execution."createdAt" < '${payload.endDate}'`;
        }
        query += ` order by execution."createdAt" desc`;
        query = `select * from (${query}) x where x.rank = 1`;
        const result = await Database.query(query).then((res) => res[0]);
        return result;
    };

export const getApplicationExecutionByWorkflowTypeAndStatusQuery =
    async (status: string, type: string, applicationId?: string,
        startDate?: string, endDate?: string): Promise<IGetExecutionSelect[]> => {
        let query = `select distinct execution.id, execution."createdAt", execution."createdBy", app."name",
        u."managerId", u."departmentId", u."officeLocationId", execution."applicationId", execution."updatedAt",
        ew."applicationWorkflowId", workflow."showMap", workflow."canWithdraw", workflow."assignTo", workflow."groupId",
        u."firstName" as "createdByName", workflow."name" as "applicationWorkflowName", ew."userPermissionId",
        (
            select REPLACE(app.subject, concat('{', ef."fieldId", '}'), ef.value) from "applicationExecutionForm" ef
            where ef."applicationExecutionId" = execution.id and
            app.subject ilike concat('%', ef."fieldId", '%') limit 1
        ) as title
        from "applicationExecution" execution
        inner join application app on execution."applicationId" = app.id and app."isActive" = true
        inner join "user" u on u.id = execution."createdBy"
        inner join "applicationExecutionWorkflow" ew on ew."applicationExecutionId" = execution.id
        and ew.status = '${status}' and ew."isActive" = true
        inner join "applicationWorkflow" workflow on ew."applicationWorkflowId" = workflow.id
        and workflow.type = '${type}' and workflow."isActive" = true
        where execution."isActive" = true`;
        if (applicationId) {
            query += ` and execution."applicationId" = '${applicationId}'`;
        }
        if (startDate) {
            query += ` and execution."createdAt" >= '${startDate}'`;
        }
        if (endDate) {
            query += ` and execution."createdAt" < '${endDate}'`;
        }
        query += ` order by execution."createdAt" desc`;
        const result = await Database.query(query).then((res) => res[0]);
        return result;
    };

export const getParticipatedApplicationExecutionQuery =
    async (userId: string, searchText?: string, startDate?: string, endDate?: string):
        Promise<IGetExecutionSelect[]> => {
        let query = `select * from ex where excount > 0 and ex."createdBy" != '${userId}'`;
        if (startDate) {
            query += ` and ex."createdAt" >= '${startDate}'`;
        }
        if (endDate) {
            query += ` and ex."createdAt" < '${endDate}'`;
        }
        if (searchText) {
            query += ` and title ilike '%${searchText}%'`;
        }
        const result = await Database.query(`
        WITH ex AS (
            select distinct execution.id, execution."createdAt", execution."createdBy", execution."applicationId",
            app."name",
            (select count(id) from "applicationExecutionWorkflow" aew where aew."applicationExecutionId" = execution.id
            and (aew."createdBy" = '${userId}' OR aew."updatedBy" = '${userId}')) as excount,
            (
                select REPLACE(app.subject, concat('{', ef."fieldId", '}'), ef.value) from "applicationExecutionForm" ef
                where ef."applicationExecutionId" = execution.id and
                app.subject ilike concat('%', ef."fieldId", '%') limit 1
            ) as title,
            "outWorkflow"."canWithdraw",
            u."firstName" as "createdByName"
            from "applicationExecution" execution
            inner join application app on execution."applicationId" = app.id and app."isActive" = true
            inner join "user" u on u.id = execution."createdBy"
            LEFT JOIN LATERAL
                (SELECT "executionWorkflow"."applicationWorkflowId", workflow."canWithdraw"
                FROM "applicationExecutionWorkflow" "executionWorkflow"
                inner join "applicationWorkflow" workflow on workflow.id = "executionWorkflow"."applicationWorkflowId"
                WHERE "executionWorkflow"."applicationExecutionId" = execution.id
                ORDER BY "executionWorkflow"."createdAt" DESC LIMIT 1)
                "outWorkflow" ON true
        )
        ${query} order by "createdAt" desc;
    `).then((res) => res[0]);
        return result;
    };

export const getTotalApplicationExecutionQuery =
    async (applicationId: string, startDate: string, endDate: string): Promise<IGetExecutionSelect[]> => {
        const result = await Database.query(`
        select distinct execution.id, execution."createdAt", execution.status, u."firstName" as "createdByName",
        (
            select REPLACE(app.subject, concat('{', ef."fieldId", '}'), ef.value) from "applicationExecutionForm" ef
            where ef."applicationExecutionId" = execution.id and
            app.subject ilike concat('%', ef."fieldId", '%') limit 1
        ) as title
        from "applicationExecution" execution
        inner join application app on execution."applicationId" = app.id and app."isActive" = true
        inner join "user" u on u.id = execution."createdBy"
        inner join "applicationExecutionWorkflow" aew on aew."applicationExecutionId" = execution.id
        where execution."applicationId" = '${applicationId}' and execution."isActive" = true
        and execution."createdAt" >= '${startDate}' and execution."createdAt" < '${endDate}'
    `).then((res) => res[0]);
        return result;
    };

export const getAllExecutionsByStatus = async (
    userId: string,
    status: string[], applicationId?: string, forAdmin: boolean = false,
    startDate?: string, endDate?: string
): Promise<IGetExecutionSelect[]> => {
    let query = `select distinct execution.id, execution."createdAt", execution."createdBy", app."name",
        u."managerId", u."departmentId", u."officeLocationId", execution."applicationId", execution."updatedAt",
        u."firstName" as "createdByName", workflow."name" as "applicationWorkflowName",
        (
            select REPLACE(app.subject, concat('{', ef."fieldId", '}'), ef.value) from "applicationExecutionForm" ef
            where ef."applicationExecutionId" = execution.id and
            app.subject ilike concat('%', ef."fieldId", '%') limit 1
        ) as title
        from "applicationExecution" execution
        inner join application app on execution."applicationId" = app.id and app."isActive" = true
        inner join "user" u on u.id = execution."createdBy"
        inner join "applicationExecutionWorkflow" ew on ew."applicationExecutionId" = execution.id
        and ew.status = 'draft' and ew."isActive" = true
        inner join "applicationWorkflow" workflow on ew."applicationWorkflowId" = workflow.id
        and workflow."isActive" = true
        where execution.status in (${status.map(s => `'${s}'`).join(',')})
        and execution."isActive" = true`;
    if (applicationId) {
        query += ` and execution."applicationId" = '${applicationId}'`;
    }
    if (!forAdmin) {
        query += ` and execution."createdBy" = '${userId}'`;
    }
    if (startDate) {
        query += ` and execution."createdAt" >= '${startDate}'`;
    }
    if (endDate) {
        query += ` and execution."createdAt" < '${endDate}'`;
    }
    const result = await Database.query(query).then((res) => res[0]);
    return result;
};

export const getParticipatedUsersByExecutionId =
    async (executionId: string): Promise<IGetParticipatedUserSelect[]> => {
        const result = await Database.query(`
        select distinct "createdByUser".id as "createdBy", "updatedByUser".id as "updatedBy"
        from "applicationExecution" execution
        inner join "applicationExecutionWorkflow" aew on aew."applicationExecutionId" = execution.id
        inner join "user" "createdByUser" on aew."createdBy" = "createdByUser".id
        left join "user" "updatedByUser" on aew."updatedBy" = "updatedByUser".id
        where execution."id" = '${executionId}' and execution."isActive" = true
    `).then((res) => res[0]);
        return result;
    };

export const getExecutionIdsByStartEndDate = async (
    applicationId: string, startDate: string, endDate: string, status: string) => {
    let query = `select distinct execution.id
        from "applicationExecution" execution
        where execution."applicationId" = '${applicationId}'
        and execution."createdAt" >= '${startDate}' and execution."createdAt" < '${endDate}'`;
    if (status && status !== 'all') {
        query += ` and execution.status = '${status}'`;
    }
    const result = await Database.query(query).then((res) => res[0]);
    return result;
};

export const findByIds = async (ids: string[]) => {
    return Models.ApplicationExecution.findAll({ where: { id: { [Sequelize.Op.in]: ids } } });
};

export const saveApplicationExecution = async (applicationExecution: IApplicationExecutionAttributes) => {
    return Models.ApplicationExecution.upsert(applicationExecution, { returning: true })
        .then((res) => res[0]);
};

export const deleteApplicationExecution = async (id: string, updatedBy: string) => {
    return Models.ApplicationExecution.update({ isActive: false, updatedBy }, { where: { id } });
};
