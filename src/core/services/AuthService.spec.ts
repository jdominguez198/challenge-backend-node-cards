import { AuthService } from './AuthService';

const jwtMock = {
  decode: () => ({})
};

const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdHJlYW1sb290cy5jb20iLCJ1c2VySWQiOiI1YTUwMTU5MzA4ZjVhODAwMTExZGU3NTkiLCJpYXQiOjE1MTYyMzkwMjJ9.mj8-t--lfImQGg8HoA_9XOvDlunl3YJoPttkIbOHNMU';
const invalidToken = 'invalid';

describe('AuthService', () => {
  it ('should return valid session if valid token is used', () => {
    const authService = new AuthService({ jwt: jwtMock });
    const session = authService.getSession(validToken);

    expect(session).toEqual({});
  });

  it ('should return null if invalid token is used', () => {
    const authService = new AuthService({ jwt: jwtMock });
    const session = authService.getSession(invalidToken);

    expect(session).toEqual(null);
  });
});
