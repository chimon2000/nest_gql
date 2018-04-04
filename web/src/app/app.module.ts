import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { ApolloModule, Apollo } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { RestLink } from 'apollo-link-rest'

import { AppComponent } from './app.component'
import { ApolloLink } from 'apollo-link'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, ApolloModule, HttpLinkModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const link = ApolloLink.from([
      new RestLink({ uri: 'http://localhost:3000/api/' }),
      httpLink.create({ uri: 'http://localhost:3000/graphql' })
    ])

    apollo.create({
      link,
      cache: new InMemoryCache(),
      connectToDevTools: true
    })
  }
}
