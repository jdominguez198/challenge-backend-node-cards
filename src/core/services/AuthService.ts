export class AuthService {
  protected authorizedBearers = [
    // 5a50159308f5a800111de759
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdHJlYW1sb290cy5jb20iLCJ1c2VySWQiOiI1YTUwMTU5MzA4ZjVhODAwMTExZGU3NTkiLCJpYXQiOjE1MTYyMzkwMjJ9.mj8-t--lfImQGg8HoA_9XOvDlunl3YJoPttkIbOHNMU',
    // 5a50159308f5a800111de750
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdHJlYW1sb290cy5jb20iLCJ1c2VySWQiOiI1YTUwMTU5MzA4ZjVhODAwMTExZGU3NTAiLCJpYXQiOjE1MTYyMzkwMjJ9.ArXF6iD5tX0DkKiS0EG3y30Bl3g_E8iLPkk98hJw0Pc'
  ];
  protected jwt: any;

  constructor ({ jwt }) {
    this.jwt = jwt;
  }

  protected isAuthorized (token: string) {
    return this.authorizedBearers.includes(token);
  }

  getSession (token: string) {
    if (!token || !this.isAuthorized(token)) {
      return null;
    }

    const payload = this.jwt.decode(token);
    if (!payload) {
      return null;
    }

    return payload;
  }
}
