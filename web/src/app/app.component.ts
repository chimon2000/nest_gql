import { Component } from '@angular/core'
import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'

const QUERY_AUTHORS = gql`
  query {
    authors {
      id
      firstName
    }
    author(id: 1) {
      id
      firstName
    }
  }
`

const QUERY_AUTHORS_AND_PEOPLE = gql`
  query {
    people @rest(type: "[Person]", path: "authors/") {
      firstName
    }
    authors {
      id
      firstName
    }
    author(id: 1) {
      id
      firstName
    }
  }
`

const QUERY_PEOPLE = gql`
  query {
    people @rest(type: "[Person]", path: "authors/") {
      firstName
    }
  }
`

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align:center">
      <h1>
        Welcome to {{ title }}!
      </h1>
      <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
    </div>
    <h2>Here are some links to help you start: </h2>
    <button (click)="onVote()">
      Vote
    </button>
  `
})
export class AppComponent {
  title = 'app'
  constructor(private readonly apollo: Apollo) {
    apollo
      .query({
        query: QUERY_AUTHORS
      })
      .subscribe(console.log)
    apollo
      .query({
        query: QUERY_AUTHORS_AND_PEOPLE
      })
      .subscribe(console.log)
    apollo
      .query({
        query: QUERY_PEOPLE
      })
      .subscribe(console.log)
  }

  onVote() {
    this.apollo
      .mutate({
        mutation: gql`
          mutation {
            upvotePost(postId: 2) {
              id
              title
              votes
            }
          }
        `
      })
      .subscribe(console.log)
  }
}
