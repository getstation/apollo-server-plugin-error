import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base';
import { GraphQLRequestContext, WithRequired } from 'apollo-server-types';
import { GraphQLError } from 'graphql';

export class ApolloServerPluginError<T> implements ApolloServerPlugin<T> {
  constructor(
    protected errorHandler: (e: GraphQLError, requestContext: WithRequired<
      GraphQLRequestContext<T>,
      'metrics' | 'source' | 'errors'
      >) => any,
  ) {}

  requestDidStart(): GraphQLRequestListener<T> {
    return {
      didEncounterErrors: requestContext => {
        requestContext.errors.forEach(err => {
          this.errorHandler(err, requestContext);
        });
      },
    };
  }
}
