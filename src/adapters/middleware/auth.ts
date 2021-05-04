import { IAuthService } from '../../domain/ports/AuthService.interface';

const extractBearer = (authorization) => authorization.replace('Bearer ', '');

const auth = (authService: IAuthService) => (request, response, next) => {
  const token = request.headers.authorization && extractBearer(request.headers.authorization);
  const session = authService.getSession(token);

  if (!session) {
    response.status(401).send('Unauthorized');
    return;
  }

  if (!session.userId) {
    response.status(403).send('Unauthorized');
    return;
  }

  request.userId = session.userId;

  next();
};

export default auth;
