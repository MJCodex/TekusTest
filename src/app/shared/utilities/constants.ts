import { Patterns } from '../models/patterns.model';

export const patterns: Patterns = {
  onlyLetters: {
    pattern: '^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$',
    key: 'errors.only-letters'
  },
  email: {
    pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
    key: 'errors.invalid-email'
  },
  onlyNumbers: {
    pattern: '^[0-9 ]*$',
    key: 'errors.only-numbers'
  },
}
