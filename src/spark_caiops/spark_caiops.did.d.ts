import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface CaiModule {
  'desc' : string,
  'name' : string,
  'parentModule' : string,
  'isChild' : boolean,
}
export interface CaiVersion {
  'id' : bigint,
  'cTime' : Time,
  'cPid' : string,
  'desc' : string,
  'name' : string,
  'size' : bigint,
  'uPid' : string,
  'uTime' : Time,
}
export interface CaisPageResp {
  'data' : Array<Canister>,
  'page' : bigint,
  'count' : bigint,
  'size' : bigint,
}
export interface Canister {
  'cid' : string,
  'owner' : string,
  'version' : string,
}
export interface Member {
  'pid' : string,
  'cTime' : Time,
  'cPid' : string,
  'name' : string,
}
export type Time = bigint;
export interface _SERVICE {
  'addAdmins' : ActorMethod<[string, string], undefined>,
  'addCanister' : ActorMethod<[string, string], undefined>,
  'addCanisterByAdmin' : ActorMethod<[string, string], boolean>,
  'addOrUpdateModule' : ActorMethod<[CaiModule], undefined>,
  'addVersion' : ActorMethod<
    [string, string, string, Uint8Array | number[]],
    undefined
  >,
  'adminList' : ActorMethod<[], Array<Member>>,
  'canisters' : ActorMethod<[string, bigint, bigint], CaisPageResp>,
  'checkAdmin' : ActorMethod<[], string>,
  'delCanister' : ActorMethod<[string, string], undefined>,
  'delCanisterByAdmin' : ActorMethod<[string, string], boolean>,
  'delModule' : ActorMethod<[string], undefined>,
  'getwasm' : ActorMethod<[string, bigint], Uint8Array | number[]>,
  'initChilds' : ActorMethod<[string], undefined>,
  'modules' : ActorMethod<[], Array<CaiModule>>,
  'setCaiDesc' : ActorMethod<[string, string], undefined>,
  'setCaiTags' : ActorMethod<[string, Array<string>], undefined>,
  'updateAllCais' : ActorMethod<[string, bigint], boolean>,
  'updateTargetCais' : ActorMethod<[string, bigint, Array<string>], boolean>,
  'updateVersion' : ActorMethod<
    [string, bigint, string, string, Uint8Array | number[]],
    string
  >,
  'version' : ActorMethod<[], string>,
  'versions' : ActorMethod<[string], Array<CaiVersion>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
