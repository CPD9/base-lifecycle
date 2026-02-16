import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono/client";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>;

export const useLogin = () => {
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.auth.login["$post"]({ json });
            return response.json() as Promise<ResponseType>;
        },
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.error(error);
        },
    });
    return mutation;
};