import { Routes } from '@angular/router';
import { CatalogComponent } from '@catalog/catalog.component';
import { SearchComponent } from '@catalog/search/search.component';
import { CartComponent } from '@shared/cart/cart.component';
import { SquadCatalogComponent } from './squad/squad-catalog/squad-catalog.component';
import { CART_OPTIONS_TOKEN, CartOptions, CartService } from '@catalog/cart.service';

export const routes: Routes = [
  { path: 'catalog', component: CatalogComponent, title: "Catalog - Joe's Robot Shop" },
  { path: 'search', component: SearchComponent, title: "Search - Joe's Robot Shop" },
  { path: 'cart', component: CartComponent, title: "Cart - Joe's Robot Shop" },
  {
    path: 'squad',
    children: [
      { path: 'bot-squad', component: SquadCatalogComponent, title: "Bot Squad - Joe's Robot Shop" },
      { path: 'squad-cart', component: CartComponent, title: "Squad Cart - Joe's Robot Shop" },
    ],
    providers: [
      {
        provide: CART_OPTIONS_TOKEN,
        useValue: {
          persistenceType: 'local',
          persistentKey: 'squad-cart',
        },
        multi: false,
      },
      {
        provide: CartService,
        useFactory: (cartOptions: CartOptions) => { return new CartService(cartOptions); },
        deps: [CART_OPTIONS_TOKEN]
      },
    ]
  },

  { path: '', redirectTo: '/catalog', pathMatch: 'full' },
];

