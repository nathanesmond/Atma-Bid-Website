import { useState, useEffect } from "react";

export const useFetch = (apiFunction) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isCancelled = false;

        apiFunction()
            .then((response) => {
                if (!isCancelled) {
                    const safeData = Array.isArray(response.data)
                        ? response.data
                        : [];
                    setData(safeData);
                }
            })
            .catch((err) => {
                if (!isCancelled) setError(err);
            })
            .finally(() => {
                if (!isCancelled) setLoading(false);
            });

        return () => {
            isCancelled = true;
        };
    }, [apiFunction]);

    return { data, loading, error };
};
