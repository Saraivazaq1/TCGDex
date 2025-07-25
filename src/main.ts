import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.setBaseViewsDir(join(__dirname, '..', 'views'))
    app.setViewEngine('ejs')

    app.useStaticAssets(join(process.cwd(), 'public'))
   
    await app.listen(3000);

}

bootstrap(); 