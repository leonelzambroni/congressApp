import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CongressInterceptorService } from 'src/app/interceptors/congress-interceptor.service';

@NgModule({
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: CongressInterceptorService,
        multi: true,
      },
    ]
  })
  export class InterceptorModule {}