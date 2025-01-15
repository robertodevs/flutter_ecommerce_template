import { LoadBalancer, ChannelControlHelper, TypedLoadBalancingConfig } from './load-balancer';
import { Endpoint } from './subchannel-address';
import { ChannelOptions } from './channel-options';
import { ChannelCredentials } from './channel-credentials';
export declare class ChildLoadBalancerHandler implements LoadBalancer {
    private readonly channelControlHelper;
    private readonly credentials;
    private readonly options;
    private currentChild;
    private pendingChild;
    private latestConfig;
    private ChildPolicyHelper;
    constructor(channelControlHelper: ChannelControlHelper, credentials: ChannelCredentials, options: ChannelOptions);
    protected configUpdateRequiresNewPolicyInstance(oldConfig: TypedLoadBalancingConfig, newConfig: TypedLoadBalancingConfig): boolean;
    /**
     * Prerequisites: lbConfig !== null and lbConfig.name is registered
     * @param endpointList
     * @param lbConfig
     * @param attributes
     */
    updateAddressList(endpointList: Endpoint[], lbConfig: TypedLoadBalancingConfig, attributes: {
        [key: string]: unknown;
    }): void;
    exitIdle(): void;
    resetBackoff(): void;
    destroy(): void;
    getTypeName(): string;
}
