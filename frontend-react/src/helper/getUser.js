import useSWR from "swr"
import { fetcher } from "./axios"

export function useUserSWR(id) {
  const { data, error, isLoading, mutate } = useSWR(`/user/${id}`, fetcher)
 
  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  }
}


export function useLoggedInUserSWR() {
  const { data, error, isLoading, mutate } = useSWR(`/user/me`, fetcher)
 
  return {
    loggedInUser: data,
    isLoading,
    isError: error,
    mutate,
  }
}



