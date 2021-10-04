import https from 'https'
import axios from "axios";
import { syncWithStorage } from "swr-sync-storage";
import { HttpException } from '../exceptions/http.exception';
import useSWR from 'swr';
import { ArgumentDefinition, CommandDefinition, OptionDefinition } from 'cilly';

// export type Commandextra = {
//   type: string,
//   content: string
// }

export type CommandDefinitionWithDocumentation = {
  name: string;
  version?: string;
  description?: string;
  opts: OptionDefinition[];
  args: ArgumentDefinition[];
  subCommands: CommandDefinitionWithDocumentation[];
  extra: any[]
}


// Sync useSWR() data with localStorage, ensuring that we can always show
// data immediately (and offline) if it has been requested before
syncWithStorage("local");

const http = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: process.env.NODE_ENV !== 'development' })
})

const fetcher = async (url: string, payload: string)  => {
  try {
    console.log(`fetching ${url}`)
    const response = await http.get(url)
    const isOk = (status: number) => status >= 200 && status < 300
    if (response.data?.errors) throw new HttpException(response.data.errors)
    if (!isOk(response.status)) throw new HttpException([response.statusText])
    return response.data.data
  } catch (err) {
    // if (err.response?.data?.errors) throw new HttpException(err.response.data.errors)
    throw new HttpException([(err as Error).message])
  }
}

// const apiBaseUrl = process.env.NODE_ENV === 'development' ? 
//   'https://emily-services-dev.westeurope.cloudapp.azure.com/documentation/v1' : 
//   'https://emily-extra-service.com/v1'

const apiBaseUrl = 'https://emily-services-dev.westeurope.cloudapp.azure.com/documentation/v1'

export const useCachedRequest = <T>(url: string) => useSWR<T, HttpException>(url, fetcher)
export const useVersions = () => useCachedRequest<any>(`${apiBaseUrl}/versions`)
export const useVersion = (version: string, hash: string) => useCachedRequest<any>(`${apiBaseUrl}/versions/docs?object=${version}&p=${hash}`)