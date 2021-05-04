import jwt from 'jsonwebtoken';

const extractBearer = (authorization) => authorization.replace('Bearer ', '');
const isAuth = (token) => [
  // 5a50159308f5a800111de759
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdHJlYW1sb290cy5jb20iLCJ1c2VySWQiOiI1YTUwMTU5MzA4ZjVhODAwMTExZGU3NTkiLCJpYXQiOjE1MTYyMzkwMjJ9.mj8-t--lfImQGg8HoA_9XOvDlunl3YJoPttkIbOHNMU',
  // 5a50159308f5a800111de750
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdHJlYW1sb290cy5jb20iLCJ1c2VySWQiOiI1YTUwMTU5MzA4ZjVhODAwMTExZGU3NTAiLCJpYXQiOjE1MTYyMzkwMjJ9.ArXF6iD5tX0DkKiS0EG3y30Bl3g_E8iLPkk98hJw0Pc'
].includes(token);

const auth = (request, response, next) => {
  const token = request.headers.authorization && extractBearer(request.headers.authorization);

  if (!token || !isAuth(token)) {
    response.status(401).send('Unauthorized');
    return;
  }

  const { userId } = jwt.decode(token);
  if (!userId) {
    response.status(403).send('Unauthorized');
    return;
  }

  request.userId = userId;

  next();
};

export default auth;
