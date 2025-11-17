import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Charger = {
  __typename?: 'Charger';
  createdAt?: Maybe<Scalars['Date']['output']>;
  firmware?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lastHeartbeat?: Maybe<Scalars['Date']['output']>;
  maxPower?: Maybe<Scalars['Float']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ocppId?: Maybe<Scalars['String']['output']>;
  plugs?: Maybe<Array<Maybe<Plug>>>;
  pricePerKWh?: Maybe<Scalars['Float']['output']>;
  serialNumber?: Maybe<Scalars['String']['output']>;
  station?: Maybe<Station>;
  stationId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ChargerStatus>;
  totalPlugs?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<ChargerType>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export enum ChargerStatus {
  Available = 'AVAILABLE',
  Faulted = 'FAULTED',
  InUse = 'IN_USE',
  Offline = 'OFFLINE'
}

export enum ChargerType {
  Ac = 'AC',
  Dc = 'DC',
  Hybrid = 'HYBRID'
}

export type CommonResponse = {
  __typename?: 'CommonResponse';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type CreateChargerInput = {
  maxPower: Scalars['Float']['input'];
  model: Scalars['String']['input'];
  name: Scalars['String']['input'];
  plugs: Array<CreatePlugInput>;
  pricePerKWh: Scalars['Float']['input'];
  totalPlugs: Scalars['Int']['input'];
  type: ChargerType;
};

export type CreatePlugInput = {
  idTag: Scalars['String']['input'];
  plugType: PlugType;
  powerRating: Scalars['Float']['input'];
};

export type CreateStationRequest = {
  address: Scalars['String']['input'];
  chargers: Array<CreateChargerInput>;
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  ownerMobile: Scalars['String']['input'];
};

export type GetBalanceByMobileResponse = {
  __typename?: 'GetBalanceByMobileResponse';
  data: Wallet;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type GetStationsInViewportRequest = {
  neLat: Scalars['Float']['input'];
  neLng: Scalars['Float']['input'];
  swLat: Scalars['Float']['input'];
  swLng: Scalars['Float']['input'];
};

export type LoginRequest = {
  mobile: Scalars['String']['input'];
  pin: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type MobileRegisterRequest = {
  mobile: Scalars['String']['input'];
  pin: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createStation: Station;
  login: LoginResponse;
  mobileRegister: CommonResponse;
  sendOtp: SendOtpResponse;
  topUp: TopUpResponse;
  verifyOtp: Scalars['Boolean']['output'];
};


export type MutationCreateStationArgs = {
  input: CreateStationRequest;
};


export type MutationLoginArgs = {
  input: LoginRequest;
};


export type MutationMobileRegisterArgs = {
  input: MobileRegisterRequest;
};


export type MutationSendOtpArgs = {
  input: SendOtpInput;
};


export type MutationTopUpArgs = {
  input: TopUpRequest;
};


export type MutationVerifyOtpArgs = {
  input: VerifyOtpInput;
};

export type Plug = {
  __typename?: 'Plug';
  Charger?: Maybe<Charger>;
  chargerId?: Maybe<Scalars['String']['output']>;
  connectorId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  idTag?: Maybe<Scalars['String']['output']>;
  plugType?: Maybe<PlugType>;
  powerRating?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<PlugStatus>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export enum PlugStatus {
  Available = 'AVAILABLE',
  Fault = 'FAULT',
  InUse = 'IN_USE'
}

export enum PlugType {
  Ac = 'AC',
  Dc = 'DC'
}

export type Query = {
  __typename?: 'Query';
  getBalance: GetBalanceByMobileResponse;
  getCharger: Charger;
  getStationsInViewport: Array<Maybe<Station>>;
  getUserByMobile: User;
};


export type QueryGetChargerArgs = {
  chargerId: Scalars['String']['input'];
};


export type QueryGetStationsInViewportArgs = {
  input: GetStationsInViewportRequest;
};


export type QueryGetUserByMobileArgs = {
  mobile: Scalars['String']['input'];
};

export type SendOtpInput = {
  mobile: Scalars['String']['input'];
  purpose: Scalars['String']['input'];
};

export type SendOtpResponse = {
  __typename?: 'SendOtpResponse';
  expiredAt?: Maybe<Scalars['Date']['output']>;
  otp?: Maybe<Scalars['String']['output']>;
  refId?: Maybe<Scalars['String']['output']>;
};

export enum SessionStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Failed = 'FAILED'
}

export type Station = {
  __typename?: 'Station';
  address?: Maybe<Scalars['String']['output']>;
  chargers?: Maybe<Array<Maybe<Charger>>>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerMobile?: Maybe<Scalars['String']['output']>;
  status?: Maybe<StationStatus>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export enum StationStatus {
  Maintenance = 'MAINTENANCE',
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type TopUpRequest = {
  amount: Scalars['Float']['input'];
};

export type TopUpResponse = {
  __typename?: 'TopUpResponse';
  message: Scalars['String']['output'];
  paymentId?: Maybe<Scalars['String']['output']>;
  status: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  mobile?: Maybe<Scalars['String']['output']>;
  pin?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type VerifyOtpInput = {
  mobile: Scalars['String']['input'];
  otp: Scalars['String']['input'];
  refId: Scalars['String']['input'];
};

export type Wallet = {
  __typename?: 'Wallet';
  balance?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  mobile?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Charger: ResolverTypeWrapper<Charger>;
  ChargerStatus: ChargerStatus;
  ChargerType: ChargerType;
  CommonResponse: ResolverTypeWrapper<CommonResponse>;
  CreateChargerInput: CreateChargerInput;
  CreatePlugInput: CreatePlugInput;
  CreateStationRequest: CreateStationRequest;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GetBalanceByMobileResponse: ResolverTypeWrapper<GetBalanceByMobileResponse>;
  GetStationsInViewportRequest: GetStationsInViewportRequest;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginRequest: LoginRequest;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  MobileRegisterRequest: MobileRegisterRequest;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Plug: ResolverTypeWrapper<Plug>;
  PlugStatus: PlugStatus;
  PlugType: PlugType;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  SendOtpInput: SendOtpInput;
  SendOtpResponse: ResolverTypeWrapper<SendOtpResponse>;
  SessionStatus: SessionStatus;
  Station: ResolverTypeWrapper<Station>;
  StationStatus: StationStatus;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TopUpRequest: TopUpRequest;
  TopUpResponse: ResolverTypeWrapper<TopUpResponse>;
  User: ResolverTypeWrapper<User>;
  VerifyOtpInput: VerifyOtpInput;
  Wallet: ResolverTypeWrapper<Wallet>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Charger: Charger;
  CommonResponse: CommonResponse;
  CreateChargerInput: CreateChargerInput;
  CreatePlugInput: CreatePlugInput;
  CreateStationRequest: CreateStationRequest;
  Date: Scalars['Date']['output'];
  Float: Scalars['Float']['output'];
  GetBalanceByMobileResponse: GetBalanceByMobileResponse;
  GetStationsInViewportRequest: GetStationsInViewportRequest;
  Int: Scalars['Int']['output'];
  LoginRequest: LoginRequest;
  LoginResponse: LoginResponse;
  MobileRegisterRequest: MobileRegisterRequest;
  Mutation: Record<PropertyKey, never>;
  Plug: Plug;
  Query: Record<PropertyKey, never>;
  SendOtpInput: SendOtpInput;
  SendOtpResponse: SendOtpResponse;
  Station: Station;
  String: Scalars['String']['output'];
  TopUpRequest: TopUpRequest;
  TopUpResponse: TopUpResponse;
  User: User;
  VerifyOtpInput: VerifyOtpInput;
  Wallet: Wallet;
};

export type ChargerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Charger'] = ResolversParentTypes['Charger']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  firmware?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastHeartbeat?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  maxPower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  model?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ocppId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  plugs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Plug']>>>, ParentType, ContextType>;
  pricePerKWh?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  serialNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  station?: Resolver<Maybe<ResolversTypes['Station']>, ParentType, ContextType>;
  stationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ChargerStatus']>, ParentType, ContextType>;
  totalPlugs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['ChargerType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
};

export type CommonResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommonResponse'] = ResolversParentTypes['CommonResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GetBalanceByMobileResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetBalanceByMobileResponse'] = ResolversParentTypes['GetBalanceByMobileResponse']> = {
  data?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type LoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createStation?: Resolver<ResolversTypes['Station'], ParentType, ContextType, RequireFields<MutationCreateStationArgs, 'input'>>;
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  mobileRegister?: Resolver<ResolversTypes['CommonResponse'], ParentType, ContextType, RequireFields<MutationMobileRegisterArgs, 'input'>>;
  sendOtp?: Resolver<ResolversTypes['SendOtpResponse'], ParentType, ContextType, RequireFields<MutationSendOtpArgs, 'input'>>;
  topUp?: Resolver<ResolversTypes['TopUpResponse'], ParentType, ContextType, RequireFields<MutationTopUpArgs, 'input'>>;
  verifyOtp?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationVerifyOtpArgs, 'input'>>;
};

export type PlugResolvers<ContextType = any, ParentType extends ResolversParentTypes['Plug'] = ResolversParentTypes['Plug']> = {
  Charger?: Resolver<Maybe<ResolversTypes['Charger']>, ParentType, ContextType>;
  chargerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  connectorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  idTag?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  plugType?: Resolver<Maybe<ResolversTypes['PlugType']>, ParentType, ContextType>;
  powerRating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['PlugStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getBalance?: Resolver<ResolversTypes['GetBalanceByMobileResponse'], ParentType, ContextType>;
  getCharger?: Resolver<ResolversTypes['Charger'], ParentType, ContextType, RequireFields<QueryGetChargerArgs, 'chargerId'>>;
  getStationsInViewport?: Resolver<Array<Maybe<ResolversTypes['Station']>>, ParentType, ContextType, RequireFields<QueryGetStationsInViewportArgs, 'input'>>;
  getUserByMobile?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserByMobileArgs, 'mobile'>>;
};

export type SendOtpResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendOtpResponse'] = ResolversParentTypes['SendOtpResponse']> = {
  expiredAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  otp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type StationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Station'] = ResolversParentTypes['Station']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  chargers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Charger']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ownerMobile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['StationStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
};

export type TopUpResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopUpResponse'] = ResolversParentTypes['TopUpResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mobile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type WalletResolvers<ContextType = any, ParentType extends ResolversParentTypes['Wallet'] = ResolversParentTypes['Wallet']> = {
  balance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mobile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Charger?: ChargerResolvers<ContextType>;
  CommonResponse?: CommonResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  GetBalanceByMobileResponse?: GetBalanceByMobileResponseResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Plug?: PlugResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SendOtpResponse?: SendOtpResponseResolvers<ContextType>;
  Station?: StationResolvers<ContextType>;
  TopUpResponse?: TopUpResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Wallet?: WalletResolvers<ContextType>;
};

