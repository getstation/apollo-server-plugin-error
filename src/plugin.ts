import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base';
import { GraphQLRequestContextDidEncounterErrors } from 'apollo-server-types';
import { GraphQLError } from 'graphql';

export class ApolloServerPluginError<T> implements ApolloServerPlugin<T> {
  constructor(
    protected errorHandler: (e: GraphQLError, requestContext: GraphQLRequestContextDidEncounterErrors<T>) => any,
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
