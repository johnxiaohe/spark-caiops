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
  'cName' : string,
  'cTime' : Time,
  'cPid' : string,
  'desc' : string,
  'name' : string,
  'size' : bigint,
  'uPid' : string,
  'wasm' : Uint8Array | number[],
  'uName' : string,
  'uTime' : Time,
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
  'addVersion' : ActorMethod<[string, CaiVersion], undefined>,
  'adminList' : ActorMethod<[], Array<Member>>,
  'canisters' : ActorMethod<[string], Array<string>>,
  'checkAdmin' : ActorMethod<[], boolean>,
  'delCanister' : ActorMethod<[string, string], undefined>,
  'delCanisterByAdmin' : ActorMethod<[string, string], boolean>,
  'delModule' : ActorMethod<[string], undefined>,
  'initChilds' : ActorMethod<[string], undefined>,
  'modules' : ActorMethod<[], Array<CaiModule>>,
  'setCaiDesc' : ActorMethod<[string, string], undefined>,
  'setCaiTags' : ActorMethod<[string, Array<string>], undefined>,
  'updateAllCais' : ActorMethod<[string, string], boolean>,
  'updateTargetCais' : ActorMethod<[string, string, Array<string>], boolean>,
  'versions' : ActorMethod<[string], Array<CaiVersion>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
