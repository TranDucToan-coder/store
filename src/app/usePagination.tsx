"use client"
import { useMemo } from "react";
import product from './model'

const Paginated = ({ page, limit, data }: { page: number, limit: 9, data: product[] }) => {
    const paginated = useMemo(() => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return data.slice(startIndex, endIndex);
    }, [page, limit, data]);
    const totalPages = useMemo(() => {
        return Math.ceil(data.length / limit);
    }, [data, limit]);
    return { paginated, totalPages };
}
export default Paginated