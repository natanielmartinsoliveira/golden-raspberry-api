export class Movie {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly year: number,
    public readonly studio: string,
    public readonly producer: string,
    public readonly winner: boolean,
  ) {}
}
