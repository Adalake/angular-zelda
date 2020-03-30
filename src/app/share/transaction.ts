export function headE<T>(xs: readonly T[]): T {
    if (xs.length === 0) {
      throw Error(`Calling headE on empty array`);
    }
    return xs[0];
  }