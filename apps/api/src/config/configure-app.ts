import { INestApplication, RequestMethod, ValidationPipe, VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { apiEnv } from './api-env';
import { requestContext } from '../common/http-context';
import { ApiExceptionFilter, InputValidationException } from '../common/api-exception.filter';
import { ApiResponseInterceptor } from '../common/api-response.interceptor';

export function configureApp(app: INestApplication): void {
  const env = apiEnv();
  app.use(requestContext);
  app.use(helmet({ strictTransportSecurity: env.mode === 'production' ? undefined : false,
    contentSecurityPolicy: { directives: { upgradeInsecureRequests: env.mode === 'production' ? [] : null } },
  }));
  app.enableCors({ origin: env.origins, credentials: true, exposedHeaders: ['X-Request-Id'] });
  app.setGlobalPrefix('api', { exclude: [
    { path: '/', method: RequestMethod.GET },
    { path: 'health', method: RequestMethod.GET },
    { path: 'health/ready', method: RequestMethod.GET },
  ] });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: VERSION_NEUTRAL });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, forbidNonWhitelisted: true, transform: true,
    validationError: { target: false, value: false },
    exceptionFactory: (errors) => new InputValidationException(
      errors.map((item) => item.property).filter((name) => /^[a-zA-Z0-9_]{1,64}$/.test(name)).slice(0, 20),
    ),
  }));
  app.useGlobalFilters(new ApiExceptionFilter());
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  if (env.docsEnabled) {
    const options = new DocumentBuilder().setTitle('KreditSmart API')
      .setDescription('Development API documentation. No real lending or user financial data yet.')
      .setVersion('1.0').build();
    // Swagger UI needs inline styles/scripts; restrict the CSP relaxation to this local development route.
    app.use('/api/docs', helmet({ contentSecurityPolicy: false, strictTransportSecurity: false }));
    // Remove inherited CSP only on docs UI routes. API routes retain Helmet defaults.
    app.use('/api/docs', (_req: unknown, res: { removeHeader(name: string): void }, next: () => void) => {
      res.removeHeader('Content-Security-Policy'); next();
    });
    SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, options), {
      swaggerOptions: { persistAuthorization: false },
    });
  }
}
