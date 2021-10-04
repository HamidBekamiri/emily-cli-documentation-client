export class HttpException extends Error {
  constructor(public errors: string[]) {
    super(errors.join('\n'))
  }
}