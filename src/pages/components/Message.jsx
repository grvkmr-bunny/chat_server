import gql from "graphql-tag";
import React, { Component } from 'react';
import { Query } from "react-apollo";

class Message extends Component {

}

const ApolloMessage = () => (
    <Query
      query={gql`
        query MessageQuery {
          message {
            id
            text
            user{
                name
            }
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        console.log(data);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
  
        return data.message.map(({ text, id, user }) => (
          // <ListItem key={id} primaryText />
          // <div style={{float: "left", clear: "both"}} ref={ref => this.end = ref} />
        )
        );
      }}
    </Query>
  )

export default ApolloMessage;