export interface ICacheClient {
  get (key: string): Promise<string>,
  set (key: string, data: any): Promise<any>
}
