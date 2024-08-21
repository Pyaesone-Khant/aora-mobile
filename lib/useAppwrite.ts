import { PostProps } from "@/types/typings";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Models } from "react-native-appwrite";

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
            const mappedPosts = res.map((doc: Models.Document) => ({ id: doc.$id, ...doc }));
            setData(mappedPosts);
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
