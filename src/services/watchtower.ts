import { ConnectionConfig, NestedGrpcObject } from '../types';
import { createServiceClient } from './create-service-client';

/**
 * Create a Watchtower GRPC service client proxy
 * @param config The grpc service configuration
 */
export function createWatchtower(config: ConnectionConfig): any {
  try {
    const { grpcPkgObj, server, credentials } = config;
    const { Watchtower } = grpcPkgObj.watchtowerrpc as NestedGrpcObject;
    const watchtower = new Watchtower(
      server,
      credentials,
    );

    return createServiceClient({
      ...config,
      service: watchtower,
    });
  } catch (e) {
    if (!e.code) e.code = 'GRPC_WATCHTOWER_SERVICE_ERR';
    throw e;
  }
}
