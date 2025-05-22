import { useSearchParams, useLocation } from "react-router-dom";
import { useCallback } from "react";

export const useQueryParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const routerLocation = useLocation();

    const getQueryParam = useCallback((key) => searchParams.get(key) || "", [searchParams]);

    const updateQueryParams = useCallback((params) => {
        const newParams = new URLSearchParams(searchParams);
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                newParams.set(key, value.toString());
            } else {
                newParams.delete(key);
            }
        });
        setSearchParams(newParams);
    }, [searchParams, setSearchParams]);

    return { getQueryParam, updateQueryParams, routerLocation };
};
