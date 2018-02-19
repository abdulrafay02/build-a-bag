import { AmazonApiService } from './services/amazon-api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppErrorHandler } from './common/app-error-handler';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductService } from './product.service';
import { CartComponent } from './cart/cart.component';
import { ProductFooterComponent } from './product-footer/product-footer.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ToggleService } from './toggle.service';
import { CartService } from './cart.service';
import { FilterCategoryPipe } from './filter-category.pipe';
import { AwsInterceptorService } from './aws-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductCategoriesComponent,
    CartComponent,
    ProductFooterComponent,
    ProductDetailsComponent,
    FilterCategoryPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ProductService,
    ToggleService,
    CartService,
    AmazonApiService,
    AwsInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AwsInterceptorService,
      multi: true
    },
    // { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
