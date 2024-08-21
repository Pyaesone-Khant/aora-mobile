import { PostProps } from "@/types/typings";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn: any) => {

    const [data, setData] = useState([] as PostProps[]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await fn();
            setData(res);
        } catch (error: any) {
            Alert.alert('Error', error.message)
        } finally {
            setLoading(false);
        }
    }

    const refetch = () => fetchPosts();

    return { data, loading, refetch }
}

export default useAppwrite;
