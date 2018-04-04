import { h, Component } from 'preact'
import { Query } from 'react-apollo'

import gql from 'graphql-tag'

const QUERY_AUTHORS_AND_PEOPLE = gql`
    query {
        people @rest(type: "[Person]", path: "authors/") {
            firstName
        }

        authors {
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

const People = () => (
    <Query query={QUERY_AUTHORS_AND_PEOPLE}>
        {({ loading, error, data }) => {
            console.log('here')
            if (loading) {
                return <h4>Loading...</h4>
            }
            if (error) {
                return <h4>{error.message}</h4>
            }
            return <div>{data.people.map((person: any) => <div>{person.firstName}</div>)}</div>
        }}
    </Query>
)

export default class App extends Component<{}, {}> {
    render() {
        return <People />
    }
}
