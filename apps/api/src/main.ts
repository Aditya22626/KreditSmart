import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { apiEnv } from './config/api-env';
import { configureApp } from './config/configure-app';

async function bootstrap(): Promise<void> {
  const env = apiEnv();
  const app = await NestFactory.create(AppModule, { logger: new ConsoleLogger({ json: true }) });
  configureApp(app);
  app.enableShutdownHooks();
  await app.listen(env.port, env.host);
  new ConsoleLogger('Bootstrap', { json: true }).log(`KreditSmart API listening on ${env.host}:${env.port}`);
}
void bootstrap().catch(() => {
  console.error('API startup failed; verify environment configuration and service availability.');
  process.exitCode = 1;
});
