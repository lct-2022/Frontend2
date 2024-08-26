import React, { UseQueryResult } from "react-query";
import { ObjectType } from "../types/common";

export const handleError = (params: ObjectType<UseQueryResult>) => {
    const isError = Object.values(params)
        .some(data => !!data.error);

    if (isError) {
        throw new Error('Failed to get data');
    }
}